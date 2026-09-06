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
    title: t("assurances.metaTitle"),
    description: t("assurances.metaDescription"),
  }
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

export default async function AssurancesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const estimations = getTranslationList(lang, "assurances.estimations")
  const privee = getTranslationList(lang, "assurances.privee")
  const paiement = getTranslationList(lang, "assurances.paiement")
  const preauth = getTranslationList(lang, "assurances.preauth")
  const politiqueRdv = getTranslationList(lang, "assurances.politiqueRdv")

  return (
    <>
      <PageHero
        label={t("assurances.label")}
        title={t("assurances.title")}
        subtitle={t("assurances.subtitle")}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label={t("assurances.roleLabel")} title={t("assurances.roleTitle")}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("assurances.roleBody")}
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={2} label={t("assurances.estimationsLabel")} title={t("assurances.estimationsTitle")}>
                <BulletList items={estimations} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label={t("assurances.priveeLabel")} title={t("assurances.priveeTitle")}>
                <BulletList items={privee} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label={t("assurances.rcsdLabel")} title={t("assurances.rcsdTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  {t("assurances.rcsdBody1")}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("assurances.rcsdBody2")}
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label={t("assurances.ramqLabel")} title={t("assurances.ramqTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("assurances.ramqBody")}
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={6} label={t("assurances.paiementLabel")} title={t("assurances.paiementTitle")}>
                <BulletList items={paiement} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={7} label={t("assurances.financementLabel")} title={t("assurances.financementTitle")}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("assurances.financementBody")}
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={8} label={t("assurances.preauthLabel")} title={t("assurances.preauthTitle")}>
                <BulletList items={preauth} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={9} label={t("assurances.politiqueRdvLabel")} title={t("assurances.politiqueRdvTitle")}>
                <BulletList items={politiqueRdv} />
                <p className="mt-6 text-base text-muted-foreground leading-relaxed italic">
                  {t("assurances.politiqueRdvNote")}
                </p>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("assurances.ctaTitle")}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t("assurances.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("assurances.ctaPrimary")}
              </Link>
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("assurances.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
