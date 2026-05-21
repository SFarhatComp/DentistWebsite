import { IntroSection } from "@/components/studio/intro-section"
import { PourquoiSection } from "@/components/studio/pourquoi-section"
import { PhilosophieSection } from "@/components/studio/philosophie-section"
import { EspaceSection } from "@/components/studio/espace-section"
import { EquipementSection } from "@/components/studio/equipement-section"
import { EngagementSection } from "@/components/studio/engagement-section"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("studio.intro.label"),
    description: t("studio.metaDescription"),
  }
}

export default function StudioPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <IntroSection lang={lang} />
      <PourquoiSection lang={lang} />
      <PhilosophieSection lang={lang} />
      <EspaceSection lang={lang} />
      <EquipementSection lang={lang} />
      <EngagementSection lang={lang} />
    </>
  )
}
