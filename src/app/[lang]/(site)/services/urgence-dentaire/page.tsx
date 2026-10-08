import { BracketList, RelatedLinks, Steps } from "@/components/Blocks"
import { FaqJsonLd, FaqList } from "@/components/Faq"
import { UrgentForm } from "@/components/forms/UrgentForm"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import { formText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { hasStudioKey } from "@/lib/pgp"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }


export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "emergency" }, ...getDict(lang).meta.emergency, image: "salle-1" })
}

/**
 * Urgence : trois choses tout de suite — appelez, le jour même est possible,
 * ne venez pas sans confirmation. Aucun conseil de soins « en attendant ».
 */
export default async function EmergencyPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.emergency
  const formOn = hasStudioKey()
  const steps = formOn ? t.how.steps : [t.how.callOnly, ...t.how.steps.slice(1)]
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1}>
        <div className="max-w-[60ch] rounded-[3px] border border-white/25 bg-white/[0.07] p-5 text-[18px] leading-relaxed sm:p-6">
          {rich(t.banner, lang, "font-semibold underline underline-offset-4 whitespace-nowrap")}
        </div>
        <a href={`tel:${facts.phoneTel}`} className="btn btn-primary mt-6">
          {d.common.callNumber}
        </a>
      </PageHero>

      <section className="bg-ivory-paper">
        <div className="frame grid gap-14 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 className="t-2">{t.how.title}</h2>
            <Steps items={steps.map((s) => ({ text: rich(s, lang) }))} className="mt-6" />
          </div>
          <div className="reveal space-y-10">
            <div className="rounded-[3px] bg-aub p-7 text-white sm:p-8">
              <h2 className="t-3">{t.fees.title}</h2>
              <table className="mt-5 w-full text-left text-[17px]">
                <tbody>
                  {t.fees.rows.map(([label, price]) => (
                    <tr key={label} className="border-b border-white/15 last:border-0">
                      <th scope="row" className="py-3 pr-4 font-normal">
                        {label}
                      </th>
                      <td className="whitespace-nowrap py-3 text-right font-display text-[26px] leading-none">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[16px] text-white/85">{t.fees.text}</p>
            </div>
            <div>
              <h2 className="t-3">{t.when.title}</h2>
              <BracketList items={t.when.items} className="mt-5" />
              <p className="mt-5 text-aub/80">{t.when.hours}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mauve-mist/60">
        <div className="frame py-14 sm:py-20">
          <div className="reveal max-w-[70ch] border-l-4 border-cta pl-6">
            <h2 className="t-3">{t.afterHours.title}</h2>
            <p className="mt-3 text-[18px]">{t.afterHours.text}</p>
          </div>
        </div>
      </section>

      <section id="formulaire" className="bg-ivory-paper">
        <div className="frame grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h2 className="t-2">{t.formTitle}</h2>
            {formOn ? (
              <>
                <p className="mt-3 text-aub/80">{t.formIntro}</p>
                <div className="mt-8">
                  <UrgentForm lang={lang} d={formText(d)} />
                </div>
              </>
            ) : (
              <p className="lede mt-5 rounded-[3px] bg-ivory p-6">{rich(t.formUnavailable, lang)}</p>
            )}
          </div>
          <div className="space-y-12">
            <div>
              <h2 className="t-3">{d.common.servicePage.faq}</h2>
              <div className="mt-5">
                <FaqList items={t.faq} lang={lang} />
              </div>
              <FaqJsonLd items={t.faq} />
            </div>
            <RelatedLinks refs={t.related} lang={lang} d={d} />
          </div>
        </div>
      </section>
    </>
  )
}
