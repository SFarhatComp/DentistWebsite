import Image from "next/image"
import Link from "next/link"
import { BookingBar } from "@/components/BookingBar"
import { CtaBand } from "@/components/CtaBand"
import { Photo } from "@/components/Photo"
import { rich } from "@/components/Rich"
import { ServiceMap } from "@/components/ServiceMap"
import { getDict } from "@/lib/dict"
import { facts, showOpeningBanner } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

// Le bandeau d'ouverture disparaît seul : la page est régénérée toutes les heures.
export const revalidate = 3600

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  const m = getDict(lang).meta.home
  return pageMetadata({ lang, target: { page: "home" }, ...m, image: "planification" })
}

export default async function Home({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const h = d.home

  return (
    <>
      {/* ——— Plan d'ouverture : la photo du bureau, plein cadre ——— */}
      <section className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-aub-deep text-white">
        <div className="hero-media absolute inset-0 -z-20">
          <Image
            src="/img/planification.webp"
            alt={h.heroAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
        </div>
        <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

        <div className="frame relative grid flex-1 items-end gap-10 pb-8 pt-[132px] lg:grid-cols-[1fr_auto] lg:pb-10">
          <div className="max-w-[760px]">
            {showOpeningBanner() && (
              <p className="slide-in mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[14px] backdrop-blur-sm">
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-cta" />
                {d.common.openingPill}
              </p>
            )}
            <h1>
              <span className="eyebrow slide-in block text-mauve-mist">
                <span aria-hidden className="mr-2 text-mauve">[</span>
                {h.eyebrow}
                <span aria-hidden className="ml-2 text-mauve">]</span>
              </span>
              <span className="h-hero mt-5 block">
                {h.h1Lines.map((l) => (
                  <span key={l} className="mask">
                    <span>{l}</span>
                  </span>
                ))}
              </span>
            </h1>
            <p className="lede slide-in d1 mt-7 max-w-[54ch] text-white/90">{h.lede}</p>
            <div className="slide-in d2 mt-8 flex flex-wrap gap-3">
              <Link href={href("booking", lang)} className="btn btn-primary">
                {d.common.book}
              </Link>
              <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost-light">
                {d.common.callNumber}
              </a>
            </div>
          </div>

          {/* Index des « plans » de la visite, comme un générique */}
          <ol aria-hidden className="slide-in d3 hidden gap-4 border-l border-white/25 pl-6 text-[14px] uppercase tracking-[0.16em] text-white/80 lg:grid">
            {h.reel.map((r) => (
              <li key={r.n} className="flex items-baseline gap-4">
                <span className="w-7 font-display text-[20px] normal-case tracking-normal text-mauve-mist">{r.n}</span>
                {r.label}
              </li>
            ))}
          </ol>
        </div>

        <div className="frame relative pb-6 sm:pb-10">
          <div className="slide-in d3">
            <BookingBar lang={lang} t={h.bookingBar} cta={facts.bookingUrl ? d.common.seeSlots : d.common.requestSlot} />
          </div>
        </div>
      </section>

      {/* ——— Votre première visite, en trois temps ——— */}
      <section className="bg-ivory-paper">
        <div className="frame py-16 sm:py-28">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mauve-ink">{h.firstVisit.eyebrow}</p>
              <h2 className="t-1 mt-3">{h.firstVisit.title}</h2>
            </div>
            <Link href={href("firstVisit", lang)} className="link-arrow">
              {h.firstVisit.link} <span aria-hidden>→</span>
            </Link>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 md:grid-cols-3">
            {h.firstVisit.steps.map((s, i) => (
              <li key={s.title} className="reveal grid grid-cols-[48px_1fr] gap-x-4 bg-ivory-paper p-6 sm:p-9 md:block md:min-h-[300px]" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="row-span-2 font-display text-[48px] leading-none text-mauve-ink md:text-[64px]">{i + 1}</span>
                <h3 className="t-3 md:mt-6">{s.title}</h3>
                <p className="mt-2 text-aub/80 md:mt-3">{rich(s.text, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Le studio, pièce par pièce ——— */}
      <section className="bg-ivory">
        <div className="frame py-16 sm:py-28">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mauve-ink">{h.rooms.eyebrow}</p>
              <h2 className="t-1 mt-3 max-w-[16ch]">{h.rooms.title}</h2>
            </div>
            <Link href={href("about", lang)} className="link-arrow">
              {h.rooms.link} <span aria-hidden>→</span>
            </Link>
          </div>
          {/* Sur mobile, les trois pièces défilent à l'horizontale, comme une pellicule */}
          <div
            className="filmstrip -mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 pt-3 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0"
            style={{ scrollPaddingInline: "var(--gutter)" }}
          >
            {h.rooms.items.map((r, i) => (
              <figure key={r.n} className={`reveal w-[80vw] max-w-[360px] shrink-0 snap-start px-2.5 md:w-auto md:max-w-none md:px-0 ${i === 1 ? "md:mt-16" : ""}`}>
                <div className="brackets text-mauve">
                  <Photo name={r.image} alt={r.alt} sizes="(min-width: 768px) 31vw, 100vw" className="aspect-[4/3] md:aspect-[4/5]" />
                </div>
                <figcaption className="mt-6">
                  <span className="font-display text-[22px] text-mauve-ink">{r.n}.</span>{" "}
                  <span className="font-medium">{r.title}</span> <span className="text-aub/80">{r.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Les services ——— */}
      <section className="bg-ivory-paper">
        <div className="frame py-16 sm:py-28">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mauve-ink">{h.services.eyebrow}</p>
              <h2 className="t-1 mt-3">{h.services.title}</h2>
              <p className="lede mt-4 text-aub/80">{h.services.intro}</p>
            </div>
            <Link href={href("services", lang)} className="link-arrow">
              {h.services.link} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-14">
            <ServiceMap lang={lang} d={d} />
          </div>
        </div>
      </section>

      {/* ——— La méthode : bande aubergine ——— */}
      <section className="relative isolate overflow-hidden bg-aub text-white">
        <span aria-hidden className="pointer-events-none absolute -left-[4vw] top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[44vw] leading-none text-white/[0.035]">
          [ ]
        </span>
        <div className="frame grid gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="reveal">
            <p className="eyebrow text-mauve">{h.method.eyebrow}</p>
            <h2 className="t-1 mt-4 max-w-[14ch]">{h.method.title}</h2>
          </div>
          <div className="reveal">
            <p className="lede text-white/85">{h.method.text}</p>
            <Link href={href("method", lang)} className="link-arrow mt-8 text-white hover:!text-mauve-mist">
              {h.method.link} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Un laboratoire dans le studio ——— */}
      <section className="bg-ivory-paper">
        <div className="frame grid items-center gap-12 py-20 sm:py-28 md:grid-cols-2 md:gap-16">
          <div className="reveal brackets text-mauve md:order-2">
            <Photo name="couronne-macro" alt={h.lab.alt} sizes="(min-width: 768px) 46vw, 100vw" className="aspect-[4/3]" />
          </div>
          <div className="reveal">
            <p className="eyebrow text-mauve-ink">{h.lab.eyebrow}</p>
            <h2 className="t-1 mt-3">{h.lab.title}</h2>
            <p className="lede mt-6 text-aub/80">{h.lab.text}</p>
            <Link href={href("lab", lang)} className="link-arrow mt-8">
              {h.lab.link} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Couverture et paiement + infos pratiques ——— */}
      <section className="bg-mauve-mist/60">
        <div className="frame grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div className="reveal">
            <p className="eyebrow text-mauve-ink">{h.coverage.eyebrow}</p>
            <h2 className="t-2 mt-3">{h.coverage.title}</h2>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 sm:grid-cols-2">
              {h.coverage.items.map((c) => (
                <div key={c.title} className="bg-ivory-paper p-6">
                  <dt className="font-display text-[26px] leading-tight">{c.title}</dt>
                  <dd className="mt-2 text-[16px] text-aub/80">{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal">
            <p className="eyebrow text-mauve-ink">{h.practical.eyebrow}</p>
            <h2 className="t-2 mt-3">{h.practical.title}</h2>
            <ul className="mt-8 space-y-3 text-[17px]">
              <li>{d.common.addressLine}</li>
              <li>{d.common.hoursLine}</li>
              <li>{rich("{tel} · {email}", lang)}</li>
              <li>{h.practical.parking}</li>
              <li>{h.practical.bus}</li>
            </ul>
            <Link href={href("contact", lang)} className="link-arrow mt-8">
              {h.practical.link} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={h.final.lines}
        signature={d.common.signature}
        bookHref={href("booking", lang)}
        bookLabel={d.common.book}
        callLabel={d.common.call}
      />
    </>
  )
}
