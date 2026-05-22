"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, PhoneField, TextareaField, SelectField, CheckboxField, RadioField, FileField, FormSection, HoneypotField } from "./fields"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const LANGUES_CODES = ["francais", "anglais", "francais_anglais", "autre"] as const

const MOTIFS_PRINCIPAUX_CODES = [
  "evaluation_complete",
  "douleur",
  "esthetique",
  "endodontie",
  "parodontie",
  "implantologie",
  "prosthodontie",
  "deuxieme_avis",
  "laboratoire",
  "autre",
] as const

const MOTIFS_SECONDAIRES_CODES = [
  "douleur",
  "sensibilite",
  "saignement_gencives",
  "dent_mobile",
  "fracture",
  "usure",
  "esthetique",
  "infection",
  "autre",
] as const

const DOCUMENTS_TRANSMIS_CODES = [
  "photos",
  "radiographies",
  "stl_scan",
  "plan_traitement",
  "notes_cliniques",
  "autre",
] as const

export function ReferredCaseForm({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [langValue, setLangValue] = useState("")
  const [motifValue, setMotifValue] = useState("")

  const langues = LANGUES_CODES.map((v) => ({
    value: v,
    label: t(`referredCaseForm.langues.${v}`),
  }))

  const motifsPrincipaux = MOTIFS_PRINCIPAUX_CODES.map((v) => ({
    value: v,
    label: t(`referredCaseForm.motifsPrincipaux.${v}`),
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
      name="referred-case"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label={t("referredCaseForm.ariaLabel")}
    >
      <input type="hidden" name="form-name" value="referred-case" />
      <input type="hidden" name="lang" value={lang} />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          {t("referredCaseForm.intro")}
        </p>
      </div>

      <FormSection number="01" title={t("referredCaseForm.section1Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="referringProfessionalName" label={t("referredCaseForm.referringProfessionalName")} required />
          <Field name="clinicName" label={t("referredCaseForm.clinicName")} required />
          <PhoneField name="clinicPhone" label={t("referredCaseForm.clinicPhone")} required lang={lang} />
          <Field name="email" label={t("referredCaseForm.email")} type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title={t("referredCaseForm.section2Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="patientName" label={t("referredCaseForm.patientName")} required />
          <Field name="patientDob" label={t("referredCaseForm.patientDob")} type="date" required />
          <PhoneField name="patientPhone" label={t("referredCaseForm.patientPhone")} required lang={lang} />
          <Field name="patientEmail" label={t("referredCaseForm.patientEmail")} type="email" />
        </div>
        <SelectField
          name="patientLanguage"
          label={t("referredCaseForm.patientLanguage")}
          options={langues}
          onChange={(v) => setLangValue(v)}
        />
        {langValue === "autre" && (
          <Field name="patientLanguageOther" label={t("referredCaseForm.patientLanguageOther")} required />
        )}
      </FormSection>

      <FormSection number="03" title={t("referredCaseForm.section3Title")}>
        <SelectField
          name="referralMainReason"
          label={t("referredCaseForm.referralMainReason")}
          required
          options={motifsPrincipaux}
          onChange={(v) => setMotifValue(v)}
        />
        {motifValue === "autre" && (
          <Field name="referralMainReasonOther" label={t("referredCaseForm.referralMainReasonOther")} required />
        )}
        <div>
          <div className="label-sm text-foreground mb-3">{t("referredCaseForm.motifsSecondairesLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOTIFS_SECONDAIRES_CODES.map((v) => (
              <CheckboxField
                key={v}
                name={`motif_secondaire_${v}`}
                value="1"
                label={t(`referredCaseForm.motifsSecondaires.${v}`)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="label-sm text-foreground mb-3">{t("referredCaseForm.urgencyLabel")} *</div>
          <div className="flex gap-6">
            <RadioField name="urgency" value="oui" label={t("referredCaseForm.yes")} required />
            <RadioField name="urgency" value="non" label={t("referredCaseForm.no")} required />
          </div>
        </div>
        <TextareaField name="clinicalSummary" label={t("referredCaseForm.clinicalSummary")} rows={4} />
        <TextareaField name="previousTreatments" label={t("referredCaseForm.previousTreatments")} rows={3} />
        <div>
          <div className="label-sm text-foreground mb-3">{t("referredCaseForm.documentsTransmisLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {DOCUMENTS_TRANSMIS_CODES.map((v) => (
              <CheckboxField
                key={v}
                name={`doc_${v}`}
                value="1"
                label={t(`referredCaseForm.documentsTransmis.${v}`)}
              />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection number="04" title={t("referredCaseForm.section4Title")}>
        <FileField
          name="photos"
          label={t("referredCaseForm.photosLabel")}
          accept="image/jpeg,image/png,image/heic,.heic"
          multiple
          helpText={t("referredCaseForm.photosHelp")}
        />
        <FileField
          name="radiographs"
          label={t("referredCaseForm.radiographsLabel")}
          accept="image/jpeg,image/png,application/pdf,.heic"
          multiple
          helpText={t("referredCaseForm.radiographsHelp")}
        />
        <FileField
          name="stlFiles"
          label={t("referredCaseForm.stlFilesLabel")}
          accept=".stl,.zip,.obj,.ply"
          multiple
          helpText={t("referredCaseForm.stlFilesHelp")}
        />
      </FormSection>

      <FormSection number="05" title={t("referredCaseForm.section5Title")}>
        <CheckboxField
          name="consent_patient_informed"
          value="1"
          required
          label={t("referredCaseForm.consentPatientInformed")}
        />
        <CheckboxField
          name="consent_transmission"
          value="1"
          required
          label={t("referredCaseForm.consentTransmission")}
        />
        <CheckboxField
          name="consent_privacy"
          value="1"
          required
          label={
            <>
              {t("referredCaseForm.consentPrivacyBefore")}
              <Link href={`/${lang}/confidentialite`} className="text-primary underline hover:no-underline" target="_blank">
                {t("referredCaseForm.consentPrivacyLink")}
              </Link>
              {t("referredCaseForm.consentPrivacyAfter")}
            </>
          }
        />
      </FormSection>

      {error && (
        <p className="text-sm text-accent" role="alert">
          {t("referredCaseForm.errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-hover text-primary-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("referredCaseForm.submitting") : t("referredCaseForm.submit")}
      </button>
    </form>
  )
}
