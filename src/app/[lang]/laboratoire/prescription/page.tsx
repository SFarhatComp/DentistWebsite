import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { LabPrescriptionForm } from "@/components/forms/lab-prescription-form"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Transmettre une prescription au laboratoire",
  description:
    "Formulaire de prescription au laboratoire De Facto pour dentistes et spécialistes. Transmission de fichiers STL, photos, radiographies et instructions cliniques.",
}

export default function PrescriptionPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Prescription laboratoire"
        title="Transmettre une prescription"
        subtitle="Permettre la prescription d'un appareil ou d'une restauration et la transmission de fichiers STL, radiographies, photos ou documents cliniques."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <LabPrescriptionForm lang={lang} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <FadeIn>
            <Link
              href={`/${lang}/laboratoire`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              ← Retour au laboratoire intégré
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
