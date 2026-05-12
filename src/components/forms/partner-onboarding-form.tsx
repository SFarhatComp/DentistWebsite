"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const CONTACT_MODES = [
  { value: "phone", label: "Téléphone" },
  { value: "email", label: "Courriel" },
  { value: "sms", label: "SMS" },
  { value: "in_person", label: "En personne" },
]

const SERVICES = [
  { v: "orthodontie", l: "Orthodontie" },
  { v: "prostho_amovible", l: "Prosthodontie amovible" },
  { v: "prostho_fixe", l: "Prosthodontie fixe" },
  { v: "plo", l: "PLO" },
  { v: "gouttieres", l: "Gouttières" },
  { v: "wax_up", l: "Wax-up" },
  { v: "prise_teinte", l: "Prise de teinte" },
  { v: "esthetique", l: "Cas esthétiques" },
  { v: "reparations", l: "Réparations" },
  { v: "autre", l: "Autre" },
]

const VOLUME = [
  { value: "1-5", label: "1 à 5 cas par mois" },
  { value: "5-10", label: "5 à 10 cas par mois" },
  { value: "10-20", label: "10 à 20 cas par mois" },
  { value: "20+", label: "Plus de 20 cas par mois" },
  { value: "occasionnel", label: "Cas occasionnels" },
  { value: "a-discuter", label: "À discuter" },
]

export function PartnerOnboardingForm({ lang }: { lang: Locale }) {
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
      name="partner-onboarding"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-label="Formulaire de partenariat professionnel"
    >
      <input type="hidden" name="form-name" value="partner-onboarding" />
      <HoneypotField />

      <div className="border-l-2 border-accent pl-6 space-y-3">
        <p className="text-base text-foreground leading-relaxed">
          Ce formulaire est destiné aux dentistes et spécialistes qui souhaitent discuter d&apos;une collaboration avec notre laboratoire intégré.
        </p>
      </div>

      <FormSection number="01" title="Identification professionnelle">
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="dentistName" label="Nom du dentiste" required />
          <Field name="licenseNumber" label="Numéro de permis (optionnel)" />
          <Field name="clinicName" label="Nom de la clinique" required className="md:col-span-2" />
          <Field name="clinicAddress" label="Adresse de la clinique" className="md:col-span-2" />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
        <SelectField
          name="preferredContactMode"
          label="Mode de communication préféré (optionnel)"
          options={CONTACT_MODES}
        />
      </FormSection>

      <FormSection number="02" title="Services souhaités">
        <p className="text-sm text-muted-foreground">
          Cochez les types de services qui vous intéressent (au moins un).
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <CheckboxField key={s.v} name={`service_${s.v}`} value="1" label={s.l} />
          ))}
        </div>
      </FormSection>

      <FormSection number="03" title="Volume et fréquence">
        <SelectField name="expectedVolume" label="Volume approximatif souhaité (optionnel)" options={VOLUME} />
      </FormSection>

      <FormSection number="04" title="Commentaires">
        <TextareaField
          name="comments"
          label="Précisions, besoins spécifiques, contexte"
          rows={5}
        />
      </FormSection>

      <FormSection number="05" title="Consentement">
        <CheckboxField
          name="consent_contact"
          value="1"
          required
          label="J'autorise Studio Dentaire De Facto à me contacter concernant cette demande de collaboration."
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
        {submitting ? "Envoi en cours…" : "Transmettre la demande"}
      </button>
    </form>
  )
}
