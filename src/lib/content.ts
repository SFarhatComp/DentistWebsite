import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Service, ServiceFrontmatter, Case, CaseFrontmatter, Locale } from "@/types"

const ROOT = path.join(process.cwd(), "content")

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
}

export function getAllServices(lang: Locale): Service[] {
  const dir = path.join(ROOT, "soins", lang)
  return readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)
    return { ...(data as ServiceFrontmatter), content }
  })
}

export function getService(lang: Locale, slug: string): Service | null {
  const file = path.join(ROOT, "soins", lang, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf-8"))
  return { ...(data as ServiceFrontmatter), content }
}

export function getAllCases(lang: Locale): Case[] {
  const dir = path.join(ROOT, "cases", lang)
  return readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)
    return { ...(data as CaseFrontmatter), content }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export function getFeaturedCases(lang: Locale, limit = 3): Case[] {
  return getAllCases(lang).filter((c) => c.featured).slice(0, limit)
}
