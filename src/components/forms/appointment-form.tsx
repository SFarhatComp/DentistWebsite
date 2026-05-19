"use client"
import { useState } from "react"
import { Field, PhoneField, TextareaField, SelectField, CheckboxField, FormSection, HoneypotField } from "./fields"
import { ConsentGroup } from "./consent-group"
import type { Locale } from "@/types"

// Type de demande principale (cahier §20A.3)
const TYPES_DEMANDE = [
  { value: "premiere_visite", label: "Première visite / examen complet" },
  { value: "nettoyage", label: "Nettoyage et suivi" },
  { value: "consultation_ciblee", label: "Consultation ciblée" },
  { value: "urgence", label: "Urgence dentaire" },
  { value: "douleur", label: "Douleur" },
  { value: "dent_cassee", label: "Dent cassée ou restauration fracturée" },
  { value: "esthetique", label: "Esthétique" },
  { value: "orthodontie", label: "Orthodontie / aligneurs" },
  { value: "implant_couronne", label: "Implant / couronne / prothèse" },
  { value: "laboratoire", label: "Laboratoire ou demande professionnelle" },
  { value: "autre", label: "Autre" },
]

// Motifs secondaires (cahier §20A.4)
const MOTIFS_SECONDAIRES = [
  { v: "douleur", l: "Douleur" },
  { v: "sensibilite", l: "Sensibilité" },
  { v: "saignement_gencives", l: "Saignement des gencives" },
  { v: "mauvaise_haleine", l: "Mauvaise haleine" },
  { v: "dent_mobile", l: "Dent mobile" },
  { v: "fracture", l: "Fracture" },
  { v: "usure", l: "Usure dentaire" },
  { v: "serrement_grincement", l: "Serrement ou grincement" },
  { v: "esthetique", l: "Préoccupation esthétique" },
  { v: "deuxieme_avis", l: "Deuxième avis" },
  { v: "suivi_traitement", l: "Suivi de traitement existant" },
  { v: "autre", l: "Autre" },
]

// Langue préférée (cahier §20A — listes déroulantes)
const LANGUES = [
  { value: "francais", label: "Français" },
  { value: "anglais", label: "Anglais" },
  { value: "francais_anglais", label: "Français ou anglais" },
  { value: "autre", label: "Autre" },
]

// Disponibilités - jours
const JOURS = [
  { v: "lundi", l: "Lundi" },
  { v: "mardi", l: "Mardi" },
  { v: "mercredi", l: "Mercredi" },
  { v: "jeudi", l: "Jeudi (sur RDV)" },
  { v: "vendredi", l: "Vendredi (sur RDV)" },
  { v: "asap", l: "Dès que possible" },
  { v: "flexible", l: "Je suis flexible" },
]

const MOMENTS = [
  { v: "matin", l: "Matin (9 h – 12 h)" },
  { v: "midi", l: "Midi (12 h – 14 h)" },
  { v: "apres_midi", l: "Après-midi (14 h – 18 h)" },
  { v: "flexible", l: "Flexible" },
]

// Modes de contact
const CONTACT_MODES = [
  { v: "telephone", l: "Téléphone" },
  { v: "courriel", l: "Courriel" },
  { v: "sms", l: "SMS" },
]

// Conditions médicales (cahier §22.2) — 25 conditions cochables
const MEDICAL_CONDITIONS = [
  { v: "hypertension", l: "Hypertension artérielle" },
  { v: "cardiaque", l: "Maladie cardiaque" },
  { v: "souffle_valvulaire", l: "Souffle cardiaque ou problème valvulaire" },
  { v: "endocardite", l: "Antécédent d'endocardite" },
  { v: "diabete", l: "Diabète" },
  { v: "respiratoire", l: "Asthme ou maladie respiratoire" },
  { v: "apnee_sommeil", l: "Apnée du sommeil" },
  { v: "foie", l: "Maladie du foie" },
  { v: "renale", l: "Maladie rénale" },
  { v: "coagulation", l: "Trouble de coagulation ou saignements prolongés" },
  { v: "anticoagulants", l: "Anticoagulants ou antiplaquettaires" },
  { v: "epilepsie", l: "Épilepsie ou convulsions" },
  { v: "neurologique", l: "Trouble neurologique" },
  { v: "cancer", l: "Cancer actuel ou antécédent de cancer" },
  { v: "radiotherapie", l: "Radiothérapie à la tête ou au cou" },
  { v: "chimiotherapie", l: "Chimiothérapie ou immunothérapie" },
  { v: "immunosuppression", l: "Immunosuppression" },
  { v: "osteoporose", l: "Ostéoporose" },
  { v: "bisphosphonates", l: "Prise actuelle ou passée de bisphosphonates / anti-résorptifs" },
  { v: "thyroide", l: "Trouble thyroïdien" },
  { v: "reflux", l: "Reflux gastrique important" },
  { v: "anxiete", l: "Anxiété importante liée aux soins dentaires" },
  { v: "grossesse", l: "Grossesse ou allaitement" },
]

export function AppointmentForm({ lang }: { lang: Locale }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [typeValue, setTypeValue] = useState("")
  const [langValue, setLangValue] = useState("")
  const [showMedicalQuestionnaire, setShowMedicalQuestionnaire] = useState(false)
  const [hasAllergies, setHasAllergies] = useState(false)
  const [hasOtherCondition, setHasOtherCondition] = useState(false)

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
      aria-label="Formulaire de demande de rendez-vous"
    >
      <input type="hidden" name="form-name" value="appointment" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3 mb-4">
        <p className="text-base text-foreground leading-relaxed">
          Vous n&apos;avez pas besoin de tout savoir : décrivez simplement votre situation. Ce formulaire nous aide à préparer votre visite.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Une membre de l&apos;équipe vous contactera pour confirmer les prochaines étapes. Pour une urgence sévère, utilisez plutôt le formulaire d&apos;urgence dédié.
        </p>
      </div>

      <FormSection number="01" title="Identification">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="firstName" label="Prénom" required />
          <Field name="lastName" label="Nom" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Coordonnées">
        <div className="grid gap-6 md:grid-cols-2">
          <PhoneField name="phone" required />
          <Field name="email" label="Courriel" type="email" />
        </div>
        <SelectField
          name="preferredLanguage"
          label="Langue préférée"
          options={LANGUES}
          onChange={(v) => setLangValue(v)}
        />
        {langValue === "autre" && (
          <Field name="preferredLanguageOther" label="Veuillez préciser la langue" required />
        )}
      </FormSection>

      <FormSection number="03" title="Type de demande">
        <SelectField
          name="typeDemande"
          label="Type de demande principale"
          required
          options={TYPES_DEMANDE}
          onChange={(v) => setTypeValue(v)}
        />
        {typeValue === "autre" && (
          <Field name="typeDemandeOther" label="Veuillez préciser" required />
        )}
        <div>
          <div className="label-sm text-foreground mb-3">Motifs secondaires (optionnel)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOTIFS_SECONDAIRES.map((m) => (
              <CheckboxField key={m.v} name={`motif_${m.v}`} value="1" label={m.l} />
            ))}
          </div>
        </div>
        <TextareaField name="message" label="Message ou précision (optionnel)" rows={4} />
      </FormSection>

      <FormSection number="04" title="Disponibilités">
        <div>
          <div className="label-sm text-foreground mb-3">Journée(s) préférée(s)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {JOURS.map((j) => (
              <CheckboxField key={j.v} name={`jour_${j.v}`} value="1" label={j.l} />
            ))}
          </div>
        </div>
        <div>
          <div className="label-sm text-foreground mb-3">Moment(s) préféré(s)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOMENTS.map((m) => (
              <CheckboxField key={m.v} name={`moment_${m.v}`} value="1" label={m.l} />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection number="05" title="Mode de contact préféré">
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACT_MODES.map((c) => (
            <CheckboxField key={c.v} name={`contact_${c.v}`} value="1" label={c.l} />
          ))}
        </div>
      </FormSection>

      {/* Questionnaire médical — section optionnelle dépliable */}
      <FormSection number="06" title="Profil médical (optionnel)">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ces informations sont optionnelles et peuvent être remplies au moment du rendez-vous. Si vous préférez les transmettre à l&apos;avance, cliquez pour développer cette section.
        </p>
        <button
          type="button"
          onClick={() => setShowMedicalQuestionnaire(!showMedicalQuestionnaire)}
          className="text-sm text-primary underline hover:no-underline"
          aria-expanded={showMedicalQuestionnaire}
          aria-controls="medical-questionnaire"
        >
          {showMedicalQuestionnaire ? "Masquer le questionnaire médical" : "Compléter le questionnaire médical maintenant"}
        </button>

        {showMedicalQuestionnaire && (
          <div id="medical-questionnaire" className="space-y-6 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground mb-4">
                Avez-vous déjà reçu un diagnostic ou êtes-vous suivi pour l&apos;une des conditions suivantes ? (Cochez toutes celles qui s&apos;appliquent)
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {MEDICAL_CONDITIONS.map((c) => (
                  <CheckboxField key={c.v} name={`condition_${c.v}`} value="1" label={c.l} />
                ))}
                <CheckboxField
                  name="condition_allergies"
                  value="1"
                  label="Allergies connues"
                  className="col-span-full"
                />
                <CheckboxField
                  name="condition_autre"
                  value="1"
                  label="Autre condition médicale"
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
                  <span>J&apos;ai des allergies à préciser</span>
                </label>
                {hasAllergies && (
                  <TextareaField
                    name="allergies_details"
                    label="Allergies et réactions observées"
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
                  <span>J&apos;ai une autre condition médicale à préciser</span>
                </label>
                {hasOtherCondition && (
                  <TextareaField
                    name="other_condition_details"
                    label="Veuillez préciser"
                    rows={3}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </FormSection>

      <FormSection number="07" title="Consentements">
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Chaque consentement est cochable individuellement. Les communications informatives (bloc 05) sont optionnelles et ne sont pas pré-cochées.
        </p>
        <ConsentGroup lang={lang} />
      </FormSection>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous joindre par téléphone.
        </p>
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
