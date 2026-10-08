import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import "@fontsource-variable/inter"
import "../globals.css"

import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import type { ReactNode } from "react"
import { JsonLd } from "@/components/JsonLd"
import { Reveal } from "@/components/Reveal"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import { i18n, isLocale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  metadataBase: new URL(facts.siteUrl),
  applicationName: facts.name,
  icons: { icon: "/logo.svg" },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#1B111F",
  width: "device-width",
  initialScale: 1,
}

const DAY = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

/** Balisage Dentist, identique à la fiche Google au caractère près (cahier 5.5). */
function dentistJsonLd(lang: "fr" | "en") {
  const sameAs = process.env.NEXT_PUBLIC_GBP_URL ? [process.env.NEXT_PUBLIC_GBP_URL] : undefined
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${facts.siteUrl}/#studio`,
    name: facts.name,
    url: `${facts.siteUrl}${href("home", lang)}`,
    image: `${facts.siteUrl}/og/entree.jpg`,
    logo: `${facts.siteUrl}/logo.svg`,
    telephone: facts.phoneTel,
    email: facts.emailInfo,
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "fr" ? facts.street : facts.streetEn,
      addressLocality: facts.city,
      addressRegion: facts.region,
      postalCode: facts.postalCode,
      addressCountry: facts.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: facts.geo.lat, longitude: facts.geo.lng },
    openingHoursSpecification: facts.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => DAY[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: ["Ahuntsic", "Montréal-Nord", "Villeray", "Saint-Michel", "Cartierville", "Laval"],
    availableLanguage: ["fr", "en"],
    paymentAccepted: "Cash, Debit, Credit Card",
    employee: {
      "@type": "Person",
      name: "Bader Ramdani",
      honorificPrefix: "Dr",
      jobTitle: lang === "fr" ? "Dentiste généraliste" : "General dentist",
    },
    sameAs,
  }
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const d = getDict(lang)
  const beacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN
  return (
    <html lang={lang === "fr" ? "fr-CA" : "en-CA"}>
      <body>
        <a href="#contenu" className="sr-only z-[60] rounded bg-white px-4 py-3 text-aub focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {d.common.skip}
        </a>
        {children}
        <Reveal />
        <JsonLd data={dentistJsonLd(lang)} />
        {beacon && (
          // Mesure d'audience sans témoin (Cloudflare Web Analytics) ; déclarée dans la politique.
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={JSON.stringify({ token: beacon })}
          />
        )}
      </body>
    </html>
  )
}
