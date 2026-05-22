import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { AppointmentToggle } from "@/components/forms/appointment-toggle"
import { FadeIn } from "@/components/motion/fade-in"
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

export default async function AppointmentPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero
        label={t("appointment.label")}
        title={t("appointment.title")}
        subtitle={t("appointment.subtitle")}
      />

      <Container>
        <FadeIn>
          <div className="py-12">
            <AppointmentToggle lang={lang} />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="pb-20 pt-4 max-w-3xl border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed pt-8">
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
        </FadeIn>
      </Container>
    </>
  )
}
