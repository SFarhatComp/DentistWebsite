"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getTranslationList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/* --------------------------------------------------------------------------
 * Demande de rendez-vous, en deux temps.
 *
 * D'abord les questions qui permettent à l'équipe de cibler la demande — le
 * motif, la couverture, s'il y a douleur — puis seulement le choix du créneau.
 * Dans cet ordre, parce que le motif détermine la durée : proposer des plages
 * de 30 minutes à quelqu'un qui vient pour un examen complet reviendrait à
 * promettre une heure qui n'existe pas.
 *
 * Les créneaux viennent de /api/disponibilites, qui lit l'agenda du studio.
 * Quand l'agenda n'est pas branché, ce point d'entrée répond avec les heures
 * d'ouverture seules et le dit : l'interface affiche alors un avertissement
 * plutôt que de laisser croire à une plage réellement libre.
 *
 * Aucune question sur l'état de santé : ces réponses transiteraient par
 * Netlify et par un service de courriel. Elles se posent au téléphone.
 * ----------------------------------------------------------------------- */

interface Plage {
  debut: string
  fin: string
  libelle: string
}
interface Jour {
  date: string
  creneaux: Plage[]
}

export function DemandeRendezVous({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)

  const motifs = getTranslationList(lang, "rdv.motifs")
  const couvertures = getTranslationList(lang, "rdv.couvertures")

  const [etape, setEtape] = useState<1 | 2>(1)
  const [motif, setMotif] = useState(motifs[0] ?? "")
  const [creneau, setCreneau] = useState<Plage | null>(null)
  const [jours, setJours] = useState<Jour[]>([])
  const [chargement, setChargement] = useState(false)
  // On ne montre que les premieres dates : la liste complete couvre trois
  // semaines, et une page de boutons decourage plus qu'elle n'aide.
  const [datesVisibles, setDatesVisibles] = useState(4)
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  // Le motif gouverne la durée : changer de motif invalide le créneau choisi.
  useEffect(() => {
    setCreneau(null)
  }, [motif])

  // On lit la chaine de requete apres l'affichage plutot qu'avec
  // useSearchParams : ce dernier force le rendu cote client, et le formulaire
  // — qui est tout l'objet de la page — disparaissait du HTML servi, donc de
  // ce que voit un moteur de recherche. Le prereglage arrive une fraction de
  // seconde plus tard, ce qui ne se voit pas.
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("motif")
    if (v && motifs.includes(v)) setMotif(v)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (etape !== 2) return
    let vivant = true
    setChargement(true)
    setErreur(null)
    setDatesVisibles(4)
    const cle = motifs.indexOf(motif)
    fetch(`/api/disponibilites?motif=${encodeURIComponent(CLES_MOTIF[cle] ?? "autre")}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (!vivant) return
        setJours(d.jours ?? [])
      })
      .catch(() => vivant && setErreur(t("rdv.erreurPlages")))
      .finally(() => vivant && setChargement(false))
    return () => {
      vivant = false
    }
  }, [etape, motif]) // eslint-disable-line react-hooks/exhaustive-deps

  const champ =
    "mt-1.5 h-12 w-full rounded-sm border border-foreground/25 bg-white px-3.5 text-[17px] transition-colors focus:border-primary focus:outline-none"
  const etiquette = "block text-foreground"

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!creneau) return
    setErreur(null)
    setEnvoi(true)
    const form = e.currentTarget
    try {
      const r = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      })
      if (!r.ok) throw new Error(String(r.status))
      window.location.href = `/${lang}/merci`
    } catch {
      setErreur(t("rdv.erreur"))
      setEnvoi(false)
    }
  }

  const dateLisible = (iso: string) =>
    new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
      timeZone: "America/Toronto",
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date(iso + "T12:00:00Z"))

  const heureLisible = (iso: string) =>
    new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
      timeZone: "America/Toronto",
      hour: "2-digit",
      minute: "2-digit",
      hour12: lang !== "fr",
    }).format(new Date(iso))

  return (
    <form
      name="rendez-vous"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={envoyer}
    >
      <input type="hidden" name="form-name" value="rendez-vous" />
      <input type="hidden" name="lang" value={lang} />
      <p className="hidden">
        <label>
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* Les réponses de l'étape 1 restent dans le document à l'étape 2 : sans
          cela, le formulaire n'enverrait que le créneau. */}
      <div className={etape === 1 ? "" : "hidden"}>
        <Etape numero="1" titre={t("rdv.etape1")} />
        <div className="mt-6 flex flex-wrap gap-5">
          <label className="flex-[1_1_100%]">
            <span className={etiquette}>{t("rdv.champMotif")}</span>
            <select name="motif" required value={motif} onChange={(e) => setMotif(e.target.value)} className={champ}>
              {motifs.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>

          <label className="flex-[1_1_240px]">
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

          <label className="flex-[1_1_240px]">
            <span className={etiquette}>{t("rdv.champDouleur")}</span>
            <select name="douleur" required defaultValue={t("rdv.non")} className={champ}>
              <option>{t("rdv.non")}</option>
              <option>{t("rdv.douleurLegere")}</option>
              <option>{t("rdv.douleurForte")}</option>
            </select>
          </label>

          <label className="flex-[1_1_100%]">
            <span className={etiquette}>{t("rdv.champPrecisions")}</span>
            <textarea name="precisions" rows={3} maxLength={400} className={`${champ} h-auto py-3`} />
          </label>

          <p className="m-0 flex-[1_1_100%] text-[15px] text-foreground/75">
            {t("rdv.noteFormulaire")}{" "}
            <Link href={`/${lang}/confidentialite`} className="text-primary underline-offset-4 hover:underline">
              {t("rdv.noteFormulaireLien")}
            </Link>
            .
          </p>

          <button
            type="button"
            onClick={() => setEtape(2)}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t("rdv.versCreneaux")}
          </button>
        </div>
      </div>

      <div className={etape === 2 ? "" : "hidden"}>
        <Etape numero="2" titre={t("rdv.etape2")} />

        <button
          type="button"
          onClick={() => setEtape(1)}
          className="mt-4 cursor-pointer border-0 bg-transparent p-0 text-[15px] text-primary underline-offset-4 hover:underline"
        >
          ← {t("rdv.retourQuestions")}
        </button>

        {chargement && <p className="mt-6 text-foreground/70">{t("rdv.chargementPlages")}</p>}
        {erreur && !chargement && (
          <p className="mt-6 text-[15px] text-red-700" role="alert">
            {erreur}
          </p>
        )}
        {!chargement && !erreur && jours.length === 0 && (
          <p className="mt-6 text-foreground/70">{t("rdv.aucunePlage")}</p>
        )}

        <div className="mt-6 flex flex-col gap-7">
          {jours.slice(0, datesVisibles).map((j) => (
            <div key={j.date}>
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {dateLisible(j.date)}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {j.creneaux.map((c) => {
                  const choisi = creneau?.debut === c.debut
                  return (
                    <button
                      key={c.debut}
                      type="button"
                      onClick={() => setCreneau(c)}
                      aria-pressed={choisi}
                      className={`min-h-11 cursor-pointer rounded-sm px-4 text-[15px] transition-colors ${
                        choisi
                          ? "border-0 bg-primary font-medium text-primary-foreground"
                          : "border border-foreground/25 bg-white text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {heureLisible(c.debut)}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {jours.length > datesVisibles && (
          <button
            type="button"
            onClick={() => setDatesVisibles((n) => n + 4)}
            className="mt-6 inline-flex min-h-11 cursor-pointer items-center rounded-sm border border-foreground/25 bg-white px-5 text-[15px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t("rdv.plusDeDates")}
          </button>
        )}

        {creneau && (
          <>
            <input type="hidden" name="creneau" value={creneau.debut} />
            <input type="hidden" name="creneauFin" value={creneau.fin} />
            <input type="hidden" name="creneauLibelle" value={creneau.libelle} />
            <div className="mt-8 rounded-sm bg-surface p-6">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {t("rdv.recapTitre")}
              </p>
              <p className="mt-2 font-display text-[27px] font-semibold leading-[1.2]">{creneau.libelle}</p>
              <p className="mt-2 text-foreground/85">{motif}</p>
              <p className="mt-4 text-[15px] text-foreground/75">{t("rdv.recapNote")}</p>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={!creneau || envoi}
          className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
        >
          {envoi ? t("rdv.envoiEnCours") : t("rdv.envoyer")}
        </button>
      </div>
    </form>
  )
}

/**
 * Les clés que comprend /api/disponibilites, dans l'ordre de rdv.motifs.
 *
 * L'examen seul et l'examen avec nettoyage sont deux durées différentes — 60
 * et 90 minutes — et doivent donc avoir deux clés distinctes.
 */
const CLES_MOTIF = [
  "examen",
  "examen-nettoyage",
  "urgence",
  "consultation",
  "nettoyage",
  "prothese",
  "reparation",
  "autre",
]

function Etape({ numero, titre }: { numero: string; titre: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-foreground/15 pb-4">
      <span className="font-display text-[22px] leading-none text-muted-foreground">{numero}</span>
      <h3 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{titre}</h3>
    </div>
  )
}
