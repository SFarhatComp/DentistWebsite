import { notFound } from "next/navigation"
import { i18n } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

/* --------------------------------------------------------------------------
 * Gabarit de langue.
 *
 * Il ne porte plus l'en-tête ni le pied de page : ceux-ci sont descendus dans
 * le groupe (site), pour que la page d'annonce « nouveau patient » puisse s'en
 * passer. Une page d'annonce n'offre qu'une seule voie — réserver — et la
 * maquette lui donne un en-tête réduit, sans menu.
 *
 * Ne restent ici que les choses vraies pour toutes les pages d'une langue :
 * la liste des langues, le titre par défaut, et le refus d'une langue inconnue.
 * ----------------------------------------------------------------------- */

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

// Surcharge le title template root pour utiliser le nom localisé du site.
export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  const siteName = t("site.name")
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    // Next remplace le champ « alternates » du gabarit racine au lieu de le
    // completer : les langues doivent donc etre redeclarees ici, sinon les
    // balises hreflang disparaissent de toutes les pages.
    alternates: {
      // Canonique relative : Next la resout contre l'adresse de la page en
      // cours. Sans elle, /fr et /fr/ — ou une adresse suivie de parametres —
      // passent pour deux pages, et Google repartit les signaux entre elles.
      canonical: "./",
      // « x-default » dit quelle version servir a qui n'est ni francophone ni
      // anglophone declare ; sans elle, Google choisit au hasard.
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
  }
}

export default async function LangLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params
  if (!i18n.locales.includes(params.lang as Locale)) notFound()
  return props.children
}
