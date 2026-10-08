import type { Metadata } from "next"
import { facts } from "./facts"
import type { Locale } from "./i18n-config"
import { href, serviceHref, type PageKey, type ServiceKey } from "./routes"

type Target = { page: PageKey } | { service: ServiceKey }

function pathFor(t: Target, lang: Locale) {
  return "page" in t ? href(t.page, lang) : serviceHref(t.service, lang)
}

/**
 * Métadonnées d'une page (cahier, lot 5) : titre et description uniques,
 * URL canonique, hreflang par paire FR/EN, Open Graph 1200 × 630.
 */
export function pageMetadata(opts: {
  lang: Locale
  target: Target
  title: string
  description: string
  image?: string
  noindex?: boolean
  /** Pages d'atterrissage : canonique vers la fiche du service correspondant. */
  canonical?: Target
}): Metadata {
  const { lang, target, title, description, image = "planification", noindex, canonical } = opts
  const canonicalPath = pathFor(canonical ?? target, lang)
  const og = `/og/${image}.jpg`
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalPath,
      languages: noindex
        ? undefined
        : {
            "fr-CA": pathFor(target, "fr"),
            "en-CA": pathFor(target, "en"),
            "x-default": pathFor(target, "fr"),
          },
    },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: facts.name,
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
      url: pathFor(target, lang),
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: facts.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  }
}
