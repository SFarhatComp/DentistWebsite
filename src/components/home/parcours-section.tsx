import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function ParcoursSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeIn className="max-w-2xl mb-12">
          <SectionLabel>{t("home.triad.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">
            {t("home.triad.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("home.triad.body")}
          </p>
        </FadeIn>

        <div className="border-t border-border pt-16 mt-16">
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>{t("home.deuxRdv.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("home.deuxRdv.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.deuxRdv.body")}
            </p>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            <FadeIn className="bg-background">
              <div className="p-8 md:p-10 h-full">
                <div className="font-display text-2xl text-accent/70 tabular-nums mb-4">01</div>
                <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight">
                  {t("home.deuxRdv.rdv1.title")}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("home.deuxRdv.rdv1.body")}
                </p>
              </div>
            </FadeIn>
            <FadeIn className="bg-background">
              <div className="p-8 md:p-10 h-full">
                <div className="font-display text-2xl text-accent/70 tabular-nums mb-4">02</div>
                <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight">
                  {t("home.deuxRdv.rdv2.title")}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("home.deuxRdv.rdv2.body")}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-12">
            <Link href={`/${lang}/premiere-visite`} className="inline-flex items-center text-primary hover:underline text-sm">
              Voir le déroulement détaillé →
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
