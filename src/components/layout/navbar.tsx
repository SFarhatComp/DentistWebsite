"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Container } from "./container"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"
import { cn } from "@/lib/utils"

export function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)
  const phoneTel = t("contact.phoneTel")
  const phoneDisplay = t("contact.phoneDisplay")

  // L'accueil n'est plus une entrée : le logo y mène. « Ressources » est retiré
  // avec les pages correspondantes (handoff §2).
  const links = [
    { href: `/${lang}/le-studio`, label: t("nav.studio") },
    { href: `/${lang}/laboratoire`, label: t("nav.laboratoire") },
    { href: `/${lang}/parcours`, label: t("nav.parcours") },
    { href: `/${lang}/soins`, label: t("nav.soins") },
    { href: `/${lang}/premiere-visite`, label: t("nav.premiereVisite") },
    { href: `/${lang}/assurances-paiements`, label: t("nav.assurances") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  // Construit l'URL équivalente dans l'autre langue en remplaçant le préfixe.
  // Ex: /fr/laboratoire → /en/laboratoire
  const otherLang: Locale = lang === "fr" ? "en" : "fr"
  const switchedPath = pathname
    ? pathname.replace(/^\/(fr|en)(\/|$)/, `/${otherLang}$2`)
    : `/${otherLang}`

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-6">
          <Link
            href={`/${lang}`}
            className="shrink-0 flex items-center"
            aria-label="Studio Dentaire De Facto — Accueil"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo-cream.svg"
              alt="Studio Dentaire De Facto"
              className="h-12 w-auto md:h-14"
            />
          </Link>
          {/* Sept entrées : les espacements se resserrent avant que la barre ne déborde. */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center">
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
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <Link
              href={switchedPath}
              hrefLang={otherLang}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              aria-label={otherLang === "en" ? "Switch to English" : "Passer au français"}
            >
              {otherLang === "en" ? "EN" : "FR"}
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {phoneDisplay}
            </a>
            <Link
              href={`/${lang}/rendez-vous`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-4 text-[15px] font-semibold transition-colors"
            >
              {t("nav.cta")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="xl:hidden flex items-center gap-2">
            <Link
              href={switchedPath}
              hrefLang={otherLang}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors px-2"
              aria-label={otherLang === "en" ? "Switch to English" : "Passer au français"}
            >
              {otherLang === "en" ? "EN" : "FR"}
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors"
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
        <div className="xl:hidden border-t border-border bg-background">
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
                className="mt-2 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-4 text-[15px] font-semibold transition-colors"
              >
                {t("nav.cta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
