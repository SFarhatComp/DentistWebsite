import Image from "next/image"
import Link from "next/link"
import type { Dict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href, type PageKey } from "@/lib/routes"
import { LangLink } from "./LangLink"
import { rich } from "./Rich"

/**
 * Pied de page en verre dépoli posé sur une photo assombrie, comme le bas du
 * modèle cinématique. Responsable de la protection des renseignements
 * personnels affiché (Loi 25, art. 3.2) et mention de prudence (lot 6).
 */
export function Footer({ lang, d, compact = false }: { lang: Locale; d: Dict; compact?: boolean }) {
  const other: Locale = lang === "fr" ? "en" : "fr"
  const lc = "underline decoration-white/40 underline-offset-4 hover:decoration-white"
  return (
    <footer className="relative isolate overflow-hidden bg-aub-deep text-white">
      <Image src="/img/couloir.webp" alt="" aria-hidden fill sizes="100vw" quality={60} className="-z-10 object-cover opacity-35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-aub-deep/70 via-aub-deep/80 to-aub-deep" />
      <div className="frame py-14 sm:py-20">
        <div className="glass rounded-[4px] p-6 sm:p-10">
          {!compact && (
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/logo-cream.svg" alt={facts.name} width={150} height={66} className="h-[60px] w-auto" />
                <p className="mt-5 max-w-[34ch] font-display text-[26px] leading-tight">{d.common.signature}</p>
              </div>
              <div>
                <h2 className="eyebrow text-mauve">{d.footer.contactTitle}</h2>
                <address className="mt-4 space-y-1.5 not-italic text-white/90">
                  <p>{d.common.addressLine}</p>
                  <p>{rich("{tel}", lang, lc)}</p>
                  <p>{rich("{email}", lang, lc)}</p>
                </address>
                <h2 className="eyebrow mt-7 text-mauve">{d.footer.hoursTitle}</h2>
                <p className="mt-3 text-white/90">{d.common.hoursLine}</p>
              </div>
              <div>
                <h2 className="eyebrow text-mauve">{d.footer.linksTitle}</h2>
                <ul className="mt-4 space-y-1.5">
                  {d.footer.links.map((l) => (
                    <li key={l.key}>
                      <Link href={href(l.key as PageKey, lang)} className="text-white/90 hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <LangLink to={other} label={d.common.switchLang} className="text-white/90 hover:text-white hover:underline" />
                  </li>
                </ul>
              </div>
            </div>
          )}
          {compact && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/90">
                {d.common.addressLine} · {rich("{tel}", lang, lc)} · {d.common.hoursLine}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                {(["privacy", "terms", "accessibility"] as PageKey[]).map((k) => (
                  <li key={k}>
                    <Link href={href(k, lang)} className="text-white/90 hover:underline">
                      {d.footer.links.find((l) => l.key === k)?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rule-light my-7" />
          <div className="space-y-2 text-[15px] leading-relaxed text-white/80">
            <p>{d.footer.identity}</p>
            <p>{rich(d.footer.privacyOfficer, lang, lc)}</p>
            <p>{d.footer.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
