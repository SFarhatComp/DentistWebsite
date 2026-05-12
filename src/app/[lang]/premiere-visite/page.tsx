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
    "Une expérience structurée en deux temps : collecte de données puis présentation du portrait buccodentaire. Studio Dentaire De Facto à Ahuntsic, Montréal.",
}

const objectifs = [
  "Établir un lien concret et humain entre le patient et son professionnel de la santé.",
  "Collecter les données médicales et dentaires pertinentes à une prise en charge sécuritaire et complète.",
  "Diagnostiquer.",
  "Identifier les priorités.",
  "Comprendre les attentes, inconforts ou craintes du patient.",
  "Préparer, lorsque nécessaire, une présentation distincte du portrait buccodentaire.",
]

const rdv1Etapes = [
  "Accueil et présentation de l'équipe et du studio.",
  "Révision et discussion des renseignements médicaux et dentaires.",
  "Discussion de la raison de consultation.",
  "Identification et discussion des attentes et des besoins du patient.",
  "Identification des inconforts ou craintes.",
  "Questionnaires supplémentaires lorsque pertinent (habitudes orales, hygiène, risque carieux, alimentation/diététique, DTM, apnée du sommeil, autres selon le contexte).",
  "Photographies intraorales et extraorales.",
  "Examen buccodentaire complet.",
  "Radiographies si pertinent.",
  "Scan intraoral bouche complète.",
  "Discussion initiale des observations.",
]

const rdv2Inclus = [
  "Photos expliquées",
  "Radiographies pertinentes",
  "Scan ou modèle si utile",
  "Priorités",
  "Plan idéal",
  "Alternatives",
  "Risques du statu quo",
  "Séquence dans le temps",
  "Estimation lorsque disponible",
]

const apporter = [
  "Carte d'assurance maladie si applicable",
  "Informations d'assurance dentaire",
  "Liste de médicaments",
  "Coordonnées du médecin si pertinent",
  "Radiographies antérieures si disponibles",
  "Appareil dentaire, gouttière ou protecteur si applicable",
]

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 text-base text-foreground leading-relaxed">
          <span className="font-display text-sm text-accent/70 tabular-nums shrink-0 pt-1 min-w-[2rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

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
        title="Une expérience structurée en deux temps"
        subtitle="S'il ne s'agit pas d'une consultation ciblée ou d'une urgence spécifique, De Facto souhaite structurer l'expérience de tout nouveau patient en débutant par un rendez-vous d'examen complet."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-3">
            <aside className="md:sticky md:top-24 self-start">
              <div className="label-sm text-muted mb-4">Sur cette page</div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li><a href="#objectifs" className="hover:text-primary">Objectifs</a></li>
                <li><a href="#duree" className="hover:text-primary">Durée</a></li>
                <li><a href="#rdv1" className="hover:text-primary">Rendez-vous 1 — Collecte</a></li>
                <li><a href="#rdv2" className="hover:text-primary">Rendez-vous 2 — Portrait</a></li>
                <li><a href="#apporter" className="hover:text-primary">Quoi apporter</a></li>
              </ul>
            </aside>

            <div className="md:col-span-2 space-y-20">
              <FadeIn>
                <NumberedSection number={1} id="objectifs" label="Objectifs" title="Objectifs du rendez-vous">
                  <NumberedList items={objectifs} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={2} id="duree" label="Durée" title="Durée approximative">
                  <p className="text-lg text-foreground leading-relaxed">
                    Durée approximative : <span className="font-medium">30 à 60 minutes selon votre situation.</span>
                  </p>
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={3} id="rdv1" label="Rendez-vous 1" title="Collecte de données">
                  <NumberedList items={rdv1Etapes} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={4} id="rdv2" label="Rendez-vous 2" title="Portrait buccodentaire">
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    Lorsque la situation nécessite une analyse plus complète, un second rendez-vous peut être prévu afin de présenter le portrait buccodentaire, les priorités, les options et la séquence de traitement proposée.
                  </p>
                  <BulletList items={rdv2Inclus} />
                </NumberedSection>
              </FadeIn>

              <FadeIn>
                <NumberedSection number={5} id="apporter" label="Préparation" title="Quoi apporter">
                  <BulletList items={apporter} />
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
