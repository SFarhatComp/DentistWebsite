import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { ProfessionnelsToggle } from "@/components/forms/professionnels-toggle"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("laboratoireSubRoutes.professionnelsMetaTitle"),
    description: t("laboratoireSubRoutes.professionnelsMetaDescription"),
  }
}

type EngagementItem = { title: string; body: string }

export default function ProfessionnelsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const engagement = getTranslationObjectList<EngagementItem>(lang, "professionnelsPage.engagementItems")

  return (
    <>
      <PageHero
        label={t("professionnelsPage.heroLabel")}
        title={t("professionnelsPage.heroTitle")}
        subtitle={t("professionnelsPage.heroSubtitle")}
      />

      {/* Toggle bascule — sélection inline du formulaire */}
      <section className="py-12 md:py-16 border-b border-border">
        <Container>
          <FadeIn className="mb-8">
            <SectionLabel>{t("professionnelsPage.toggleSectionLabel")}</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              {t("professionnelsPage.toggleSectionTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {t("professionnelsPage.toggleSectionBody")}
            </p>
          </FadeIn>
          <FadeIn>
            <ProfessionnelsToggle lang={lang} />
          </FadeIn>
        </Container>
      </section>

      {/* Premier contact */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("professionnelsPage.premierContactLabel")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                {t("professionnelsPage.premierContactTitle")}
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>{t("professionnelsPage.premierContactBody1")}</p>
                <p>{t("professionnelsPage.premierContactBody2")}</p>
              </div>
              <div className="mt-10">
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

      {/* Rencontre */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("professionnelsPage.rencontreLabel")}</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                {t("professionnelsPage.rencontreTitle")}
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>{t("professionnelsPage.rencontreBody1")}</p>
                <p>{t("professionnelsPage.rencontreBody2")}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Notre engagement envers les professionnels — 4 piliers */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>{t("professionnelsPage.engagementLabel")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              {t("professionnelsPage.engagementTitle")}
            </h2>
          </FadeIn>
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {engagement.map((p, i) => (
              <FadeIn key={p.title} className="bg-background">
                <div className="p-8 md:p-10 h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-sm text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl">{p.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Return link */}
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
