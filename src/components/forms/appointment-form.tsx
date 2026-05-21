"use client"
import { useState } from "react"
import { Field, PhoneField, TextareaField, SelectField, CheckboxField, FormSection, HoneypotField } from "./fields"
import { ConsentGroup } from "./consent-group"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

// Codes de valeur — stables (soumis à Netlify, conservés tels quels)
const TYPES_DEMANDE_CODES = [
  "premiere_visite",
  "nettoyage",
  "consultation_ciblee",
  "urgence",
  "douleur",
  "dent_cassee",
  "esthetique",
  "orthodontie",
  "implant_couronne",
  "laboratoire",
  "autre",
] as const

const MOTIFS_SECONDAIRES_CODES = [
  "douleur",
  "sensibilite",
  "saignement_gencives",
  "mauvaise_haleine",
  "dent_mobile",
  "fracture",
  "usure",
  "serrement_grincement",
  "esthetique",
  "deuxieme_avis",
  "suivi_traitement",
  "autre",
] as const

const LANGUES_CODES = ["francais", "anglais", "francais_anglais", "autre"] as const

const JOURS_CODES = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "asap",
  "flexible",
] as const

const MOMENTS_CODES = ["matin", "midi", "apres_midi", "flexible"] as const

const CONTACT_MODES_CODES = ["telephone", "courriel", "sms"] as const

// Conditions médicales (cahier §22.2) — 23 conditions cochables (+ allergies + autre rendues séparément)
const MEDICAL_CONDITIONS_CODES = [
  "hypertension",
  "cardiaque",
  "souffle_valvulaire",
  "endocardite",
  "diabete",
  "respiratoire",
  "apnee_sommeil",
  "foie",
  "renale",
  "coagulation",
  "anticoagulants",
  "epilepsie",
  "neurologique",
  "cancer",
  "radiotherapie",
  "chimiotherapie",
  "immunosuppression",
  "osteoporose",
  "bisphosphonates",
  "thyroide",
  "reflux",
  "anxiete",
  "grossesse",
] as const

export function AppointmentForm({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [typeValue, setTypeValue] = useState("")
  const [langValue, setLangValue] = useState("")
  const [showMedicalQuestionnaire, setShowMedicalQuestionnaire] = useState(false)
  const [hasAllergies, setHasAllergies] = useState(false)
  const [hasOtherCondition, setHasOtherCondition] = useState(false)

  const typesDemande = TYPES_DEMANDE_CODES.map((v) => ({
    value: v,
    label: t(`appointmentForm.typesDemande.${v}`),
  }))
  const langues = LANGUES_CODES.map((v) => ({
    value: v,
    label: t(`appointmentForm.langues.${v}`),
  }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    const data = new FormData(e.currentTarget)
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
      name="appointment"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label={t("appointmentForm.ariaLabel")}
    >
      <input type="hidden" name="form-name" value="appointment" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3 mb-4">
        <p className="text-base text-foreground leading-relaxed">
          {t("appointmentForm.introPrimary")}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("appointmentForm.introSecondary")}
        </p>
      </div>

      <FormSection number="01" title={t("appointmentForm.section1Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="firstName" label={t("appointmentForm.firstName")} required />
          <Field name="lastName" label={t("appointmentForm.lastName")} required />
        </div>
      </FormSection>

      <FormSection number="02" title={t("appointmentForm.section2Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <PhoneField name="phone" required />
          <Field name="email" label={t("appointmentForm.email")} type="email" />
        </div>
        <SelectField
          name="preferredLanguage"
          label={t("appointmentForm.preferredLanguage")}
          options={langues}
          onChange={(v) => setLangValue(v)}
        />
        {langValue === "autre" && (
          <Field name="preferredLanguageOther" label={t("appointmentForm.preferredLanguageOther")} required />
        )}
      </FormSection>

      <FormSection number="03" title={t("appointmentForm.section3Title")}>
        <SelectField
          name="typeDemande"
          label={t("appointmentForm.typeDemande")}
          required
          options={typesDemande}
          onChange={(v) => setTypeValue(v)}
        />
        {typeValue === "autre" && (
          <Field name="typeDemandeOther" label={t("appointmentForm.typeDemandeOther")} required />
        )}
        <div>
          <div className="label-sm text-foreground mb-3">{t("appointmentForm.motifsLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOTIFS_SECONDAIRES_CODES.map((v) => (
              <CheckboxField key={v} name={`motif_${v}`} value="1" label={t(`appointmentForm.motifsSecondaires.${v}`)} />
            ))}
          </div>
        </div>
        <TextareaField name="message" label={t("appointmentForm.messageLabel")} rows={4} />
      </FormSection>

      <FormSection number="04" title={t("appointmentForm.section4Title")}>
        <div>
          <div className="label-sm text-foreground mb-3">{t("appointmentForm.joursLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {JOURS_CODES.map((v) => (
              <CheckboxField key={v} name={`jour_${v}`} value="1" label={t(`appointmentForm.jours.${v}`)} />
            ))}
          </div>
        </div>
        <div>
          <div className="label-sm text-foreground mb-3">{t("appointmentForm.momentsLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOMENTS_CODES.map((v) => (
              <CheckboxField key={v} name={`moment_${v}`} value="1" label={t(`appointmentForm.moments.${v}`)} />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection number="05" title={t("appointmentForm.section5Title")}>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACT_MODES_CODES.map((v) => (
            <CheckboxField key={v} name={`contact_${v}`} value="1" label={t(`appointmentForm.contactModes.${v}`)} />
          ))}
        </div>
      </FormSection>

      {/* Questionnaire médical — section optionnelle dépliable */}
      <FormSection number="06" title={t("appointmentForm.section6Title")}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("appointmentForm.medicalIntro")}
        </p>
        <button
          type="button"
          onClick={() => setShowMedicalQuestionnaire(!showMedicalQuestionnaire)}
          className="text-sm text-primary underline hover:no-underline"
          aria-expanded={showMedicalQuestionnaire}
          aria-controls="medical-questionnaire"
        >
          {showMedicalQuestionnaire ? t("appointmentForm.medicalHide") : t("appointmentForm.medicalShow")}
        </button>

        {showMedicalQuestionnaire && (
          <div id="medical-questionnaire" className="space-y-6 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground mb-4">
                {t("appointmentForm.medicalQuestion")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {MEDICAL_CONDITIONS_CODES.map((v) => (
                  <CheckboxField key={v} name={`condition_${v}`} value="1" label={t(`appointmentForm.medicalConditions.${v}`)} />
                ))}
                <CheckboxField
                  name="condition_allergies"
                  value="1"
                  label={t("appointmentForm.conditionAllergies")}
                  className="col-span-full"
                />
                <CheckboxField
                  name="condition_autre"
                  value="1"
                  label={t("appointmentForm.conditionAutre")}
                  className="col-span-full"
                />
              </div>
              {/* Champs conditionnels — simplification : on les montre toujours mais discrètement */}
              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={hasAllergies}
                    onChange={(e) => setHasAllergies(e.target.checked)}
                    className="mt-1 h-4 w-4 border-border accent-primary"
                  />
                  <span>{t("appointmentForm.hasAllergiesCheckbox")}</span>
                </label>
                {hasAllergies && (
                  <TextareaField
                    name="allergies_details"
                    label={t("appointmentForm.allergiesDetailsLabel")}
                    rows={3}
                  />
                )}
                <label className="flex items-start gap-3 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={hasOtherCondition}
                    onChange={(e) => setHasOtherCondition(e.target.checked)}
                    className="mt-1 h-4 w-4 border-border accent-primary"
                  />
                  <span>{t("appointmentForm.hasOtherConditionCheckbox")}</span>
                </label>
                {hasOtherCondition && (
                  <TextareaField
                    name="other_condition_details"
                    label={t("appointmentForm.otherConditionDetailsLabel")}
                    rows={3}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </FormSection>

      <FormSection number="07" title={t("appointmentForm.section7Title")}>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          {t("appointmentForm.consentsIntro")}
        </p>
        <ConsentGroup lang={lang} />
      </FormSection>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {t("appointmentForm.errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("appointmentForm.submitting") : t("appointmentForm.submit")}
      </button>
    </form>
  )
}
