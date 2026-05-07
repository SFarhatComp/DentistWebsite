import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { AppointmentForm } from "@/components/forms/appointment-form"
import { EmergencyForm } from "@/components/forms/emergency-form"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Rendez-vous",
  description: "Demande de rendez-vous au De Facto Studio Dentaire.",
}

export default function AppointmentPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Rendez-vous"
        title="Demande de rendez-vous"
        subtitle="Remplissez ce formulaire pour que notre équipe puisse préparer votre dossier. Les informations transmises restent confidentielles."
      />

      <Container>
        <div className="py-10 flex flex-col sm:flex-row sm:justify-end gap-4">
          <a
            href="#urgence"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
          >
            J&apos;ai une urgence dentaire →
          </a>
        </div>

        <div className="pb-24 max-w-3xl">
          <AppointmentForm lang={lang} />
        </div>

        <div id="urgence" className="border-t-4 border-accent pt-16 pb-24 max-w-3xl scroll-mt-24">
          <div className="label-sm text-accent mb-4">Urgence</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">Urgence dentaire</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Pour une réponse rapide, remplissez ce formulaire. Notre équipe vous contactera au plus tôt.
          </p>
          <EmergencyForm lang={lang} />
        </div>
      </Container>
    </>
  )
}
