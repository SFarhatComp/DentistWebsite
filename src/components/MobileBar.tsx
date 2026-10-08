"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href, pageKeyFromPath } from "@/lib/routes"

/** Barre collante mobile : même couleur que le bouton principal, masquée sur Rendez-vous (lot 4.6). */
export function MobileBar({ lang, book, call }: { lang: Locale; book: string; call: string }) {
  const pathname = usePathname() || ""
  const key = pageKeyFromPath(pathname)
  if (key === "booking" || key === "thanks") return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-aub-deep/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-2.5">
        <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost-light !px-5" aria-label={`${call} ${facts.phoneDisplay}`}>
          {call}
        </a>
        <Link href={href("booking", lang)} className="btn btn-primary">
          {book}
        </Link>
      </div>
    </div>
  )
}
