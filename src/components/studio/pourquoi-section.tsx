import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function PourquoiSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <SectionLabel>{t("studio.pourquoi.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
              {t("studio.pourquoi.title")}
            </h2>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              {t("studio.pourquoi.body")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
