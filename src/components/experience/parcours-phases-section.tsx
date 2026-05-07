import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PHASES = ["1", "2", "3", "4"] as const

export function ParcoursPhasesSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-2xl mb-20">
          <SectionLabel>{t("experience.parcours.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">{t("experience.parcours.title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("experience.parcours.body")}</p>
        </FadeIn>
        <div className="space-y-24">
          {PHASES.map((p, i) => {
            const isEven = i % 2 === 1
            return (
              <div key={p} className="grid gap-12 md:grid-cols-2 items-center border-t border-border pt-12">
                <FadeIn direction={isEven ? "right" : "left"} className={isEven ? "md:order-2" : ""}>
                  <div className="label-sm text-muted mb-4">Phase 0{i + 1}</div>
                  <h3 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">{t(`experience.phases.${p}.title`)}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{t(`experience.phases.${p}.body`)}</p>
                </FadeIn>
                <FadeIn direction={isEven ? "left" : "right"} className={isEven ? "md:order-1" : ""}>
                  <PlaceholderImage aspect="portrait" />
                </FadeIn>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
