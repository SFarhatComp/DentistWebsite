"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const T = {
  fr: { title: "Page introuvable", text: "Cette adresse n'existe pas ou a changé.", home: "Retour à l'accueil", other: "English", otherHref: "/en" },
  en: { title: "Page not found", text: "This page does not exist or has moved.", home: "Back to home", other: "Français", otherHref: "/fr" },
}

/** 404 à l'intérieur d'une langue : le texte suit la langue de l'adresse. */
export default function NotFound() {
  const lang = usePathname()?.startsWith("/en") ? "en" : "fr"
  const t = T[lang]
  return (
    <main lang={lang} className="flex min-h-[100svh] flex-col justify-center bg-aub-deep text-white">
      <div className="frame py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-cream.svg" alt="Studio Dentaire De Facto" width={150} height={66} className="h-[60px] w-auto" />
        <h1 className="t-1 mt-12">{t.title}</h1>
        <p className="lede mt-4 text-white/85">{t.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${lang}`} className="btn btn-primary">
            {t.home}
          </Link>
          <Link href={t.otherHref} lang={lang === "fr" ? "en" : "fr"} className="btn btn-ghost-light">
            {t.other}
          </Link>
        </div>
      </div>
    </main>
  )
}
