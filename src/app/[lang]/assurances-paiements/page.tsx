import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Assurances et paiements",
  description:
    "Informations sur les estimations, assurances dentaires, préautorisations, paiements et responsabilité du patient chez Studio Dentaire De Facto.",
}

const estimations = [
  "Une estimation n'est pas une garantie de paiement",
  "La réponse de l'assureur peut varier",
  "Les franchises, maximums annuels, exclusions et fréquences peuvent influencer le remboursement",
  "Le solde non couvert demeure payable par le patient",
]

const privee = [
  "Transmission possible selon les systèmes disponibles",
  "Coordination avec la secrétaire",
  "Importance de fournir les bons renseignements",
]

const paiement = [
  "Paiement par le patient puis remboursement",
  "Transmission électronique possible selon l'assureur",
  "Solde à acquitter",
  "Dépôt ou paiement requis selon le traitement si applicable",
]

const preauth = [
  "Utile pour certains traitements",
  "Pas une garantie absolue",
  "Peut prendre du temps",
  "Peut nécessiter radiographies, codes, plans ou justification",
]

const politiqueRdv = [
  "Annulation",
  "Retard",
  "Rendez-vous manqué",
  "Frais de rendez-vous manqué si applicable",
  "Respect du temps clinique",
]

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
          <span className="text-accent shrink-0 mt-1">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AssurancesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Administratif"
        title="Assurances et paiements"
        subtitle="Comprendre comment fonctionnent les estimations, les assurances, les préautorisations et la responsabilité du patient."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label="Rôle" title="Comprendre le rôle de l'assurance">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  L&apos;assurance dentaire est une entente entre le patient et son assureur. Nous pouvons vous aider à transmettre certaines informations ou estimations, mais la confirmation finale de la couverture, des limites et des soldes demeure la responsabilité du patient.
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={2} label="Estimations" title="Estimations">
                <BulletList items={estimations} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label="Privée" title="Assurance privée">
                <BulletList items={privee} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label="RCSD" title="Programme fédéral / RCSD">
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Certains patients peuvent être admissibles au Régime canadien de soins dentaires (RCSD) selon les critères du programme.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  L&apos;équipe peut aider à vérifier les renseignements administratifs disponibles. Les règles du programme peuvent varier selon le traitement, la couverture et les autorisations requises. Nous ne pouvons pas garantir d&apos;avance la prise en charge d&apos;un acte clinique.
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label="RAMQ" title="RAMQ si applicable">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Certains services dentaires peuvent être couverts par la RAMQ dans des contextes précis (par exemple certains soins pour enfants ou bénéficiaires d&apos;aide de dernier recours). Plusieurs traitements dentaires ne sont toutefois pas couverts par le régime public.
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={6} label="Paiement" title="Paiement direct ou remboursement">
                <BulletList items={paiement} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={7} label="Préautorisation" title="Préautorisations">
                <BulletList items={preauth} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={8} label="Politique RDV" title="Politique de rendez-vous">
                <BulletList items={politiqueRdv} />
                <p className="mt-6 text-base text-muted-foreground leading-relaxed italic">
                  Les politiques précises seront communiquées au moment de la prise de rendez-vous ou avant les traitements concernés.
                </p>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Une question administrative ?
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              L&apos;équipe peut vous accompagner dans la coordination avec votre assureur ou clarifier les modalités d&apos;un traitement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Poser une question administrative
              </Link>
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Demander un rendez-vous
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
