import type { MetadataRoute } from "next"
import { getAllServices } from "@/lib/content"

const BASE = "https://studiodefacto.ca"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/premiere-visite",
    "/plan-traitement-visuel",
    "/soins",
    "/le-studio",
    "/laboratoire",
    "/laboratoire/professionnels",
    "/laboratoire/partenaires",
    "/laboratoire/prescription",
    "/laboratoire/reference-clinique",
    "/nouveaux-patients",
    "/assurances-paiements",
    "/questions-frequentes",
    "/ressources",
    "/rendez-vous",
    "/urgence",
    "/contact",
    "/confidentialite",
    "/conditions-utilisation",
  ]
  const services = getAllServices("fr").map((s) => `/soins/${s.slug}`)
  const now = new Date()
  return [...staticRoutes, ...services].map((p) => ({
    url: `${BASE}/fr${p}`,
    lastModified: now,
  }))
}
