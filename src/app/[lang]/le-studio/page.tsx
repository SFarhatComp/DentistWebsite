import { IntroSection } from "@/components/studio/intro-section"
import { PourquoiSection } from "@/components/studio/pourquoi-section"
import { PhilosophieSection } from "@/components/studio/philosophie-section"
import { EspaceSection } from "@/components/studio/espace-section"
import { EquipementSection } from "@/components/studio/equipement-section"
import { EngagementSection } from "@/components/studio/engagement-section"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Le Studio",
  description:
    "Studio Dentaire De Facto à Ahuntsic — pourquoi nous existons, notre approche clinique, l'espace, la technologie et nos engagements qualité.",
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
