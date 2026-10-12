"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getTranslationList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * « Vous préférez qu'on vous rappelle ? »
 *
 * Le pendant de l'horaire en ligne : on laisse ses coordonnées et une
 * préférence, le studio rappelle. Huit champs, pas un de plus — l'assistant en
 * six étapes de l'ancien site demandait l'assurance, le numéro de police et le
 * niveau de douleur avant même qu'on ait parlé à quelqu'un.
 *
 * Le bloc de réservation rapide de l'accueil envoie ici motif, jour et moment
 * en paramètres d'adresse : on les lit pour pré-remplir, sinon la personne
 * aurait à répondre deux fois à la même question.
 */
export function FormulaireRappel({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const params = useSearchParams()

  const motifs = getTranslationList(lang, "rdv.motifs")
  const couvertures = getTranslationList(lang, "rdv.couvertures")
  const jours = getTranslationList(lang, "rdv.jours")
  const moments = getTranslationList(lang, "rdv.moments")

  const depuisUrl = (cle: string, liste: string[]) => {
    const v = params.get(cle)
    return v && liste.includes(v) ? v : liste[0] ?? ""
  }

  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState(false)

  const champ =
    "mt-1.5 h-12 w-full rounded-sm border border-foreground/25 bg-white px-3.5 text-[17px] transition-colors focus:border-primary focus:outline-none"
  const etiquette = "block text-foreground"

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErreur(false)
    setEnvoi(true)
    const form = e.currentTarget
    try {
      const reponse = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      })
      if (!reponse.ok) throw new Error(String(reponse.status))
      window.location.href = `/${lang}/merci`
    } catch {
      setErreur(true)
      setEnvoi(false)
    }
  }

  return (
    <form
      name="rappel"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={envoyer}
      className="flex flex-wrap gap-5"
    >
      <input type="hidden" name="form-name" value="rappel" />
      <input type="hidden" name="lang" value={lang} />
      <p className="hidden">
        <label>
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <label className="flex-[1_1_100%]">
        <span className={etiquette}>{t("rdv.champNom")}</span>
        <input type="text" name="nom" required autoComplete="name" className={champ} />
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champTelephone")}</span>
        <input type="tel" name="telephone" required autoComplete="tel" className={champ} />
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champCourriel")}</span>
        <input type="email" name="courriel" autoComplete="email" className={champ} />
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champPremiereVisite")}</span>
        <select name="premiereVisite" required defaultValue={t("rdv.oui")} className={champ}>
          <option>{t("rdv.oui")}</option>
          <option>{t("rdv.non")}</option>
        </select>
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champCouverture")}</span>
        <select name="couverture" required defaultValue={couvertures[0]} className={champ}>
          {couvertures.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="flex-[1_1_100%]">
        <span className={etiquette}>{t("rdv.champMotif")}</span>
        <select name="motif" required defaultValue={depuisUrl("motif", motifs)} className={champ}>
          {motifs.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champJour")}</span>
        <select name="jour" defaultValue={depuisUrl("jour", jours)} className={champ}>
          {jours.map((j) => (
            <option key={j}>{j}</option>
          ))}
        </select>
      </label>

      <label className="flex-[1_1_240px]">
        <span className={etiquette}>{t("rdv.champMoment")}</span>
        <select name="moment" defaultValue={depuisUrl("moment", moments)} className={champ}>
          {moments.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      <p className="m-0 flex-[1_1_100%] text-[15px] text-foreground/75">
        {t("rdv.noteFormulaire")}{" "}
        <Link href={`/${lang}/confidentialite`} className="text-primary underline-offset-4 hover:underline">
          {t("rdv.noteFormulaireLien")}
        </Link>
        .
      </p>

      {erreur && (
        <p className="m-0 flex-[1_1_100%] text-[15px] text-red-700" role="alert">
          {t("rdv.erreur")}
        </p>
      )}

      <button
        type="submit"
        disabled={envoi}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {envoi ? t("rdv.envoiEnCours") : t("rdv.envoyer")}
      </button>
    </form>
  )
}
