import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { UrgenceBanner } from "@/components/home/urgence-banner"
import { PhilosophieSection } from "@/components/home/philosophie-section"
import { StudioSection } from "@/components/home/studio-section"
import { LaboratoireSection } from "@/components/home/laboratoire-section"
import { ParcoursSection } from "@/components/home/parcours-section"
import { SoinsSection } from "@/components/home/soins-section"
import { PraticienSection } from "@/components/home/praticien-section"
import { FaqSection } from "@/components/home/faq-section"
import { ContactSection } from "@/components/home/contact-section"
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
  // L'ordre suit celui des onglets de navigation (handoff §3).
  return (
    <>
      <HeroSection lang={lang} />
      <UrgenceBanner lang={lang} />
      <PhilosophieSection lang={lang} />
      <StudioSection lang={lang} />
      <LaboratoireSection lang={lang} />
      <ParcoursSection lang={lang} />
      <SoinsSection lang={lang} />
      <PraticienSection lang={lang} />
      <FaqSection lang={lang} />
      <ContactSection lang={lang} />
    </>
  )
}
