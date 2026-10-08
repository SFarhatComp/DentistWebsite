import { CtaBand } from "@/components/CtaBand"
import { PageHero } from "@/components/PageHero"
import { ServiceMap } from "@/components/ServiceMap"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "services" }, ...getDict(lang).meta.services, image: "salle-2" })
}

export default async function ServicesPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.servicesIndex
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="salle-2" alt={t.heroAlt} />
      <section className="bg-ivory-paper">
        <div className="frame py-16 sm:py-24">
          <ServiceMap lang={lang} d={d} detailed />
        </div>
      </section>
      <CtaBand
        title={d.home.final.lines}
        signature={d.common.signature}
        bookHref={href("booking", lang)}
        bookLabel={d.common.book}
        callLabel={d.common.call}
      />
    </>
  )
}
