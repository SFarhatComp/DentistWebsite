import { notFound } from "next/navigation"
import { BookAside, BracketList, BreadcrumbJsonLd, RelatedLinks, Steps } from "@/components/Blocks"
import { CtaBand } from "@/components/CtaBand"
import { FaqJsonLd, FaqList } from "@/components/Faq"
import { PageHero } from "@/components/PageHero"
import { getDict } from "@/lib/dict"
import { i18n, type Locale } from "@/lib/i18n-config"
import { href, serviceHref, serviceKeyFromSlug, serviceKeys, serviceSlug } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"
import { getService } from "@/lib/services"

type P = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => serviceKeys.map((k) => ({ lang, slug: serviceSlug(k, lang) })))
}

async function load(params: P["params"]) {
  const { lang: l, slug } = await params
  const lang = l as Locale
  const key = serviceKeyFromSlug(slug, lang)
  if (!key) notFound()
  return { lang, key, s: getService(key, lang), d: getDict(lang) }
}

export async function generateMetadata({ params }: P) {
  const { lang, key, s } = await load(params)
  return pageMetadata({ lang, target: { service: key }, title: s.seoTitle, description: s.description, image: s.image })
}

/**
 * Gabarit commun des fiches (document de contenu) : H1 avec le lieu,
 * introduction, quand consulter, comment ça se passe, bon à savoir, questions
 * fréquentes balisées FAQPage, services liés, puis le bouton de rendez-vous.
 */
export default async function ServicePage({ params }: P) {
  const { lang, key, s, d } = await load(params)
  const sp = d.common.servicePage
  const crumbs = [
    { href: href("home", lang), label: d.common.home },
    { href: href("services", lang), label: d.nav.find((n) => n.key === "services")!.label },
  ]
  return (
    <>
      <PageHero
        eyebrow={s.title}
        title={s.h1}
        lede={s.intro[0]}
        image={s.image}
        alt=""
        crumbs={crumbs}
        crumbsLabel={d.common.breadcrumb}
      />

      <section className="bg-ivory-paper">
        <div className="frame grid gap-14 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
          <div className="space-y-16">
            {s.intro.length > 1 && (
              <div className="prose-dfa lede max-w-prose text-aub/90">
                {s.intro.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}

            <div className="reveal grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="t-3">{sp.whenToConsult}</h2>
                <BracketList items={s.whenToConsult} className="mt-5" />
              </div>
              <div className="rounded-[3px] bg-mauve-mist/70 p-6 sm:p-7">
                <h2 className="t-3">{sp.goodToKnow}</h2>
                <p className="mt-4 text-aub/90">{s.goodToKnow}</p>
              </div>
            </div>

            <div className="reveal">
              <h2 className="t-2">{sp.steps}</h2>
              <Steps items={s.steps.map((t) => ({ text: t }))} className="mt-6" />
            </div>

            {s.options && (
              <div className="reveal">
                <h2 className="t-3">{sp.options}</h2>
                <p className="mt-4 max-w-prose text-aub/90">{s.options}</p>
              </div>
            )}

            {s.faq && s.faq.length > 0 && (
              <div className="reveal">
                <h2 className="t-2">{sp.faq}</h2>
                <div className="mt-6">
                  <FaqList items={s.faq} lang={lang} />
                </div>
                <FaqJsonLd items={s.faq} />
              </div>
            )}

            {s.sources && s.sources.length > 0 && (
              <div className="text-[15px] text-aub/75">
                <h2 className="eyebrow text-mauve-ink">{sp.sources}</h2>
                <ul className="mt-3 space-y-1">
                  {s.sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-cta">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <RelatedLinks refs={s.related} lang={lang} d={d} />

            <p className="border-l-2 border-mauve pl-4 text-[16px] italic text-aub/75">{sp.disclaimer}</p>
          </div>

          <div>
            <BookAside lang={lang} d={d} />
          </div>
        </div>
      </section>

      <CtaBand
        title={d.home.final.lines}
        signature={d.common.signature}
        bookHref={href("booking", lang)}
        bookLabel={d.common.book}
        callLabel={d.common.call}
      />

      <BreadcrumbJsonLd
        items={[
          { name: d.common.home, path: href("home", lang) },
          { name: crumbs[1].label, path: href("services", lang) },
          { name: s.title, path: serviceHref(key, lang) },
        ]}
      />
    </>
  )
}
