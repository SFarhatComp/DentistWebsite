import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PILIER_KEYS = ["diagnostic", "priorisation", "prevention", "precision"] as const

export function PiliersSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("home.piliers.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">{t("home.piliers.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {PILIER_KEYS.map((key, i) => (
            <StaggerItem key={key} className="bg-background p-8 md:p-10">
              <div className="font-display text-3xl text-accent/40 mb-6">0{i + 1}</div>
              <h3 className="font-display text-2xl mb-4">{t(`home.piliers.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`home.piliers.${key}.body`)}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
