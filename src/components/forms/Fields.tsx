"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export const inputCls =
  "mt-1.5 block h-12 w-full rounded-[3px] border border-aub/25 bg-white px-3.5 text-[17px] text-aub outline-none transition-colors placeholder:text-aub/40 focus:border-aub focus:ring-2 focus:ring-mauve/40"

export function Field({
  label,
  hint,
  required,
  requiredLabel,
  optionalLabel,
  children,
  className,
}: {
  label: string
  hint?: ReactNode
  required?: boolean
  requiredLabel: string
  optionalLabel: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[16px] font-medium">
        {label}{" "}
        <span className="text-[14px] font-normal text-aub/70">({required ? requiredLabel : optionalLabel})</span>
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[15px] text-aub/70">{hint}</span>}
    </label>
  )
}

export function Select({ name, options, required, defaultValue, ...rest }: {
  name?: string
  options: { value: string; label: string }[]
  required?: boolean
  defaultValue?: string
} & React.SelectHTMLAttributes<HTMLSelectElement> & { ref?: React.Ref<HTMLSelectElement> }) {
  return (
    <span className="relative block">
      <select name={name} required={required} defaultValue={defaultValue} className={cn(inputCls, "appearance-none pr-10")} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute bottom-[15px] right-3.5 text-[12px] text-aub/60">
        ▼
      </span>
    </span>
  )
}

/** Motif du téléphone : au moins 10 caractères parmi chiffres, espaces et ( ) + . - */
export const PHONE_PATTERN = "[0-9\\s\\(\\)+.\\-]{10,}"

/**
 * Champs cachés communs : type de formulaire, langue, durée de remplissage
 * (mesurée entièrement dans le navigateur, donc insensible à son horloge) et
 * champ piège invisible.
 */
export function Guard({ kind, lang, honeypotLabel }: { kind: string; lang: string; honeypotLabel: string }) {
  const elapsed = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const input = elapsed.current
    const form = input?.form
    if (!input || !form) return
    const start = performance.now()
    const onSubmit = () => {
      input.value = String(Math.round(performance.now() - start))
    }
    form.addEventListener("submit", onSubmit, true)
    return () => form.removeEventListener("submit", onSubmit, true)
  }, [])
  return (
    <>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="duree" ref={elapsed} defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {honeypotLabel}
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  )
}

export function ErrorNote({ text }: { text: ReactNode }) {
  return (
    <p role="alert" className="mb-6 rounded-[3px] border border-cta/50 bg-cta/[0.06] p-4 text-[16px] text-aub">
      {text}
    </p>
  )
}
