/** @type {import('next').NextConfig} */
const table = require("./src/lib/route-table.json")

const LANGS = ["fr", "en"]
const pagePath = (key, lang) => {
  const p = table.pages[key][lang]
  return p ? `/${lang}/${p}` : `/${lang}`
}

// Politique de sécurité du contenu (cahier, lot 8.3). Next.js injecte des scripts
// en ligne pour l'hydratation : 'unsafe-inline' reste nécessaire sans nonce.
// Aucun domaine tiers sauf Cloudflare Web Analytics (sans témoin) et la carte
// Google, chargée seulement après un clic du visiteur.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-src https://www.google.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  // Sauf pour un essai local en http (LOCAL_PREVIEW=1 au moment du build).
  ...(process.env.LOCAL_PREVIEW === "1" ? [] : ["upgrade-insecure-requests"]),
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
]

function buildRedirects() {
  const out = [
    { source: "/", destination: "/fr", statusCode: 301 },
    // Decap CMS : la page d'administration est un fichier statique.
    { source: "/admin", destination: "/admin/index.html", statusCode: 302 },
  ]
  for (const lang of LANGS) {
    // Anciennes pages (refonte 2026-09 et avant) : 301 vers leur remplaçante.
    for (const [old, key] of Object.entries(table.legacy.pages)) {
      if (table.pages[key] && old !== table.pages[key][lang]) {
        out.push({ source: `/${lang}/${old}`, destination: pagePath(key, lang), statusCode: 301 })
      }
    }
    for (const [old, key] of Object.entries(table.legacy.soins)) {
      out.push({ source: `/${lang}/soins/${old}`, destination: `/${lang}/services/${table.services[key][lang]}`, statusCode: 301 })
    }
    out.push({ source: `/${lang}/soins/urgences`, destination: pagePath("emergency", lang), statusCode: 301 })
    out.push({ source: `/${lang}/laboratoire/:rest*`, destination: pagePath("lab", lang), statusCode: 301 })
  }
  // Une page anglaise appelée par son chemin français : renvoi vers le chemin anglais.
  for (const p of Object.values(table.pages)) {
    if (p.fr !== p.en && p.fr && !p.fr.startsWith("services/")) {
      out.push({ source: `/en/${p.fr}`, destination: `/en/${p.en}`, statusCode: 301 })
    }
  }
  return out
}

function buildRewrites() {
  const out = []
  for (const p of Object.values(table.pages)) {
    if (p.fr !== p.en && p.en) out.push({ source: `/en/${p.en}`, destination: `/en/${p.fr}` })
  }
  return out
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600],
    imageSizes: [96, 256, 384],
    qualities: [60, 75],
  },
  // Page 404 pour les adresses hors /fr et /en (src/app/global-not-found.tsx)
  experimental: { globalNotFound: true },
  async headers() {
    if (process.env.NODE_ENV !== "production") return []
    // /admin (Decap CMS) a ses propres en-têtes dans netlify.toml.
    return [{ source: "/((?!admin).*)", headers: securityHeaders }]
  },
  async redirects() {
    return buildRedirects()
  },
  async rewrites() {
    return { beforeFiles: buildRewrites() }
  },
}

module.exports = nextConfig
