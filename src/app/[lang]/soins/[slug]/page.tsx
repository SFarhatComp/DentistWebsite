import { notFound } from "next/navigation"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { getAllServices, getService } from "@/lib/content"
import { i18n } from "@/lib/i18n-config"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    getAllServices(lang as Locale).map((s) => ({ lang, slug: s.slug }))
  )
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const service = getService(params.lang as Locale, params.slug)
  if (!service) return {}
  return { title: service.title, description: service.shortDescription }
}

export default async function ServiceDetailPage(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params;
  const service = getService(params.lang as Locale, params.slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} lang={params.lang as Locale} />
}
