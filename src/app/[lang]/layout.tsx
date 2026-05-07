import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { locales, getDictionary } from "@/lib/i18n"
import type { Locale } from "@/types"

interface LangLayoutProps {
  children: React.ReactNode
  params: { lang: string }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang as Locale
  const dict = getDictionary(lang)

  const siteName = (dict.site as { name: string }).name
  const tagline = (dict.site as { tagline: string }).tagline

  return {
    title: {
      default: `${siteName} | ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description: tagline,
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  }
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  const lang = params.lang as Locale

  if (!locales.includes(lang)) {
    notFound()
  }

  return (
    <>
      <Navbar lang={lang} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={lang} />
    </>
  )
}
