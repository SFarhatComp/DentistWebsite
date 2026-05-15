"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, FormSection, HoneypotField } from "./fields"
import type { Locale } from "@/types"

const PROFESSIONAL_TITLES = [
  { value: "dentiste_generaliste", label: "Dentiste généraliste" },
  { value: "prosthodontiste", label: "Prosthodontiste" },
  { value: "orthodontiste", label: "Orthodontiste" },
  { value: "parodontiste", label: "Parodontiste" },
  { value: "endodontiste", label: "Endodontiste" },
  { value: "chirurgien_maxillo_facial", label: "Chirurgien maxillo-facial" },
  { value: "denturologiste", label: "Denturologiste" },
  { value: "hygieniste_dentaire", label: "Hygiéniste dentaire" },
  { value: "gestionnaire_clinique", label: "Gestionnaire de clinique" },
  { value: "autre", label: "Autre" },
]

const COLLABORATION_TYPES = [
  { v: "lab_regulier", l: "Cas de laboratoire réguliers" },
  { v: "lab_occasionnel", l: "Cas de laboratoire occasionnels" },
  { v: "cas_esthetiques", l: "Cas esthétiques complexes" },
  { v: "consultation", l: "Consultations cliniques" },
  { v: "reference_clinique", l: "Références cliniques" },
  { v: "autre", l: "Autre" },
]

const SERVICES = [
  { v: "orthodontie", l: "Orthodontie" },
  { v: "prostho_amovible", l: "Prosthodontie amovible" },
  { v: "prostho_fixe", l: "Prosthodontie fixe" },
  { v: "plaques_occlusales", l: "Plaques occlusales" },
  { v: "gouttieres", l: "Gouttières" },
  { v: "wax_up", l: "Wax-up" },
  { v: "prise_teinte", l: "Prise de teinte" },
  { v: "esthetique", l: "Cas esthétiques" },
  { v: "reparations", l: "Réparations" },
  { v: "emax", l: "E.max pressé ou usiné" },
  { v: "zircone", l: "Zircone" },
  { v: "impression_3d", l: "Impression 3D / Formlabs" },
  { v: "autre", l: "Autre" },
]

const CONTACT_PREFS = [
  { v: "telephone", l: "Téléphone" },
  { v: "courriel", l: "Courriel" },
  { v: "sms", l: "SMS" },
  { v: "en_personne", l: "En personne" },
]

export function PartnerOnboardingForm({ lang }: { lang: Locale }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [titleValue, setTitleValue] = useState("")

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
          <Field name="dentistName" label="Nom du professionnel" required />
          <SelectField
            name="professionalTitle"
            label="Titre professionnel"
            required
            options={PROFESSIONAL_TITLES}
            onChange={(v) => setTitleValue(v)}
          />
        </div>
        {titleValue === "autre" && (
          <Field name="professionalTitleOther" label="Veuillez préciser votre titre" required />
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <Field name="clinicName" label="Nom de la clinique" required />
          <Field name="clinicAddress" label="Adresse de la clinique" />
          <Field name="phone" label="Téléphone" type="tel" required />
          <Field name="email" label="Courriel" type="email" required />
        </div>
      </FormSection>

      <FormSection number="02" title="Type de collaboration recherchée">
        <p className="text-sm text-muted-foreground">Cochez ce qui s&apos;applique.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {COLLABORATION_TYPES.map((c) => (
            <CheckboxField key={c.v} name={`collaboration_${c.v}`} value="1" label={c.l} />
          ))}
        </div>
      </FormSection>

      <FormSection number="03" title="Services d'intérêt">
        <p className="text-sm text-muted-foreground">Cochez ce qui vous intéresse.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <CheckboxField key={s.v} name={`service_${s.v}`} value="1" label={s.l} />
          ))}
        </div>
      </FormSection>

      <FormSection number="04" title="Préférence de contact">
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACT_PREFS.map((c) => (
            <CheckboxField key={c.v} name={`contact_${c.v}`} value="1" label={c.l} />
          ))}
        </div>
      </FormSection>

      <FormSection number="05" title="Message ou contexte de la demande">
        <TextareaField name="message" label="Précisions, besoins spécifiques, contexte" rows={5} />
      </FormSection>

      <FormSection number="06" title="Consentement">
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
