import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * L'horaire de réservation, hébergé par Google.
 *
 * Le planning de rendez-vous se crée dans Google Agenda, qui en donne un lien.
 * Ce lien n'est pas dans le code : il vit dans NEXT_PUBLIC_GOOGLE_RDV_URL,
 * parce qu'il peut changer — on refait un planning, on change les durées —
 * sans qu'il faille toucher au site. La marche à suivre est dans
 * docs/rendez-vous-google.md.
 *
 * Tant que la variable est vide, on n'affiche pas un cadre vide : on dit que la
 * réservation en ligne arrive et on renvoie vers le formulaire de rappel, qui
 * est juste à côté et qui, lui, fonctionne. Une page qui promet un horaire
 * absent coûte plus cher qu'une page qui propose autre chose.
 *
 * Google héberge les coordonnées saisies dans l'horaire, hors du Québec : la
 * mention qui suit le cadre le dit, comme l'exige la Loi 25.
 */

/**
 * Remet le lien dans la forme qu'attend un cadre intégré.
 *
 * Google donne deux liens pour un même planning : celui du bouton « Partager »,
 * qui ouvre la page de réservation, et celui de « Intégration au site Web »,
 * qui porte en plus `gv=true`. Seul le second s'affiche dans un cadre ; l'autre
 * donne un cadre blanc, sans message d'erreur.
 *
 * Plutôt que d'exiger le bon des deux, on ajoute `gv=true` s'il manque. On
 * accepte aussi qu'on colle le code d'intégration entier : on en extrait
 * l'adresse. C'est trois lignes ici contre une panne muette un soir de
 * déploiement.
 */
function adresseDuCadre(brut: string): string | null {
  const texte = brut.trim()
  if (!texte) return null

  // Si on a collé tout le <iframe …>, on ne garde que son src.
  const dansUnCadre = texte.match(/src=["']([^"']+)["']/i)
  const candidat = dansUnCadre ? dansUnCadre[1] : texte

  let u: URL
  try {
    u = new URL(candidat)
  } catch {
    return null
  }
  // On n'ouvre un cadre que vers Google Agenda : si la variable contient autre
  // chose, c'est une erreur de copie, pas une intention.
  if (u.hostname !== "calendar.google.com") return null

  u.searchParams.set("gv", "true")
  return u.toString()
}

export function PlanningGoogle({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const src = adresseDuCadre(process.env.NEXT_PUBLIC_GOOGLE_RDV_URL ?? "")

  if (!src) {
    return (
      <div className="rounded-sm border border-foreground/15 bg-surface p-8">
        <p className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("rdv.bientotTitre")}</p>
        <p className="mt-3 text-foreground/85">{t("rdv.bientotTexte")}</p>
        <a
          href="tel:+15148637805"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
        >
          {t("common.appeler")}
        </a>
      </div>
    )
  }

  return (
    <div>
      <iframe
        src={src}
        title={t("rdv.cadreTitre")}
        className="h-[640px] w-full rounded-sm border border-foreground/15 bg-white"
        loading="lazy"
      />
      <p className="mt-4 text-[15px] text-foreground/70">
        {t("rdv.noteGoogle")}{" "}
        <Link href={`/${lang}/confidentialite`} className="text-primary underline-offset-4 hover:underline">
          {t("rdv.noteGoogleLien")}
        </Link>
        .
      </p>
    </div>
  )
}
