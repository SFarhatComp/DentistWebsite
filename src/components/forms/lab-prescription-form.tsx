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
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/* -------------------------------------------------------------------------- */
/* Modèle de données — appareils et leurs comportements                        */
/* -------------------------------------------------------------------------- */

type SubOption = { v: string }
type MaterialOption = { v: string }

type Appareil = {
  v: string
  subOptions?: SubOption[]
  // teeth: "required" | "optional" | "none" (Essix dépend du sous-choix, géré séparément)
  teeth: "required" | "optional" | "conditional" | "none"
  arch: "required" | "optional" | "none"
  materials?: MaterialOption[]
  lamination?: boolean
}

const RESTAURATION_MATERIALS_PERMANENT: MaterialOption[] = [
  { v: "porcelaine_feldspathique" },
  { v: "emax_presse" },
  { v: "zircone_3y" },
  { v: "zircone_multicouche" },
]

const RESTAURATION_MATERIALS_TEMPORARY: MaterialOption[] = [
  { v: "resine" },
]

const PLAQUE_MATERIALS: MaterialOption[] = [
  { v: "lt_clear" },
  { v: "lt_comfort" },
]

const APPAREILS: Appareil[] = [
  {
    v: "couronne",
    subOptions: [{ v: "temporaire" }, { v: "permanente" }],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS_PERMANENT,
    lamination: true,
  },
  {
    v: "pont",
    subOptions: [{ v: "temporaire" }, { v: "permanente" }],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS_PERMANENT,
    lamination: true,
  },
  {
    v: "incrustation",
    subOptions: [{ v: "temporaire" }, { v: "permanente" }],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS_PERMANENT,
    lamination: true,
  },
  {
    v: "facette",
    subOptions: [{ v: "temporaire" }, { v: "permanente" }],
    teeth: "required",
    arch: "required",
    materials: RESTAURATION_MATERIALS_PERMANENT,
    lamination: true,
  },
  {
    v: "prothese_amovible_complete",
    subOptions: [{ v: "immediat" }, { v: "permanent" }],
    teeth: "none",
    arch: "required",
  },
  {
    v: "guide_chirurgical",
    teeth: "optional",
    arch: "required",
  },
  {
    v: "plaque_occlusale",
    subOptions: [{ v: "rigide" }, { v: "flexible" }],
    teeth: "none",
    arch: "required",
    materials: PLAQUE_MATERIALS,
  },
  {
    v: "porte_empreinte",
    teeth: "none",
    arch: "required",
  },
  {
    v: "gouttiere_retention",
    teeth: "none",
    arch: "required",
  },
  {
    v: "gouttiere_blanchiment",
    teeth: "none",
    arch: "required",
  },
  {
    v: "essix",
    subOptions: [{ v: "avec_dent_postiche" }, { v: "sans_dent_postiche" }],
    teeth: "conditional", // requis seulement si "avec dent postiche"
    arch: "required",
  },
  {
    v: "wax_up",
    teeth: "required",
    arch: "required",
  },
  {
    v: "reparation",
    teeth: "optional",
    arch: "optional",
  },
  {
    v: "autres",
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

const ARCADES_CODES = ["superieure", "inferieure", "les_deux"] as const

/* -------------------------------------------------------------------------- */
/* Sous-composant : sélecteur de dents par quadrant                           */
/* -------------------------------------------------------------------------- */

function ToothPicker({
  selected,
  onChange,
  lang,
}: {
  selected: Set<number>
  onChange: (n: number) => void
  lang: Locale
}) {
  const t = getTranslations(lang)
  return (
    <div className="border border-border bg-surface/40 p-4 space-y-3">
      <p className="label-sm text-muted-foreground">{t("labPrescriptionForm.toothPickerInstruction")}</p>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex gap-1 justify-center" aria-label={t("labPrescriptionForm.toothPickerAriaUpper")}>
          {TEETH_UPPER_RIGHT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
          <div className="w-1 bg-border mx-1" aria-hidden="true" />
          {TEETH_UPPER_LEFT.map((n) => (
            <ToothButton key={n} n={n} selected={selected.has(n)} onClick={() => onChange(n)} />
          ))}
        </div>
        <div className="flex gap-1 justify-center" aria-label={t("labPrescriptionForm.toothPickerAriaLower")}>
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
        {t("labPrescriptionForm.toothPickerSelected")}{" "}
        {selected.size > 0 ? (
          <span className="font-mono">{Array.from(selected).sort((a, b) => a - b).join(", ")}</span>
        ) : (
          <em>{t("labPrescriptionForm.toothPickerNone")}</em>
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
  const t = getTranslations(lang)
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
      aria-label={t("labPrescriptionForm.ariaLabel")}
    >
      <input type="hidden" name="form-name" value="lab-prescription" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          {t("labPrescriptionForm.intro")}
        </p>
      </div>

      <FormSection number="01" title={t("labPrescriptionForm.section1Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="prescribingProfessional" label={t("labPrescriptionForm.prescribingProfessional")} required />
          <Field name="clinicName" label={t("labPrescriptionForm.clinicName")} required />
          <PhoneField name="phone" required lang={lang} />
          <Field name="email" label={t("labPrescriptionForm.email")} type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title={t("labPrescriptionForm.section2Title")}>
        <Field name="patientName" label={t("labPrescriptionForm.patientName")} required />
      </FormSection>

      <FormSection number="03" title={t("labPrescriptionForm.section3Title")}>
        <p className="text-sm text-muted-foreground mb-2">{t("labPrescriptionForm.section3Intro")}</p>
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
              label={t(`labPrescriptionForm.appareils.${a.v}`)}
              required
              defaultChecked={appareilKey === a.v}
            />
          ))}
        </div>
        {appareilKey === "autres" && (
          <Field name="appareilOtherText" label={t("labPrescriptionForm.appareilOtherText")} required />
        )}
      </FormSection>

      {/* Sous-option (Temporaire/Permanente, etc.) */}
      <AnimatePresence mode="wait">
        {appareil?.subOptions && (
          <motion.div key={`sub-${appareil.v}`} {...anim}>
            <FormSection number="04" title={t("labPrescriptionForm.section4Title")}>
              <p className="text-sm text-muted-foreground mb-2">
                {t("labPrescriptionForm.section4IntroPrefix")}
                {t(`labPrescriptionForm.appareils.${appareil.v}`)}.
              </p>
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
                    label={t(`labPrescriptionForm.subOptions.${s.v}`)}
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
            <FormSection number="05" title={t("labPrescriptionForm.section5Title")}>
              {showArch && (
                <div>
                  <p className="label-sm text-foreground mb-3">
                    {t("labPrescriptionForm.arcadeLabel")} {archRequired && "*"}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {ARCADES_CODES.map((v) => (
                      <RadioField
                        key={v}
                        name="arcade"
                        value={v}
                        label={t(`labPrescriptionForm.arcades.${v}`)}
                        required={archRequired}
                      />
                    ))}
                  </div>
                </div>
              )}
              {showTeethPicker && (
                <div className="mt-6">
                  <p className="label-sm text-foreground mb-3">
                    {t("labPrescriptionForm.teethLabel")} {teethRequired && "*"}
                  </p>
                  <ToothPicker selected={selectedTeeth} onChange={toggleTooth} lang={lang} />
                  {/* Champ caché pour Netlify — peuplé via JS dans handleSubmit */}
                  <input type="hidden" name="teeth" value={Array.from(selectedTeeth).sort((a, b) => a - b).join(",")} />
                </div>
              )}
            </FormSection>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Couleur — affichée avant le matériau (ordre Forme → Couleur → Matériaux) */}
      <FormSection number="06" title={t("labPrescriptionForm.section6Title")}>
        <TextareaField
          name="colorIndications"
          label={t("labPrescriptionForm.colorIndicationsLabel")}
          placeholder={t("labPrescriptionForm.colorIndicationsPlaceholder")}
          rows={4}
        />
      </FormSection>

      {/* Matériau — pour C/P/I/F temporaire : seule la Résine est offerte, pas de lamination */}
      <AnimatePresence mode="wait">
        {appareil?.materials && (() => {
          const isTemporaryRestoration =
            ["couronne", "pont", "incrustation", "facette"].includes(appareil.v) &&
            subOption === "temporaire"
          const activeMaterials = isTemporaryRestoration
            ? RESTAURATION_MATERIALS_TEMPORARY
            : appareil.materials
          const showLamination = appareil.lamination && !isTemporaryRestoration
          return (
            <motion.div key={`mat-${appareil.v}-${subOption}`} {...anim}>
              <FormSection number="07" title={t("labPrescriptionForm.section7Title")}>
                {isTemporaryRestoration && (
                  <p className="text-sm text-muted-foreground italic mb-4">
                    {t("labPrescriptionForm.temporaryRestorationNote")}
                  </p>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {activeMaterials.map((m) => (
                    <RadioField
                      key={m.v}
                      name="material"
                      value={m.v}
                      label={t(`labPrescriptionForm.materials.${m.v}`)}
                      required
                    />
                  ))}
                </div>
                {showLamination && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="label-sm text-foreground mb-3">{t("labPrescriptionForm.laminationLabel")} *</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <RadioField name="lamination" value="oui" label={t("labPrescriptionForm.yes")} required />
                      <RadioField name="lamination" value="non" label={t("labPrescriptionForm.no")} required />
                    </div>
                  </div>
                )}
              </FormSection>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      <FormSection number="08" title={t("labPrescriptionForm.section8Title")}>
        <TextareaField
          name="clinicalInstructions"
          label={t("labPrescriptionForm.clinicalInstructionsLabel")}
          rows={5}
        />
      </FormSection>

      <FormSection number="09" title={t("labPrescriptionForm.section9Title")}>
        <FileField
          name="stlFiles"
          label={t("labPrescriptionForm.stlFilesLabel")}
          accept=".stl,.zip,.obj,.ply"
          multiple
          helpText={t("labPrescriptionForm.stlFilesHelp")}
        />
        <FileField
          name="photos"
          label={t("labPrescriptionForm.photosLabel")}
          accept="image/jpeg,image/png,image/heic,.heic"
          multiple
          helpText={t("labPrescriptionForm.photosHelp")}
        />
        <FileField
          name="radiographs"
          label={t("labPrescriptionForm.radiographsLabel")}
          accept="image/jpeg,image/png,application/pdf,.heic"
          multiple
          helpText={t("labPrescriptionForm.radiographsHelp")}
        />
      </FormSection>

      <FormSection number="10" title={t("labPrescriptionForm.section10Title")}>
        <CheckboxField
          name="consent_patient_transmission"
          value="1"
          required
          label={t("labPrescriptionForm.consentPatientTransmission")}
        />
        <CheckboxField
          name="consent_privacy"
          value="1"
          required
          label={
            <>
              {t("labPrescriptionForm.consentPrivacyBefore")}
              <Link href={`/${lang}/confidentialite`} className="text-primary underline hover:no-underline" target="_blank">
                {t("labPrescriptionForm.consentPrivacyLink")}
              </Link>
              {t("labPrescriptionForm.consentPrivacyAfter")}
            </>
          }
        />
      </FormSection>

      {error && (
        <p className="text-sm text-accent" role="alert">
          {t("labPrescriptionForm.errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-hover text-primary-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("labPrescriptionForm.submitting") : t("labPrescriptionForm.submit")}
      </button>
    </form>
  )
}
