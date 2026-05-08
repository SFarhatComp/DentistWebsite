import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const AXES = ["1", "2", "3", "4", "5", "6"] as const

export function PourquoiSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] items-start">
          <FadeIn className="lg:sticky lg:top-24">
            <SectionLabel>{t("studio.pourquoi.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
              {t("studio.pourquoi.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("studio.pourquoi.body")}
            </p>
          </FadeIn>

          <div className="space-y-1">
            {AXES.map((n, i) => (
              <FadeIn key={n}>
                <div className="grid grid-cols-[3rem_1fr] gap-4 items-baseline border-t border-border py-5">
                  <span className="font-display text-base text-accent/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t(`studio.pourquoi.axes.${n}`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
