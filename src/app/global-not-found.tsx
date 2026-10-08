import "@fontsource/cormorant-garamond/600.css"
import "@fontsource-variable/inter"
import "./globals.css"

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page introuvable · Page not found · Studio Dentaire De Facto",
  robots: { index: false },
}

/** 404 bilingue pour les adresses qui ne commencent ni par /fr ni par /en. */
export default function GlobalNotFound() {
  return (
    <html lang="fr-CA">
      <body className="bg-aub-deep text-white">
        <main className="frame flex min-h-[100svh] flex-col justify-center py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-cream.svg" alt="Studio Dentaire De Facto" width={150} height={66} className="h-[60px] w-auto self-start" />
          <h1 className="t-1 mt-12">Page introuvable</h1>
          <p className="lede mt-4 text-white/85">Cette adresse n&apos;existe pas ou a changé.</p>
          <p lang="en" className="lede mt-2 text-white/70">This page does not exist or has moved.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/fr" className="btn btn-primary">Accueil</Link>
            <Link href="/en" lang="en" className="btn btn-ghost-light">Home (English)</Link>
          </div>
        </main>
      </body>
    </html>
  )
}
