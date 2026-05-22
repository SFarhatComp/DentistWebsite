import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations, getTranslationList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("premiereVisite.label"),
    description: t("premiereVisite.metaDescription"),
  }
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 text-base text-foreground leading-relaxed">
          <span className="font-display text-sm text-accent/70 tabular-nums shrink-0 pt-1 min-w-[2rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
          <span className="text-accent shrink-0 mt-1">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function PremiereVisitePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const objectifs = getTranslationList(lang, "premiereVisite.objectifs")
  const rdv1Etapes = getTranslationList(lang, "premiereVisite.rdv1Etapes")
  const rdv2Inclus = getTranslationList(lang, "premiereVisite.rdv2Inclus")
  const apporter = getTranslationList(lang, "premiereVisite.apporter")

  return (
    <>
      <PageHero
        label={t("premiereVisite.label")}
        title={t("premiereVisite.title")}
        subtitle={t("premiereVisite.subtitle")}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-3">
            <aside className="md:sticky md:top-24 self-start">
              <div className="label-sm text-muted mb-4">{t("premiereVisite.onThisPage")}</div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li><a href="#objectifs" className="hover:text-primary">{t("premiereVisite.tocObjectifs")}</a></li>
                <li><a href="#duree" className="hover:text-primary">{t("premiereVisite.tocDuree")}</a></li>
                <li><a href="#rdv1" className="hover:text-primary">{t("premiereVisite.tocRdv1")}</a></li>
                <li><a href="#rdv2" className="hover:text-primary">{t("premiereVisite.tocRdv2")}</a></li>
                <li><a href="#apporter" className="hover:text-primary">{t("premiereVisite.tocApporter")}</a></li>
              </ul>
            </aside>

            <div className="md:col-span-2 space-y-20">
              <FadeIn>
                <NumberedSection number={1} id="objectifs" label={t("premiereVisite.tocObjectifs")} title={t("premiereVisite.objectifsTitle")}>
                  <NumberedList items={objectifs} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={2} id="duree" label={t("premiereVisite.dureeLabel")} title={t("premiereVisite.dureeTitle")}>
                  <p className="text-lg text-foreground leading-relaxed">
                    {t("premiereVisite.dureeIntro")} <span className="font-medium">{t("premiereVisite.dureeValue")}</span>
                  </p>
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={3} id="rdv1" label={t("premiereVisite.rdv1Label")} title={t("premiereVisite.rdv1Title")}>
                  <NumberedList items={rdv1Etapes} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={4} id="rdv2" label={t("premiereVisite.rdv2Label")} title={t("premiereVisite.rdv2Title")}>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    {t("premiereVisite.rdv2Intro")}
                  </p>
                  <BulletList items={rdv2Inclus} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={5} id="apporter" label={t("premiereVisite.apporterLabel")} title={t("premiereVisite.apporterTitle")}>
                  <BulletList items={apporter} />
                </NumberedSection>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("premiereVisite.ctaTitle")}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t("premiereVisite.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("premiereVisite.ctaPrimary")}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("premiereVisite.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
