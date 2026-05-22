import { PageHero } from "@/components/shared/page-hero"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return { title: t("realisationsPage.metaTitle") }
}

export default async function RealisationsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return (
    <PageHero
      label={t("realisationsPage.label")}
      title={t("realisationsPage.title")}
      subtitle={t("realisationsPage.subtitle")}
    />
  )
}
