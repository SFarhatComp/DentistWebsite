import type { Locale } from "@/lib/i18n-config"
import { cn } from "@/lib/utils"
import { JsonLd } from "./JsonLd"
import { plain, rich } from "./Rich"

export type QA = { q: string; a: string }

/** Questions fréquentes en <details> natif : fonctionne sans JavaScript. */
export function FaqList({ items, lang, dark = false }: { items: QA[]; lang: Locale; dark?: boolean }) {
  return (
    <div className={cn("border-t", dark ? "border-white/20" : "border-aub/15")}>
      {items.map((it) => (
        <details key={it.q} className={cn("group border-b", dark ? "border-white/20" : "border-aub/15")}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[18px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
            <span>{it.q}</span>
            <span
              aria-hidden
              className={cn(
                "mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[15px] leading-none transition-transform duration-300 group-open:rotate-45",
                dark ? "border-white/40" : "border-aub/30",
              )}
            >
              +
            </span>
          </summary>
          <p className={cn("max-w-prose pb-6 pr-10", dark ? "text-white/85" : "text-aub/85")}>{rich(it.a, lang)}</p>
        </details>
      ))}
    </div>
  )
}

/** Balisage FAQPage pour Google (lot 5). */
export function FaqJsonLd({ items }: { items: QA[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: plain(it.a) },
        })),
      }}
    />
  )
}
