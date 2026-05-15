import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { ManifestoSection } from "@/components/home/manifesto-section"
import { PiliersSection } from "@/components/home/piliers-section"
import { EvaluationCompleteSection } from "@/components/home/evaluation-complete-section"
import { PortfolioPreviewSection } from "@/components/home/portfolio-preview-section"
import { StudioPreviewSection } from "@/components/home/studio-preview-section"
import { CoordonneesSection } from "@/components/home/coordonnees-section"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: { absolute: "Studio Dentaire De Facto — Dentiste Ahuntsic, Montréal" },
  description:
    "Studio dentaire à Ahuntsic, Montréal. Une approche fondée sur le temps, la clarté, la justesse et la continuité. Comprendre avant d'intervenir.",
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <HeroSection lang={lang} />
      <ManifestoSection lang={lang} />
      <PiliersSection lang={lang} />
      <EvaluationCompleteSection lang={lang} />
      <PortfolioPreviewSection lang={lang} />
      <StudioPreviewSection lang={lang} />
      <CoordonneesSection lang={lang} />
    </>
  )
}
