export type Locale = 'en' | 'fr'

export interface GalleryImage {
  src: string
  caption: string
  type?: 'before' | 'after' | 'normal'
}

export interface CaseFrontmatter {
  title: string
  slug: string
  date: string
  tags: string[]
  excerpt: string
  featured: boolean
  coverImage: string
  gallery: GalleryImage[]
}

export interface Case extends CaseFrontmatter {
  content: string
  locale: Locale
}

export interface TranslationKeys {
  [key: string]: string | TranslationKeys
}

export interface PageParams {
  lang: Locale
}

export interface CasePageParams extends PageParams {
  slug: string
}
