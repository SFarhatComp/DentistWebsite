import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Service, ServiceFrontmatter, Case, CaseFrontmatter, Locale } from "@/types"

const ROOT = path.join(process.cwd(), "content")

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
}

// Fallback : si le dossier EN n'existe pas ou est vide, retombe sur FR.
// Évite une page vide pendant qu'on remplit progressivement le contenu EN.
function resolveDir(collection: string, lang: Locale): string {
  const requested = path.join(ROOT, collection, lang)
  if (lang !== "fr" && (!fs.existsSync(requested) || readDir(requested).length === 0)) {
    return path.join(ROOT, collection, "fr")
  }
  return requested
}

export function getAllServices(lang: Locale): Service[] {
  const dir = resolveDir("soins", lang)
  return readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)
    return { ...(data as ServiceFrontmatter), content }
  })
}

export function getService(lang: Locale, slug: string): Service | null {
  // Essaie d'abord la langue demandée, sinon fallback sur FR pour ce slug.
  for (const tryLang of [lang, "fr"] as const) {
    const file = path.join(ROOT, "soins", tryLang, `${slug}.md`)
    if (fs.existsSync(file)) {
      const { data, content } = matter(fs.readFileSync(file, "utf-8"))
      return { ...(data as ServiceFrontmatter), content }
    }
  }
  return null
}

export function getAllCases(lang: Locale): Case[] {
  const dir = resolveDir("cases", lang)
  return readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)
    return { ...(data as CaseFrontmatter), content }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export function getFeaturedCases(lang: Locale, limit = 3): Case[] {
  return getAllCases(lang).filter((c) => c.featured).slice(0, limit)
}
