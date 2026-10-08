import type { MetadataRoute } from "next"
import { facts } from "@/lib/facts"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }],
    sitemap: `${facts.siteUrl}/sitemap.xml`,
    host: facts.siteUrl,
  }
}
