import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Centre de ressources pour les patients de Studio Dentaire De Facto : première visite, assurances, confidentialité, questions fréquentes et articles éducatifs.",
}

interface HubLink {
  title: string
  body: string
  href: string
}

const articlesAVenir = [
  "Pourquoi faire un examen complet ?",
  "Comment fonctionne un plan de traitement par phases ?",
  "Quand une radiographie est-elle nécessaire ?",
  "Pourquoi une dent peut nécessiter une couronne ?",
  "Que faire en cas d'urgence dentaire ?",
  "Comment comprendre une estimation d'assurance ?",
  "Qu'est-ce qu'un traitement conservateur ?",
  "Pourquoi stabiliser les gencives avant certains traitements ?",
]

export default function RessourcesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale

  const essentielles: HubLink[] = [
    {
      title: "Première visite",
      body: "Déroulement, durée, documents à apporter et ce que vous recevez après l'examen.",
      href: `/${lang}/premiere-visite`,
    },
    {
      title: "Plan de traitement",
      body: "Comment un plan structuré est présenté pour les cas qui le justifient.",
      href: `/${lang}/plan-traitement-visuel`,
    },
    {
      title: "Assurances et paiements",
      body: "Estimations, transmission aux assureurs, RCSD, RAMQ et politique de rendez-vous.",
      href: `/${lang}/assurances-paiements`,
    },
    {
      title: "Questions fréquentes",
      body: "Réponses aux interrogations les plus courantes des nouveaux patients.",
      href: `/${lang}/questions-frequentes`,
    },
    {
      title: "Confidentialité",
      body: "Comment vos renseignements personnels et de santé sont recueillis, utilisés et protégés.",
      href: `/${lang}/confidentialite`,
    },
    {
      title: "Urgence dentaire",
      body: "Quoi faire en cas de douleur, traumatisme ou enflure.",
      href: `/${lang}/urgence`,
    },
  ]

  return (
    <>
      <PageHero
        label="Ressources"
        title="Ressources patients"
        subtitle="Documentation, parcours d'orientation et articles éducatifs pour vous aider à mieux comprendre votre santé buccodentaire et nos manières de procéder."
      />

      <section className="py-20 md:py-24">
        <Container>
          <FadeIn>
            <SectionLabel>Pages essentielles</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl">
              Pour préparer votre visite et comprendre votre dossier
            </h2>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {essentielles.map((link, i) => (
              <FadeIn key={link.title} className="bg-background">
                <Link href={link.href} className="block p-8 hover:bg-surface/40 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-xl text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{link.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{link.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>Lire</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24 border-t border-border bg-surface/40">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>À venir</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl mb-6">Articles éducatifs</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Nous préparons une série d&apos;articles courts pour répondre aux questions cliniques les plus fréquentes. Ils paraîtront ici progressivement.
              </p>
            </FadeIn>

            <FadeIn>
              <ul className="space-y-3">
                {articlesAVenir.map((titre, i) => (
                  <li
                    key={titre}
                    className="border-t border-border pt-4 first:border-t-0 first:pt-0 flex gap-4 items-baseline text-base text-muted-foreground"
                  >
                    <span className="font-display text-sm text-accent/60 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{titre}</span>
                    <span className="text-xs uppercase tracking-wider text-muted shrink-0">À venir</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
