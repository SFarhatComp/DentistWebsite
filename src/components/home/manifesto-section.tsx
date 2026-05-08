import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const LINES = ["1", "2", "3", "4", "5"] as const

export function ManifestoSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <SectionLabel>{t("home.manifeste.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-12">
              {t("home.manifeste.title")}
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {LINES.map((n, i) => (
              <FadeIn key={n}>
                <p
                  className="font-display text-xl md:text-2xl text-foreground leading-snug"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {t(`home.manifeste.lines.${n}`)}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
