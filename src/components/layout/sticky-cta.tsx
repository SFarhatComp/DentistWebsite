import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function StickyCta({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <Link href={`/${lang}/rendez-vous`} className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-accent text-accent-foreground text-center py-4 text-sm font-medium tracking-wide">
      {t("nav.cta")}
    </Link>
  )
}
