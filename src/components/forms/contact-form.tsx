"use client"
import Link from "next/link"
import { useState } from "react"
import { Field, TextareaField, SelectField, CheckboxField, HoneypotField } from "./fields"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const SUBJECT_KEYS = ["general", "rdv", "assurance", "urgence", "professionnel", "laboratoire", "autre"] as const

export function ContactForm({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    const data = new FormData(e.currentTarget)
    const body = new URLSearchParams()
    data.forEach((v, k) => body.append(k, v.toString()))
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
      if (!res.ok && res.status !== 200 && res.status !== 404) throw new Error("Submit failed")
      window.location.assign(`/${lang}/merci`)
    } catch {
      setError(true)
      setSubmitting(false)
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <HoneypotField />

      <Field name="name" label={t("contactForm.nom")} required />
      <Field name="email" label={t("contactForm.courriel")} type="email" required />
      <Field name="phone" label={t("contactForm.telephone")} type="tel" />
      <SelectField
        name="subject"
        label={t("contactForm.sujet")}
        required
        options={SUBJECT_KEYS.map((k) => ({ value: k, label: t(`contactForm.sujetOptions.${k}`) }))}
      />
      <TextareaField name="message" label={t("contactForm.message")} required rows={5} />

      <div className="border-t border-border pt-6 space-y-4">
        <div className="label-sm text-foreground">Consentements</div>
        <CheckboxField
          name="consent_contact"
          value="1"
          required
          label="J'autorise Studio Dentaire De Facto à me contacter concernant ma demande."
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
      </div>

      {error && (
        <p className="text-sm text-accent">Une erreur est survenue. Veuillez réessayer ou nous joindre par téléphone.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-3.5 text-sm font-medium tracking-wide disabled:opacity-50 transition-colors"
      >
        {submitting ? t("contactForm.envoi") : t("contactForm.envoyer")}
      </button>
    </form>
  )
}
