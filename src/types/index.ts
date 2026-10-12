export type Locale = "fr" | "en"

export interface ServiceFrontmatter {
  slug: string
  title: string
  /** Description d une ligne, reprise de la page Services. Toujours presente. */
  shortDescription: string
  /** Surtitre de la fiche, ex. « [ Stade 2 · Couronnes et ponts ] ». */
  surtitre?: string
  /** Paragraphe d ouverture sous le titre. */
  intro?: string
  heroImage?: string
  /** Variantes du soin presentees en tete, avec icone. */
  variantes?: { nom: string; desc: string }[]
  /*
   * Sections cliniques : toutes optionnelles. Une fiche dont le contenu n a pas
   * encore ete redige n affiche que son en-tete et son appel a l action, plutot
   * qu une section vide.
   */
  whenToConsult?: string[]
  bonASavoir?: string
  treatmentSteps?: string[]
  options?: string[]
  limits?: string
  aftercare?: string
  faq?: { question: string; answer: string }[]
  related?: string[]
  /** Contenu redige automatiquement, en attente de relecture du dentiste. */
  aRelire?: boolean
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
