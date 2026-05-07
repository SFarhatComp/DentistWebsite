import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const ITEMS = ["1", "2", "3", "4", "5", "6"] as const

export function EngagementSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <div className="label-sm text-accent mb-4">{t("studio.engagement.label")}</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">{t("studio.engagement.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-x-12 gap-y-6 md:grid-cols-2 max-w-4xl">
          {ITEMS.map((k, i) => (
            <StaggerItem key={k} className="flex items-baseline gap-4 border-t border-primary-foreground/20 pt-5">
              <span className="font-display text-sm opacity-50">0{i + 1}</span>
              <span className="text-lg leading-relaxed">{t(`studio.engagement.${k}`)}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
