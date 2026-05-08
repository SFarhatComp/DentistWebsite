import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const ITEMS = ["1", "2", "3", "4", "5", "6", "7"] as const
const PROOFS = ["1", "2", "3", "4", "5", "6", "7"] as const

export function DifferenceSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <>
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-start">
            <FadeIn className="lg:sticky lg:top-24">
              <SectionLabel>{t("home.objectif.label")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                {t("home.objectif.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                {t("home.objectif.body")}
              </p>
              <div className="h-px w-16 bg-accent mb-8" />
              <SectionLabel>{t("home.difference.label")}</SectionLabel>
              <h3 className="font-display text-2xl md:text-3xl leading-[1.15]">
                {t("home.difference.title")}
              </h3>
            </FadeIn>

            <div className="space-y-1">
              {ITEMS.map((n, i) => (
                <FadeIn key={n}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4 items-baseline border-t border-border py-5">
                    <span className="font-display text-base text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base md:text-lg text-foreground leading-relaxed">
                      {t(`home.difference.items.${n}`)}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <SectionLabel>{t("home.preuves.label")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                {t("home.preuves.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("home.preuves.intro")}
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {PROOFS.map((n, i) => (
              <FadeIn key={n} className="bg-background">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display text-sm text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <PlaceholderImage
                    aspect="video"
                    label={t(`home.preuves.items.${n}.alt`)}
                    className="mb-4"
                  />
                  <h3 className="font-display text-base md:text-lg text-foreground">
                    {t(`home.preuves.items.${n}.title`)}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
