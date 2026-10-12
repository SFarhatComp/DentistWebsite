import type { MetadataRoute } from "next"
import { getAllServices } from "@/lib/content"

const BASE = "https://studiodefacto.ca"

/**
 * Plan du site — routes de la maquette v2.
 *
 * Les deux langues sont déclarées : le site est bilingue et chaque page existe
 * sous /fr et sous /en.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/premiere-visite",
    "/services",
    "/parcours",
    "/atelier",
    "/a-propos",
    "/faq",
    "/contact",
    "/urgence",
    "/rendez-vous",
    "/nouveau-patient",
    "/confidentialite",
    "/conditions-utilisation",
    "/accessibilite",
  ]
  const services = getAllServices("fr").map((s) => `/services/${s.slug}`)
  const now = new Date()
  return ["fr", "en"].flatMap((lang) =>
    [...routes, ...services].map((p) => ({
      url: `${BASE}/${lang}${p}`,
      lastModified: now,
    }))
  )
}
