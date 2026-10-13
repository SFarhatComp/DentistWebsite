import type { Metadata } from "next"
import type { Locale } from "@/types"

/* --------------------------------------------------------------------------
 * Metadonnees d'une page, pour les moteurs de recherche.
 *
 * Trois choses doivent etre exactes, et chacune se trompe facilement :
 *
 *  - la canonique designe l'adresse de reference de CETTE page. Sans elle,
 *    /fr/contact, /fr/contact/ et /fr/contact?x=1 passent pour trois pages, et
 *    Google repartit entre elles les signaux qui devraient aller a une seule.
 *
 *  - les hreflang doivent pointer sur la TRADUCTION de cette page, pas sur
 *    l'accueil de l'autre langue. Declarer /en comme version anglaise de
 *    /fr/contact dit a Google que ces deux pages disent la meme chose, ce qui
 *    est faux, et il cesse d'y croire.
 *
 *  - og:url doit etre l'adresse de la page. Fixee sur l'accueil, tout partage
 *    d'une page interieure s'affiche comme un partage de l'accueil.
 *
 * On passe donc le chemin sans la langue — "" pour l'accueil, "/contact" pour
 * la page contact — et le reste se deduit.
 * ----------------------------------------------------------------------- */
export function metaPage(
  lang: Locale,
  chemin: string,
  champs: { titre: string; description?: string; image?: string; indexable?: boolean }
): Metadata {
  const ici = `/${lang}${chemin}`
  return {
    title: { absolute: champs.titre },
    description: champs.description,
    alternates: {
      canonical: ici,
      languages: {
        fr: `/fr${chemin}`,
        en: `/en${chemin}`,
        // Qui n'est ni francophone ni anglophone declare arrive au francais.
        "x-default": `/fr${chemin}`,
      },
    },
    openGraph: {
      type: "website",
      url: ici,
      title: champs.titre,
      description: champs.description,
      ...(champs.image ? { images: [{ url: champs.image }] } : {}),
    },
    ...(champs.indexable === false ? { robots: { index: false, follow: true } } : {}),
  }
}
