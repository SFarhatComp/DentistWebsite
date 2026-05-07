import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PHILO_KEYS = ["1", "2", "3", "4", "5"] as const

export function PhilosophieSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("studio.philosophie.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">
            {t("studio.philosophie.title")}
          </h2>
        </FadeIn>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2">
          {PHILO_KEYS.map((key, i) => (
            <StaggerItem key={key} className="bg-background p-8 md:p-10">
              <div className="font-display text-3xl text-accent/40 mb-6">0{i + 1}</div>
              <h3 className="font-display text-2xl mb-4">
                {t(`studio.philosophie.${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`studio.philosophie.${key}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
