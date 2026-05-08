import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { AppointmentForm } from "@/components/forms/appointment-form"
import { EmergencyForm } from "@/components/forms/emergency-form"
import { MedicalEmergencyNotice } from "@/components/forms/medical-emergency-notice"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Rendez-vous",
  description: "Demande de rendez-vous au Studio Dentaire De Facto.",
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
        <div className="py-12 grid gap-6 sm:grid-cols-2 max-w-4xl">
          <FadeIn>
            <a
              href="#rendez-vous-regulier"
              className="block p-6 border border-border bg-surface/40 hover:border-primary transition-colors h-full"
            >
              <div className="label-sm text-primary mb-3">Parcours principal</div>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-3">
                Demander un rendez-vous régulier
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Première visite, examen, suivi, traitement planifié.
              </p>
            </a>
          </FadeIn>
          <FadeIn>
            <a
              href="#urgence"
              className="block p-6 border-2 border-accent bg-accent/5 hover:bg-accent/10 transition-colors h-full"
            >
              <div className="label-sm text-accent mb-3">Parcours secondaire</div>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-3">
                J&apos;ai une urgence dentaire
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Douleur, traumatisme, enflure, dent cassée.
              </p>
            </a>
          </FadeIn>
        </div>

        <FadeIn>
          <div id="rendez-vous-regulier" className="pt-12 pb-24 max-w-3xl scroll-mt-24">
            <div className="label-sm text-primary mb-4">01 — Rendez-vous régulier</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Demande de rendez-vous
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Remplissez ce formulaire pour que notre équipe puisse préparer votre dossier. Les informations transmises restent confidentielles.
            </p>
            <AppointmentForm lang={lang} />
          </div>
        </FadeIn>

        <FadeIn>
          <div
            id="urgence"
            className="border-t-4 border-accent pt-16 pb-24 max-w-3xl scroll-mt-24"
          >
            <div className="label-sm text-accent mb-4">02 — Urgence dentaire</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Urgence dentaire
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Pour une réponse rapide, remplissez ce formulaire. Notre équipe vous contactera au plus tôt.
            </p>

            <MedicalEmergencyNotice />

            <EmergencyForm lang={lang} />

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
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
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
