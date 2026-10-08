import type { MetadataRoute } from "next"
import { facts } from "@/lib/facts"
import { href, pageKeys, serviceHref, serviceKeys, type PageKey } from "@/lib/routes"

/** Pages FR et EN avec leurs équivalents (cahier 5.3). Hors sitemap : pages Ads (noindex) et /merci. */
const EXCLUDED: PageKey[] = ["newPatient", "dentures", "emergencyLanding", "thanks"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entry = (fr: string, en: string, priority: number): MetadataRoute.Sitemap =>
    (["fr", "en"] as const).map((lang) => ({
      url: `${facts.siteUrl}${lang === "fr" ? fr : en}`,
      lastModified: now,
      priority,
      alternates: { languages: { "fr-CA": `${facts.siteUrl}${fr}`, "en-CA": `${facts.siteUrl}${en}` } },
    }))
  return [
    ...pageKeys
      .filter((k) => !EXCLUDED.includes(k))
      .flatMap((k) => entry(href(k, "fr"), href(k, "en"), k === "home" ? 1 : 0.7)),
    ...serviceKeys.flatMap((k) => entry(serviceHref(k, "fr"), serviceHref(k, "en"), 0.6)),
  ]
}
