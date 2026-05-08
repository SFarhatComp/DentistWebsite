import Link from "next/link"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PHASES = ["demande", "examen", "plan", "traitement"] as const

export function ParcoursSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-2xl mb-4">
          <SectionLabel>{t("home.parcours.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">{t("home.parcours.title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("home.parcours.body")}</p>
        </FadeIn>
        <StaggerContainer className="grid gap-8 mt-16 md:grid-cols-4">
          {PHASES.map((p, i) => (
            <StaggerItem key={p}>
              <div className="border-t-2 border-primary pt-6">
                <div className="label-sm text-muted mb-3">Phase {i + 1}</div>
                <h3 className="font-display text-xl mb-3">{t(`home.parcours.${p}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`home.parcours.${p}.body`)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12">
          <Link href={`/${lang}/premiere-visite`} className="inline-flex items-center text-primary hover:underline text-sm">
            {t("home.parcours.cta")} →
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
