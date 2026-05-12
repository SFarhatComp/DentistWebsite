import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { ReferredCaseForm } from "@/components/forms/referred-case-form"
import { LabPrescriptionForm } from "@/components/forms/lab-prescription-form"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Référence et prescription",
  description:
    "Deux parcours pour les professionnels : référer un cas patient (prise de teinte, réparation) ou prescrire un appareil/restauration au laboratoire De Facto avec fichiers STL et documents cliniques.",
}

export default function ReferencePrescriptionPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Professionnels"
        title="Référence et prescription"
        subtitle="Deux parcours distincts pour les dentistes et spécialistes : référer un cas patient ou transmettre une prescription au laboratoire."
      />

      {/* Choix des 2 parcours */}
      <section className="py-12 md:py-16 border-b border-border">
        <Container>
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border max-w-5xl">
            <FadeIn className="bg-background">
              <a href="#cas-refere" className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full">
                <div className="font-display text-2xl text-accent/70 tabular-nums mb-4">01</div>
                <h2 className="font-display text-xl md:text-2xl mb-3">Référer un cas</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Référer un patient pour prise de teinte, réparation, photographie clinique ou service technique.
                </p>
              </a>
            </FadeIn>
            <FadeIn className="bg-background">
              <a href="#prescription" className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full">
                <div className="font-display text-2xl text-accent/70 tabular-nums mb-4">02</div>
                <h2 className="font-display text-xl md:text-2xl mb-3">Prescription laboratoire</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Prescrire un appareil ou une restauration avec fichiers STL, radiographies et documents cliniques.
                </p>
              </a>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Formulaire 1 — Cas référé */}
      <section id="cas-refere" className="py-20 md:py-24 scroll-mt-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="label-sm text-accent mb-3">01 — Cas référé</div>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
                Référer un cas à la clinique
              </h2>
            </FadeIn>
            <ReferredCaseForm lang={lang} />
          </div>
        </Container>
      </section>

      {/* Formulaire 2 — Prescription */}
      <section id="prescription" className="py-20 md:py-24 bg-surface/40 border-y border-border scroll-mt-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="label-sm text-accent mb-3">02 — Prescription</div>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8">
                Prescription laboratoire
              </h2>
            </FadeIn>
            <LabPrescriptionForm lang={lang} />
          </div>
        </Container>
      </section>

      {/* Return link */}
      <section className="py-16 border-t border-border">
        <Container>
          <FadeIn>
            <Link
              href={`/${lang}/laboratoire/professionnels`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              ← Retour à l&apos;espace professionnels
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
