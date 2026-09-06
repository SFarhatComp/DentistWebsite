"use client"
import { useId, useMemo, useState } from "react"
import { getTranslationObjectList, getTranslationList, getTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

/* --------------------------------------------------------------------------
 * Questionnaire de rendez-vous en 6 étapes (handoff §10).
 *
 * Principe : une question par écran, une seule décision à prendre, aucun champ
 * clinique détaillé en ligne. L'historique médical se fait en clinique.
 *
 * Rien n'est persisté avant la soumission : l'état vit dans le composant et
 * part d'un coup vers Netlify Forms, qui déclenche le courriel de rapport.
 * ----------------------------------------------------------------------- */

const NB_ETAPES = 6

interface Motif {
  code: string
  label: string
  note: string
  duree: number
}
interface Option {
  code: string
  label: string
  note?: string
}

/** Priorité de rappel, dérivée de l'étape 3. Reprise telle quelle dans le courriel. */
const PRIORITE_TON: Record<string, string> = {
  aucune: "#4B463F",
  progresse: "#B5793D",
  aujourdhui: "#7A3E52",
}

/** 514 863 7805 — chiffres seulement, 10 au maximum. */
function formatTelephone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
}
const telephoneValide = (v: string) => v.replace(/\D/g, "").length === 10

/** JJ / MM / AAAA pendant la saisie. */
function formatNaissance(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)} / ${d.slice(2)}`
  return `${d.slice(0, 2)} / ${d.slice(2, 4)} / ${d.slice(4)}`
}
function naissanceValide(v: string): boolean {
  const d = v.replace(/\D/g, "")
  if (d.length !== 8) return false
  const jour = +d.slice(0, 2)
  const mois = +d.slice(2, 4)
  const annee = +d.slice(4)
  return jour >= 1 && jour <= 31 && mois >= 1 && mois <= 12 && annee >= 1900 && annee <= new Date().getFullYear()
}

const courrielValide = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/* -------------------------------------------------------------------------- */

function Carte({
  label,
  note,
  actif,
  onClick,
}: {
  label: string
  note?: string
  actif: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cn(
        "w-full border p-5 text-left transition-colors",
        actif ? "border-primary bg-primary text-primary-on" : "border-border bg-surface hover:border-primary"
      )}
    >
      <div className="font-display text-lg leading-[1.2]">{label}</div>
      {note && (
        <div className={cn("mt-1.5 text-sm", actif ? "text-primary-on-muted" : "text-muted-foreground")}>
          {note}
        </div>
      )}
    </button>
  )
}

function Puce({
  label,
  note,
  actif,
  onClick,
}: {
  label: string
  note?: string
  actif: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cn(
        "border px-4 py-3 text-left text-sm transition-colors",
        actif ? "border-primary bg-primary text-primary-on" : "border-border hover:border-primary"
      )}
    >
      <span className="font-medium">{label}</span>
      {note && (
        <span className={cn("ml-2", actif ? "text-primary-on-muted" : "text-muted-foreground")}>{note}</span>
      )}
    </button>
  )
}

function Champ({
  label,
  value,
  onChange,
  erreur,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  erreur?: string
  type?: string
  placeholder?: string
  inputMode?: "text" | "tel" | "email" | "numeric"
  autoComplete?: string
}) {
  const id = useId()
  const errId = `${id}-err`
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] tracking-[0.18em] text-accent">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? errId : undefined}
        className="mt-2 w-full border border-border bg-surface px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus-visible:border-primary"
      />
      {erreur && (
        <p id={errId} role="alert" className="mt-2 text-sm" style={{ color: "#F0A79A" }}>
          {erreur}
        </p>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function AppointmentWizard({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const indiceId = useId()

  const motifs = getTranslationObjectList<Motif>(lang, "appointmentWizard.s2.motifs")
  const douleurOptions = getTranslationObjectList<Option>(lang, "appointmentWizard.s3.options")
  const jours = getTranslationObjectList<Option>(lang, "appointmentWizard.s4.jours")
  const moments = getTranslationObjectList<Option>(lang, "appointmentWizard.s4.moments")
  const delais = getTranslationObjectList<Option>(lang, "appointmentWizard.s4.delais")
  const assurances = getTranslationObjectList<Option>(lang, "appointmentWizard.s5.options")
  const canaux = getTranslationObjectList<Option>(lang, "appointmentWizard.s6.canaux")
  const urgenceItems = getTranslationList(lang, "appointmentWizard.s3.urgenceItems")

  const [etape, setEtape] = useState(1)
  const [envoye, setEnvoye] = useState(false)
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreurEnvoi, setErreurEnvoi] = useState(false)

  const [statut, setStatut] = useState("")
  const [motif, setMotif] = useState("")
  const [precisions, setPrecisions] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [douleur, setDouleur] = useState("")
  const [joursSel, setJoursSel] = useState<string[]>([])
  const [momentsSel, setMomentsSel] = useState<string[]>([])
  const [delai, setDelai] = useState("asap")
  const [assurance, setAssurance] = useState("")
  const [assureur, setAssureur] = useState("")
  const [police, setPolice] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [courriel, setCourriel] = useState("")
  const [naissance, setNaissance] = useState("")
  const [canal, setCanal] = useState("telephone")
  const [consentement, setConsentement] = useState(false)

  const precisionsDisponibles = useMemo(
    () => (motif ? getTranslationList(lang, `appointmentWizard.s2.precisions.${motif}`) : []),
    [lang, motif]
  )
  const motifChoisi = motifs.find((m) => m.code === motif)
  const dureeSuggeree = motifChoisi?.duree ?? 45
  // « Autre » ouvre la note libre — c'est la seule porte de sortie du questionnaire fermé.
  const noteVisible = precisions.some((p) => /^(Autre|Other)$/i.test(p))

  const errTelephone = telephone && !telephoneValide(telephone) ? t("appointmentWizard.s6.erreurTelephone") : ""
  const errNaissance = naissance && !naissanceValide(naissance) ? t("appointmentWizard.s6.erreurNaissance") : ""
  const errCourriel = courriel && !courrielValide(courriel) ? t("appointmentWizard.s6.erreurCourriel") : ""
  const courrielRequis = canal === "courriel"

  const etapeComplete = (n: number): boolean => {
    switch (n) {
      case 1:
        return statut !== ""
      case 2:
        return motif !== "" && precisions.length > 0
      case 3:
        return douleur !== ""
      case 4:
        return joursSel.length > 0 && momentsSel.length > 0
      case 5:
        return assurance !== ""
      case 6:
        return (
          prenom.trim() !== "" &&
          nom.trim() !== "" &&
          telephoneValide(telephone) &&
          consentement &&
          (!courrielRequis || courrielValide(courriel))
        )
      default:
        return false
    }
  }
  const complete = etapeComplete(etape)

  const bascule = (liste: string[], set: (v: string[]) => void, code: string) =>
    set(liste.includes(code) ? liste.filter((c) => c !== code) : [...liste, code])

  // Changer de motif remet les précisions et la note à zéro : elles ne veulent
  // plus rien dire une fois le motif changé.
  function choisirMotif(code: string) {
    setMotif(code)
    setPrecisions([])
    setNote("")
  }

  async function envoyer() {
    setEnvoiEnCours(true)
    setErreurEnvoi(false)
    const fd = new FormData()
    fd.append("form-name", "appointment")
    fd.append("lang", lang)
    fd.append("statut", statut)
    fd.append("motif", motif)
    fd.append("motifLabel", motifChoisi?.label ?? "")
    fd.append("precisions", precisions.join(" · "))
    fd.append("note", note)
    fd.append("douleur", douleur)
    fd.append("priorite", douleur)
    fd.append("dureeSuggeree", String(dureeSuggeree))
    fd.append("jours", joursSel.join(","))
    fd.append("moments", momentsSel.join(","))
    fd.append("delai", delai)
    fd.append("assurance", assurance)
    fd.append("assureur", assureur)
    fd.append("police", police)
    fd.append("firstName", prenom)
    fd.append("lastName", nom)
    fd.append("phone", telephone)
    fd.append("email", courriel)
    fd.append("birthdate", naissance)
    fd.append("contactPreference", canal)
    fd.append("consent", consentement ? "oui" : "non")
    try {
      const res = await fetch("/__forms.html", { method: "POST", body: fd })
      if (!res.ok && res.status !== 200 && res.status !== 404) throw new Error("Submit failed")
      setEnvoye(true)
    } catch {
      setErreurEnvoi(true)
      setEnvoiEnCours(false)
    }
  }

  /* ---------------------------------------------------------------------- */

  if (envoye) {
    return (
      <div className="mx-auto max-w-2xl bg-primary p-8 text-primary-on md:p-10">
        <h2 className="font-display text-3xl leading-[1.1]">{t("appointmentWizard.confirmation.titre")}</h2>
        <p className="mt-4 text-[17px] leading-[1.6]">
          {t("appointmentWizard.confirmation.body")
            .replace("{prenom}", prenom)
            .replace("{telephone}", telephone)}
        </p>
        <p className="mt-6 text-sm" style={{ color: "hsl(var(--on-primary-muted))" }}>
          {t("appointmentWizard.confirmation.avis")}
        </p>
      </div>
    )
  }

  const libelles = ["s1", "s2", "s3", "s4", "s5", "s6"].map((s) => t(`appointmentWizard.${s}.libelle`))
  const cle = `s${etape}`

  return (
    <div className="mx-auto max-w-2xl">
      {/* Barre de progression */}
      <div className="flex gap-1.5" role="presentation">
        {Array.from({ length: NB_ETAPES }, (_, i) => (
          <span
            key={i}
            className="h-[3px] flex-1"
            style={{
              background: i < etape ? "hsl(var(--primary))" : "hsl(var(--foreground) / .18)",
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-[11px] tracking-[0.18em] text-accent">
          {t("appointmentWizard.etapeSur").replace("{n}", String(etape))} · {libelles[etape - 1]}
        </span>
        <span className="text-xs text-muted-foreground">{t("appointmentWizard.duree")}</span>
      </div>

      <h2 className="mt-6 font-display text-3xl leading-[1.08] tracking-[-0.02em] md:text-[2.375rem]">
        {t(`appointmentWizard.${cle}.titre`)}
      </h2>
      <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
        {t(`appointmentWizard.${cle}.sousTitre`)}
      </p>

      <div className="mt-8">
        {etape === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Carte
              label={t("appointmentWizard.s1.nouveau")}
              note={t("appointmentWizard.s1.nouveauNote")}
              actif={statut === "nouveau"}
              onClick={() => setStatut("nouveau")}
            />
            <Carte
              label={t("appointmentWizard.s1.existant")}
              note={t("appointmentWizard.s1.existantNote")}
              actif={statut === "existant"}
              onClick={() => setStatut("existant")}
            />
          </div>
        )}

        {etape === 2 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {motifs.map((m) => (
                <Carte
                  key={m.code}
                  label={m.label}
                  note={m.note}
                  actif={motif === m.code}
                  onClick={() => choisirMotif(m.code)}
                />
              ))}
            </div>
            {motif && (
              <fieldset className="mt-10 border-t border-border pt-8">
                <legend className="sr-only">{t("appointmentWizard.s2.precisionsTitre")}</legend>
                <div className="font-display text-xl">{t("appointmentWizard.s2.precisionsTitre")}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("appointmentWizard.s2.precisionsIndice")}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {precisionsDisponibles.map((p) => (
                    <Puce
                      key={p}
                      label={p}
                      actif={precisions.includes(p)}
                      onClick={() => bascule(precisions, setPrecisions, p)}
                    />
                  ))}
                </div>
                {noteVisible && (
                  <div className="mt-6">
                    <label
                      htmlFor="wizard-note"
                      className="block text-[11px] tracking-[0.18em] text-accent"
                    >
                      {t("appointmentWizard.s2.noteLibelle")}
                    </label>
                    <textarea
                      id="wizard-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      placeholder={t("appointmentWizard.s2.notePlaceholder")}
                      className="mt-2 w-full border border-border bg-surface px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus-visible:border-primary"
                    />
                  </div>
                )}
              </fieldset>
            )}
          </>
        )}

        {etape === 3 && (
          <>
            <div className="grid gap-4">
              {douleurOptions.map((o) => (
                <Carte
                  key={o.code}
                  label={o.label}
                  note={o.note}
                  actif={douleur === o.code}
                  onClick={() => setDouleur(o.code)}
                />
              ))}
            </div>

            {/* Bloc de sécurité : toujours visible, jamais optionnel. */}
            <div
              className="mt-8 border p-6"
              style={{ background: "#2B1A19", borderColor: "#C86A5A" }}
              role="note"
            >
              <div className="text-[11px] font-semibold tracking-[0.18em]" style={{ color: "#F0A79A" }}>
                {t("appointmentWizard.s3.urgenceTitre")}
              </div>
              <ul className="mt-4 space-y-2">
                {urgenceItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-[1.6] text-foreground">
                    <span aria-hidden="true" style={{ color: "#F0A79A" }}>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {douleur === "aujourdhui" && (
              <div
                className="mt-4 border-l-2 p-6"
                style={{ background: "#2A1E27", borderColor: "hsl(var(--primary))" }}
              >
                <div className="font-display text-lg text-primary">
                  {t("appointmentWizard.s3.rappelTitre")}
                </div>
                <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                  {t("appointmentWizard.s3.rappelBody")}
                </p>
              </div>
            )}
          </>
        )}

        {etape === 4 && (
          <div className="space-y-8">
            <div>
              <div id="grp-jours" className="text-[11px] tracking-[0.18em] text-accent">
                {t("appointmentWizard.s4.joursLibelle")}
              </div>
              <div className="mt-4 flex flex-wrap gap-3" role="group" aria-labelledby="grp-jours">
                {jours.map((j) => (
                  <Puce
                    key={j.code}
                    label={j.label}
                    actif={joursSel.includes(j.code)}
                    onClick={() => bascule(joursSel, setJoursSel, j.code)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div id="grp-moments" className="text-[11px] tracking-[0.18em] text-accent">
                {t("appointmentWizard.s4.momentsLibelle")}
              </div>
              <div className="mt-4 flex flex-wrap gap-3" role="group" aria-labelledby="grp-moments">
                {moments.map((m) => (
                  <Puce
                    key={m.code}
                    label={m.label}
                    note={m.note}
                    actif={momentsSel.includes(m.code)}
                    onClick={() => bascule(momentsSel, setMomentsSel, m.code)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div id="grp-delai" className="text-[11px] tracking-[0.18em] text-accent">
                {t("appointmentWizard.s4.delaiLibelle")}
              </div>
              <div className="mt-4 flex flex-wrap gap-3" role="group" aria-labelledby="grp-delai">
                {delais.map((d) => (
                  <Puce
                    key={d.code}
                    label={d.label}
                    actif={delai === d.code}
                    onClick={() => setDelai(d.code)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {etape === 5 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {assurances.map((a) => (
                <Carte
                  key={a.code}
                  label={a.label}
                  note={a.note}
                  actif={assurance === a.code}
                  onClick={() => setAssurance(a.code)}
                />
              ))}
            </div>
            {assurance === "privee" && (
              <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
                <Champ
                  label={t("appointmentWizard.s5.assureurLibelle")}
                  value={assureur}
                  onChange={setAssureur}
                  placeholder={t("appointmentWizard.s5.assureurPlaceholder")}
                />
                <Champ
                  label={t("appointmentWizard.s5.policeLibelle")}
                  value={police}
                  onChange={setPolice}
                />
              </div>
            )}
          </>
        )}

        {etape === 6 && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Champ
                label={t("appointmentWizard.s6.prenom")}
                value={prenom}
                onChange={setPrenom}
                autoComplete="given-name"
              />
              <Champ
                label={t("appointmentWizard.s6.nom")}
                value={nom}
                onChange={setNom}
                autoComplete="family-name"
              />
              <Champ
                label={t("appointmentWizard.s6.telephone")}
                value={telephone}
                onChange={(v) => setTelephone(formatTelephone(v))}
                erreur={errTelephone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="514 863 7805"
              />
              <Champ
                label={t("appointmentWizard.s6.courriel")}
                value={courriel}
                onChange={setCourriel}
                erreur={errCourriel}
                type="email"
                inputMode="email"
                autoComplete="email"
              />
              <Champ
                label={t("appointmentWizard.s6.naissance")}
                value={naissance}
                onChange={(v) => setNaissance(formatNaissance(v))}
                erreur={errNaissance}
                inputMode="numeric"
                placeholder="JJ / MM / AAAA"
              />
            </div>
            <div>
              <div id="grp-canal" className="text-[11px] tracking-[0.18em] text-accent">
                {t("appointmentWizard.s6.canalLibelle")}
              </div>
              <div className="mt-4 flex flex-wrap gap-3" role="group" aria-labelledby="grp-canal">
                {canaux.map((c) => (
                  <Puce
                    key={c.code}
                    label={c.label}
                    actif={canal === c.code}
                    onClick={() => setCanal(c.code)}
                  />
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer gap-3 border-t border-border pt-6 text-sm leading-[1.6]">
              <input
                type="checkbox"
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
              />
              <span>{t("appointmentWizard.s6.consentement")}</span>
            </label>
          </div>
        )}
      </div>

      {erreurEnvoi && (
        <p role="alert" className="mt-6 text-sm" style={{ color: "#F0A79A" }}>
          {t("appointmentWizard.erreurEnvoi")}
        </p>
      )}

      {/* Pied d'étape */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <button
          type="button"
          onClick={() => setEtape((e) => Math.max(1, e - 1))}
          disabled={etape === 1}
          className="text-sm text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted-foreground"
        >
          {t("appointmentWizard.retour")}
        </button>
        <div className="flex items-center gap-4">
          {/* Le motif de blocage est annoncé, pas seulement suggéré par un bouton grisé. */}
          {!complete && (
            <span id={indiceId} className="text-sm text-muted-foreground">
              {t(`appointmentWizard.${cle}.indice`)}
            </span>
          )}
          <button
            type="button"
            disabled={!complete || envoiEnCours}
            aria-describedby={!complete ? indiceId : undefined}
            onClick={() => (etape === NB_ETAPES ? envoyer() : setEtape((e) => e + 1))}
            className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
          >
            {etape === NB_ETAPES
              ? envoiEnCours
                ? t("appointmentWizard.envoiEnCours")
                : t("appointmentWizard.envoyer")
              : t("appointmentWizard.continuer")}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Rappel discret de la priorité calculée, visible dès l'étape 3 franchie. */}
      {douleur && etape > 3 && (
        <div className="mt-6 flex items-center gap-3 text-xs">
          <span
            className="px-3 py-1.5 font-semibold tracking-[0.12em] text-foreground"
            style={{ background: PRIORITE_TON[douleur] }}
          >
            {t(`appointmentWizard.priorites.${douleur}`)}
          </span>
          <span className="text-muted-foreground">{dureeSuggeree} min</span>
        </div>
      )}
    </div>
  )
}
