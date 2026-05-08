import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Première visite",
  description:
    "Découvrez comment se déroule une première visite chez Studio Dentaire De Facto : examen complet, documentation clinique, radiographies selon indication et planification claire des soins.",
}

const inclus = [
  "Révision des renseignements médicaux et dentaires",
  "Discussion de la raison de consultation",
  "Examen des dents",
  "Examen des gencives",
  "Évaluation des restaurations existantes",
  "Évaluation de l'occlusion lorsque pertinent",
  "Dépistage des signes d'usure, serrement ou grincement",
  "Radiographies selon indication clinique",
  "Photos intraorales lorsque pertinent",
  "Scan intraoral lorsque pertinent",
  "Discussion initiale des observations",
  "Recommandations de prochaines étapes",
]

const nonAutomatique = [
  "Un traitement n'est pas automatiquement réalisé lors de la première visite",
  "Un nettoyage peut nécessiter un rendez-vous séparé",
  "Certains plans complexes peuvent nécessiter une analyse et une présentation dédiée",
  "Certaines situations peuvent nécessiter une référence à un spécialiste",
]

const radiographiesPourquoi = [
  "Les radiographies ne sont pas prises sans raison",
  "Elles servent à voir ce qui n'est pas visible cliniquement",
  "Elles permettent d'évaluer caries, os, racines, infections, restaurations, dents incluses ou autres conditions",
  "La décision dépend du contexte clinique",
]

const recoit = [
  "Résumé verbal",
  "Priorités de traitement",
  "Estimation",
  "Plan de traitement par phases",
  "Documents éducatifs",
  "Instructions",
  "Référence spécialisée",
  "Rendez-vous de présentation du plan dans les cas complexes",
]

const preparation = [
  "Liste de médicaments",
  "Assurances",
  "Radiographies récentes si disponibles",
  "Liste des préoccupations",
  "Anciens plans de traitement si pertinents",
  "Gouttières, appareils ou documents dentaires pertinents",
]

const apporter = [
  "Carte d'assurance maladie si applicable",
  "Informations d'assurance dentaire",
  "Liste de médicaments",
  "Coordonnées du médecin si pertinent",
  "Radiographies antérieures si disponibles",
  "Appareil dentaire, gouttière ou protecteur si applicable",
]

const apresExamen = [
  "Analyse",
  "Priorisation",
  "Planification",
  "Rendez-vous de traitement ou rendez-vous de présentation du plan",
  "Coordination administrative",
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

export default function PremiereVisitePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Première visite"
        title="Une première visite pour comprendre votre situation, pas seulement regarder une dent."
        subtitle="La première visite chez De Facto est conçue pour établir une compréhension claire de votre santé buccodentaire. Selon votre situation, elle peut inclure un questionnaire, un examen clinique, des radiographies indiquées, des photos, un scan intraoral et une discussion sur vos priorités."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-3">
            <aside className="md:sticky md:top-24 self-start">
              <div className="label-sm text-muted mb-4">Sur cette page</div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li><a href="#duree" className="hover:text-primary">Durée approximative</a></li>
                <li><a href="#inclus" className="hover:text-primary">Ce qui est inclus</a></li>
                <li><a href="#non-automatique" className="hover:text-primary">Ce qui n&apos;est pas automatique</a></li>
                <li><a href="#examen" className="hover:text-primary">Pourquoi l&apos;examen complet</a></li>
                <li><a href="#radiographies" className="hover:text-primary">Radiographies</a></li>
                <li><a href="#apres" className="hover:text-primary">Après l&apos;examen</a></li>
                <li><a href="#preparation" className="hover:text-primary">Comment se préparer</a></li>
                <li><a href="#apporter" className="hover:text-primary">Quoi apporter</a></li>
              </ul>
            </aside>

            <div className="md:col-span-2 space-y-20">
              <FadeIn>
                <NumberedSection number={1} id="duree" label="Durée" title="Le temps nécessaire pour bien documenter">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    La durée peut varier selon la situation clinique, la raison de consultation et les informations à recueillir. L&apos;objectif est de prendre le temps nécessaire pour documenter correctement votre situation.
                  </p>
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={2} id="inclus" label="Contenu" title="Ce qui est inclus dans la première visite">
                  <BulletList items={inclus} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={3} id="non-automatique" label="À savoir" title="Ce qui n'est pas fait automatiquement">
                  <BulletList items={nonAutomatique} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={4} id="examen" label="Diagnostic" title="Pourquoi l'examen complet est nécessaire">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Un bon traitement dépend d&apos;un bon diagnostic. L&apos;examen complet permet d&apos;éviter les décisions précipitées, de comprendre les priorités, d&apos;identifier les risques et de proposer une séquence de soins adaptée à votre situation.
                  </p>
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={5} id="radiographies" label="Imagerie" title="Pourquoi les radiographies sont prises selon indication">
                  <BulletList items={radiographiesPourquoi} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={6} id="apres" label="Suivi" title="Ce que le patient reçoit après">
                  <p className="text-base text-muted-foreground leading-relaxed mb-6 italic">Selon le cas :</p>
                  <BulletList items={recoit} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={7} id="preparation" label="Préparation" title="Comment se préparer">
                  <BulletList items={preparation} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={8} id="apporter" label="Liste" title="Quoi apporter">
                  <BulletList items={apporter} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={9} label="Après" title="Après l'examen">
                  <BulletList items={apresExamen} />
                </NumberedSection>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Prêt pour votre première visite ?
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Notre équipe vous contactera pour confirmer les prochaines étapes et préparer votre dossier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Demander une première visite
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Poser une question à l&apos;équipe
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
