import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { ProfessionnelsToggle } from "@/components/forms/professionnels-toggle"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Espace professionnels — Laboratoire",
  description:
    "Espace dédié aux dentistes et spécialistes. Devenir partenaire, transmettre une prescription, référer un cas. Communication directe avec le laboratoire intégré De Facto.",
}

const engagement = [
  {
    title: "Communication",
    body: "Communication directe avec les personnes qui confectionnent vos appareils.",
  },
  {
    title: "Contrôle de qualité",
    body: "Chaque appareil est produit avec des matériaux et équipements reconnus dans le domaine dentaire, puis révisé par notre technicienne et par le dentiste-vérificateur.",
  },
  {
    title: "Transparence",
    body: "Fiche technique et traçabilité des matériaux et équipements utilisés.",
  },
  {
    title: "Rigueur",
    body: "Protocoles établis et soutenus par la littérature scientifique.",
  },
]

export default function ProfessionnelsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Espace professionnels"
        title="Espace professionnels"
        subtitle="Un laboratoire intégré pensé pour une communication clinique claire et des restaurations planifiées avec précision."
      />

      {/* Toggle bascule — sélection inline du formulaire */}
      <section className="py-12 md:py-16 border-b border-border">
        <Container>
          <FadeIn className="mb-8">
            <SectionLabel>Que souhaitez-vous faire ?</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Sélectionnez une démarche
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Cliquez sur une carte pour afficher le formulaire correspondant directement sur cette page.
            </p>
          </FadeIn>
          <FadeIn>
            <ProfessionnelsToggle lang={lang} />
          </FadeIn>
        </Container>
      </section>

      {/* Premier contact */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Premier contact</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                Avant de débuter une collaboration
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Avant de débuter une collaboration, nous souhaitons échanger directement avec vous afin de mieux comprendre votre pratique, vos besoins et les types d&apos;appareils ou restaurations que vous souhaitez confier au laboratoire.
                </p>
                <p>Ce premier contact peut se faire en personne, par téléphone ou par formulaire.</p>
              </div>
              <div className="mt-10">
                <a
                  href="tel:+15148637805"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Nous appeler — 514 863 7805
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Rencontre */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Rencontre</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Une rencontre pour clarifier les attentes
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

      {/* Notre engagement envers les professionnels — 4 piliers */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Engagement</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              Notre engagement envers les professionnels
            </h2>
          </FadeIn>
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {engagement.map((p, i) => (
              <FadeIn key={p.title} className="bg-background">
                <div className="p-8 md:p-10 h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-sm text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl">{p.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Return link */}
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
