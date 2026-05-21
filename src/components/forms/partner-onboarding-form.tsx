"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, PhoneField, TextareaField, SelectField, CheckboxField, FormSection, HoneypotField } from "./fields"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const PROFESSIONAL_TITLES_CODES = [
  "dentiste_generaliste",
  "prosthodontiste",
  "orthodontiste",
  "parodontiste",
  "endodontiste",
  "chirurgien_maxillo_facial",
  "denturologiste",
  "hygieniste_dentaire",
  "gestionnaire_clinique",
  "autre",
] as const

const COLLABORATION_TYPES_CODES = [
  "lab_regulier",
  "lab_occasionnel",
  "cas_esthetiques",
  "consultation",
  "reference_clinique",
  "autre",
] as const

const SERVICES_CODES = [
  "orthodontie",
  "prostho_amovible",
  "prostho_fixe",
  "plaques_occlusales",
  "gouttieres",
  "wax_up",
  "prise_teinte",
  "esthetique",
  "reparations",
  "emax",
  "zircone",
  "impression_3d",
  "autre",
] as const

const CONTACT_PREFS_CODES = ["telephone", "courriel", "sms", "en_personne"] as const

export function PartnerOnboardingForm({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [titleValue, setTitleValue] = useState("")

  const professionalTitles = PROFESSIONAL_TITLES_CODES.map((v) => ({
    value: v,
    label: t(`partnerOnboardingForm.professionalTitles.${v}`),
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
      name="partner-onboarding"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label={t("partnerOnboardingForm.ariaLabel")}
    >
      <input type="hidden" name="form-name" value="partner-onboarding" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          {t("partnerOnboardingForm.intro")}
        </p>
      </div>

      <FormSection number="01" title={t("partnerOnboardingForm.section1Title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="dentistName" label={t("partnerOnboardingForm.dentistName")} required />
          <SelectField
            name="professionalTitle"
            label={t("partnerOnboardingForm.professionalTitle")}
            required
            options={professionalTitles}
            onChange={(v) => setTitleValue(v)}
          />
        </div>
        {titleValue === "autre" && (
          <Field name="professionalTitleOther" label={t("partnerOnboardingForm.professionalTitleOther")} required />
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="clinicName" label={t("partnerOnboardingForm.clinicName")} required />
          <Field name="clinicAddress" label={t("partnerOnboardingForm.clinicAddress")} />
          <PhoneField name="phone" required />
          <Field name="email" label={t("partnerOnboardingForm.email")} type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title={t("partnerOnboardingForm.section2Title")}>
        <p className="text-sm text-muted-foreground">{t("partnerOnboardingForm.section2Intro")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {COLLABORATION_TYPES_CODES.map((v) => (
            <CheckboxField
              key={v}
              name={`collaboration_${v}`}
              value="1"
              label={t(`partnerOnboardingForm.collaborationTypes.${v}`)}
            />
          ))}
        </div>
      </FormSection>

      <FormSection number="03" title={t("partnerOnboardingForm.section3Title")}>
        <p className="text-sm text-muted-foreground">{t("partnerOnboardingForm.section3Intro")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES_CODES.map((v) => (
            <CheckboxField
              key={v}
              name={`service_${v}`}
              value="1"
              label={t(`partnerOnboardingForm.services.${v}`)}
            />
          ))}
        </div>
      </FormSection>

      <FormSection number="04" title={t("partnerOnboardingForm.section4Title")}>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACT_PREFS_CODES.map((v) => (
            <CheckboxField
              key={v}
              name={`contact_${v}`}
              value="1"
              label={t(`partnerOnboardingForm.contactPrefs.${v}`)}
            />
          ))}
        </div>
      </FormSection>

      <FormSection number="05" title={t("partnerOnboardingForm.section5Title")}>
        <TextareaField name="message" label={t("partnerOnboardingForm.messageLabel")} rows={5} />
      </FormSection>

      <FormSection number="06" title={t("partnerOnboardingForm.section6Title")}>
        <CheckboxField
          name="consent_contact"
          value="1"
          required
          label={t("partnerOnboardingForm.consentContact")}
        />
        <CheckboxField
          name="consent_privacy"
          value="1"
          required
          label={
            <>
              {t("partnerOnboardingForm.consentPrivacyBefore")}
              <Link href={`/${lang}/confidentialite`} className="text-primary underline hover:no-underline" target="_blank">
                {t("partnerOnboardingForm.consentPrivacyLink")}
              </Link>
              {t("partnerOnboardingForm.consentPrivacyAfter")}
            </>
          }
        />
      </FormSection>

      {error && (
        <p className="text-sm text-accent" role="alert">
          {t("partnerOnboardingForm.errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-hover text-primary-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("partnerOnboardingForm.submitting") : t("partnerOnboardingForm.submit")}
      </button>
    </form>
  )
}
