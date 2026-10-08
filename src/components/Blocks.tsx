import Link from "next/link"
import type { ReactNode } from "react"
import type { Dict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href, relatedHref, type ServiceKey } from "@/lib/routes"
import { getService } from "@/lib/services"
import { cn } from "@/lib/utils"
import { JsonLd } from "./JsonLd"

/** Titre de section : sur-titre en crochets, titre à empattement. */
export function SectionTitle({ eyebrow, title, className, light }: { eyebrow?: string; title: string; className?: string; light?: boolean }) {
  return (
    <div className={cn("reveal", className)}>
      {eyebrow && <p className={cn("eyebrow", light ? "text-mauve" : "text-mauve-ink")}>{eyebrow}</p>}
      <h2 className={cn("t-2", eyebrow && "mt-3")}>{title}</h2>
    </div>
  )
}

export function Section({ children, className, tone = "paper", id }: { children: ReactNode; className?: string; tone?: "paper" | "ivory" | "mist" | "aub"; id?: string }) {
  const bg = { paper: "bg-ivory-paper", ivory: "bg-ivory", mist: "bg-mauve-mist/60", aub: "bg-aub text-white" }[tone]
  return (
    <section id={id} className={bg}>
      <div className={cn("frame py-16 sm:py-24", className)}>{children}</div>
    </section>
  )
}

/** Liste à puces en crochets, motif de la signature. */
export function BracketList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[3px] shrink-0 font-display text-[18px] leading-none text-mauve-ink">
            [&thinsp;]
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** Étapes numérotées en grands chiffres à empattement. */
export function Steps({ items, className }: { items: { title?: string; text: ReactNode }[]; className?: string }) {
  return (
    <ol className={cn("divide-y divide-aub/12 border-y border-aub/12", className)}>
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[52px_1fr] gap-4 py-5 sm:grid-cols-[72px_1fr]">
          <span className="font-display text-[34px] leading-none text-mauve-ink sm:text-[44px]">{String(i + 1).padStart(2, "0")}</span>
          <div className="pt-1">
            {it.title && <p className="font-medium">{it.title}</p>}
            <p className={cn(it.title && "mt-1 text-aub/80")}>{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Encadré de prise de rendez-vous, collant sur grand écran. */
export function BookAside({ lang, d, title, text }: { lang: Locale; d: Dict; title?: string; text?: string }) {
  return (
    <aside className="rounded-[3px] bg-aub p-7 text-white lg:sticky lg:top-[126px]">
      <p className="eyebrow text-mauve">[ {facts.name} ]</p>
      <p className="t-3 mt-4">{title ?? d.common.servicePage.asideTitle}</p>
      <p className="mt-3 text-[16px] text-white/85">{text ?? d.common.servicePage.asideText}</p>
      <div className="mt-6 grid gap-3">
        <Link href={href("booking", lang)} className="btn btn-primary w-full">
          {d.common.book}
        </Link>
        <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost-light w-full">
          {facts.phoneDisplay}
        </a>
      </div>
      <div className="rule-light my-6" />
      <p className="text-[15px] text-white/80">{d.common.addressLine}</p>
      <p className="mt-1 text-[15px] text-white/80">{d.common.hoursLine}</p>
    </aside>
  )
}

export function relatedLabel(ref: string, lang: Locale, d: Dict): string {
  const r = d.common.relatedPages
  if (ref === "urgence") return r.emergency
  if (ref === "page:firstVisit") return r.firstVisit
  if (ref === "page:method") return r.method
  if (ref === "page:lab") return r.lab
  return getService(ref as ServiceKey, lang).title
}

export function RelatedLinks({ refs, lang, d }: { refs: string[]; lang: Locale; d: Dict }) {
  return (
    <div className="reveal">
      <h2 className="eyebrow text-mauve-ink">{d.common.servicePage.related}</h2>
      <ul className="mt-4 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 sm:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
        {refs.map((ref) => (
          <li key={ref}>
            <Link href={relatedHref(ref, lang)} className="group flex h-full items-center justify-between gap-4 bg-ivory-paper p-5 font-medium transition-colors hover:bg-white hover:text-cta">
              {relatedLabel(ref, lang, d)}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${facts.siteUrl}${it.path}`,
        })),
      }}
    />
  )
}

/** Pages légales et textes longs : sections titrées. */
export function LegalSections({
  sections,
  render,
}: {
  sections: { title: string; paras?: string[]; list?: string[]; paras2?: string[] }[]
  render: (s: string) => ReactNode
}) {
  return (
    <div className="prose-dfa max-w-prose space-y-12">
      {sections.map((s) => (
        <section key={s.title}>
          <h2 className="t-3">{s.title}</h2>
          <div className="mt-4 space-y-4 text-aub/90">
            {s.paras?.map((p, i) => <p key={i}>{render(p)}</p>)}
            {s.list && <BracketList items={s.list.map((l) => render(l))} />}
            {s.paras2?.map((p, i) => <p key={`b${i}`}>{render(p)}</p>)}
          </div>
        </section>
      ))}
    </div>
  )
}
