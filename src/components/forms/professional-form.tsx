"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, FileField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const CASE_TYPES = [
  { value: "couronne", label: "Couronne" },
  { value: "pont", label: "Pont" },
  { value: "onlay", label: "Onlay / inlay" },
  { value: "modele", label: "Modèle imprimé" },
  { value: "guide", label: "Guide chirurgical" },
  { value: "gouttiere", label: "Gouttière / orthèse" },
  { value: "wax-up", label: "Wax-up diagnostique" },
  { value: "temporaire", label: "Provisoire / temporaire" },
  { value: "teinte", label: "Prise de teinte / consultation" },
  { value: "autre", label: "Autre — voir commentaires" },
]

export function ProfessionalForm({ lang }: { lang: Locale }) {
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
      name="lab-professional"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label="Formulaire de prescription professionnelle"
    >
      <input type="hidden" name="form-name" value="lab-professional" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          Ce formulaire s&apos;adresse aux dentistes référents et collègues souhaitant transmettre une prescription, demander une consultation ou discuter d&apos;un cas.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pour les patients, veuillez utiliser le formulaire de rendez-vous régulier ou le parcours d&apos;urgence.
        </p>
      </div>

      <FormSection number="01" title="Identification">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="dentistName" label="Nom du dentiste" required />
          <Field name="clinic" label="Clinique / cabinet" />
          <Field name="email" label="Courriel professionnel" type="email" required />
          <Field name="phone" label="Téléphone" type="tel" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Détails du cas">
        <SelectField name="caseType" label="Type de cas" required options={CASE_TYPES} />
        <Field name="material" label="Matériau souhaité (ex. zircone, e.max, hybride…)" />
        <TextareaField
          name="comments"
          label="Commentaires cliniques, instructions, particularités"
          rows={5}
          required
        />
      </FormSection>

      <FormSection number="03" title="Fichiers">
        <FileField
          name="stlFile"
          label="Fichier STL ou archive (optionnel à ce stade)"
          accept=".stl,.zip,.obj,.ply"
          helpText="STL, OBJ, PLY ou ZIP. Maximum 25 MB. Pour les fichiers plus volumineux, l'équipe vous communiquera un canal alternatif."
        />
        <FileField
          name="photos"
          label="Photos cliniques (optionnel)"
          accept="image/jpeg,image/png,image/heic,.heic"
          multiple
          helpText="JPG, PNG ou HEIC. Maximum 10 MB par photo."
        />
      </FormSection>

      <FormSection number="04" title="Consentements">
        <div className="space-y-4">
          <CheckboxField
            name="consent_contact"
            value="1"
            required
            label="J'autorise Studio Dentaire De Facto à me contacter concernant cette demande professionnelle."
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
                </Link>{" "}
                et m&apos;engage à transmettre uniquement les informations nécessaires au traitement de la demande.
              </>
            }
          />
        </div>
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
        {submitting ? "Envoi en cours…" : "Transmettre la demande"}
      </button>
    </form>
  )
}
