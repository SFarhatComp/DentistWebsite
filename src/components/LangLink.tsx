"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/lib/i18n-config"
import { alternatePath } from "@/lib/routes"

/** Lien vers la même page dans l'autre langue. */
export function LangLink({ to, label, className }: { to: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${to === "fr" ? "en" : "fr"}`
  return (
    <Link href={alternatePath(pathname, to)} hrefLang={to} lang={to} className={className}>
      {label}
    </Link>
  )
}
