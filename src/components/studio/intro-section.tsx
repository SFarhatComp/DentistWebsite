import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function IntroSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-3xl">
          <SectionLabel>{t("studio.intro.label")}</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8">
            {t("studio.intro.title")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("studio.intro.body")}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
