import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import Link from "next/link"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Première visite | Studio Dentaire De Facto à Ahuntsic",
  description:
    "Découvrez comment se déroule une première visite chez Studio Dentaire De Facto : examen complet, documentation clinique, radiographies selon indication et planification claire des soins.",
}

export default function PremiereVisitePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Première visite"
        title="Une première visite pour comprendre votre situation, pas seulement regarder une dent."
        subtitle="La première visite chez De Facto est conçue pour établir une compréhension claire de votre santé buccodentaire."
      />
      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-2xl space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cette page est en cours de finalisation. Le contenu détaillé — déroulement, durée, documents à apporter, ce que vous recevrez après l&apos;examen — sera disponible prochainement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                Demander une première visite
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                Poser une question à l&apos;équipe
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
