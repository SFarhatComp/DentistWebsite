"use client"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, RadioField, FileField, FormSection, HoneypotField } from "./fields"
import { ConsentGroup } from "./consent-group"
import type { Locale } from "@/types"

const TYPES_DEMANDE = [
  { v: "premiere_visite", l: "Première visite / examen complet" },
  { v: "nettoyage", l: "Nettoyage" },
  { v: "urgence", l: "Urgence" },
  { v: "consultation_specifique", l: "Consultation spécifique" },
  { v: "laboratoire_teinte", l: "Laboratoire / prise de teinte" },
  { v: "suivi_existant", l: "Suivi existant" },
  { v: "autre", l: "Autre" },
]

const REASONS = [
  { v: "examen", l: "Examen complet / nouveau patient" },
  { v: "nettoyage", l: "Nettoyage / hygiène" },
  { v: "douleur", l: "Douleur dentaire" },
  { v: "urgence", l: "Urgence" },
  { v: "fracture", l: "Dent cassée" },
  { v: "esthetique", l: "Esthétique dentaire" },
  { v: "blanchiment", l: "Blanchiment" },
  { v: "composite", l: "Composite / restauration" },
  { v: "couronne", l: "Couronne" },
  { v: "implant", l: "Implant" },
  { v: "aligneurs", l: "Aligneurs orthodontiques" },
  { v: "gencives", l: "Gencives / parodontie" },
  { v: "canal", l: "Traitement de canal" },
  { v: "discussion_plan", l: "Discussion d'un plan de traitement existant" },
  { v: "autre", l: "Autre" },
]

const URGENCY_LEVELS = [
  { v: "leger", l: "Douleur légère" },
  { v: "modere", l: "Douleur modérée" },
  { v: "intense", l: "Douleur intense" },
  { v: "enflure", l: "Enflure" },
  { v: "saignement", l: "Saignement" },
  { v: "trauma", l: "Traumatisme" },
  { v: "aucun", l: "Aucun symptôme urgent" },
  { v: "planifier", l: "Je souhaite simplement planifier une visite" },
]

const SYMPTOM_DURATIONS = [
  { value: "today", label: "Aujourd'hui" },
  { value: "days", label: "Quelques jours" },
  { value: "weeks", label: "Quelques semaines" },
  { value: "months", label: "Plusieurs mois" },
  { value: "unknown", label: "Je ne sais pas" },
]

const AVAILABILITY = [
  { v: "lun-am", l: "Lundi matin" },
  { v: "lun-pm", l: "Lundi après-midi" },
  { v: "mar-am", l: "Mardi matin" },
  { v: "mar-pm", l: "Mardi après-midi" },
  { v: "mer", l: "Mercredi" },
  { v: "jeu", l: "Jeudi" },
  { v: "ven", l: "Vendredi" },
  { v: "asap", l: "Dès que possible" },
  { v: "flexible", l: "Je suis flexible" },
]

const INSURANCE_TYPES = [
  { value: "ramq", label: "RAMQ" },
  { value: "rcsd", label: "RCSD / assurance fédérale" },
  { value: "private", label: "Assurance privée" },
  { value: "other", label: "Autre" },
]

const HEALTH_QUESTIONS = [
  { name: "health_meds", label: "Prenez-vous actuellement des médicaments ?" },
  { name: "health_allergies", label: "Avez-vous des allergies connues ?" },
  { name: "health_cardiac", label: "Êtes-vous suivi pour une condition cardiaque ?" },
  { name: "health_anticoag", label: "Prenez-vous des anticoagulants ?" },
  { name: "health_diabete", label: "Avez-vous le diabète ?" },
  { name: "health_pregnant", label: "Êtes-vous enceinte ?" },
  { name: "health_reaction", label: "Avez-vous déjà eu une réaction importante chez le dentiste ?" },
  { name: "health_condition", label: "Avez-vous une condition médicale importante que nous devrions connaître ?" },
  { name: "health_mobility", label: "Avez-vous une mobilité réduite ou besoin d'accommodements ?" },
  { name: "health_anxiety", label: "Avez-vous beaucoup d'anxiété face aux soins dentaires ?" },
]

export function AppointmentForm({ lang }: { lang: Locale }) {
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
      name="appointment"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-16"
    >
      <input type="hidden" name="form-name" value="appointment" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3 mb-4">
        <p className="text-base text-foreground leading-relaxed">
          Vous n&apos;avez pas besoin de tout savoir : décrivez simplement votre situation. Ce formulaire nous aide à préparer votre visite.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Une membre de l&apos;équipe vous contactera pour confirmer les prochaines étapes. Si vous avez des radiographies ou documents pertinents, vous pourrez les transmettre plus bas.
        </p>
      </div>

      <FormSection number="01" title="Type de demande">
        <p className="text-sm text-muted-foreground mb-2">
          Choisissez ce qui correspond le mieux à votre situation. Pour une urgence sévère, utilisez plutôt le formulaire d&apos;urgence dédié.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TYPES_DEMANDE.map((t) => (
            <RadioField
              key={t.v}
              name="typeDemande"
              value={t.v}
              label={t.l}
              required
            />
          ))}
        </div>
      </FormSection>

      <FormSection number="02" title="Informations personnelles">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="firstName" label="Prénom" required />
          <Field name="lastName" label="Nom" required />
          <Field name="dob" label="Date de naissance" type="date" required />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required className="md:col-span-2" />
          <Field name="address" label="Adresse complète (optionnel)" className="md:col-span-2" />
        </div>
        <div>
          <div className="label-sm text-foreground mb-3">Langue préférée *</div>
          <div className="flex flex-wrap gap-6">
            <RadioField name="preferredLanguage" value="fr" label="Français" required defaultChecked />
            <RadioField name="preferredLanguage" value="en" label="Anglais" required />
            <RadioField name="preferredLanguage" value="other" label="Autre" required />
          </div>
        </div>
      </FormSection>

      <FormSection number="03" title="Êtes-vous déjà patient chez nous ?">
        <div className="flex flex-wrap gap-6">
          <RadioField name="existingPatient" value="yes" label="Oui" required />
          <RadioField name="existingPatient" value="no" label="Non" required />
          <RadioField name="existingPatient" value="unsure" label="Je ne suis pas certain" required />
        </div>
      </FormSection>

      <FormSection number="04" title="Raison principale de la demande">
        <div className="grid gap-3 sm:grid-cols-2">
          {REASONS.map((r) => (
            <CheckboxField key={r.v} name={`reason_${r.v}`} value="1" label={r.l} />
          ))}
        </div>
        <TextareaField name="reasonOther" label="Expliquez brièvement votre demande" rows={3} />
      </FormSection>

      <FormSection number="05" title="Niveau d'urgence">
        <div className="grid gap-3 sm:grid-cols-2">
          {URGENCY_LEVELS.map((u) => (
            <CheckboxField key={u.v} name={`urgency_${u.v}`} value="1" label={u.l} />
          ))}
        </div>
        <SelectField name="symptomDuration" label="Depuis quand le problème est-il présent ?" options={SYMPTOM_DURATIONS} />
      </FormSection>

      <FormSection number="06" title="Disponibilités">
        <div className="grid gap-3 sm:grid-cols-2">
          {AVAILABILITY.map((a) => (
            <CheckboxField key={a.v} name={`availability_${a.v}`} value="1" label={a.l} />
          ))}
        </div>
        <TextareaField name="availabilityNotes" label="Précisions sur vos disponibilités" rows={3} />
      </FormSection>

      <FormSection number="07" title="Assurances">
        <div>
          <div className="label-sm text-foreground mb-3">Avez-vous une assurance dentaire ?</div>
          <div className="flex flex-wrap gap-6">
            <RadioField name="hasInsurance" value="yes" label="Oui" />
            <RadioField name="hasInsurance" value="no" label="Non" />
            <RadioField name="hasInsurance" value="unsure" label="Je ne sais pas" />
          </div>
        </div>
        <SelectField name="insuranceType" label="Type d'assurance" options={INSURANCE_TYPES} />
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="insurer" label="Nom de l'assureur (optionnel)" />
          <Field name="policy" label="Numéro de police (optionnel)" />
          <Field name="certificate" label="Numéro de certificat (optionnel)" />
          <Field name="primaryInsuredDob" label="Date de naissance de l'assuré principal (optionnel)" type="date" />
          <Field name="relationToPrimary" label="Lien avec l'assuré principal (optionnel)" className="md:col-span-2" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
          Les informations d&apos;assurance permettent de faciliter la préparation du dossier. Le patient demeure responsable de confirmer sa couverture et d&apos;acquitter tout solde non couvert.
        </p>
      </FormSection>

      <FormSection number="08" title="Profil de santé simplifié">
        <p className="text-sm text-muted-foreground">
          Ces questions ne remplacent pas le questionnaire médical complet. Elles nous aident à préparer votre visite.
        </p>
        <div className="space-y-4">
          {HEALTH_QUESTIONS.map((q) => (
            <div key={q.name} className="border-t border-border pt-4">
              <div className="text-sm text-foreground mb-2">{q.label}</div>
              <div className="flex gap-6">
                <RadioField name={q.name} value="yes" label="Oui" />
                <RadioField name={q.name} value="no" label="Non" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 mt-6">
          <TextareaField name="medications" label="Médicaments (optionnel)" rows={2} />
          <TextareaField name="allergies" label="Allergies (optionnel)" rows={2} />
          <TextareaField name="conditionDetails" label="Condition médicale pertinente (optionnel)" rows={2} />
          <TextareaField name="accommodations" label="Comment pouvons-nous faciliter votre visite ? (optionnel)" rows={2} />
        </div>
      </FormSection>

      <FormSection number="09" title="Documents à joindre (optionnel)">
        <FileField
          name="documents"
          label="Photo, radiographie, carte d'assurance, document de référence"
          accept="image/jpeg,image/png,image/heic,application/pdf,.heic"
          multiple
          helpText="JPG, PNG, PDF ou HEIC. Maximum 10 MB par fichier."
        />
      </FormSection>

      <FormSection number="10" title="Consentements">
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Chaque consentement est cochable individuellement. Les communications informatives (bloc 05) sont optionnelles et ne sont pas pré-cochées.
        </p>
        <ConsentGroup lang={lang} />
      </FormSection>

      {error && (
        <p className="text-sm text-accent">Une erreur est survenue. Veuillez réessayer ou nous joindre par téléphone.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  )
}
