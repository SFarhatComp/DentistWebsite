import { BracketList, Section, SectionTitle } from "@/components/Blocks"
import { CtaBand } from "@/components/CtaBand"
import { Filmstrip } from "@/components/Filmstrip"
import { PageHero } from "@/components/PageHero"
import { Photo } from "@/components/Photo"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "lab" }, ...getDict(lang).meta.lab, image: "laboratoire" })
}

export default async function LabPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.lab
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="laboratoire" alt={t.heroAlt} />

      <Section>
        <SectionTitle title={t.benefits.title} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[3px] bg-aub/15 md:grid-cols-3">
          {t.benefits.items.map((b) => (
            <div key={b.title} className="reveal bg-ivory-paper p-7 sm:p-9">
              <h3 className="t-3">{b.title}</h3>
              <p className="mt-3 text-aub/85">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quatre étapes, quatre photos */}
      <section className="bg-aub-deep text-white">
        <div className="frame py-20 sm:py-28">
          <SectionTitle title={t.steps.title} light />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {t.steps.items.map((s, i) => (
              <li key={s.title} className="reveal">
                <Photo name={s.image} alt={s.alt} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw" className="aspect-[3/4] rounded-[2px]" />
                <p className="mt-5 font-display text-[40px] leading-none text-mauve">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{s.title}</h3>
                <p className="mt-1 text-[16px] text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 className="t-2">{t.made.title}</h2>
            <BracketList items={t.made.items} className="mt-6" />
          </div>
          <div className="reveal space-y-10">
            <div className="border-t border-aub/15 pt-6">
              <h2 className="t-3">{t.equipment.title}</h2>
              <p className="mt-3 text-aub/85">{t.equipment.text}</p>
            </div>
            <div className="border-t border-aub/15 pt-6">
              <h2 className="t-3">{t.team.title}</h2>
              <p className="mt-3 text-aub/85">{t.team.text}</p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-ivory pb-16 pt-4 sm:pb-24">
        <div className="frame">
          <h2 className="eyebrow mb-6 text-mauve-ink">{t.galleryTitle}</h2>
        </div>
        <Filmstrip
          label={t.galleryTitle}
          items={t.gallery.map((g) => ({ image: g.image, alt: g.alt, title: g.alt, text: "" }))}
        />
      </section>

      <CtaBand
        title={t.final.title}
        text={t.final.text}
        bookHref={href("booking", lang)}
        bookLabel={d.common.book}
        callLabel={d.common.call}
      />
    </>
  )
}
