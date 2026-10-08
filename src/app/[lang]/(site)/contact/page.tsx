import { Section, SectionTitle } from "@/components/Blocks"
import { ContactForm } from "@/components/forms/ContactForm"
import { MapConsent } from "@/components/MapConsent"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import { formText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "contact" }, ...getDict(lang).meta.contact, image: "entree" })
}

export default async function ContactPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.contact
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.intro} image="entree" alt={t.heroAlt} position="50% 30%" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal">
            <h2 className="t-2">{t.details.title}</h2>
            <dl className="mt-8 divide-y divide-aub/12 border-y border-aub/12">
              <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
                <dt className="eyebrow pt-1 text-mauve-ink">{t.details.address}</dt>
                <dd>
                  {d.common.addressFull}
                  <span className="block text-aub/70">{d.common.floor}</span>
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
                <dt className="eyebrow pt-1 text-mauve-ink">{t.details.phone}</dt>
                <dd className="font-display text-[26px] leading-tight">{rich("{tel}", lang)}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
                <dt className="eyebrow pt-1 text-mauve-ink">{t.details.email}</dt>
                <dd>{rich("{email}", lang)}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
                <dt className="eyebrow pt-1 text-mauve-ink">{t.details.hours}</dt>
                <dd>
                  <table className="w-full max-w-[320px] text-left">
                    <tbody>
                      {d.common.hoursRows.map(([day, h]) => (
                        <tr key={day}>
                          <th scope="row" className="py-0.5 pr-4 font-normal">
                            {day}
                          </th>
                          <td className="py-0.5">{h}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <span className="mt-1 block text-aub/70">{d.common.holidays}</span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="reveal">
            <h2 className="sr-only">{t.map.title}</h2>
            <MapConsent t={t.map} />
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle title={t.getting.title} />
            <dl className="mt-8 space-y-6">
              {t.getting.items.map((g) => (
                <div key={g.title} className="reveal grid gap-1 sm:grid-cols-[150px_1fr]">
                  <dt className="font-medium">{g.title}</dt>
                  <dd className="text-aub/85">{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionTitle title={t.areas.title} />
            <dl className="mt-8 divide-y divide-aub/12 border-y border-aub/12">
              {t.areas.items.map(([area, how]) => (
                <div key={area} className="reveal py-3.5">
                  <dt className="inline font-medium">{area}{lang === "fr" ? " : " : ": "}</dt>
                  <dd className="inline text-aub/85">{how}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="mist" className="!py-12 sm:!py-16">
        <div className="reveal max-w-[70ch]">
          <h2 className="t-3">{t.access.title}</h2>
          <p className="mt-3 text-[18px]">{t.access.text}</p>
        </div>
      </Section>

      <Section id="formulaire">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionTitle title={t.formTitle} />
          <ContactForm lang={lang} d={formText(d)} />
        </div>
      </Section>
    </>
  )
}
