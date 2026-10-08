import Link from "next/link"
import type { ReactNode } from "react"
import type { Dict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { FaqJsonLd, FaqList, type QA } from "./Faq"
import { PageHero } from "./PageHero"

/**
 * Structure commune des pages Google Ads : H1 = mot-clé de l'annonce, trois
 * points forts, un seul geste (réserver ou appeler), bande d'infos, deux
 * questions fréquentes et un lien vers la fiche complète.
 */
export function Landing({
  lang,
  d,
  eyebrow,
  h1,
  text,
  points,
  image,
  alt,
  actions,
  faq,
  learnMoreHref,
  children,
}: {
  lang: Locale
  d: Dict
  eyebrow: string
  h1: string
  text: string
  points?: string[]
  image?: string
  alt?: string
  actions: ReactNode
  faq: QA[]
  learnMoreHref: string
  children?: ReactNode
}) {
  const l = d.landings
  return (
    <>
      <PageHero eyebrow={eyebrow} title={h1} lede={text} image={image} alt={alt} tall>
        {points && (
          <ul className="mb-8 flex flex-wrap gap-2.5">
            {points.map((p) => (
              <li key={p} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[15px] backdrop-blur-sm">
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-3">{actions}</div>
      </PageHero>

      {children}

      <section className="bg-aub text-white">
        <div className="frame grid gap-6 py-10 sm:grid-cols-3 sm:py-12">
          <p>
            <span className="eyebrow block text-mauve">{l.infoTitle}</span>
            <span className="mt-2 block">{d.common.addressLine}</span>
          </p>
          <p className="sm:pt-[25px]">{d.common.hoursLine}</p>
          <p className="sm:pt-[25px]">{l.coverageLine}</p>
        </div>
      </section>

      <section className="bg-ivory-paper">
        <div className="frame grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="t-2">{l.faqTitle}</h2>
          <div>
            <FaqList items={faq} lang={lang} />
            <Link href={learnMoreHref} className="link-arrow mt-8">
              {d.common.learnMore} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <FaqJsonLd items={faq} />
      </section>
    </>
  )
}

export function BookButton({ lang, label, motif }: { lang: Locale; label: string; motif?: string }) {
  return (
    <Link href={`${href("booking", lang)}${motif ? `?motif=${motif}` : ""}#formulaire`} className="btn btn-primary">
      {label}
    </Link>
  )
}

export function CallButton({ label, primary = false }: { label: string; primary?: boolean }) {
  return (
    <a href={`tel:${facts.phoneTel}`} className={primary ? "btn btn-primary" : "btn btn-ghost-light"}>
      {label}
    </a>
  )
}
