"use client"
import Link from "next/link"
import { useState } from "react"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface TypeSituation {
  code: string
  label: string
}

/* --------------------------------------------------------------------------
 * Formulaire de demande d'urgence (maquette §Urgence).
 *
 * Les questions de suivi dépendent du type de situation : on n'affiche que la
 * branche choisie. Rien n'est demandé qui ne serve au tri — la secrétaire
 * rappelle de toute façon, et l'évaluation se fait en clinique.
 *
 * Le bloc enflure porte un avertissement permanent : difficulté à respirer,
 * avaler ou ouvrir la bouche renvoie à l'urgence hospitalière, pas ici.
 * ----------------------------------------------------------------------- */

const CHAMP =
  "mt-1.5 block h-12 w-full rounded-sm border bg-white px-3.5 font-sans text-[17px] text-foreground"
const BORDURE = { borderColor: "hsl(var(--foreground) / 0.25)" }

function Etiquette({ texte, mention }: { texte: string; mention?: string }) {
  return (
    <span className="font-medium">
      {texte}{" "}
      {mention && <span className="text-sm font-normal text-foreground/70">{mention}</span>}
    </span>
  )
}

function Choix({
  libelle,
  options,
  valeur,
  onChange,
  base = "100%",
}: {
  libelle: string
  options: string[]
  valeur: string
  onChange: (v: string) => void
  base?: string
}) {
  return (
    <label className="block" style={{ flex: `1 1 ${base}` }}>
      <Etiquette texte={libelle} />
      <select className={CHAMP} style={BORDURE} value={valeur} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function FormulaireUrgence({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const types = getTranslationObjectList<TypeSituation>(lang, "urgence.types")
  const ouiNon = getTranslationList(lang, "urgence.ouiNon")
  const depuis = getTranslationList(lang, "urgence.depuisOptions")
  const declencheurs = getTranslationList(lang, "urgence.douleurDeclencheurs")

  const [nom, setNom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [courriel, setCourriel] = useState("")
  const [type, setType] = useState("")
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [coches, setCoches] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState(false)
  const [envoye, setEnvoye] = useState(false)

  const rep = (k: string) => reponses[k] ?? ""
  const setRep = (k: string) => (v: string) => setReponses((r) => ({ ...r, [k]: v }))

  // Changer de type vide les réponses de la branche précédente : elles ne
  // veulent plus rien dire et partiraient dans la demande sans contexte.
  function choisirType(code: string) {
    setType(code)
    setReponses({})
    setCoches([])
  }

  const complet = nom.trim() !== "" && telephone.trim() !== "" && type !== "" && consent

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    setEnvoi(true)
    setErreur(false)
    const fd = new FormData()
    fd.append("form-name", "urgence")
    fd.append("lang", lang)
    fd.append("nom", nom)
    fd.append("telephone", telephone)
    fd.append("courriel", courriel)
    fd.append("type", type)
    for (const [k, v] of Object.entries(reponses)) if (v) fd.append(k, v)
    if (coches.length) fd.append("declencheurs", coches.join(" · "))
    fd.append("consentement", consent ? "oui" : "non")
    try {
      const res = await fetch("/__forms.html", { method: "POST", body: fd })
      if (!res.ok && res.status !== 200 && res.status !== 404) throw new Error("echec")
      setEnvoye(true)
    } catch {
      setErreur(true)
      setEnvoi(false)
    }
  }

  if (envoye) {
    return (
      <div className="mt-8 rounded-sm bg-foreground p-8 text-white">
        <p className="m-0 text-[19px] leading-relaxed">{t("urgence.confirme")}</p>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="mt-8 flex flex-wrap gap-5">
      <label className="block flex-[1_1_100%]">
        <Etiquette texte={t("urgence.champNom")} mention={t("urgence.obligatoire")} />
        <input type="text" className={CHAMP} style={BORDURE} value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <label className="block flex-[1_1_240px]">
        <Etiquette texte={t("urgence.champTelephone")} mention={t("urgence.obligatoire")} />
        <input
          type="tel"
          inputMode="tel"
          className={CHAMP}
          style={BORDURE}
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </label>
      <label className="block flex-[1_1_240px]">
        <Etiquette texte={t("urgence.champCourriel")} mention={t("urgence.facultatif")} />
        <input
          type="email"
          inputMode="email"
          className={CHAMP}
          style={BORDURE}
          value={courriel}
          onChange={(e) => setCourriel(e.target.value)}
        />
      </label>

      <label className="block flex-[1_1_100%]">
        <Etiquette texte={t("urgence.champType")} mention={t("urgence.obligatoire")} />
        <select className={CHAMP} style={BORDURE} value={type} onChange={(e) => choisirType(e.target.value)}>
          <option value="">—</option>
          {types.map((x) => (
            <option key={x.code} value={x.code}>
              {x.label}
            </option>
          ))}
        </select>
      </label>

      {/* Branche : douleur */}
      {type === "douleur" && (
        <>
          <Choix libelle={t("urgence.douleurOu")} options={getTranslationList(lang, "urgence.douleurOuOptions")} valeur={rep("ou")} onChange={setRep("ou")} base="240px" />
          <Choix libelle={t("urgence.douleurCote")} options={getTranslationList(lang, "urgence.douleurCoteOptions")} valeur={rep("cote")} onChange={setRep("cote")} base="240px" />
          <Choix libelle={t("urgence.douleurIntensite")} options={getTranslationList(lang, "urgence.douleurIntensiteOptions")} valeur={rep("intensite")} onChange={setRep("intensite")} base="240px" />
          <Choix libelle={t("urgence.douleurDepuis")} options={depuis} valeur={rep("depuis")} onChange={setRep("depuis")} base="240px" />
          <fieldset className="m-0 flex-[1_1_100%] border-0 p-0">
            <legend className="mb-2 font-medium">{t("urgence.douleurDeclencheursTitre")}</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {declencheurs.map((d) => (
                <label key={d} className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                    checked={coches.includes(d)}
                    onChange={() => setCoches((c) => (c.includes(d) ? c.filter((x) => x !== d) : [...c, d]))}
                  />
                  {d}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      {/* Branche : dent cassée */}
      {type === "cassee" && (
        <>
          <Choix libelle={t("urgence.casseeQuelle")} options={getTranslationList(lang, "urgence.casseeQuelleOptions")} valeur={rep("quelleDent")} onChange={setRep("quelleDent")} base="240px" />
          <Choix libelle={t("urgence.casseeMal")} options={ouiNon} valeur={rep("mal")} onChange={setRep("mal")} base="240px" />
          <Choix libelle={t("urgence.casseeMorceau")} options={ouiNon} valeur={rep("morceau")} onChange={setRep("morceau")} base="240px" />
          <Choix libelle={t("urgence.casseeBord")} options={ouiNon} valeur={rep("bord")} onChange={setRep("bord")} base="240px" />
        </>
      )}

      {/* Branche : enflure — avec son avertissement permanent */}
      {type === "enflure" && (
        <>
          <Choix libelle={t("urgence.enflureOu")} options={getTranslationList(lang, "urgence.enflureOuOptions")} valeur={rep("ou")} onChange={setRep("ou")} base="240px" />
          <Choix libelle={t("urgence.enflureDepuis")} options={depuis} valeur={rep("depuis")} onChange={setRep("depuis")} base="240px" />
          <Choix libelle={t("urgence.enflureFievre")} options={ouiNon} valeur={rep("fievre")} onChange={setRep("fievre")} base="240px" />
          <p
            role="note"
            className="m-0 flex-[1_1_100%] border-l-4 border-primary bg-primary-soft py-4 pl-5 pr-4 font-medium leading-relaxed"
          >
            {t("urgence.enflureAlerte")}
          </p>
        </>
      )}

      {/* Branche : prothèse */}
      {type === "prothese" && (
        <>
          <Choix libelle={t("urgence.protheseType")} options={getTranslationList(lang, "urgence.protheseTypeOptions")} valeur={rep("protheseType")} onChange={setRep("protheseType")} base="240px" />
          <Choix libelle={t("urgence.protheseProbleme")} options={getTranslationList(lang, "urgence.protheseProblemeOptions")} valeur={rep("protheseProbleme")} onChange={setRep("protheseProbleme")} base="240px" />
        </>
      )}

      {/* Branche : autre */}
      {type === "autre" && (
        <label className="block flex-[1_1_100%]">
          <Etiquette texte={t("urgence.autreDescription")} />
          <textarea
            rows={4}
            className="mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-3 font-sans text-[17px] text-foreground"
            style={BORDURE}
            value={rep("description")}
            onChange={(e) => setRep("description")(e.target.value)}
          />
        </label>
      )}

      <label className="flex flex-[1_1_100%] cursor-pointer items-start gap-3 text-base leading-[1.4]">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>{t("urgence.consentement")}</span>
      </label>

      <p className="m-0 flex-[1_1_100%] text-[15px] leading-relaxed text-foreground/70">
        {t("urgence.noteConfidentialite")}{" "}
        <Link href={`/${lang}/confidentialite`} className="font-medium underline-offset-4">
          {t("urgence.lienConfidentialite")}
        </Link>
        .
      </p>

      {erreur && (
        <p role="alert" className="m-0 flex-[1_1_100%] font-medium text-primary-hover">
          {t("urgence.erreurEnvoi")}
        </p>
      )}

      <div className="flex flex-[1_1_100%] flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!complet || envoi}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
        >
          {envoi ? t("urgence.envoiEnCours") : t("urgence.envoyer")}
        </button>
        {!type && <span className="text-foreground/70">{t("urgence.choisirType")}</span>}
      </div>
    </form>
  )
}
