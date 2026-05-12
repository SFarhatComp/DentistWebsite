import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function EngagementSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <Container>
        <FadeIn className="max-w-3xl">
          <div className="label-sm text-accent mb-4">{t("studio.engagement.label")}</div>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
            {t("studio.engagement.title")}
          </h2>
          <p className="text-lg opacity-85 leading-relaxed">
            {t("studio.engagement.body")}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
