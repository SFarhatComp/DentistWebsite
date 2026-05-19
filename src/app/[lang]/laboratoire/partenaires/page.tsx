import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { ProfessionnelsToggle } from "@/components/forms/professionnels-toggle"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Devenir notre partenaire de soin",
  description:
    "Premier contact pour dentistes et spécialistes souhaitant collaborer avec le laboratoire intégré De Facto. Formulaire de partenariat professionnel.",
}

export default function PartenaireDeSoinPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Devenir partenaire"
        title="Devenir notre partenaire de soin"
        subtitle="Avant de débuter une collaboration, nous souhaitons échanger directement avec vous afin de mieux comprendre votre pratique, vos besoins et les types d'appareils ou restaurations que vous souhaitez confier au laboratoire."
      />

      <section className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Premier contact</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Trois manières d&apos;entrer en contact
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Ce premier contact peut se faire en personne, par téléphone ou par formulaire. Choisissez ce qui vous convient le mieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+15148637805"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Nous appeler — 514 863 7805
                </a>
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Remplir le formulaire
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Toggle de formulaires — pré-sélection sur Partenariat */}
      <section id="formulaire" className="py-20 md:py-24 scroll-mt-24">
        <Container>
          <FadeIn className="max-w-2xl mb-8">
            <SectionLabel>Formulaire</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Choisissez votre démarche
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cette page est destinée au premier contact, mais vous pouvez aussi transmettre une prescription ou référer un cas directement.
            </p>
          </FadeIn>
          <FadeIn>
            <ProfessionnelsToggle lang={lang} defaultActive="partenaire" />
          </FadeIn>
        </Container>
      </section>

      {/* Rencontre */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Rencontre</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                La rencontre avec notre équipe
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>
                  La rencontre vise à établir un lien de confiance, clarifier les attentes, expliquer les protocoles de communication et présenter la manière dont les cas sont reçus, produits, vérifiés et livrés.
                </p>
                <p>
                  La technicienne de laboratoire est impliquée dans chaque étape du processus de confection des appareils du studio.
                </p>
              </div>
            </FadeIn>
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
