import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { Accordion, AccordionItem } from "@/components/shared/accordion"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface QA {
  q: string
  a: string
}

export function FaqSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const colonnes = [
    getTranslationObjectList<QA>(lang, "home.faqSection.colonne1"),
    getTranslationObjectList<QA>(lang, "home.faqSection.colonne2"),
  ]

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <SectionLabel>{t("home.faqSection.label")}</SectionLabel>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
            {t("home.faqSection.title")}
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-x-14 gap-y-0 md:grid-cols-2">
          {colonnes.map((col, ci) => (
            <Accordion key={ci} className="border-b-0">
              {col.map((item) => (
                <AccordionItem key={item.q} question={item.q}>
                  <p className="text-sm leading-[1.6] text-muted-foreground">{item.a}</p>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </Container>
    </section>
  )
}
