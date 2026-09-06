import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

interface Rangee {
  categorie: string
  detail: string
}

export function SoinsSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const rangees = getTranslationObjectList<Rangee>(lang, "home.soinsSection.rangees")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
            {t("home.soinsSection.title")}
          </h2>
        </FadeIn>
        <div className="mt-10">
          {rangees.map((r, i) => {
            // Une rangée sur deux sur fond surface, titre rose (handoff §4).
            const alt = i % 2 === 1
            return (
              <FadeIn key={r.categorie} delay={i * 0.04}>
                <div
                  className={cn(
                    "grid gap-4 px-5 py-[22px] md:grid-cols-[0.6fr_1.4fr] md:gap-8",
                    i === 0 && "border-t border-border",
                    alt && "bg-surface"
                  )}
                >
                  <h3 className={cn("font-display text-xl leading-[1.18]", alt && "text-primary")}>
                    {r.categorie}
                  </h3>
                  <p className="text-sm leading-[1.6] text-muted-foreground">{r.detail}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
