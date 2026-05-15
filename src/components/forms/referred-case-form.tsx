"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, RadioField, FileField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const LANGUES = [
  { value: "francais", label: "Français" },
  { value: "anglais", label: "Anglais" },
  { value: "francais_anglais", label: "Français ou anglais" },
  { value: "autre", label: "Autre" },
]

const MOTIFS_PRINCIPAUX = [
  { value: "evaluation_complete", label: "Évaluation complète" },
  { value: "douleur", label: "Douleur" },
  { value: "esthetique", label: "Préoccupation esthétique" },
  { value: "endodontie", label: "Endodontie" },
  { value: "parodontie", label: "Parodontie / greffe" },
  { value: "implantologie", label: "Implantologie" },
  { value: "prosthodontie", label: "Prosthodontie / restauration complexe" },
  { value: "deuxieme_avis", label: "Deuxième avis" },
  { value: "laboratoire", label: "Service de laboratoire (teinte, réparation)" },
  { value: "autre", label: "Autre" },
]

const MOTIFS_SECONDAIRES = [
  { v: "douleur", l: "Douleur" },
  { v: "sensibilite", l: "Sensibilité" },
  { v: "saignement_gencives", l: "Saignement des gencives" },
  { v: "dent_mobile", l: "Dent mobile" },
  { v: "fracture", l: "Fracture" },
  { v: "usure", l: "Usure dentaire" },
  { v: "esthetique", l: "Préoccupation esthétique" },
  { v: "infection", l: "Infection suspectée" },
  { v: "autre", l: "Autre" },
]

const DOCUMENTS_TRANSMIS = [
  { v: "photos", l: "Photos" },
  { v: "radiographies", l: "Radiographies" },
  { v: "stl_scan", l: "STL / scan" },
  { v: "plan_traitement", l: "Plan de traitement existant" },
  { v: "notes_cliniques", l: "Notes cliniques" },
  { v: "autre", l: "Autre" },
]

export function ReferredCaseForm({ lang }: { lang: Locale }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [langValue, setLangValue] = useState("")
  const [motifValue, setMotifValue] = useState("")

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
      aria-label="Formulaire de référence d'un patient"
    >
      <input type="hidden" name="form-name" value="referred-case" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          Référer un patient au Studio Dentaire De Facto pour évaluation, traitement ou service technique. Le patient reste sous votre responsabilité clinique.
        </p>
      </div>

      <FormSection number="01" title="Professionnel référent">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="referringProfessionalName" label="Nom du professionnel" required />
          <Field name="clinicName" label="Clinique" required />
          <Field name="clinicPhone" label="Téléphone de la clinique" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Patient">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="patientName" label="Nom complet du patient" required />
          <Field name="patientDob" label="Date de naissance" type="date" required />
          <Field name="patientPhone" label="Téléphone du patient" type="tel" required />
          <Field name="patientEmail" label="Courriel du patient" type="email" />
        </div>
        <SelectField
          name="patientLanguage"
          label="Langue préférée"
          options={LANGUES}
          onChange={(v) => setLangValue(v)}
        />
        {langValue === "autre" && (
          <Field name="patientLanguageOther" label="Veuillez préciser la langue" required />
        )}
      </FormSection>

      <FormSection number="03" title="Référence">
        <SelectField
          name="referralMainReason"
          label="Motif principal"
          required
          options={MOTIFS_PRINCIPAUX}
          onChange={(v) => setMotifValue(v)}
        />
        {motifValue === "autre" && (
          <Field name="referralMainReasonOther" label="Veuillez préciser le motif principal" required />
        )}
        <div>
          <div className="label-sm text-foreground mb-3">Motifs secondaires (optionnel)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOTIFS_SECONDAIRES.map((m) => (
              <CheckboxField key={m.v} name={`motif_secondaire_${m.v}`} value="1" label={m.l} />
            ))}
          </div>
        </div>
        <div>
          <div className="label-sm text-foreground mb-3">Urgence *</div>
          <div className="flex gap-6">
            <RadioField name="urgency" value="oui" label="Oui" required />
            <RadioField name="urgency" value="non" label="Non" required />
          </div>
        </div>
        <TextareaField name="clinicalSummary" label="Résumé clinique" rows={4} />
        <TextareaField name="previousTreatments" label="Traitements déjà réalisés" rows={3} />
        <div>
          <div className="label-sm text-foreground mb-3">Documents transmis</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {DOCUMENTS_TRANSMIS.map((d) => (
              <CheckboxField key={d.v} name={`doc_${d.v}`} value="1" label={d.l} />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection number="04" title="Fichiers">
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
          accept="image/jpeg,image/png,application/pdf,.heic"
          multiple
          helpText="JPG, PNG ou PDF."
        />
        <FileField
          name="stlFiles"
          label="STL / scan (optionnel)"
          accept=".stl,.zip,.obj,.ply"
          multiple
          helpText="STL, OBJ, PLY ou ZIP."
        />
      </FormSection>

      <FormSection number="05" title="Consentements">
        <CheckboxField
          name="consent_patient_informed"
          value="1"
          required
          label="Le patient a été informé de cette référence."
        />
        <CheckboxField
          name="consent_transmission"
          value="1"
          required
          label="J'autorise la transmission des documents et renseignements pertinents au Studio Dentaire De Facto."
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
