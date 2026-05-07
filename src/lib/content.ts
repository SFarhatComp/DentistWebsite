import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Case, CaseFrontmatter, Locale } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content')

/**
 * Get all cases for a specific locale
 */
export function getAllCases(locale: Locale): Case[] {
  const casesDirectory = path.join(contentDirectory, 'cases', locale)
  
  // Check if directory exists
  if (!fs.existsSync(casesDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(casesDirectory)
  
  const cases = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getCaseBySlug(slug, locale)
    })
    .filter((caseItem): caseItem is Case => caseItem !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return cases
}

/**
 * Get a single case by slug and locale
 */
export function getCaseBySlug(slug: string, locale: Locale): Case | null {
  const casesDirectory = path.join(contentDirectory, 'cases', locale)
  const fullPath = path.join(casesDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const frontmatter = data as CaseFrontmatter
  
  return {
    ...frontmatter,
    slug,
    content,
    locale,
  }
}

/**
 * Get featured cases for a locale
 */
export function getFeaturedCases(locale: Locale, limit = 3): Case[] {
  const allCases = getAllCases(locale)
  return allCases.filter((c) => c.featured).slice(0, limit)
}

/**
 * Get all unique tags from cases
 */
export function getAllTags(locale: Locale): string[] {
  const allCases = getAllCases(locale)
  const tags = new Set<string>()
  
  allCases.forEach((c) => {
    c.tags?.forEach((tag) => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

/**
 * Get cases by tag
 */
export function getCasesByTag(tag: string, locale: Locale): Case[] {
  const allCases = getAllCases(locale)
  return allCases.filter((c) => c.tags?.includes(tag))
}

/**
 * Get all case slugs for static generation
 */
export function getAllCaseSlugs(): { lang: Locale; slug: string }[] {
  const slugs: { lang: Locale; slug: string }[] = []
  const locales: Locale[] = ['en', 'fr']
  
  locales.forEach((locale) => {
    const cases = getAllCases(locale)
    cases.forEach((c) => {
      slugs.push({ lang: locale, slug: c.slug })
    })
  })
  
  return slugs
}

/**
 * Simple markdown to HTML converter
 * Handles basic markdown syntax
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
  
  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')
  
  // Unordered lists
  html = html.replace(/^\s*-\s+(.*)$/gim, '<li class="ml-4">$1</li>')
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside my-4 space-y-2">$&</ul>')
  
  // Paragraphs (wrap remaining lines)
  html = html
    .split('\n\n')
    .map((block) => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('<')) return block
      return `<p class="my-4 leading-relaxed text-muted-foreground">${block}</p>`
    })
    .join('\n')
  
  return html
}
