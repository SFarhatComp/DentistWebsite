import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Locale } from "@/types"

export function EvaluationCompleteSection({ lang }: { lang: Locale }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-3xl">
          <SectionLabel>Première étape</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
            Commencer par une évaluation complète
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            La première étape est de comprendre votre situation. Chez De Facto, la première visite permet de documenter, expliquer et planifier les soins avant de prendre des décisions importantes.
          </p>
          <Link
            href={`/${lang}/rendez-vous`}
            className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
          >
            Demander une première visite
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
