import { Section } from "@/components/Blocks"
import { RequestForm } from "@/components/forms/RequestForm"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import { facts } from "@/lib/facts"
import { formText } from "@/lib/form-text"
import type { Locale } from "@/lib/i18n-config"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  const m = getDict(lang).meta.booking
  const description = facts.bookingUrl ? m.description : m.descriptionNoOnline
  return pageMetadata({ lang, target: { page: "booking" }, title: m.title, description, image: "attente" })
}

/**
 * Rendez-vous : bouton vers la page de réservation Google (nouvel onglet,
 * jamais en cadre intégré : aucun témoin Google avant le clic) et demande de
 * rappel par formulaire. Aucun pixel publicitaire sur cette page (lot 5).
 */
export default async function BookingPage({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.booking
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={rich(facts.bookingUrl ? t.intro : t.introNoOnline, lang, "underline underline-offset-4 whitespace-nowrap")} image="attente" alt="" />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div id="formulaire">
            {facts.bookingUrl && (
              <div className="mb-14 rounded-[3px] bg-aub p-7 text-white sm:p-9">
                <h2 className="t-2">{t.online.title}</h2>
                <p className="mt-3 text-white/85">{t.online.text}</p>
                <a href={facts.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                  {t.online.button} <span aria-hidden>↗</span>
                  <span className="sr-only">{d.common.newTab}</span>
                </a>
                <p className="mt-5 text-[15px] text-white/75">{rich(t.online.privacy, lang, "underline underline-offset-4")}</p>
              </div>
            )}
            <h2 className="t-2">{facts.bookingUrl ? t.request.titleAlt : t.request.title}</h2>
            <p className="mt-3 max-w-prose text-aub/85">{t.request.text}</p>
            <div className="mt-8">
              <RequestForm lang={lang} d={formText(d)} />
            </div>
          </div>

          <div className="space-y-10">
            <div className="rounded-[3px] border border-cta/40 bg-cta/[0.05] p-6">
              <p className="text-[17px]">{rich(t.urgentNotice, lang, "font-semibold underline underline-offset-4 whitespace-nowrap")}</p>
            </div>
            <div>
              <h2 className="t-3">{t.motifs.title}</h2>
              <table className="mt-5 w-full text-left text-[16px]">
                <thead>
                  <tr className="border-b border-aub/25 text-[13px] uppercase tracking-[0.12em] text-mauve-ink">
                    {t.motifs.head.slice(0, facts.bookingUrl ? 3 : 2).map((h) => (
                      <th key={h} scope="col" className="pb-2 pr-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.motifs.rows.map(([m, dur, online]) => (
                    <tr key={m} className="border-b border-aub/10 align-top">
                      <th scope="row" className="py-3 pr-3 font-normal">
                        {m}
                      </th>
                      <td className="whitespace-nowrap py-3 pr-3">{dur}</td>
                      {facts.bookingUrl && <td className="py-3 text-aub/80">{online}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-aub/85">{rich(t.after, lang)}</p>
            <div className="border-t border-aub/15 pt-6 text-[16px] text-aub/80">
              <p>{d.common.addressLine} · {d.common.floor}</p>
              <p className="mt-1">{d.common.hoursLine}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
