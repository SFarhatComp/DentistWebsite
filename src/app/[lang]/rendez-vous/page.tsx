import Link from "next/link"
import { Container } from "@/components/layout/container"
import { AppointmentWizard } from "@/components/forms/appointment-wizard"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("appointment.title"),
    description: t("appointment.metaDescription"),
  }
}

/**
 * Page rendez-vous.
 *
 * Le questionnaire en 6 étapes remplace l'ancien couple sélecteur + formulaire
 * long (handoff §10). Le tri d'urgence se fait à l'étape 3, qui porte l'encadré
 * d'urgence et détermine la priorité de rappel inscrite au rapport de la réception.
 *
 * Pas de PageHero ici : le questionnaire porte son propre en-tête d'étape, et
 * un titre de page au-dessus dédoublerait la hiérarchie.
 */
export default async function AppointmentPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <Container>
      <div className="py-16 md:py-20">
        <AppointmentWizard lang={lang} />
        <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("appointment.otherQuestions")}{" "}
            <Link href={`/${lang}/contact`} className="text-primary hover:underline">
              {t("appointment.contactLink")}
            </Link>
            {t("appointment.or")}
            <Link href={`/${lang}/questions-frequentes`} className="text-primary hover:underline">
              {t("appointment.faqLink")}
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  )
}
