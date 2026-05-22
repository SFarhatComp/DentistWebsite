import { IntroSection } from "@/components/studio/intro-section"
import { PourquoiSection } from "@/components/studio/pourquoi-section"
import { PhilosophieSection } from "@/components/studio/philosophie-section"
import { EspaceSection } from "@/components/studio/espace-section"
import { EquipementSection } from "@/components/studio/equipement-section"
import { EngagementSection } from "@/components/studio/engagement-section"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("studio.intro.label"),
    description: t("studio.metaDescription"),
  }
}

export default async function StudioPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
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
