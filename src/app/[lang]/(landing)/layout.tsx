import Link from "next/link"
import type { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"

/**
 * Pages d'atterrissage Google Ads : pas de menu complet, seulement le logo et le
 * téléphone ; un seul geste, réserver ou appeler. Aucun pixel publicitaire.
 */
export default async function LandingLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 text-white">
        <div className="frame flex h-[84px] items-center justify-between gap-4">
          <Link href={href("home", lang)} aria-label={`${facts.name}, ${d.common.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-cream.svg" alt="" width={124} height={54} className="h-[48px] w-auto" />
          </Link>
          <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost-light !min-h-[44px] !px-4 text-[15px]">
            {facts.phoneDisplay}
          </a>
        </div>
      </header>
      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer lang={lang} d={d} compact />
    </>
  )
}
