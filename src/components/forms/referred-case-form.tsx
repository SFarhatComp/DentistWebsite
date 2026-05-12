"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, CheckboxField, FileField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

export function ReferredCaseForm({ lang }: { lang: Locale }) {
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
      name="referred-case"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label="Formulaire de référence d'un cas patient"
    >
      <input type="hidden" name="form-name" value="referred-case" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          Permettre au Studio Dentaire De Facto de recevoir un rapport du cas référé avec photos, fichiers ou informations cliniques pertinentes.
        </p>
      </div>

      <FormSection number="01" title="Professionnel référent">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="referringProfessionalName" label="Nom du professionnel" required />
          <Field name="clinicName" label="Clinique" required />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Patient référé">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="patientName" label="Nom du patient" required />
          <Field name="patientDob" label="Date de naissance" type="date" required />
        </div>
      </FormSection>

      <FormSection number="03" title="Contexte clinique">
        <TextareaField name="referralReason" label="Raison de référence" rows={4} required />
        <Field name="affectedTeeth" label="Dent(s) concernée(s)" />
        <TextareaField name="relevantHistory" label="Historique pertinent" rows={3} />
        <Field name="requestedTreatment" label="Traitement demandé" />
      </FormSection>

      <FormSection number="04" title="Fichiers cliniques">
        <FileField
          name="photos"
          label="Photos cliniques"
          accept="image/jpeg,image/png,image/heic,.heic"
          multiple
          helpText="JPG, PNG ou HEIC. Maximum 10 MB par photo."
        />
        <FileField
          name="radiographs"
          label="Radiographies"
          accept="image/jpeg,image/png,application/pdf,image/heic,.heic"
          multiple
          helpText="JPG, PNG, PDF ou HEIC."
        />
        <FileField
          name="relevantFiles"
          label="Autres fichiers pertinents (optionnel)"
          accept=".stl,.zip,application/pdf,image/*,.heic"
          multiple
          helpText="STL, ZIP, PDF ou images."
        />
        <TextareaField name="comments" label="Commentaires" rows={3} />
      </FormSection>

      <FormSection number="05" title="Consentements">
        <CheckboxField
          name="consent_clinical_responsibility"
          value="1"
          label="Je confirme que le patient demeure sous ma responsabilité clinique lorsque applicable."
        />
        <CheckboxField
          name="consent_transmission"
          value="1"
          required
          label="Je confirme que la transmission des renseignements nécessaires a été faite avec le consentement du patient."
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
        {submitting ? "Envoi en cours…" : "Transmettre la référence"}
      </button>
    </form>
  )
}
