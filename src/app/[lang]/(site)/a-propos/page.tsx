import { Section } from "@/components/Blocks"
import { CtaBand } from "@/components/CtaBand"
import { Filmstrip } from "@/components/Filmstrip"
import { PageHero } from "@/components/PageHero"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "about" }, ...getDict(lang).meta.about, image: "entree" })
}

export default async function AboutPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.about
  const blocks = [t.dentist, t.team, t.infection, t.community]
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="entree" alt={t.heroAlt} position="50% 30%" />

      <section className="bg-ivory py-16 sm:py-24">
        <div className="frame">
          <h2 className="t-2 reveal">{t.rooms.title}</h2>
        </div>
        <div className="mt-10">
          <Filmstrip label={t.rooms.title} hint={t.rooms.hint} items={t.rooms.items} />
        </div>
      </section>

      <Section>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {blocks.map((b, i) => (
            <div key={b.title} className={`reveal border-t pt-6 ${i === 0 ? "border-aub md:col-span-2" : "border-aub/15"}`}>
              <h2 className={i === 0 ? "t-2" : "t-3"}>{b.title}</h2>
              <p className={`mt-4 max-w-prose ${i === 0 ? "lede" : ""} text-aub/85`}>{b.text}</p>
            </div>
          ))}
        </div>
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
