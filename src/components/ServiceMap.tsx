import Link from "next/link"
import type { Dict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href, serviceHref } from "@/lib/routes"
import { servicesByFamily } from "@/lib/services"
import { cn } from "@/lib/utils"
import { Photo } from "./Photo"
import { rich } from "./Rich"

/**
 * La carte des soins en quatre familles. Version « detailed » (page Services) :
 * une photo par famille et le résumé de chaque service ; version courte (accueil) :
 * la liste des noms seulement.
 */
export function ServiceMap({ lang, d, detailed = false }: { lang: Locale; d: Dict; detailed?: boolean }) {
  const groups = servicesByFamily(lang)
  return (
    <div className={cn("grid gap-x-10", detailed ? "gap-y-20" : "gap-y-12 md:grid-cols-2")}>
      {groups.map((g, gi) => {
        const img = d.servicesIndex.familyImages[g.family]
        return (
          <section key={g.family} aria-labelledby={`fam-${g.family}`} className={cn("reveal", detailed && "grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14")}>
            {detailed && (
              <Photo
                name={img.image}
                alt={img.alt}
                sizes="(min-width: 768px) 38vw, 100vw"
                className={cn("aspect-[4/3] rounded-[2px] md:aspect-[4/5]", gi % 2 === 1 && "md:order-2")}
              />
            )}
            <div>
              <div className="flex items-baseline gap-4 border-b border-aub/20 pb-4">
                <span className="font-display text-[20px] text-mauve-ink">{["I", "II", "III", "IV"][gi]}</span>
                <h3 id={`fam-${g.family}`} className={detailed ? "t-2" : "t-3"}>
                  {d.common.families[g.family]}
                </h3>
              </div>
              <ul className="divide-y divide-aub/10">
                {g.items.map((s) => (
                  <li key={s.key}>
                    <Link
                      href={serviceHref(s.key, lang)}
                      className={cn("group flex items-start justify-between gap-6 transition-colors hover:text-cta", detailed ? "py-4" : "py-3 sm:py-4")}
                    >
                      <span>
                        <span className="block text-[17px] font-medium leading-snug">{s.title}</span>
                        {detailed && <span className="mt-1 block text-[16px] text-aub/75 group-hover:text-aub/75">{s.card}</span>}
                      </span>
                      <span aria-hidden className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )
      })}
      <aside
        className={cn(
          "reveal relative overflow-hidden rounded-[3px] bg-aub p-7 text-white sm:p-9",
          !detailed && "md:col-span-2",
        )}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-mauve">{d.servicesIndex.urgent.title}</p>
            <p className="mt-3 max-w-[52ch] text-[18px]">
              {rich(d.servicesIndex.urgent.text, lang, "font-semibold underline underline-offset-4")}
            </p>
          </div>
          <Link href={href("emergency", lang)} className="link-arrow shrink-0 text-white hover:!text-mauve-mist">
            {d.servicesIndex.urgent.link} <span aria-hidden>→</span>
          </Link>
        </div>
      </aside>
    </div>
  )
}
