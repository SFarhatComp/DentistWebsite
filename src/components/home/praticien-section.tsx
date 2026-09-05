import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations, getTranslationList } from "@/lib/i18n"
import type { Locale } from "@/types"

export function PraticienSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const credentials = getTranslationList(lang, "home.praticien.credentials")

  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 items-center max-w-5xl">
          <FadeIn direction="left">
            <PlaceholderImage aspect="portrait" label="dr-bader-ramdani.jpg" />
          </FadeIn>
          <FadeIn>
            <SectionLabel>{t("home.praticien.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-3">
              {t("home.praticien.title")}
            </h2>
            <p className="font-display italic text-lg md:text-xl text-primary leading-snug mb-6">
              {t("home.praticien.role")}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.praticien.body")}
            </p>
            {credentials.length > 0 && (
              <ul className="mt-8 pt-8 border-t border-border space-y-3">
                {credentials.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-foreground leading-relaxed">
                    <span className="text-accent select-none" aria-hidden="true">
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
