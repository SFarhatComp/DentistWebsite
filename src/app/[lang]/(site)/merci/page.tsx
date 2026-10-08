import Link from "next/link"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { href } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }>; searchParams: Promise<{ type?: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "thanks" }, ...getDict(lang).meta.thanks, noindex: true })
}

/**
 * Page de remerciement. Sa consultation sert d'événement « demande envoyée »
 * dans la mesure d'audience sans témoin (cahier 5.6) : /merci?type=…
 */
export default async function ThanksPage({ params, searchParams }: P) {
  const lang = (await params).lang as Locale
  const type = (await searchParams).type
  const d = getDict(lang)
  const t = d.thanks
  const k = type === "contact" || type === "urgence" ? type : "rendezvous"
  return (
    <PageHero eyebrow={t.eyebrow} title={t.titles[k]} lede={rich(t.texts[k], lang, "underline underline-offset-4 whitespace-nowrap")}>
      <Link href={href("home", lang)} className="btn btn-ghost-light">
        {t.back}
      </Link>
    </PageHero>
  )
}
