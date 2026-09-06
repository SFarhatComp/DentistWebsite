import { getTranslations } from "@/lib/i18n"
import { features } from "@/lib/features"
import type { Locale } from "@/types"

/** Bande urgence. Désactivable via `features.urgenceBanner` (handoff §4). */
export function UrgenceBanner({ lang }: { lang: Locale }) {
  if (!features.urgenceBanner) return null
  const t = getTranslations(lang)

  return (
    <div className="bg-urgence">
      <a
        href={`tel:${t("contact.phoneTel")}`}
        className="block px-6 py-[13px] text-center text-xs tracking-[0.05em] text-primary transition-colors hover:text-primary-hover md:px-12"
      >
        {t("home.urgence.text")}
      </a>
    </div>
  )
}
