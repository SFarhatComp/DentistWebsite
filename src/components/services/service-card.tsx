import Link from "next/link"
import type { Service, Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

export function ServiceCard({ service, lang }: { service: Service; lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <Link
      href={`/${lang}/soins/${service.slug}`}
      className="group block bg-background p-8 md:p-10 h-full hover:bg-surface/40 transition-colors"
    >
      <h3 className="font-display text-2xl mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[3rem]">{service.shortDescription}</p>
      <span className="text-xs text-accent label-sm">{t("common.enSavoirPlus")} →</span>
    </Link>
  )
}
