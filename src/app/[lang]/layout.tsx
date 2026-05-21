import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { StickyCta } from "@/components/layout/sticky-cta"
import { i18n } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

// Surcharge le title template root pour utiliser le nom localisé du site.
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  const siteName = t("site.name")
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
  }
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!i18n.locales.includes(params.lang as Locale)) notFound()
  const lang = params.lang as Locale
  return (
    <>
      <Navbar lang={lang} />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer lang={lang} />
      <StickyCta lang={lang} />
    </>
  )
}
