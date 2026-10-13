"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"
import { cn } from "@/lib/utils"

/**
 * En-tête de la maquette v2.
 *
 * Il est posé en absolu par-dessus le héros sombre que porte chaque page :
 * fond transparent, texte blanc. Toute page ajoutée doit donc commencer par une
 * bande sombre, sinon l'en-tête devient illisible.
 *
 * Deux étages : une barre de 34 px (urgence + langue) puis une rangée de 68 px
 * (logo, navigation, appel à l'action). Sous 1200 px la navigation se replie
 * derrière un bouton « Menu », comme le prévoit la maquette.
 */
export function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)

  const liens = [
    { href: `/${lang}/premiere-visite`, label: t("nav.premiereVisite") },
    { href: `/${lang}/services`, label: t("nav.services") },
    { href: `/${lang}/parcours`, label: t("nav.parcours") },
    { href: `/${lang}/atelier`, label: t("nav.atelier") },
    { href: `/${lang}/a-propos`, label: t("nav.aPropos") },
    { href: `/${lang}/faq`, label: t("nav.faq") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  const autreLangue: Locale = lang === "fr" ? "en" : "fr"
  const cheminAutreLangue = pathname
    ? pathname.replace(/^\/(fr|en)(\/|$)/, `/${autreLangue}$2`)
    : `/${autreLangue}`

  return (
    <header className="absolute inset-x-0 top-0 z-30 font-sans text-white">
      {/* Barre supérieure */}
      <div className="border-b border-white/[0.12]">
        <div className="mx-auto flex h-[34px] max-w-page items-center justify-between gap-4 px-[clamp(16px,5vw,56px)] text-[13px]">
          <a href={`tel:${t("contact.phoneTel")}`} className="text-white/85 no-underline hover:text-white">
            {t("nav.urgenceQuestion")} <span className="font-medium text-white">{t("contact.phoneDisplay")}</span>
          </a>
          <Link
            href={cheminAutreLangue}
            hrefLang={autreLangue}
            lang={autreLangue}
            className="uppercase tracking-[0.16em] text-white/85 no-underline hover:text-white"
          >
            {autreLangue === "en" ? "English" : "Français"}
          </Link>
        </div>
      </div>

      {/* Rangée principale */}
      <div className="mx-auto flex h-[68px] max-w-page items-center justify-between gap-6 px-[clamp(16px,5vw,56px)]">
        <Link href={`/${lang}`} aria-label={t("nav.retourAccueil")} className="flex shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v2/logo.svg" alt="Studio Dentaire [de facto]" className="block h-10 w-auto nav:h-[50px]" />
        </Link>

        <nav aria-label={t("nav.principale")} className="hidden items-center gap-[22px] text-[15px] nav:flex">
          {liens.map((l) => {
            const actif = pathname === l.href || pathname === `${l.href}/`
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn("no-underline transition-colors hover:text-primary-pale", actif ? "text-white" : "text-white/[0.88]")}
              >
                {l.label}
              </Link>
            )
          })}
          <Link href={`/${lang}/urgence`} className="font-semibold text-white no-underline transition-colors hover:text-primary-pale">
            {t("nav.urgence")}
          </Link>
        </nav>

        {/* Sur un téléphone, les trois éléments de la rangée ne tiennent pas
            côte à côte : l'appel à l'action poussait le bouton « Menu » hors de
            l'écran, donc hors d'atteinte. Le libellé raccourcit sous le point
            de rupture — « Rendez-vous » plutôt que « Prendre rendez-vous » —
            et le bouton Menu ne se réduit jamais. */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/${lang}/rendez-vous`}
            className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-sm bg-primary px-3 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover nav:px-[22px] nav:text-[15px]"
          >
            <span className="nav:hidden">{t("nav.ctaCourt")}</span>
            <span className="hidden nav:inline">{t("nav.cta")}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 px-1.5 text-sm uppercase tracking-[0.14em] text-white nav:hidden"
            aria-expanded={open}
          >
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-[2px] w-5 bg-current" />
              <span className="block h-[2px] w-5 bg-current" />
              <span className="block h-[2px] w-5 bg-current" />
            </span>
            {/* Sous 360 px — vieux iPhone SE et quelques Android — il ne reste
                plus la place du mot : les trois barres suffisent, et le nom
                passe en étiquette lue par les lecteurs d'écran. */}
            <span className="max-[359px]:hidden">{t("nav.menu")}</span>
            <span className="sr-only min-[360px]:hidden">{t("nav.menu")}</span>
          </button>
        </div>
      </div>

      {/* Panneau de navigation replié */}
      {open && (
        <div className="fixed inset-0 z-40 bg-plum-deep nav:hidden">
          <div className="mx-auto flex h-[102px] max-w-page items-center justify-between px-[clamp(16px,5vw,56px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v2/logo.svg" alt="" aria-hidden="true" className="block h-[50px] w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("nav.fermer")}
              className="inline-flex h-11 w-11 items-center justify-center text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav
            aria-label={t("nav.principale")}
            className="mx-auto flex max-w-page flex-col gap-5 px-[clamp(16px,5vw,56px)] pt-6 font-display text-3xl"
          >
            {liens.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white no-underline">
                {l.label}
              </Link>
            ))}
            <Link href={`/${lang}/urgence`} onClick={() => setOpen(false)} className="text-primary-pale no-underline">
              {t("nav.urgence")}
            </Link>
            <Link
              href={`/${lang}/rendez-vous`}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-sm bg-primary px-6 font-sans text-[15px] font-medium text-primary-foreground no-underline"
            >
              {t("nav.cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
