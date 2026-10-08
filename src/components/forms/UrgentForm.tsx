"use client"

import { useRef, useState } from "react"
import type { FormText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { useHydrated, useQuery } from "@/lib/use-hydrated"
import { rich } from "../Rich"
import { ErrorNote, Field, Guard, PHONE_PATTERN, Select, inputCls } from "./Fields"

type Props = { lang: Locale; d: FormText }

/**
 * Demande d'urgence chiffrée dans le navigateur (cahier 8.4) avec la clé
 * publique du studio (/pgp/studio.asc). Les champs visibles n'ont pas d'attribut
 * `name` : seul le message chiffré quitte le navigateur. Sans script, le
 * formulaire reste désactivé et le téléphone est proposé.
 */
export function UrgentForm({ lang, d }: Props) {
  const f = d.forms
  const erreur = useQuery().get("erreur") || undefined
  const hydrated = useHydrated()
  const [state, setState] = useState<"idle" | "sending" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const pgpRef = useRef<HTMLInputElement>(null)
  const req = { requiredLabel: f.required, optionalLabel: f.optional }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setState("sending")
    try {
      const v = (id: string) => (form.querySelector<HTMLInputElement | HTMLSelectElement>(`#${id}`)?.value || "").trim()
      const body = [
        "Demande d'urgence (site web)",
        `Nom : ${v("u-nom")}`,
        `Téléphone : ${v("u-tel")}`,
        `Courriel : ${v("u-courriel") || "—"}`,
        `Type de situation : ${v("u-situation")}`,
        `Avis sur les frais et la confirmation téléphonique : accepté`,
        `Langue : ${lang}`,
      ].join("\n")
      const [openpgp, keyRes] = await Promise.all([import("openpgp"), fetch("/pgp/studio.asc", { cache: "no-store" })])
      if (!keyRes.ok) throw new Error("key")
      const encryptionKeys = await openpgp.readKey({ armoredKey: await keyRes.text() })
      const message = await openpgp.createMessage({ text: body })
      const armored = (await openpgp.encrypt({ message, encryptionKeys })) as string
      if (pgpRef.current) pgpRef.current.value = armored
      formRef.current?.submit()
    } catch {
      setState("error")
    }
  }

  return (
    <form ref={formRef} action="/api/demande" method="post" className="relative" onSubmit={onSubmit}>
      {(erreur || state === "error") && <ErrorNote text={rich(erreur === "champs" ? f.errorFields : f.error, lang)} />}
      <noscript>
        <ErrorNote text={rich(d.formUnavailable, lang)} />
      </noscript>
      <Guard kind="urgence" lang={lang} honeypotLabel={f.honeypot} />
      <input type="hidden" name="pgp" ref={pgpRef} defaultValue="" />
      <fieldset disabled={!hydrated || state === "sending"} className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} required {...req} className="sm:col-span-2">
          <input id="u-nom" required autoComplete="name" maxLength={120} className={inputCls} />
        </Field>
        <Field label={f.phone} required {...req}>
          <input id="u-tel" type="tel" required autoComplete="tel" inputMode="tel" maxLength={40} pattern={PHONE_PATTERN} className={inputCls} />
        </Field>
        <Field label={f.email} {...req}>
          <input id="u-courriel" type="email" autoComplete="email" maxLength={200} className={inputCls} />
        </Field>
        <Field label={f.situation} required {...req} className="sm:col-span-2">
          <Select id="u-situation" required options={d.values.situations.map((v, i) => ({ value: v, label: f.situations[i] }))} />
        </Field>
        <label className="flex items-start gap-3 text-[16px] leading-snug sm:col-span-2">
          <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#291B2E]" />
          <span>{f.urgentConsent}</span>
        </label>
      </fieldset>
      <p className="mt-5 text-[15px] text-aub/75">{f.encrypted}</p>
      <p className="mt-2 text-[15px] text-aub/75">{rich(f.privacyNote, lang)}</p>
      <button type="submit" className="btn btn-primary mt-7" disabled={!hydrated || state === "sending"}>
        {state === "sending" ? f.sending : f.send}
      </button>
    </form>
  )
}
