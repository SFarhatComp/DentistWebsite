import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const ITEMS = ["1", "2", "3", "4", "5"] as const

export function LaboratoireTeaserSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <FadeIn direction="left">
            <PlaceholderImage aspect="square" label="laboratoire-integre-de-facto.jpg" />
          </FadeIn>
          <FadeIn direction="right">
            <div className="label-sm text-accent/80 mb-4">{t("home.laboratoire.label")}</div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-6">
              {t("home.laboratoire.title")}
            </h2>
            <p className="text-lg opacity-80 leading-relaxed mb-8">
              {t("home.laboratoire.body")}
            </p>
            <ul className="space-y-3 mb-10">
              {ITEMS.map((n, i) => (
                <li key={n} className="flex gap-3 text-base opacity-85 leading-relaxed">
                  <span className="font-display text-sm text-accent/80 tabular-nums shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(`home.laboratoire.items.${n}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/laboratoire`}
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              Découvrir le laboratoire
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
