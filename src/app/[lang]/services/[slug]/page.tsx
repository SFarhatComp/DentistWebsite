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

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const service = getService(params.lang as Locale, params.slug)
  if (!service) return {}
  return { title: service.title, description: service.shortDescription }
}

export default function ServiceDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const service = getService(params.lang as Locale, params.slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} lang={params.lang as Locale} />
}
