import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const KEYS = ["1", "2", "3", "4", "5", "6"] as const

export function DifferenceSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("experience.difference.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">{t("experience.difference.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((k) => (
            <StaggerItem key={k} className="bg-background p-8 md:p-10">
              <h3 className="font-display text-xl mb-3">{t(`experience.difference.${k}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`experience.difference.${k}.body`)}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
