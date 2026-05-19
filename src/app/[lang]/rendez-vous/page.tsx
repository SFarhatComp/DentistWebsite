import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { AppointmentToggle } from "@/components/forms/appointment-toggle"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Demander un rendez-vous",
  description:
    "Demande de rendez-vous régulier ou parcours d'urgence — Studio Dentaire De Facto, Ahuntsic, Montréal. Téléphone : 514 863 7805.",
}

export default function AppointmentPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Rendez-vous"
        title="Demander un rendez-vous"
        subtitle="Deux parcours sont disponibles : une demande de rendez-vous régulière, et un parcours d'urgence dentaire. Choisissez celui qui correspond à votre situation."
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
              Pour toute autre question administrative, consultez notre page{" "}
              <Link href={`/${lang}/contact`} className="text-primary hover:underline">
                Contact
              </Link>
              {" ou notre "}
              <Link href={`/${lang}/questions-frequentes`} className="text-primary hover:underline">
                FAQ
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
