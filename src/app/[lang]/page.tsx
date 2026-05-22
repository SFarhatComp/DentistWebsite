import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { ManifestoSection } from "@/components/home/manifesto-section"
import { PiliersSection } from "@/components/home/piliers-section"
import { EvaluationCompleteSection } from "@/components/home/evaluation-complete-section"
import { StudioPreviewSection } from "@/components/home/studio-preview-section"
import { CoordonneesSection } from "@/components/home/coordonnees-section"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: { absolute: t("home.metaTitle") },
    description: t("home.metaDescription"),
  }
}

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  return (
    <>
      <HeroSection lang={lang} />
      <ManifestoSection lang={lang} />
      <PiliersSection lang={lang} />
      <EvaluationCompleteSection lang={lang} />
      <StudioPreviewSection lang={lang} />
      <CoordonneesSection lang={lang} />
    </>
  )
}
