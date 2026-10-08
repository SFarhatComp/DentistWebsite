import { LegalSections, Section } from "@/components/Blocks"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "accessibility" }, ...getDict(lang).meta.accessibility })
}

export default async function AccessibilityPage({ params }: P) {
  const lang = (await params).lang as Locale
  const t = getDict(lang).accessibility
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.updated} />
      <Section>
        <LegalSections sections={t.sections} render={(s) => rich(s, lang)} />
      </Section>
    </>
  )
}
