import Link from "next/link"
import { BracketList, Section, SectionTitle, Steps } from "@/components/Blocks"
import { PageHero } from "@/components/PageHero"
import { Photo } from "@/components/Photo"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "firstVisit" }, ...getDict(lang).meta.firstVisit, image: "planification" })
}

export default async function FirstVisitPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.firstVisit
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="planification" alt={t.heroAlt} position="50% 45%">
        <Link href={href("booking", lang)} className="btn btn-primary">
          {d.common.book}
        </Link>
      </PageHero>

      {/* Deux visites */}
      <Section>
        <SectionTitle title={t.twoVisits.title} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 md:grid-cols-2">
          {t.twoVisits.items.map((it, i) => (
            <div key={it.title} className="reveal bg-ivory-paper p-7 sm:p-10">
              <p className="eyebrow text-mauve-ink">{lang === "fr" ? `Visite ${i + 1}` : `Visit ${i + 1}`}</p>
              <h3 className="t-3 mt-3">{it.title}</h3>
              <p className="mt-4 text-aub/85">{it.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Six temps */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <SectionTitle title={t.sixSteps.title} />
            <Steps items={t.sixSteps.items} className="reveal mt-8" />
          </div>
          <div className="reveal brackets self-start text-mauve lg:sticky lg:top-[140px]">
            <Photo name="salle-1" alt={t.sixSteps.roomAlt} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
          </div>
        </div>
      </Section>

      {/* Quoi apporter */}
      <Section>
        <SectionTitle title={t.bring.title} />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="reveal rounded-[3px] bg-aub p-7 text-white sm:p-9">
            <h3 className="eyebrow text-mauve">{t.bring.minTitle}</h3>
            <ul className="mt-5 space-y-3">
              {t.bring.min.map((m) => (
                <li key={m} className="flex gap-3">
                  <span aria-hidden className="text-mauve">—</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-[3px] border border-aub/15 p-7 sm:p-9">
            <h3 className="eyebrow text-mauve-ink">{t.bring.idealTitle}</h3>
            <BracketList items={t.bring.ideal} className="mt-5" />
            <p className="mt-6 text-[16px] text-aub/80">{t.bring.note}</p>
          </div>
        </div>
      </Section>

      {/* Couverture */}
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle title={t.coverage.title} />
          <div className="reveal">
            <ul className="space-y-4 text-[17px]">
              {t.coverage.items.map((c) => (
                <li key={c}>{rich(c, lang)}</li>
              ))}
            </ul>
            <p className="mt-6 font-display text-[24px] leading-snug">{t.coverage.estimate}</p>
          </div>
        </div>
      </Section>

      {/* Bon à savoir */}
      <Section>
        <SectionTitle title={t.goodToKnow.title} />
        <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {t.goodToKnow.items.map((g) => (
            <div key={g.title} className="reveal border-t border-aub/15 pt-5">
              <dt className="font-medium">{g.title}</dt>
              <dd className="mt-2 text-aub/85">{g.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="bg-aub text-white">
        <div className="frame flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <h2 className="t-2">{t.final.title}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={href("booking", lang)} className="btn btn-primary">
              {d.common.book}
            </Link>
            <span className="text-white/70">{t.final.or}</span>
            <a href={`tel:${facts.phoneTel}`} className="font-display text-[28px] underline decoration-1 underline-offset-4">
              {facts.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
