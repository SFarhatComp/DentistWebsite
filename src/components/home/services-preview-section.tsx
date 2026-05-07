import Link from "next/link"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

const SERVICES = ["examen-complet", "prevention-hygiene", "dentisterie-operatoire", "esthetique-dentaire", "couronnes-ponts", "implantologie", "aligneurs", "urgences"] as const

export function ServicesPreviewSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("home.services.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">{t("home.services.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((slug) => (
            <StaggerItem key={slug}>
              <Link href={`/${lang}/services/${slug}`} className="block bg-background p-6 md:p-8 h-full hover:bg-surface/30 transition-colors">
                <h3 className="font-display text-xl mb-3">{t(`services.${slug}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(`services.${slug}.short`)}</p>
                <span className="text-xs text-accent label-sm">{t("common.enSavoirPlus")} →</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
