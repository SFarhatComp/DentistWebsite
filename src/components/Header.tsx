"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { alternatePath, href, pageKeyFromPath, type PageKey } from "@/lib/routes"
import { cn } from "@/lib/utils"

type Labels = {
  book: string
  urgent: string
  menu: string
  close: string
  switchLang: string
  switchLangShort: string
  switchLangLabel: string
  mainNav: string
  home: string
}

export function Header({
  lang,
  nav,
  labels,
}: {
  lang: Locale
  nav: { key: string; label: string }[]
  labels: Labels
}) {
  const pathname = usePathname() || `/${lang}`
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const other: Locale = lang === "fr" ? "en" : "fr"
  const current = pageKeyFromPath(pathname)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.documentElement.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isActive = (key: string) => current === key || (key === "services" && (current === "service" || current === "emergency"))

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300" data-solid={solid || open ? "true" : "false"}>
      {/* Barre du haut : urgence et langue, toujours visibles */}
      <div className="border-b border-white/10 text-[13px]">
        <div className="frame flex h-[34px] items-center justify-between gap-4">
          <a href={`tel:${facts.phoneTel}`} className="tracking-wide text-white/85 hover:text-white">
            {labels.urgent} <span className="font-medium text-white">{facts.phoneDisplay}</span>
          </a>
          <Link
            href={alternatePath(pathname, other)}
            hrefLang={other}
            lang={other}
            className="uppercase tracking-[0.16em] text-white/85 hover:text-white"
          >
            <span aria-hidden className="sm:hidden">{labels.switchLangShort}</span>
            <span className="sr-only sm:not-sr-only">{labels.switchLang}</span>
          </Link>
        </div>
      </div>

      <div className="frame flex h-[68px] items-center justify-between gap-4 lg:gap-6">
        <Link href={href("home", lang)} className="shrink-0" aria-label={`${facts.name}, ${labels.home}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-cream.svg" alt="" width={124} height={54} className="h-[46px] w-auto lg:h-[50px]" />
        </Link>

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-[18px] xl:gap-7">
            {nav.map((item) => (
              <li key={item.key}>
                <Link
                  href={href(item.key as PageKey, lang)}
                  aria-current={isActive(item.key) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[14px] text-white/85 transition-colors hover:text-white xl:text-[15px]",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(item.key) && "text-white after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={href("booking", lang)} className="btn btn-primary hidden !min-h-[44px] !px-4 text-[15px] sm:inline-flex xl:!px-6">
            {labels.book}
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-[3px] px-3 text-[14px] uppercase tracking-[0.14em] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={cn("absolute left-0 top-0 h-px w-5 bg-white transition-transform", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-white transition-transform", open && "-translate-y-[5px] -rotate-45")} />
            </span>
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {/* Menu plein écran, mobile et tablette */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[102px] overflow-y-auto bg-aub-deep lg:hidden"
      >
        <nav aria-label={labels.mainNav} className="frame flex min-h-full flex-col pb-10 pt-6">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {nav.map((item, i) => (
              <li key={item.key}>
                <Link
                  href={href(item.key as PageKey, lang)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.key) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 font-display text-[30px] leading-tight"
                >
                  <span className="w-7 font-sans text-[13px] tracking-[0.16em] text-mauve">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href={href("booking", lang)} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {labels.book}
            </Link>
            <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost-light w-full">
              {facts.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
