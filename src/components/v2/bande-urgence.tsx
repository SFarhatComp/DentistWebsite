import Link from "next/link"
import { Icone01 } from "@/components/v2/icones"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * Bande « Urgence dentaire », reprise sur l'accueil et la page Services.
 *
 * Terracotta plein sur texte blanc : c'est le seul aplat de couleur vive des
 * deux pages, et il est là pour arrêter l'œil de quelqu'un qui a mal et qui
 * parcourt sans lire.
 *
 * Ce n'est pas une section mais un bloc à poser dans le conteneur de la page :
 * la maquette la range avec le reste du contenu, dans la même gouttière. En
 * faire une section ajouterait son propre remplissage vertical, et la bande se
 * détacherait de ce qu'elle accompagne.
 *
 * Le numéro est un lien d'appel plutôt qu'un simple texte : sur téléphone,
 * c'est le geste qu'on cherche en premier.
 */
export function BandeUrgence({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)

  return (
    <aside className="flex w-full flex-wrap items-center justify-between gap-5 rounded-sm bg-primary p-8 text-white">
      <div>
        <p className="m-0 flex items-center gap-3 text-[13px] font-semibold uppercase leading-[1.6] tracking-[0.16em] text-white">
          <span className="flex" aria-hidden="true">
            <Icone01 taille={32} />
          </span>
          {t("urgence.bandeTitre")}
        </p>
        <p className="mt-3 max-w-[52ch] text-[19px] font-medium leading-[1.6]">
          {t("urgence.bandeTexte")}{" "}
          <a href={`tel:${t("contact.phoneTel")}`} className="font-semibold text-white">
            {t("contact.phoneDisplay")}
          </a>
          .
        </p>
      </div>
      <Link
        href={`/${lang}/urgence`}
        className="inline-flex min-h-12 items-center rounded-sm bg-white px-[22px] font-semibold text-primary-hover no-underline transition-opacity hover:opacity-90"
      >
        {t("urgence.bandeLien")}
      </Link>
    </aside>
  )
}
