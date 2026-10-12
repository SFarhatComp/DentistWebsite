import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { i18n } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

// Surcharge le title template root pour utiliser le nom localisé du site.
export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  const siteName = t("site.name")
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
  }
}

export default async function LangLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params
  const { children } = props

  if (!i18n.locales.includes(params.lang as Locale)) notFound()
  const lang = params.lang as Locale

  // L'en-tête est posé en absolu par-dessus le héros sombre de chaque page : le
  // conteneur sert de repère de positionnement, et <main> ne porte aucun
  // décalage haut. Le bandeau collant de la v1 disparaît — la maquette garde
  // l'appel à l'action dans l'en-tête à toutes les largeurs.
  return (
    <div className="relative">
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </div>
  )
}
