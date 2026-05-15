import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { ReferredCaseForm } from "@/components/forms/referred-case-form"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Référer un patient",
  description:
    "Formulaire de référence clinique pour dentistes et spécialistes. Permet de référer un patient au Studio Dentaire De Facto avec photos, radiographies et contexte clinique.",
}

export default function ReferenceCliniquePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Référence clinique"
        title="Référer un patient"
        subtitle="Référer un patient au Studio Dentaire De Facto pour évaluation, traitement ou service technique. Le patient demeure sous votre responsabilité clinique lorsque applicable."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <ReferredCaseForm lang={lang} />
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
