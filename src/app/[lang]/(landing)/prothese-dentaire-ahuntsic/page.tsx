import { BookButton, Landing } from "@/components/Landing"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { serviceHref } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({
    lang,
    target: { page: "dentures" },
    ...getDict(lang).meta.dentures,
    image: "laboratoire",
    noindex: true,
    canonical: { service: "complete" },
  })
}

export default async function DenturesLanding({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.landings.dentures
  return (
    <Landing
      lang={lang}
      d={d}
      eyebrow={t.eyebrow}
      h1={t.h1}
      text={t.text}
      points={t.points}
      image={t.heroImage}
      alt={t.heroAlt}
      faq={t.faqItems}
      learnMoreHref={serviceHref("complete", lang)}
      actions={
        <>
          <BookButton lang={lang} label={facts.bookingUrl ? d.common.seeSlots : d.common.requestSlot} motif={t.motif} />
          <p className="flex min-h-12 items-center text-[17px]">{rich(t.broken, lang, "ml-1 font-semibold underline underline-offset-4 whitespace-nowrap")}</p>
        </>
      }
    />
  )
}
