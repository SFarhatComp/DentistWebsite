import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function CoordonneesSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <SectionLabel>{t("home.coordonnees.label")}</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-10">{t("home.coordonnees.title")}</h2>
            <dl className="space-y-6 text-lg">
              <div><dt className="label-sm text-muted mb-1">{t("contact.adresse")}</dt><dd>728 rue Fleury Est<br />Montréal, QC</dd></div>
              <div><dt className="label-sm text-muted mb-1">{t("contact.telephone")}</dt><dd><a href="tel:" className="hover:text-primary">{t("contact.phonePlaceholder")}</a></dd></div>
              <div><dt className="label-sm text-muted mb-1">{t("contact.courriel")}</dt><dd><a href="mailto:" className="hover:text-primary">{t("contact.emailPlaceholder")}</a></dd></div>
              <div><dt className="label-sm text-muted mb-1">{t("contact.heures")}</dt><dd>{t("contact.hoursPlaceholder")}</dd></div>
            </dl>
          </FadeIn>
          <FadeIn direction="right">
            <iframe
              src="https://www.google.com/maps?q=728+rue+Fleury+Est,+Montréal,+QC&output=embed"
              className="w-full h-full min-h-[400px] border border-border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
