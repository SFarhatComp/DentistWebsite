import type { Metadata } from "next"
import { HeroAccueil } from "@/components/v2/hero-accueil"
import { EspacesSection } from "@/components/v2/espaces-section"
import { CarteSoinsSection } from "@/components/v2/carte-soins-section"
import { BandeUrgence } from "@/components/v2/bande-urgence"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return {
    title: { absolute: t("accueil.metaTitre") },
    description: t("accueil.metaDescription"),
  }
}

/**
 * Accueil — trois sections seulement, comme le prévoit la maquette : le plan
 * d'ouverture, les trois espaces, la carte des soins. La bande urgence ferme
 * la page avant le pied de page.
 */
export default async function AccueilPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  return (
    <>
      <HeroAccueil lang={lang} />
      <EspacesSection lang={lang} />
      <CarteSoinsSection lang={lang} />
      <BandeUrgence lang={lang} />
    </>
  )
}
