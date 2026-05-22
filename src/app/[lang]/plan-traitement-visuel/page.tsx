import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { DocumentList } from "@/components/shared/document-list"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations, getTranslationList, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("planTraitement.metaTitle"),
    description: t("planTraitement.metaDescription"),
  }
}

type Phase = { num: string; title: string; body: string }

export default async function PlanTraitementVisuelPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const peutEtrePresente = getTranslationList(lang, "planTraitement.peutEtrePresente")
  const phases = getTranslationObjectList<Phase>(lang, "planTraitement.phases")
  const idealAlternatives = getTranslationList(lang, "planTraitement.idealAlternatives")
  const documentsRemis = getTranslationList(lang, "planTraitement.documentsRemis")

  return (
    <>
      <PageHero
        label={t("planTraitement.label")}
        title={t("planTraitement.title")}
        subtitle={t("planTraitement.subtitle")}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label={t("planTraitement.pourquoiLabel")} title={t("planTraitement.pourquoiTitle")}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("planTraitement.pourquoiBody")}
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={2} label={t("planTraitement.contenuLabel")} title={t("planTraitement.contenuTitle")}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {peutEtrePresente.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label={t("planTraitement.phasesLabel")} title={t("planTraitement.phasesTitle")}>
                <div className="space-y-6">
                  {phases.map((p, i) => (
                    <div key={p.num} className="border-t border-border pt-5 first:border-t-0 first:pt-0 grid sm:grid-cols-[8rem_1fr] gap-3 sm:gap-6">
                      <div>
                        <div className="font-display text-sm text-accent/80 tabular-nums">0{i + 1}</div>
                        <div className="font-display text-base text-foreground">{p.num}</div>
                      </div>
                      <div>
                        <div className="font-display text-xl text-foreground mb-2">{p.title}</div>
                        <p className="text-base text-muted-foreground leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label={t("planTraitement.choixLabel")} title={t("planTraitement.choixTitle")}>
                <ul className="space-y-3">
                  {idealAlternatives.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label={t("planTraitement.remisLabel")} title={t("planTraitement.remisTitle")}>
                <div className="bg-surface/60 border border-border p-8 md:p-10">
                  <p className="text-base text-muted-foreground leading-relaxed mb-8 italic">
                    {t("planTraitement.remisIntro")}
                  </p>
                  <DocumentList items={documentsRemis} />
                </div>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("planTraitement.ctaTitle")}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t("planTraitement.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("planTraitement.ctaPrimary")}
              </Link>
              <Link
                href={`/${lang}/le-studio`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("planTraitement.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
