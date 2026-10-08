"use client"

import { useEffect, useRef, useState } from "react"
import type { FormText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { useQuery } from "@/lib/use-hydrated"
import { rich } from "../Rich"
import { ErrorNote, Field, Guard, PHONE_PATTERN, Select, inputCls } from "./Fields"

type Props = { lang: Locale; d: FormText }

const markTouched = (e: React.ChangeEvent<HTMLSelectElement>) => {
  e.currentTarget.dataset.touched = "1"
}

/**
 * Demande de rendez-vous (rappel par le studio). Aucun champ de santé (cahier 2.2).
 * Les choix de la barre de réservation de l'accueil (?motif=&jour=&moment=)
 * préremplissent les listes, sauf si la personne les a déjà changées.
 */
export function RequestForm({ lang, d }: Props) {
  const f = d.forms
  const bb = d.bookingBar
  const q = useQuery()
  const [sending, setSending] = useState(false)
  const motifOptions = bb.motifs.filter((m) => m.value !== "urgence")
  const urgent = q.get("motif") === "urgence"
  const erreur = q.get("erreur")
  const req = { requiredLabel: f.required, optionalLabel: f.optional }

  const motifRef = useRef<HTMLSelectElement>(null)
  const jourRef = useRef<HTMLSelectElement>(null)
  const momentRef = useRef<HTMLSelectElement>(null)
  const search = q.toString()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const apply = (el: HTMLSelectElement | null, key: string) => {
      const v = params.get(key)
      if (!el || !v || el.dataset.touched) return
      if (Array.from(el.options).some((o) => o.value === v)) el.value = v
    }
    apply(motifRef.current, "motif")
    apply(jourRef.current, "jour")
    apply(momentRef.current, "moment")
  }, [search])

  return (
    <form action="/api/demande" method="post" className="relative" onSubmit={() => setSending(true)}>
      {urgent && <ErrorNote text={rich(d.urgentNotice, lang)} />}
      {erreur && <ErrorNote text={rich(erreur === "champs" ? f.errorFields : f.error, lang)} />}
      <Guard kind="rendezvous" lang={lang} honeypotLabel={f.honeypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} required {...req} className="sm:col-span-2">
          <input name="nom" required autoComplete="name" maxLength={120} className={inputCls} />
        </Field>
        <Field label={f.phone} required {...req}>
          <input name="telephone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={40} pattern={PHONE_PATTERN} className={inputCls} />
        </Field>
        <Field label={f.email} {...req}>
          <input name="courriel" type="email" autoComplete="email" maxLength={200} className={inputCls} />
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="text-[16px] font-medium">
            {f.firstVisit} <span className="text-[14px] font-normal text-aub/70">({f.required})</span>
          </legend>
          <div className="mt-2 flex gap-6">
            {[
              ["oui", f.yes],
              ["non", f.no],
            ].map(([v, l]) => (
              <label key={v} className="flex min-h-11 items-center gap-2.5 text-[17px]">
                <input type="radio" name="premiere" value={v} required defaultChecked={v === "oui"} className="h-5 w-5 accent-[#291B2E]" />
                {l}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label={f.coverage} required {...req}>
          <Select name="couverture" required options={d.values.coverage.map((v, i) => ({ value: v, label: f.coverageOptions[i] }))} />
        </Field>
        <Field label={f.motif} required {...req}>
          <Select ref={motifRef} name="motif" required options={motifOptions} onChange={markTouched} />
        </Field>
        <Field label={f.day} {...req}>
          <Select ref={jourRef} name="jour" options={[{ value: "", label: bb.any }, ...bb.days]} onChange={markTouched} />
        </Field>
        <Field label={f.moment} {...req}>
          <Select ref={momentRef} name="moment" options={[{ value: "", label: bb.any }, ...bb.moments]} onChange={markTouched} />
        </Field>
      </div>
      <p className="mt-6 text-[15px] text-aub/75">{f.noHealthBooking}</p>
      <p className="mt-2 text-[15px] text-aub/75">{rich(f.privacyNote, lang)}</p>
      <button type="submit" className="btn btn-primary mt-7" disabled={sending}>
        {sending ? f.sending : f.sendRequest}
      </button>
    </form>
  )
}
