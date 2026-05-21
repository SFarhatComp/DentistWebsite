import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { Accordion, AccordionItem } from "@/components/shared/accordion"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

const FAQ_COUNT = 11

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("faq.metaTitle"),
    description: t("faq.metaDescription"),
  }
}

export default function FAQPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const faq = Array.from({ length: FAQ_COUNT }, (_, i) => {
    const n = i + 1
    return { q: t(`faq.q${n}`), a: t(`faq.a${n}`) }
  })

  return (
    <>
      <PageHero
        label={t("faq.label")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <Accordion>
                {faq.map((item) => (
                  <AccordionItem key={item.q} question={item.q}>
                    {item.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("faq.ctaTitle")}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t("faq.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("faq.ctaPrimary")}
              </Link>
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                {t("faq.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
