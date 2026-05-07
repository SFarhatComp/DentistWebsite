import { IntroSection } from "@/components/studio/intro-section"
import { PhilosophieSection } from "@/components/studio/philosophie-section"
import { EspaceSection } from "@/components/studio/espace-section"
import { EquipementSection } from "@/components/studio/equipement-section"
import { EngagementSection } from "@/components/studio/engagement-section"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Le Studio",
  description: "Un studio dentaire pensé comme un lieu de soin, de précision et de confiance.",
}

export default function StudioPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <IntroSection lang={lang} />
      <PhilosophieSection lang={lang} />
      <EspaceSection lang={lang} />
      <EquipementSection lang={lang} />
      <EngagementSection lang={lang} />
    </>
  )
}
