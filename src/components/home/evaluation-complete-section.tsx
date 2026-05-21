import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function EvaluationCompleteSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-3xl">
          <SectionLabel>{t("home.evaluationSection.label")}</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
            {t("home.evaluationSection.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            {t("home.evaluationSection.body")}
          </p>
          <Link
            href={`/${lang}/rendez-vous`}
            className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
          >
            {t("home.evaluationSection.cta")}
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
