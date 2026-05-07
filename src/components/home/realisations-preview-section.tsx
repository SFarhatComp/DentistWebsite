import Link from "next/link"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function RealisationsPreviewSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("home.realisations.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">{t("home.realisations.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <StaggerItem key={i}>
              <PlaceholderImage aspect="portrait" />
              <div className="mt-4">
                <div className="label-sm text-muted mb-2">{t(`home.realisations.case${i}.tag`)}</div>
                <h3 className="font-display text-xl">{t(`home.realisations.case${i}.title`)}</h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12">
          <Link href={`/${lang}/realisations`} className="text-primary hover:underline text-sm">{t("home.realisations.cta")} →</Link>
        </FadeIn>
      </Container>
    </section>
  )
}
