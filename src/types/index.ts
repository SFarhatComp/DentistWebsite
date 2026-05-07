export type Locale = "fr" | "en"

export interface ServiceFrontmatter {
  slug: string
  title: string
  shortDescription: string
  heroImage?: string
  whenToConsult: string[]
  treatmentSteps: string[]
  options: string[]
  limits: string
  aftercare: string
  faq: { question: string; answer: string }[]
  related: string[]
}

export interface CaseFrontmatter {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  featured: boolean
  coverImage?: string
  treatmentType: string
  initialProblem: string
  objective: string
  appointmentCount?: number
  gallery: { src: string; caption: string; type?: "before" | "after" | "normal" }[]
  legalDisclaimer: string
}

export interface Case extends CaseFrontmatter { content: string }
export interface Service extends ServiceFrontmatter { content: string }
