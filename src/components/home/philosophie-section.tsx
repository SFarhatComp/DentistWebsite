import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

interface Pilier {
  title: string
  body: string
}

export function PhilosophieSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const piliers = getTranslationObjectList<Pilier>(lang, "home.philosophie.piliers")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <SectionLabel>{t("home.philosophie.label")}</SectionLabel>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem] max-w-[24ch]">
            {t("home.philosophie.title")}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {piliers.map((p, i) => {
            // Une case sur deux en rose : alternance visuelle demandée au handoff §4.
            const rose = i % 2 === 1
            return (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div
                  className={cn(
                    "h-full px-6 py-7",
                    rose ? "bg-primary text-primary-on" : "bg-surface text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 text-xs font-medium tabular-nums",
                      rose ? "text-primary-on-muted" : "text-accent"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl leading-[1.18] tracking-[-0.01em]">{p.title}</h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-[1.6]",
                      rose ? "text-primary-on" : "text-muted-foreground"
                    )}
                  >
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
