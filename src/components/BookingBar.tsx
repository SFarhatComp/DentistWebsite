"use client"

import { useState } from "react"
import type { Dict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { rich } from "./Rich"

/**
 * Barre de réservation en verre dépoli, posée sous la photo d'accueil.
 * Formulaire GET ordinaire vers la page Rendez-vous (fonctionne sans script) ;
 * avec le script, le motif « Urgence » remplace le bouton par le téléphone.
 */
export function BookingBar({ lang, t, cta }: { lang: Locale; t: Dict["home"]["bookingBar"]; cta: string }) {
  const [motif, setMotif] = useState(t.motifs[0].value)
  const [day, setDay] = useState("")
  const urgent = motif === "urgence"
  const select =
    "mt-1.5 h-12 w-full appearance-none rounded-[3px] border border-white/25 bg-white/[0.06] px-3.5 pr-9 text-[16px] text-white outline-none transition-colors focus:border-white/70 [&>option]:text-aub"
  const chevron = (
    <span aria-hidden className="pointer-events-none absolute bottom-[15px] right-3.5 text-[12px] text-white/70">
      ▼
    </span>
  )
  return (
    <form action={href("booking", lang)} method="get" className="glass rounded-[4px] p-5 text-white sm:p-6" aria-label={t.title}>
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end">
        <label className="relative block">
          <span className="eyebrow text-mauve-mist">{t.motifLabel}</span>
          <select name="motif" className={select} value={motif} onChange={(e) => setMotif(e.target.value)}>
            {t.motifs.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {chevron}
        </label>
        <label className="relative block">
          <span className="eyebrow text-mauve-mist">{t.dayLabel}</span>
          <select name="jour" className={select} disabled={urgent} value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">{t.any}</option>
            {t.days.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {chevron}
        </label>
        <label className="relative block">
          <span className="eyebrow text-mauve-mist">{t.momentLabel}</span>
          <select name="moment" className={select} disabled={urgent} defaultValue="">
            <option value="">{t.any}</option>
            {t.moments
              .filter((m) => m.value !== "soir" || day === "" || day === "mercredi")
              .map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
          </select>
          {chevron}
        </label>
        {urgent ? (
          <p className="flex min-h-12 items-center text-[17px] font-medium md:max-w-[17ch]" role="status">
            <span>{rich(t.urgentMessage, lang, "underline underline-offset-4 whitespace-nowrap")}</span>
          </p>
        ) : (
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            {cta}
          </button>
        )}
      </div>
      <p className="mt-4 text-[15px] text-white/80">{t.note}</p>
    </form>
  )
}
