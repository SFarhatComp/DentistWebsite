import { PageHero } from "@/components/shared/page-hero"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("emergency.title"),
    description: t("emergency.metaDescription"),
  }
}

export default function UrgencePage({ params }: { params: { lang: string } }) {
  const t = getTranslations(params.lang as Locale)
  return (
    <PageHero
      label={t("emergency.label")}
      title={t("emergency.title")}
      subtitle={t("emergency.pageSubtitle")}
    />
  )
}
