import { BookAside, Section } from "@/components/Blocks"
import { FaqJsonLd, FaqList } from "@/components/Faq"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "faq" }, ...getDict(lang).meta.faq, image: "attente" })
}

export default async function FaqPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.faq
  const all = t.groups.flatMap((g) => g.items)
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={rich(t.intro, lang, "underline underline-offset-4 whitespace-nowrap")} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
          <div className="space-y-14">
            {t.groups.map((g) => (
              <section key={g.title} aria-labelledby={`faq-${g.title}`}>
                <h2 id={`faq-${g.title}`} className="t-2">
                  {g.title}
                </h2>
                <div className="mt-6">
                  <FaqList items={g.items} lang={lang} />
                </div>
              </section>
            ))}
          </div>
          <div>
            <BookAside lang={lang} d={d} />
          </div>
        </div>
      </Section>
      <FaqJsonLd items={all} />
    </>
  )
}
