"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, PhoneField, CheckboxField, RadioField, FileField, HoneypotField } from "./fields"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const TYPES_CODES = [
  "douleur",
  "enflure",
  "abces",
  "fracture",
  "trauma",
  "saignement",
  "couronne",
  "restauration",
  "infection",
  "autre",
] as const

const SYMPTOM_CODES = ["sym_swelling", "sym_fever", "sym_swallow", "sym_breathe", "sym_night"] as const

export function EmergencyForm({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

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
      name="emergency"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      <input type="hidden" name="form-name" value="emergency" />
      <HoneypotField />

      <div className="border-l-4 border-accent bg-accent/5 p-6">
        <p className="text-sm text-foreground leading-relaxed">
          <strong className="font-medium">{t("emergencyForm.medicalWarningStrong")}</strong>{" "}
          {t("emergencyForm.medicalWarning")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="firstName" label={t("emergencyForm.firstName")} required />
          <Field name="lastName" label={t("emergencyForm.lastName")} required />
          <PhoneField name="phone" required lang={lang} />
          <Field name="email" label={t("emergencyForm.email")} type="email" required />
          <Field name="dob" label={t("emergencyForm.dob")} type="date" required className="md:col-span-2" />
        </div>

        <div>
          <div className="label-sm text-foreground mb-3">{t("emergencyForm.typesLabel")}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {TYPES_CODES.map((code) => (
              <CheckboxField key={code} name={`type_${code}`} value="1" label={t(`emergencyForm.types.${code}`)} />
            ))}
          </div>
        </div>

        <div>
          <div className="label-sm text-foreground mb-3">{t("emergencyForm.symptomsLabel")}</div>
          <div className="space-y-4">
            {SYMPTOM_CODES.map((code) => (
              <div key={code} className="border-t border-border pt-4">
                <div className="text-sm text-foreground mb-2">{t(`emergencyForm.symptoms.${code}`)}</div>
                <div className="flex gap-6">
                  <RadioField name={code} value="yes" label={t("emergencyForm.yes")} />
                  <RadioField name={code} value="no" label={t("emergencyForm.no")} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field name="symptomDuration" label={t("emergencyForm.symptomDuration")} />

        <FileField
          name="photo"
          label={t("emergencyForm.photoLabel")}
          accept="image/jpeg,image/png,image/heic,.heic"
          helpText={t("emergencyForm.photoHelp")}
        />

        <div className="border-t border-border pt-6 space-y-4">
          <div className="label-sm text-foreground">{t("emergencyForm.consentsLabel")}</div>
          <CheckboxField
            name="consent_emergency"
            value="1"
            required
            label={t("emergencyForm.consentEmergency")}
          />
          <CheckboxField
            name="consent_contact"
            value="1"
            required
            label={t("emergencyForm.consentContact")}
          />
          <CheckboxField
            name="consent_privacy"
            value="1"
            required
            label={
              <>
                {t("emergencyForm.consentPrivacyPrefix")}
                <Link href={`/${lang}/confidentialite`} className="text-primary underline hover:no-underline" target="_blank">
                  {t("emergencyForm.consentPrivacyLink")}
                </Link>
                {t("emergencyForm.consentPrivacySuffix")}
              </>
            }
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-accent">{t("emergencyForm.error")}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("emergencyForm.submitting") : t("emergencyForm.submit")}
      </button>
    </form>
  )
}
