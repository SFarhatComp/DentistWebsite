import { Section, SectionTitle } from "@/components/Blocks"
import { CtaBand } from "@/components/CtaBand"
import { MethodCycle } from "@/components/MethodCycle"
import { PageHero } from "@/components/PageHero"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "method" }, ...getDict(lang).meta.method, image: "planification" })
}

export default async function MethodPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.method
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="planification" alt={t.heroAlt} position="40% 50%" />

      {/* Le cycle des cinq stades, sur fond aubergine */}
      <section className="relative isolate overflow-hidden bg-aub-deep text-white">
        <div className="frame py-20 sm:py-28">
          <SectionTitle title={t.stages.title} light />
          <p className="reveal mt-4 max-w-[60ch] text-white/80">{t.stages.note}</p>
          <p className="reveal mt-2 text-[15px] text-mauve-mist">{t.stages.hint}</p>
          <div className="mt-12">
            <MethodCycle stages={t.stages.items} label={t.stages.title} stageLabel={t.stages.stageLabel} />
          </div>
          <p className="reveal mt-12 max-w-[70ch] border-t border-white/15 pt-6 text-[16px] text-white/75">{t.stages.footnote}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionTitle title={t.checks.title} />
          <div className="reveal">
            <ol className="divide-y divide-aub/12 border-y border-aub/12">
              {t.checks.items.map(([q, when], i) => (
                <li key={q} className="grid grid-cols-[44px_1fr] gap-3 py-5">
                  <span className="font-display text-[28px] leading-none text-mauve-ink">{i + 1}</span>
                  <span>
                    <span className="block text-[18px] font-medium">{q}</span>
                    <span className="mt-1 block text-[15px] uppercase tracking-[0.12em] text-mauve-ink">{when}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-aub/85">{t.checks.note}</p>
          </div>
        </div>
      </Section>

      {/* Trois plans emboîtés : des cadres concentriques */}
      <Section tone="ivory">
        <SectionTitle title={t.plans.title} />
        <p className="reveal mt-4 text-aub/85">{t.plans.intro}</p>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="reveal" aria-hidden>
            <div className="rounded-[4px] border border-aub/30 p-5 sm:p-8">
              <p className="font-display text-[22px]">A · {t.plans.items[0].name}</p>
              <div className="mt-4 rounded-[4px] border border-aub/30 bg-ivory-paper/60 p-5 sm:p-8">
                <p className="font-display text-[22px]">B · {t.plans.items[1].name}</p>
                <div className="mt-4 rounded-[4px] bg-aub p-5 text-white sm:p-8">
                  <p className="font-display text-[22px]">C · {t.plans.items[2].name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <dl className="space-y-5">
              {t.plans.items.map((p) => (
                <div key={p.k}>
                  <dt className="font-display text-[26px] leading-tight">
                    Plan {p.k} — {p.name}
                  </dt>
                  <dd className="mt-1 text-aub/85">{p.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-aub/90">{t.plans.nested}</p>
            <p className="mt-4 rounded-[3px] bg-mauve-mist/70 p-5 text-aub/90">{t.plans.statusQuo}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle title={t.outcome.title} />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.outcome.items.map(([k, v]) => (
            <div key={k} className="reveal bg-ivory-paper p-6">
              <dt className="font-display text-[26px] leading-tight">{k}</dt>
              <dd className="mt-2 text-aub/80">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="reveal mt-8 max-w-prose text-aub/90">{t.outcome.note}</p>
      </Section>

      <CtaBand
        title={t.final.title}
        signature={d.common.signature}
        bookHref={href("booking", lang)}
        bookLabel={d.common.book}
        callLabel={d.common.call}
      />
    </>
  )
}
