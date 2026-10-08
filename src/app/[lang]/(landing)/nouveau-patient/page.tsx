import { BookButton, CallButton, Landing } from "@/components/Landing"
import { getDict } from "@/lib/dict"
import { facts, showOpeningOffer } from "@/lib/facts"
import type { Locale } from "@/lib/i18n-config"
import { serviceHref } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

// L'offre disparaît seule le 1er janvier 2027 : la page est régénérée toutes les heures.
export const revalidate = 3600

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({
    lang,
    target: { page: "newPatient" },
    ...getDict(lang).meta.newPatient,
    image: "planification",
    noindex: true,
    canonical: { service: "examen" },
  })
}

export default async function NewPatientLanding({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.landings.newPatient
  const o = t.offer
  const faq = t.faq.map((i) => d.faq.groups[0].items[i])
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
      faq={faq}
      learnMoreHref={serviceHref("examen", lang)}
      actions={
        <>
          <BookButton lang={lang} label={facts.bookingUrl ? d.common.seeSlots : d.common.requestSlot} motif={t.motif} />
          <CallButton label={facts.phoneDisplay} />
        </>
      }
    >
      {showOpeningOffer() && (
        <section className="bg-ivory">
          <div className="frame py-16 sm:py-20">
            <div className="grid gap-10 rounded-[3px] border border-aub/20 bg-ivory-paper p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="t-2">{o.title}</h2>
                {/* Prix régulier et prix d'ouverture en caractères de même taille (art. 3.09.07) */}
                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] bg-aub/15">
                  {[
                    [o.regularLabel, o.regular],
                    [o.openingLabel, o.opening],
                  ].map(([label, price]) => (
                    <div key={label} className="bg-ivory-paper p-5">
                      <dt className="eyebrow text-mauve-ink">{label}</dt>
                      <dd className="mt-2 font-display text-[44px] leading-none">{price}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[16px] text-aub/80">{o.validity}</p>
              </div>
              <div className="space-y-5 text-[16px] text-aub/90">
                <div>
                  <h3 className="font-medium">{o.includesTitle}</h3>
                  <p className="mt-1">{o.includes}</p>
                </div>
                <p>{o.extra}</p>
                <div>
                  <h3 className="font-medium">{o.excludesTitle}</h3>
                  <p className="mt-1">{o.excludes}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Landing>
  )
}
