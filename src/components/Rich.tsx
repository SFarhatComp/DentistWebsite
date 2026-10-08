import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href, serviceHref, type PageKey, type ServiceKey } from "@/lib/routes"

// {tel} · {email} · **gras** · [texte](page:clé|svc:clé|https://…)
const TOKEN = /(\{tel\}|\{email\}|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

export function rich(text: string, lang: Locale, linkClass = "underline decoration-1 underline-offset-4 hover:text-cta"): ReactNode {
  const parts = text.split(TOKEN)
  return parts.map((part, i) => {
    if (!part) return null
    if (part === "{tel}")
      return (
        <a key={i} href={`tel:${facts.phoneTel}`} className={`${linkClass} whitespace-nowrap`}>
          {facts.phoneDisplay}
        </a>
      )
    if (part === "{email}")
      return (
        <a key={i} href={`mailto:${facts.emailInfo}`} className={linkClass}>
          {facts.emailInfo}
        </a>
      )
    if (part.startsWith("**")) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) {
      const [, label, target] = m
      if (target.startsWith("page:"))
        return (
          <Link key={i} href={href(target.slice(5) as PageKey, lang)} className={linkClass}>
            {label}
          </Link>
        )
      if (target.startsWith("svc:"))
        return (
          <Link key={i} href={serviceHref(target.slice(4) as ServiceKey, lang)} className={linkClass}>
            {label}
          </Link>
        )
      return (
        <a key={i} href={target} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function Rich({ text, lang, className }: { text: string; lang: Locale; className?: string }) {
  return <span className={className}>{rich(text, lang)}</span>
}

/** Version texte, pour les données structurées et les métadonnées. */
export function plain(text: string): string {
  return text
    .replace(/\{tel\}/g, facts.phoneDisplay)
    .replace(/\{email\}/g, facts.emailInfo)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
}
