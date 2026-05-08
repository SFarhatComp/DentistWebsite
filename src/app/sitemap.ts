import type { MetadataRoute } from "next"
import { getAllServices } from "@/lib/content"

const BASE = "https://defactodentaire.ca"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/premiere-visite",
    "/plan-traitement-visuel",
    "/services",
    "/le-studio",
    "/laboratoire",
    "/laboratoire/professionnels",
    "/ressources-patients",
    "/rendez-vous",
    "/urgence",
    "/contact",
    "/confidentialite",
    "/conditions-utilisation",
  ]
  const services = getAllServices("fr").map((s) => `/services/${s.slug}`)
  const now = new Date()
  return [...staticRoutes, ...services].map((p) => ({
    url: `${BASE}/fr${p}`,
    lastModified: now,
  }))
}
