import { HeroSection } from "@/components/home/hero-section"
import { ManifestoSection } from "@/components/home/manifesto-section"
import { DifferenceSection } from "@/components/home/difference-section"
import { PiliersSection } from "@/components/home/piliers-section"
import { ParcoursSection } from "@/components/home/parcours-section"
import { ServicesPreviewSection } from "@/components/home/services-preview-section"
import { LaboratoireTeaserSection } from "@/components/home/laboratoire-teaser-section"
import { CtaSection } from "@/components/home/cta-section"
import { CoordonneesSection } from "@/components/home/coordonnees-section"
import type { Locale } from "@/types"

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <HeroSection lang={lang} />
      <ManifestoSection lang={lang} />
      <DifferenceSection lang={lang} />
      <PiliersSection lang={lang} />
      <ParcoursSection lang={lang} />
      <ServicesPreviewSection lang={lang} />
      <LaboratoireTeaserSection lang={lang} />
      <CtaSection lang={lang} />
      <CoordonneesSection lang={lang} />
    </>
  )
}
