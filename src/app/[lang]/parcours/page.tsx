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
 * Reste à ajouter (handoff §11) : les checkpoints, les quatre parcours-types,
 * la présentation des options A/B/C et du statu quo, et la bibliographie R1–R12
 * du document *Parcours de facto*. Ce contenu n'est pas encore maquetté.
 */
export default async function ParcoursPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  return <ParcoursSection lang={lang} />
}
