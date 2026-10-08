import Link from "next/link"
import { CallButton, Landing } from "@/components/Landing"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { hasStudioKey } from "@/lib/pgp"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({
    lang,
    target: { page: "emergencyLanding" },
    ...getDict(lang).meta.emergencyLanding,
    image: "salle-1",
    noindex: true,
    canonical: { page: "emergency" },
  })
}

export default async function EmergencyLanding({ params }: P) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const t = d.landings.emergency
  return (
    <Landing
      lang={lang}
      d={d}
      eyebrow={t.eyebrow}
      h1={t.h1}
      text={t.text}
      faq={d.emergency.faq}
      learnMoreHref={href("emergency", lang)}
      actions={
        <>
          <CallButton label={d.common.callNumber} primary />
          {hasStudioKey() && (
            <Link href={href("emergency", lang, "formulaire")} className="btn btn-ghost-light">
              {t.formButton}
            </Link>
          )}
        </>
      }
    >
      <section className="bg-ivory">
        <div className="frame py-14 sm:py-20">
          <div className="max-w-[70ch] border-l-4 border-cta pl-6">
            <h2 className="t-3">{t.boxTitle}</h2>
            <ul className="mt-4 space-y-2 text-[18px]">
              {t.box.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Landing>
  )
}
