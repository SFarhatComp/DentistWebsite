import Link from "next/link"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import type { Metadata } from "next"
import type { Locale } from "@/types"

// Page désactivée jusqu'à ce qu'il y ait des cas cliniques réels à présenter.
// Pour réactiver : passer à `true`.
const PORTFOLIO_ENABLED = false

export const metadata: Metadata = {
  title: "Portfolio clinique",
  description:
    "Portfolio clinique De Facto — cas documentés avec consentement, présentés sobrement pour illustrer la méthode De Facto : documentation, compréhension, planification, laboratoire et suivi.",
}

interface Category {
  slug: string
  title: string
  description: string
  image: string
}

const categories: Category[] = [
  {
    slug: "examen-diagnostic",
    title: "Examen et diagnostic",
    description: "Photos, radiographies, scans, modèles et observations cliniques utilisés pour comprendre la situation.",
    image: "examen-diagnostic-de-facto.jpg",
  },
  {
    slug: "planification",
    title: "Planification",
    description: "Plans par phases, wax-up, mock-up, modèles imprimés et logiques de priorisation.",
    image: "planification-de-facto.jpg",
  },
  {
    slug: "restaurations",
    title: "Restaurations",
    description: "Couronnes, facettes, incrustations, restaurations temporaires ou définitives selon l'indication.",
    image: "restaurations-de-facto.jpg",
  },
  {
    slug: "laboratoire",
    title: "Laboratoire",
    description: "Étapes de conception, impression, usinage, pressée et finition au laboratoire intégré.",
    image: "laboratoire-portfolio-de-facto.jpg",
  },
  {
    slug: "prevention-suivi",
    title: "Prévention et suivi",
    description: "Évolution dans le temps, maintien, stabilité, contrôles réguliers.",
    image: "prevention-suivi-de-facto.jpg",
  },
  {
    slug: "cas-educatifs",
    title: "Cas éducatifs",
    description: "Exemples anonymisés pour expliquer des situations cliniques fréquentes.",
    image: "cas-educatifs-de-facto.jpg",
  },
]

export default async function PortfolioCliniquePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  if (!PORTFOLIO_ENABLED) notFound()
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Portfolio clinique"
        title="La méthode De Facto, documentée"
        subtitle="Le portfolio clinique De Facto présente certains cas documentés avec l'autorisation des patients. Son objectif n'est pas de promettre un résultat identique, mais de montrer comment l'examen, les images, les modèles, le laboratoire et la planification peuvent aider à comprendre une situation clinique."
      />

      {/* Catégories */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Catégories</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Le portfolio en six catégories
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Chaque catégorie regroupera des cas sélectionnés au fil du temps, avec consentement explicite et présentation anonymisée.
            </p>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} className="bg-background">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display text-sm text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs uppercase tracking-wider text-muted">À venir</span>
                  </div>
                  <PlaceholderImage aspect="video" label={cat.image} className="mb-5" />
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Mention de confidentialité — encadré sobre */}
      <section className="py-12 md:py-16 bg-surface/40 border-y border-border">
        <Container>
          <FadeIn className="max-w-3xl">
            <div className="border-l-2 border-accent pl-6">
              <SectionLabel>Confidentialité et consentement</SectionLabel>
              <p className="text-base text-foreground leading-relaxed italic">
                Les cas présentés le sont uniquement avec le consentement explicite des patients concernés. Les résultats peuvent varier selon la situation clinique, les objectifs, les matériaux, les habitudes et les conditions de santé de chaque personne.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Méthode De Facto — pillars connection */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Méthode De Facto</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Un outil de compréhension et de transparence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Le portfolio clinique est le prolongement visuel de notre approche : <span className="italic">la clarté pour voir, la justesse pour décider, la continuité pour préserver</span>.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Il n&apos;a pas vocation à être un catalogue commercial d&apos;avant-après. Il sert à montrer comment la documentation et la planification peuvent aider à mieux comprendre une situation.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Comprendre votre propre situation
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Chaque cas est unique. Une évaluation complète est nécessaire pour comprendre votre situation clinique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Demander une première visite
              </Link>
              <Link
                href={`/${lang}/premiere-visite`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Découvrir la première visite
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
