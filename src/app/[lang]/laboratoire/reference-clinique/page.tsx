import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { ProfessionnelsToggle } from "@/components/forms/professionnels-toggle"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("laboratoireSubRoutes.referenceMetaTitle"),
    description: t("laboratoireSubRoutes.referenceMetaDescription"),
  }
}

export default async function ReferenceCliniquePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero
        label={t("laboratoireSubRoutes.referenceHeroLabel")}
        title={t("laboratoireSubRoutes.referenceHeroTitle")}
        subtitle={t("laboratoireSubRoutes.referenceHeroSubtitle")}
      />

      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-8">
            <SectionLabel>{t("professionnelsToggle.formHeading")}</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              {t("professionnelsToggle.chooseTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("professionnelsToggle.referenceBoxBody")}
            </p>
          </FadeIn>
          <FadeIn>
            <ProfessionnelsToggle lang={lang} defaultActive="reference" />
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <FadeIn>
            <Link
              href={`/${lang}/laboratoire`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              {t("laboratoireSubRoutes.backToLab")}
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
