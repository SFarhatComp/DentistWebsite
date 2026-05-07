import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function LaboratoireTeaserSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <FadeIn direction="left">
            <PlaceholderImage aspect="square" label="Laboratoire" />
          </FadeIn>
          <FadeIn direction="right">
            <SectionLabel>{t("home.laboratoire.label")}</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">{t("home.laboratoire.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("home.laboratoire.body")}</p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
