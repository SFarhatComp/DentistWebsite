import { PageHero } from "@/components/shared/page-hero"
import { ParcoursPhasesSection } from "@/components/experience/parcours-phases-section"
import { DifferenceSection } from "@/components/experience/difference-section"
import { CtaSection } from "@/components/home/cta-section"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = { title: "Expérience patient" }

export default function ExperiencePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero label={t("experience.label")} title={t("experience.heroTitle")} subtitle={t("experience.heroSubtitle")} />
      <ParcoursPhasesSection lang={lang} />
      <DifferenceSection lang={lang} />
      <CtaSection lang={lang} />
    </>
  )
}
