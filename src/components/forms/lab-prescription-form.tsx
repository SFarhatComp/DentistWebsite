"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, FileField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const PRESCRIPTION_TYPES = [
  { value: "couronne", label: "Couronne" },
  { value: "couronne_emax", label: "Couronne e.max pressée" },
  { value: "couronne_zircone", label: "Couronne zircone usinée" },
  { value: "pont", label: "Pont" },
  { value: "facette", label: "Facette" },
  { value: "incrustation", label: "Incrustation / onlay" },
  { value: "prothese_complete", label: "Prothèse complète" },
  { value: "prothese_partielle", label: "Prothèse partielle" },
  { value: "gouttiere", label: "Gouttière" },
  { value: "wax_up", label: "Wax-up diagnostique" },
  { value: "modele", label: "Modèle imprimé" },
  { value: "plo", label: "PLO" },
  { value: "temporaire", label: "Restauration temporaire" },
  { value: "reparation", label: "Réparation" },
  { value: "autre", label: "Autre — voir notes" },
]

export function LabPrescriptionForm({ lang }: { lang: Locale }) {
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
          Permettre la prescription d&apos;un appareil ou d&apos;une restauration et la transmission de fichiers STL, radiographies, photos ou documents cliniques.
        </p>
      </div>

      <FormSection number="01" title="Professionnel prescripteur">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="prescribingProfessional" label="Nom du professionnel" required />
          <Field name="clinicName" label="Clinique" required />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Patient">
        <Field name="patientName" label="Nom du patient" required />
      </FormSection>

      <FormSection number="03" title="Détails de la prescription">
        <SelectField name="prescriptionType" label="Type de prescription" required options={PRESCRIPTION_TYPES} />
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="affectedTeeth" label="Dent(s) concernée(s)" />
          <Field name="material" label="Matériau souhaité" />
          <Field name="shade" label="Teinte" />
          <Field name="applianceType" label="Type d'appareil (si applicable)" />
          <Field name="desiredDeadline" label="Délai souhaité (optionnel)" type="date" className="md:col-span-2" />
        </div>
      </FormSection>

      <FormSection number="04" title="Fichiers">
        <FileField
          name="stlFiles"
          label="Fichiers STL"
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

      <FormSection number="05" title="Notes cliniques">
        <TextareaField name="clinicalNotes" label="Notes cliniques" rows={4} />
        <TextareaField name="specialRequirements" label="Exigences particulières (optionnel)" rows={3} />
      </FormSection>

      <FormSection number="06" title="Consentement">
        <CheckboxField
          name="consent_clarification"
          value="1"
          required
          label="J'accepte d'être contacté pour clarifications si nécessaire."
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
