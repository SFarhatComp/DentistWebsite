import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/forms/contact-form"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez De Facto Studio Dentaire à Montréal.",
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero label={t("contact.label")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            <FadeIn direction="left">
              <div className="space-y-10">
                <div>
                  <div className="label-sm text-muted mb-2">{t("contact.adresse")}</div>
                  <p className="text-lg text-foreground">728 rue Fleury Est<br />Montréal, QC</p>
                </div>
                <div>
                  <div className="label-sm text-muted mb-2">{t("contact.telephone")}</div>
                  <a href="tel:" className="text-lg text-foreground hover:text-primary">{t("contact.phonePlaceholder")}</a>
                </div>
                <div>
                  <div className="label-sm text-muted mb-2">{t("contact.courriel")}</div>
                  <a href="mailto:" className="text-lg text-foreground hover:text-primary">{t("contact.emailPlaceholder")}</a>
                </div>
                <div>
                  <div className="label-sm text-muted mb-2">{t("contact.heures")}</div>
                  <p className="text-lg text-foreground">{t("contact.hoursPlaceholder")}</p>
                </div>
                <div>
                  <div className="label-sm text-muted mb-2">Accessibilité &amp; transit</div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Stationnement disponible. Accès en transport en commun par les lignes locales d&apos;Ahuntsic. Information détaillée à confirmer.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="font-display text-2xl md:text-3xl mb-8">Nous écrire</h2>
              <ContactForm lang={lang} />
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <iframe
          src="https://www.google.com/maps?q=728+rue+Fleury+Est,+Montréal,+QC&output=embed"
          className="w-full h-[500px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte — De Facto Studio Dentaire"
        />
      </section>
    </>
  )
}
