import table from "./route-table.json"
import type { Locale } from "./i18n-config"

export type PageKey = keyof typeof table.pages
export type ServiceKey = keyof typeof table.services

export const pageKeys = Object.keys(table.pages) as PageKey[]
export const serviceKeys = Object.keys(table.services) as ServiceKey[]

/** Chemin public d'une page, dans la langue demandée. */
export function href(key: PageKey, lang: Locale, hash?: string): string {
  const p = table.pages[key][lang]
  return (p ? `/${lang}/${p}` : `/${lang}`) + (hash ? `#${hash}` : "")
}

export function serviceHref(key: ServiceKey, lang: Locale): string {
  return `/${lang}/services/${table.services[key][lang]}`
}

export function serviceSlug(key: ServiceKey, lang: Locale): string {
  return table.services[key][lang]
}

export function serviceKeyFromSlug(slug: string, lang: Locale): ServiceKey | null {
  return (serviceKeys.find((k) => table.services[k][lang] === slug) as ServiceKey) ?? null
}

/** Lien « services liés » : clé de service, `urgence` ou `page:<clé>`. */
export function relatedHref(ref: string, lang: Locale): string {
  if (ref === "urgence") return href("emergency", lang)
  if (ref.startsWith("page:")) return href(ref.slice(5) as PageKey, lang)
  return serviceHref(ref as ServiceKey, lang)
}

/**
 * Chemin équivalent dans l'autre langue (sélecteur FR/EN).
 * Reconnaît les chemins publics FR et EN des pages et des fiches.
 */
export function alternatePath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/\/+$/, "")
  const m = clean.match(/^\/(fr|en)(?:\/(.*))?$/)
  if (!m) return `/${to}`
  const from = m[1] as Locale
  const rest = m[2] ?? ""
  for (const k of pageKeys) {
    const p = table.pages[k]
    if (p[from] === rest || p.fr === rest) return href(k, to)
  }
  const s = rest.match(/^services\/(.+)$/)
  if (s) {
    const key = serviceKeyFromSlug(s[1], from) ?? serviceKeyFromSlug(s[1], from === "fr" ? "en" : "fr")
    if (key) return serviceHref(key, to)
  }
  return `/${to}`
}

/** Clé de page à partir d'un chemin public (barre mobile, menu actif). */
export function pageKeyFromPath(pathname: string): PageKey | "service" | null {
  const m = pathname.replace(/\/+$/, "").match(/^\/(fr|en)(?:\/(.*))?$/)
  if (!m) return null
  const rest = m[2] ?? ""
  const lang = m[1] as Locale
  for (const k of pageKeys) if (table.pages[k][lang] === rest || table.pages[k].fr === rest) return k
  if (rest.startsWith("services/")) return "service"
  return null
}
