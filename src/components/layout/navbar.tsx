"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Container } from "./container"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"
import { cn } from "@/lib/utils"

const NAV_KEYS = ["accueil", "studio", "experience", "services", "realisations", "contact"] as const

export function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)

  const links = [
    { href: `/${lang}`, label: t("nav.accueil") },
    { href: `/${lang}/le-studio`, label: t("nav.studio") },
    { href: `/${lang}/experience-patient`, label: t("nav.experience") },
    { href: `/${lang}/services`, label: t("nav.services") },
    { href: `/${lang}/realisations`, label: t("nav.realisations") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link href={`/${lang}`} className="font-display text-xl tracking-wide text-primary">De Facto</Link>
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={cn("text-sm transition-colors hover:text-primary", pathname === l.href ? "text-primary" : "text-muted-foreground")}>{l.label}</Link>
            ))}
          </div>
          <div className="hidden lg:block">
            <Link href={`/${lang}/rendez-vous`} className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors">
              {t("nav.cta")}
            </Link>
          </div>
          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <Container>
            <div className="flex flex-col py-6 gap-5">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-muted-foreground hover:text-primary">{l.label}</Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
