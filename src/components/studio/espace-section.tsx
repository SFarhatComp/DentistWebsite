import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function EspaceSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <Container>
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>{t("studio.espace.label")}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">{t("studio.espace.title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("studio.espace.body")}</p>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StaggerItem className="lg:col-span-2"><PlaceholderImage aspect="wide" label="Réception" /></StaggerItem>
          <StaggerItem><PlaceholderImage aspect="portrait" label="Salle opératoire" /></StaggerItem>
          <StaggerItem><PlaceholderImage aspect="portrait" label="Détail architectural" /></StaggerItem>
          <StaggerItem className="lg:col-span-2"><PlaceholderImage aspect="wide" label="Zone laboratoire" /></StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  )
}
