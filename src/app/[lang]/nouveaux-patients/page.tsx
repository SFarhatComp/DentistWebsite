import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("nouveauxPatients.label"),
    description: t("nouveauxPatients.metaDescription"),
  }
}

interface AggregatorCard {
  label: string
  titleKey: string
  bodyKey: string
  href: string
  ctaKey: string
}

export default async function NouveauxPatientsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const cards: AggregatorCard[] = [
    {
      label: "01",
      titleKey: "nouveauxPatients.cards.premiereVisite.title",
      bodyKey: "nouveauxPatients.cards.premiereVisite.body",
      ctaKey: "nouveauxPatients.cards.premiereVisite.cta",
      href: `/${lang}/premiere-visite`,
    },
    {
      label: "02",
      titleKey: "nouveauxPatients.cards.documents.title",
      bodyKey: "nouveauxPatients.cards.documents.body",
      ctaKey: "nouveauxPatients.cards.documents.cta",
      href: `/${lang}/premiere-visite#apporter`,
    },
    {
      label: "03",
      titleKey: "nouveauxPatients.cards.assurances.title",
      bodyKey: "nouveauxPatients.cards.assurances.body",
      ctaKey: "nouveauxPatients.cards.assurances.cta",
      href: `/${lang}/assurances-paiements`,
    },
    {
      label: "04",
      titleKey: "nouveauxPatients.cards.urgence.title",
      bodyKey: "nouveauxPatients.cards.urgence.body",
      ctaKey: "nouveauxPatients.cards.urgence.cta",
      href: `/${lang}/urgence`,
    },
    {
      label: "05",
      titleKey: "nouveauxPatients.cards.plan.title",
      bodyKey: "nouveauxPatients.cards.plan.body",
      ctaKey: "nouveauxPatients.cards.plan.cta",
      href: `/${lang}/plan-traitement-visuel`,
    },
    {
      label: "06",
      titleKey: "nouveauxPatients.cards.faq.title",
      bodyKey: "nouveauxPatients.cards.faq.body",
      ctaKey: "nouveauxPatients.cards.faq.cta",
      href: `/${lang}/questions-frequentes`,
    },
    {
      label: "07",
      titleKey: "nouveauxPatients.cards.studio.title",
      bodyKey: "nouveauxPatients.cards.studio.body",
      ctaKey: "nouveauxPatients.cards.studio.cta",
      href: `/${lang}/le-studio`,
    },
    {
      label: "08",
      titleKey: "nouveauxPatients.cards.contact.title",
      bodyKey: "nouveauxPatients.cards.contact.body",
      ctaKey: "nouveauxPatients.cards.contact.cta",
      href: `/${lang}/contact`,
    },
  ]

  return (
    <>
      <PageHero
        label={t("nouveauxPatients.label")}
        title={t("nouveauxPatients.title")}
        subtitle={t("nouveauxPatients.subtitle")}
      />

      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("nouveauxPatients.welcomeLabel")}</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 leading-snug">
                {t("nouveauxPatients.welcomeTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("nouveauxPatients.welcomeBody")}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {cards.map((card) => (
              <FadeIn key={card.titleKey} className="bg-background">
                <Link href={card.href} className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-2xl text-accent/70 tabular-nums">{card.label}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{t(card.titleKey)}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{t(card.bodyKey)}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>{t(card.ctaKey)}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("nouveauxPatients.ctaTitle")}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t("nouveauxPatients.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("nouveauxPatients.ctaPrimary")}
              </Link>
              <a
                href="tel:+15148637805"
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("nouveauxPatients.ctaCall")}
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
