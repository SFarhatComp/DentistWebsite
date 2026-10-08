import { LegalSections, Section } from "@/components/Blocks"
import { PageHero } from "@/components/PageHero"
import { rich } from "@/components/Rich"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"
import { pageMetadata } from "@/lib/seo"

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Locale
  return pageMetadata({ lang, target: { page: "privacy" }, ...getDict(lang).meta.privacy })
}

export default async function PrivacyPage({ params }: P) {
  const lang = (await params).lang as Locale
  const t = getDict(lang).privacy
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.h1} lede={t.updated} />
      <Section>
        <LegalSections sections={t.sections} render={(s) => rich(s, lang)} />
      </Section>
    </>
  )
}
