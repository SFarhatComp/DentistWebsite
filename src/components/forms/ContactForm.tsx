"use client"

import { useState } from "react"
import type { FormText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { useQuery } from "@/lib/use-hydrated"
import { rich } from "../Rich"
import { ErrorNote, Field, Guard, PHONE_PATTERN, Select, inputCls } from "./Fields"

type Props = { lang: Locale; d: FormText }

/** Formulaire de contact, envoyé à contact@ (cahier 3.4). */
export function ContactForm({ lang, d }: Props) {
  const f = d.forms
  const erreur = useQuery().get("erreur") || undefined
  const [sending, setSending] = useState(false)
  const req = { requiredLabel: f.required, optionalLabel: f.optional }
  return (
    <form action="/api/demande" method="post" className="relative" onSubmit={() => setSending(true)}>
      {erreur && <ErrorNote text={rich(erreur === "champs" ? f.errorFields : f.error, lang)} />}
      <Guard kind="contact" lang={lang} honeypotLabel={f.honeypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} required {...req} className="sm:col-span-2">
          <input name="nom" required autoComplete="name" maxLength={120} className={inputCls} />
        </Field>
        <Field label={f.email} required {...req}>
          <input name="courriel" type="email" required autoComplete="email" maxLength={200} className={inputCls} />
        </Field>
        <Field label={f.phone} {...req}>
          <input name="telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} pattern={PHONE_PATTERN} className={inputCls} />
        </Field>
        <Field label={f.subject} required {...req} className="sm:col-span-2">
          <Select name="sujet" required options={d.values.subjects.map((v, i) => ({ value: v, label: f.subjects[i] }))} />
        </Field>
        <Field label={f.message} required {...req} hint={f.noHealth} className="sm:col-span-2">
          <textarea name="message" required rows={6} maxLength={3000} className={`${inputCls} h-auto py-3`} />
        </Field>
      </div>
      <p className="mt-5 text-[15px] text-aub/75">{rich(d.formUrgent, lang)}</p>
      <p className="mt-2 text-[15px] text-aub/75">{rich(f.privacyNote, lang)}</p>
      <button type="submit" className="btn btn-primary mt-7" disabled={sending}>
        {sending ? f.sending : f.send}
      </button>
    </form>
  )
}
