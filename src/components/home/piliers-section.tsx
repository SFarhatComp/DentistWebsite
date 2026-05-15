import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PILIER_KEYS = ["temps", "clarte", "justesse", "continuite"] as const

export function PiliersSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("home.piliers.label")}</SectionLabel>
          <h2 className="font-display text-2xl md:text-3xl leading-snug text-foreground">
            {t("home.piliers.title")}
          </h2>
        </FadeIn>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {PILIER_KEYS.map((key, i) => (
            <StaggerItem key={key} className="bg-background p-8 md:p-10">
              <div className="font-display text-sm text-accent/60 tabular-nums mb-6">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                {t(`home.piliers.${key}.title`)}
              </h3>
              <p className="font-display italic text-base text-primary mb-4 leading-snug">
                {t(`home.piliers.${key}.phrase`)}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`home.piliers.${key}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
