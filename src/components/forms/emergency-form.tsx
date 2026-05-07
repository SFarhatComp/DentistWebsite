"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Field, TextareaField, CheckboxField, RadioField, FileField, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const TYPES = [
  { v: "douleur", l: "Douleur intense" },
  { v: "enflure", l: "Enflure" },
  { v: "abces", l: "Abcès" },
  { v: "fracture", l: "Dent cassée" },
  { v: "trauma", l: "Traumatisme" },
  { v: "saignement", l: "Saignement" },
  { v: "couronne", l: "Perte d'une couronne" },
  { v: "restauration", l: "Perte d'une restauration" },
  { v: "infection", l: "Infection suspectée" },
  { v: "autre", l: "Autre" },
]

const SYMPTOMS = [
  { name: "sym_swelling", label: "Avez-vous de l'enflure ?" },
  { name: "sym_fever", label: "Avez-vous de la fièvre ?" },
  { name: "sym_swallow", label: "Avez-vous de la difficulté à avaler ?" },
  { name: "sym_breathe", label: "Avez-vous de la difficulté à respirer ?" },
  { name: "sym_night", label: "La douleur vous réveille-t-elle la nuit ?" },
]

export function EmergencyForm({ lang }: { lang: Locale }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch("/", { method: "POST", body: data })
      if (!res.ok && res.status !== 200 && res.status !== 404) throw new Error("Submit failed")
      router.push(`/${lang}/merci`)
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
          <strong className="font-medium">Avertissement médical.</strong> Si vous présentez une enflure importante,
          de la fièvre, une difficulté à respirer ou à avaler, ou un traumatisme majeur, contactez immédiatement
          les services d&apos;urgence (911) ou rendez-vous à l&apos;hôpital le plus proche.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="firstName" label="Prénom" required />
          <Field name="lastName" label="Nom" required />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
          <Field name="dob" label="Date de naissance" type="date" required className="md:col-span-2" />
        </div>

        <div>
          <div className="label-sm text-foreground mb-3">Type d&apos;urgence (sélectionnez tout ce qui s&apos;applique) *</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {TYPES.map((t) => (
              <CheckboxField key={t.v} name={`type_${t.v}`} value="1" label={t.l} />
            ))}
          </div>
        </div>

        <div>
          <div className="label-sm text-foreground mb-3">Symptômes</div>
          <div className="space-y-4">
            {SYMPTOMS.map((s) => (
              <div key={s.name} className="border-t border-border pt-4">
                <div className="text-sm text-foreground mb-2">{s.label}</div>
                <div className="flex gap-6">
                  <RadioField name={s.name} value="yes" label="Oui" />
                  <RadioField name={s.name} value="no" label="Non" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field name="symptomDuration" label="Depuis combien de temps ?" />

        <FileField
          name="photo"
          label="Photo (optionnel)"
          accept="image/jpeg,image/png,image/heic,.heic"
          helpText="JPG, PNG ou HEIC. Maximum 10 MB."
        />
      </div>

      {error && (
        <p className="text-sm text-accent">Une erreur est survenue. Veuillez réessayer ou nous joindre par téléphone.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-base font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande d'urgence"}
      </button>
    </form>
  )
}
