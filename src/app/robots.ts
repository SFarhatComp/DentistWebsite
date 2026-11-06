import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/__forms.html", "/dossier"],
      },
    ],
    sitemap: "https://studiodefacto.ca/sitemap.xml",
  }
}
