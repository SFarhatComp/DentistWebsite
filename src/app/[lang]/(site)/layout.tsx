import type { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { MobileBar } from "@/components/MobileBar"
import { getDict } from "@/lib/dict"
import type { Locale } from "@/lib/i18n-config"

export default async function SiteLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale
  const d = getDict(lang)
  const c = d.common
  return (
    <>
      <Header
        lang={lang}
        nav={d.nav}
        labels={{
          book: c.book,
          urgent: c.urgent,
          menu: c.menu,
          close: c.close,
          switchLang: c.switchLang,
          switchLangShort: c.switchLangShort,
          switchLangLabel: c.switchLangLabel,
          mainNav: c.mainNav,
          home: c.home,
        }}
      />
      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer lang={lang} d={d} />
      <div className="h-[76px] bg-aub-deep lg:hidden" aria-hidden />
      <MobileBar lang={lang} book={c.book} call={c.call} />
    </>
  )
}
