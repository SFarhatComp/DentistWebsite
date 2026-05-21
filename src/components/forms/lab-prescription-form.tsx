"use client"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Field,
  PhoneField,
  TextareaField,
  CheckboxField,
  RadioField,
  FileField,
  FormSection,
  HoneypotField,
} from "./fields"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

/* -------------------------------------------------------------------------- */
/* Modèle de données — appareils et leurs comportements                        */
/* -------------------------------------------------------------------------- */

type SubOption = { v: string; l: string }
type MaterialOption = { v: string; l: string }

type Appareil = {
  v: string
  l: string
  subOptions?: SubOption[]
  // teeth: "required" | "optional" | "none" (Essix dépend du sous-choix, géré séparément)
  teeth: "required" | "optional" | "conditional" | "none"
  arch: "required" | "optional" | "none"
  materials?: MaterialOption[]
  lamination?: boolean
}

const RESTAURATION_MATERIALS: MaterialOption[] = [
  { v: "porcelaine_feldspathique", l: "Porcelaine feldspathique" },
  { v: "emax_presse", l: "E.max pressé" },
  { v: "zircone_3y", l: "Zircone 3Y" },
  { v: "zircone_multicouche", l: "Zircone multi-couche" },
]

const PLAQUE_MATERIALS: MaterialOption[] = [
  { v: "lt_clear", l: "LT Clear (rigide)" },
  { v: "lt_comfort", l: "LT Comfort (flexible)" },
]

const APPAREILS: Appareil[] = [
  {
    v: "couronne",
    l: "Couronne",
    subOptions: [
      { v: "temporaire", l: "Temporaire" },
      { v: "permanente", l: "Permanente" },
    ],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS,
    lamination: true,
  },
  {
    v: "pont",
    l: "Pont",
    subOptions: [
      { v: "temporaire", l: "Temporaire" },
      { v: "permanente", l: "Permanente" },
    ],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS,
    lamination: true,
  },
  {
    v: "incrustation",
    l: "Incrustation",
    subOptions: [
      { v: "temporaire", l: "Temporaire" },
      { v: "permanente", l: "Permanente" },
    ],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS,
    lamination: true,
  },
  {
    v: "facette",
    l: "Facette",
    subOptions: [
      { v: "temporaire", l: "Temporaire" },
      { v: "permanente", l: "Permanente" },
    ],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS,
    lamination: true,
  },
  {
    v: "prothese_amovible_complete",
    l: "Prothèse dentaire amovible complète",
    subOptions: [
      { v: "immediat", l: "Immédiat" },
      { v: "permanent", l: "Permanent" },
    ],
    teeth: "none",
    arch: "required",
  },
  {
    v: "guide_chirurgical",
    l: "Guide chirurgical",
    teeth: "none",
    arch: "required",
  },
  {
    v: "plaque_occlusale",
    l: "Plaque occlusale",
    subOptions: [
      { v: "rigide", l: "Rigide" },
      { v: "flexible", l: "Flexible" },
    ],
    teeth: "none",
    arch: "required",
    materials: PLAQUE_MATERIALS,
  },
  {
    v: "porte_empreinte",
    l: "Porte-empreinte personnalisé",
    teeth: "none",
    arch: "required",
  },
  {
    v: "gouttiere_retention",
    l: "Gouttière de rétention",
    teeth: "none",
    arch: "required",
  },
  {
    v: "gouttiere_blanchiment",
    l: "Gouttière de blanchiment",
    teeth: "none",
    arch: "required",
  },
  {
    v: "essix",
    l: "Essix",
    subOptions: [
      { v: "avec_dent_postiche", l: "Avec dent postiche" },
      { v: "sans_dent_postiche", l: "Sans dent postiche" },
    ],
    teeth: "conditional", // requis seulement si "avec dent postiche"
    arch: "required",
  },
  {
    v: "wax_up",
    l: "Wax-up diagnostique",
    teeth: "required",
    arch: "required",
  },
  {
    v: "reparation",
    l: "Réparation",
    teeth: "optional",
    arch: "optional",
  },
  {
    v: "autres",
    l: "Autres",
    teeth: "none",
    arch: "none",
  },
]

/* -------------------------------------------------------------------------- */
/* Numérotation FDI/ISO des dents                                              */
/* -------------------------------------------------------------------------- */

// Quadrants FDI : 1 (haut-droit), 2 (haut-gauche), 3 (bas-gauche), 4 (bas-droit)
// Chaque quadrant : dent 1 (incisive centrale) à 8 (3e molaire)
const TEETH_UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11]
const TEETH_UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28]
const TEETH_LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41]
const TEETH_LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38]

const ARCADES = [
  { v: "superieure", l: "Supérieure" },
  { v: "inferieure", l: "Inférieure" },
  { v: "les_deux", l: "Les deux" },
]

/* -------------------------------------------------------------------------- */
/* Sous-composant : sélecteur de dents par quadrant                           */
/* -------------------------------------------------------------------------- */

function ToothPicker({ selected, onChange }: { selected: Set<number>; onChange: (n: number) => void }) {
  return (
    <div className="border border-border bg-surface/40 p-4 space-y-3">
      <p className="label-sm text-muted-foreground">Cliquez sur les dents concernées (notation FDI)</p>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex gap-1 justify-center" aria-label="Arcade supérieure droite">
          {TEETH_UPPER_RIGHT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
          <div className="w-1 bg-border mx-1" aria-hidden="true" />
          {TEETH_UPPER_LEFT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
        </div>
        <div className="flex gap-1 justify-center" aria-label="Arcade inférieure droite">
          {TEETH_LOWER_RIGHT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
          <div className="w-1 bg-border mx-1" aria-hidden="true" />
          {TEETH_LOWER_LEFT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Sélectionnées :{" "}
        {selected.size > 0 ? (
          <span className="font-mono">{Array.from(selected).sort((a, b) => a - b).join(", ")}</span>
        ) : (
          <em>aucune</em>
        )}
      </p>
    </div>
  )
}

function ToothButton({ n, selected, onClick }: { n: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-9 h-9 text-xs tabular-nums border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border hover:border-primary",
      )}
    >
      {n}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Animations conditionnelles                                                  */
/* -------------------------------------------------------------------------- */

function useFieldAnimation() {
  const reduce = useReducedMotion()
  if (reduce) {
    return { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
  }
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  }
}

/* -------------------------------------------------------------------------- */
/* Formulaire principal                                                        */
/* -------------------------------------------------------------------------- */

export function LabPrescriptionForm({ lang }: { lang: Locale }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const [appareilKey, setAppareilKey] = useState<string>("")
  const [subOption, setSubOption] = useState<string>("")
  const [selectedTeeth, setSelectedTeeth] = useState<Set<number>>(new Set())

  const appareil = APPAREILS.find((a) => a.v === appareilKey)
  const anim = useFieldAnimation()

  function toggleTooth(n: number) {
    setSelectedTeeth((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  // Pour Essix : les dents ne sont requises que si sous-option = "avec dent postiche"
  const showTeethPicker =
    appareil &&
    (appareil.teeth === "required" ||
      appareil.teeth === "optional" ||
      (appareil.teeth === "conditional" && subOption === "avec_dent_postiche"))

  const teethRequired = appareil?.teeth === "required" || (appareil?.teeth === "conditional" && subOption === "avec_dent_postiche")
  const archRequired = appareil?.arch === "required"
  const showArch = appareil && appareil.arch !== "none"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    const data = new FormData(e.currentTarget)
    // Sérialise les dents sélectionnées dans un champ unique pour Netlify
    if (selectedTeeth.size > 0) {
      data.set("teeth", Array.from(selectedTeeth).sort((a, b) => a - b).join(","))
    }
    try {
      const res = await fetch("/__forms.html", { method: "POST", body: data })
      if (!res.ok && res.status !== 200 && res.status !== 404) throw new Error("Submit failed")
      window.location.assign(`/${lang}/merci`)
    } catch {
      setError(true)
      setSubmitting(false)
    }
  }

  return (
    <form
      name="lab-prescription"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label="Formulaire de prescription au laboratoire"
    >
      <input type="hidden" name="form-name" value="lab-prescription" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          Prescription d&apos;un appareil ou d&apos;une restauration. Les champs s&apos;adaptent selon le type d&apos;appareil choisi.
        </p>
      </div>

      <FormSection number="01" title="Professionnel">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="prescribingProfessional" label="Nom du professionnel" required />
          <Field name="clinicName" label="Clinique" required />
          <PhoneField name="phone" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Patient">
        <Field name="patientName" label="Nom ou code patient" required />
      </FormSection>

      <FormSection number="03" title="Appareil dentaire">
        <p className="text-sm text-muted-foreground mb-2">Choisissez le type d&apos;appareil prescrit.</p>
        <div
          className="grid gap-3 sm:grid-cols-2"
          onChange={(e) => {
            const target = e.target as HTMLInputElement
            if (target.name === "appareil") {
              setAppareilKey(target.value)
              setSubOption("")
              setSelectedTeeth(new Set())
            }
          }}
        >
          {APPAREILS.map((a) => (
            <RadioField
              key={a.v}
              name="appareil"
              value={a.v}
              label={a.l}
              required
              defaultChecked={appareilKey === a.v}
            />
          ))}
        </div>
        {appareilKey === "autres" && (
          <Field name="appareilOtherText" label="Veuillez préciser l'appareil" required />
        )}
      </FormSection>

      {/* Sous-option (Temporaire/Permanente, etc.) */}
      <AnimatePresence mode="wait">
        {appareil?.subOptions && (
          <motion.div key={`sub-${appareil.v}`} {...anim}>
            <FormSection number="04" title="Type">
              <p className="text-sm text-muted-foreground mb-2">Précisez le type pour : {appareil.l}.</p>
              <div
                className="grid gap-3 sm:grid-cols-2"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement
                  if (target.name === "subOption") setSubOption(target.value)
                }}
              >
                {appareil.subOptions.map((s) => (
                  <RadioField
                    key={s.v}
                    name="subOption"
                    value={s.v}
                    label={s.l}
                    required
                    defaultChecked={subOption === s.v}
                  />
                ))}
              </div>
            </FormSection>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arcade & dents */}
      <AnimatePresence mode="wait">
        {(showArch || showTeethPicker) && (
          <motion.div key={`teeth-${appareil?.v}-${subOption}`} {...anim}>
            <FormSection number="05" title="Arcade et dents">
              {showArch && (
                <div>
                  <p className="label-sm text-foreground mb-3">
                    Arcade concernée {archRequired && "*"}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {ARCADES.map((a) => (
                      <RadioField
                        key={a.v}
                        name="arcade"
                        value={a.v}
                        label={a.l}
                        required={archRequired}
                      />
                    ))}
                  </div>
                </div>
              )}
              {showTeethPicker && (
                <div className="mt-6">
                  <p className="label-sm text-foreground mb-3">
                    Numéros des dents {teethRequired && "*"}
                  </p>
                  <ToothPicker selected={selectedTeeth} onChange={toggleTooth} />
                  {/* Champ caché pour Netlify — peuplé via JS dans handleSubmit */}
                  <input type="hidden" name="teeth" value={Array.from(selectedTeeth).sort((a, b) => a - b).join(",")} />
                </div>
              )}
            </FormSection>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matériau */}
      <AnimatePresence mode="wait">
        {appareil?.materials && (
          <motion.div key={`mat-${appareil.v}`} {...anim}>
            <FormSection number="06" title="Matériau souhaité">
              <div className="grid gap-3 sm:grid-cols-2">
                {appareil.materials.map((m) => (
                  <RadioField
                    key={m.v}
                    name="material"
                    value={m.v}
                    label={m.l}
                    required
                  />
                ))}
              </div>
              {appareil.lamination && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="label-sm text-foreground mb-3">Lamination de porcelaine souhaitée *</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <RadioField name="lamination" value="oui" label="Oui" required />
                    <RadioField name="lamination" value="non" label="Non" required />
                  </div>
                </div>
              )}
            </FormSection>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Couleur */}
      <FormSection number="07" title="Couleur">
        <TextareaField
          name="colorIndications"
          label="Indications de couleur, teinte et maquillage personnalisé souhaité"
          placeholder="Ex : A2 cervical, A1 incisal, caractérisations bleutées en incisal, maquillage discret."
          rows={4}
        />
      </FormSection>

      <FormSection number="08" title="Instructions cliniques">
        <TextareaField
          name="clinicalInstructions"
          label="Instructions cliniques, particularités, exigences"
          rows={5}
        />
      </FormSection>

      <FormSection number="09" title="Fichiers">
        <FileField
          name="stlFiles"
          label="STL / scan"
          accept=".stl,.zip,.obj,.ply"
          multiple
          helpText="STL, OBJ, PLY ou ZIP. Maximum 25 MB par fichier."
        />
        <FileField
          name="photos"
          label="Photos cliniques"
          accept="image/jpeg,image/png,image/heic,.heic"
          multiple
          helpText="JPG, PNG ou HEIC."
        />
        <FileField
          name="radiographs"
          label="Radiographies"
          accept="image/jpeg,image/png,application/pdf,.heic"
          multiple
          helpText="JPG, PNG ou PDF."
        />
      </FormSection>

      <FormSection number="10" title="Consentement">
        <CheckboxField
          name="consent_patient_transmission"
          value="1"
          required
          label="Je confirme que le patient a consenti à la transmission des renseignements nécessaires."
        />
        <CheckboxField
          name="consent_privacy"
          value="1"
          required
          label={
            <>
              J&apos;ai pris connaissance de la{" "}
              <Link href={`/${lang}/confidentialite`} className="text-primary underline hover:no-underline" target="_blank">
                politique de confidentialité
              </Link>
              .
            </>
          }
        />
      </FormSection>

      {error && (
        <p className="text-sm text-accent" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous joindre par téléphone.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-hover text-primary-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? "Envoi en cours…" : "Transmettre la prescription"}
      </button>
    </form>
  )
}
