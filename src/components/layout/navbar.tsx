"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Container } from "./container"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"
import { cn } from "@/lib/utils"

export function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false)
  const [pathname, setPathname] = useState<string>("")
  const t = getTranslations(lang)
  const phoneTel = t("contact.phoneTel")

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const links = [
    { href: `/${lang}`, label: t("nav.accueil") },
    { href: `/${lang}/le-studio`, label: t("nav.studio") },
    { href: `/${lang}/premiere-visite`, label: t("nav.premiereVisite") },
    { href: `/${lang}/soins`, label: t("nav.soins") },
    { href: `/${lang}/portfolio-clinique`, label: t("nav.portfolioClinique") },
    { href: `/${lang}/laboratoire`, label: t("nav.laboratoire") },
    { href: `/${lang}/ressources`, label: t("nav.ressources") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-6">
          <Link href={`/${lang}`} className="font-display text-xl tracking-wide text-primary shrink-0">De Facto</Link>
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-1 justify-center">
            {links.map((l) => {
              const isActive = pathname === l.href || pathname === `${l.href}/`
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn("text-sm transition-colors hover:text-primary whitespace-nowrap", isActive ? "text-primary" : "text-muted-foreground")}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
          <div className="hidden lg:block shrink-0">
            <Link href={`/${lang}/rendez-vous`} className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors">
              {t("nav.cta")}
            </Link>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center w-10 h-10 text-foreground hover:text-accent transition-colors"
              aria-label={t("nav.appeler")}
            >
              <Phone className="h-5 w-5" />
            </a>
            <button className="text-foreground" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <Container>
            <div className="flex flex-col py-6 gap-5">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              ))}
              <Link
                href={`/${lang}/rendez-vous`}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
