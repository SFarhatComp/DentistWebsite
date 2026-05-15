"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, FileField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const TYPES_CAS = [
  { v: "couronne", l: "Couronne" },
  { v: "couronne_emax_presse", l: "Couronne e.max pressée" },
  { v: "couronne_emax_usine", l: "Couronne e.max usinée" },
  { v: "couronne_zircone", l: "Couronne zircone usinée" },
  { v: "pont", l: "Pont" },
  { v: "facette", l: "Facette" },
  { v: "incrustation", l: "Incrustation / onlay" },
  { v: "prothese_complete", l: "Prothèse complète" },
  { v: "prothese_partielle", l: "Prothèse partielle" },
  { v: "plaque_occlusale", l: "Plaque occlusale" },
  { v: "gouttiere", l: "Gouttière" },
  { v: "wax_up", l: "Wax-up diagnostique" },
  { v: "modele", l: "Modèle imprimé" },
  { v: "temporaire", l: "Restauration temporaire" },
  { v: "recimentation_couronne", l: "Recimentation de couronne" },
  { v: "recimentation_pont", l: "Recimentation de pont" },
  { v: "recollage_facette", l: "Recollage de facette" },
  { v: "reparation", l: "Réparation" },
  { v: "autre", l: "Autre" },
]

const MATERIAUX = [
  { value: "zircone", label: "Zircone" },
  { value: "emax_presse", label: "E.max pressé" },
  { value: "emax_usine", label: "E.max usiné" },
  { value: "resine_imprimee", label: "Résine imprimée" },
  { value: "resine_usinee", label: "Résine usinée" },
  { value: "pmma", label: "PMMA" },
  { value: "composite_lab", label: "Composite de laboratoire" },
  { value: "a_determiner", label: "À déterminer par le laboratoire" },
  { value: "autre", label: "Autre" },
]

export function LabPrescriptionForm({ lang }: { lang: Locale }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [materialValue, setMaterialValue] = useState("")

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

      <FormSection number="01" title="Professionnel">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="prescribingProfessional" label="Nom du professionnel" required />
          <Field name="clinicName" label="Clinique" required />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Patient">
        <Field name="patientName" label="Nom ou code patient" required />
      </FormSection>

      <FormSection number="03" title="Détails du cas">
        <p className="text-sm text-muted-foreground">
          Cochez le ou les types de cas applicables.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TYPES_CAS.map((t) => (
            <CheckboxField key={t.v} name={`type_${t.v}`} value="1" label={t.l} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 mt-4">
          <Field name="affectedTeeth" label="Dent(s) concernée(s)" />
          <SelectField
            name="material"
            label="Matériau demandé"
            options={MATERIAUX}
            onChange={(v) => setMaterialValue(v)}
          />
        </div>
        {materialValue === "autre" && (
          <Field name="materialOther" label="Veuillez préciser le matériau" required />
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="shade" label="Teinte" />
          <Field name="desiredDate" label="Date souhaitée" type="date" />
        </div>
      </FormSection>

      <FormSection number="04" title="Instructions cliniques">
        <TextareaField
          name="clinicalInstructions"
          label="Instructions cliniques, particularités, exigences"
          rows={5}
        />
      </FormSection>

      <FormSection number="05" title="Fichiers">
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

      <FormSection number="06" title="Consentement">
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
