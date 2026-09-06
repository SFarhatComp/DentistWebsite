import type { Metadata } from "next"
import { ParcoursSection } from "@/components/home/parcours-section"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("nav.parcours"),
    description: t("home.parcoursSection.metaDescription"),
  }
}

/**
 * Page Parcours.
 *
 * Elle partage la section — et donc le diagramme — avec l'accueil : une seule
 * source pour un contenu qui doit rester identique aux deux endroits.
 *
 * La page dédiée ajoute les checkpoints et la présentation des options, repris
 * du document *Parcours [de facto]* en version courte. Les quatre parcours-types
 * n'y sont pas : ils rallongeraient la page sans rien apporter qu'un patient
 * cherche à cet endroit.
 */
export default async function ParcoursPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  return <ParcoursSection lang={lang} detaille />
}
