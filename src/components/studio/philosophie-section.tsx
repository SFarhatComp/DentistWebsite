import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function PhilosophieSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-3xl">
          <SectionLabel>{t("studio.philosophie.label")}</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
            {t("studio.philosophie.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("studio.philosophie.body")}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
