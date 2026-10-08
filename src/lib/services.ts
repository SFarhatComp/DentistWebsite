import fs from "fs"
import path from "path"
import { parse } from "yaml"
import type { Locale } from "./i18n-config"
import { serviceKeys, type ServiceKey } from "./routes"

export type Family = "prevenir" | "reparer" | "remplacer" | "aligner"

export interface Service {
  key: ServiceKey
  slug: string
  family: Family
  image: string
  title: string
  card: string
  h1: string
  seoTitle: string
  description: string
  intro: string[]
  whenToConsult: string[]
  steps: string[]
  options?: string
  goodToKnow: string
  faq: { q: string; a: string }[]
  related: string[]
  sources?: { label: string; url: string }[]
}

const ROOT = path.join(process.cwd(), "content", "services")
const cache = new Map<string, Service>()

export function getService(key: ServiceKey, lang: Locale): Service {
  const id = `${lang}:${key}`
  const hit = cache.get(id)
  if (hit) return hit
  const file = path.join(ROOT, lang, `${key}.md`)
  const raw = fs.readFileSync(file, "utf-8")
  const m = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!m) throw new Error(`Frontmatter manquant : ${file}`)
  const data = parse(m[1]) as Service
  // Sources saisies dans le CMS : liens https seulement.
  if (data.sources) data.sources = data.sources.filter((s) => /^https:\/\//.test(s.url))
  cache.set(id, data)
  return data
}

export function getAllServices(lang: Locale): Service[] {
  return serviceKeys.map((k) => getService(k, lang))
}

export const familyOrder: Family[] = ["prevenir", "reparer", "remplacer", "aligner"]

/** Ordre d'affichage dans chaque famille (document de contenu, page Services). */
export const serviceOrder: ServiceKey[] = [
  "examen", "nettoyage", "enfants", "aines", "protecteur",
  "obturation", "couronne", "canal", "extraction",
  "partielle", "complete", "sur-implants", "implants", "reparation",
  "aligneurs", "blanchiment", "facettes", "gouttiere",
]

export function servicesByFamily(lang: Locale): { family: Family; items: Service[] }[] {
  const all = serviceOrder.map((k) => getService(k, lang))
  return familyOrder.map((family) => ({ family, items: all.filter((s) => s.family === family) }))
}
