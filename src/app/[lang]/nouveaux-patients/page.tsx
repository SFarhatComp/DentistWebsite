import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Nouveaux patients",
  description:
    "Tout ce qu'il faut savoir avant votre première visite chez Studio Dentaire De Facto : préparation, documents, assurances, urgences et prochaines étapes.",
}

interface AggregatorCard {
  label: string
  title: string
  body: string
  href: string
  cta: string
}

export default function NouveauxPatientsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale

  const cards: AggregatorCard[] = [
    {
      label: "01",
      title: "Première visite",
      body: "Découvrez ce qui est inclus, la durée approximative, les documents à apporter et ce que vous recevrez après l'examen.",
      href: `/${lang}/premiere-visite`,
      cta: "Voir le déroulement",
    },
    {
      label: "02",
      title: "Documents à préparer",
      body: "Carte d'assurance maladie, informations d'assurance dentaire, liste de médicaments, radiographies récentes et appareils dentaires si applicable.",
      href: `/${lang}/premiere-visite#apporter`,
      cta: "Voir la liste complète",
    },
    {
      label: "03",
      title: "Assurances et paiements",
      body: "Comprendre comment fonctionnent les estimations, la transmission aux assureurs, le RCSD, la RAMQ et la responsabilité du patient.",
      href: `/${lang}/assurances-paiements`,
      cta: "Modalités administratives",
    },
    {
      label: "04",
      title: "Urgence ou rendez-vous régulier ?",
      body: "Pour une douleur, une enflure ou un traumatisme, suivez le parcours d'urgence. Pour une première rencontre, demandez un rendez-vous régulier.",
      href: `/${lang}/urgence`,
      cta: "Voir les urgences",
    },
    {
      label: "05",
      title: "Plan de traitement",
      body: "Pour les cas complexes, un rendez-vous dédié peut être organisé pour présenter le plan avec photos, scans, modèles et documents.",
      href: `/${lang}/plan-traitement-visuel`,
      cta: "Comprendre la présentation",
    },
    {
      label: "06",
      title: "Questions fréquentes",
      body: "Réponses aux questions les plus courantes sur l'examen, les enfants, les aligneurs, les références aux spécialistes et plus.",
      href: `/${lang}/questions-frequentes`,
      cta: "Lire la FAQ",
    },
    {
      label: "07",
      title: "Le Studio",
      body: "Notre approche, notre philosophie clinique et la raison d'être de De Facto.",
      href: `/${lang}/le-studio`,
      cta: "Découvrir le studio",
    },
    {
      label: "08",
      title: "Contact et accès",
      body: "Adresse, téléphone, courriel, transit, stationnement et accessibilité.",
      href: `/${lang}/contact`,
      cta: "Coordonnées",
    },
  ]

  return (
    <>
      <PageHero
        label="Nouveaux patients"
        title="Nouveaux patients"
        subtitle="Tout ce qu'il faut savoir avant votre première visite chez Studio Dentaire De Facto."
      />

      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <FadeIn>
              <SectionLabel>Bienvenue</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 leading-snug">
                Bienvenue chez De Facto
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Si c&apos;est votre première visite, voici un parcours d&apos;orientation pour préparer votre rendez-vous, comprendre ce qui vous attend et savoir où trouver l&apos;information dont vous avez besoin. Notre équipe reste joignable pour toute question avant, pendant ou après votre visite.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {cards.map((card) => (
              <FadeIn key={card.title} className="bg-background">
                <Link href={card.href} className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-2xl text-accent/70 tabular-nums">{card.label}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{card.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{card.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>{card.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Prêt pour votre première visite ?
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Notre équipe vous contactera pour préparer votre dossier et confirmer les prochaines étapes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Demander une première visite
              </Link>
              <a
                href="tel:+15148637805"
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Nous appeler — 514 863 7805
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
