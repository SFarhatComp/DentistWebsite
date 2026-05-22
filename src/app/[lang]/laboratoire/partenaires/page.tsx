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
    title: t("laboratoireSubRoutes.partenairesMetaTitle"),
    description: t("laboratoireSubRoutes.partenairesMetaDescription"),
  }
}

export default async function PartenaireDeSoinPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero
        label={t("laboratoireSubRoutes.partenaireHeroLabel")}
        title={t("laboratoireSubRoutes.partenaireHeroTitle")}
        subtitle={t("laboratoireSubRoutes.partenaireHeroSubtitle")}
      />

      <section className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("laboratoireSubRoutes.partenairePremierContactLabel")}</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                {t("laboratoireSubRoutes.partenairePremierContactTitle")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                {t("laboratoireSubRoutes.partenairePremierContactBody")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+15148637805"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  {t("laboratoireSubRoutes.callButton")} — 514 863 7805
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Toggle de formulaires — pré-sélection sur Partenariat */}
      <section id="formulaire" className="py-20 md:py-24 scroll-mt-24">
        <Container>
          <FadeIn className="max-w-2xl mb-8">
            <SectionLabel>{t("professionnelsToggle.formHeading")}</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              {t("professionnelsToggle.chooseTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("professionnelsToggle.partenaireBoxBody")}
            </p>
          </FadeIn>
          <FadeIn>
            <ProfessionnelsToggle lang={lang} defaultActive="partenaire" />
          </FadeIn>
        </Container>
      </section>

      {/* Rencontre */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("laboratoireSubRoutes.rencontreLabel")}</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                {t("laboratoireSubRoutes.rencontreTitle")}
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>{t("laboratoireSubRoutes.rencontreBody1")}</p>
                <p>{t("laboratoireSubRoutes.rencontreBody2")}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Return link */}
      <section className="py-16 border-t border-border">
        <Container>
          <FadeIn>
            <Link
              href={`/${lang}/laboratoire/professionnels`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              {t("laboratoireSubRoutes.returnToProfessionnels")}
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
