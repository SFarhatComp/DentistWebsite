import type { Metadata } from "next"
import { LaboratoireSection } from "@/components/home/laboratoire-section"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("nav.laboratoire"),
    description: t("home.laboratoireSection.intro"),
  }
}

/**
 * Page Laboratoire.
 *
 * Recadrée à la refonte 2026-09 : le laboratoire est un outil interne, réservé
 * aux cas traités au studio. Aucune mention de service aux dentistes externes,
 * aucun formulaire de prescription, aucune section partenaires — les routes
 * correspondantes ont été retirées et redirigées ici (handoff §2 et §4).
 */
export default async function LaboratoirePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  return <LaboratoireSection lang={lang} />
}
