import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { DocumentList } from "@/components/shared/document-list"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Présentation du plan de traitement",
  description:
    "Pour les cas complexes, De Facto présente le plan de traitement dans un rendez-vous dédié — avec photos, radiographies, modèles, scans et documents visuels.",
}

const peutEtrePresente = [
  "Photos intraorales",
  "Radiographies expliquées",
  "Scan ou modèle imprimé",
  "Observations cliniques",
  "Problèmes prioritaires",
  "Éléments stables",
  "Éléments à surveiller",
  "Options de traitement",
  "Alternatives",
  "Risques du statu quo",
  "Estimation financière",
  "Séquence dans le temps",
]

const phases = [
  { num: "Phase 1", title: "Stabilisation", body: "Maîtriser ce qui doit l'être avant tout : douleur, infection, lésions actives." },
  { num: "Phase 2", title: "Traitements nécessaires", body: "Restaurations, traitements conservateurs et soins indiqués selon les priorités." },
  { num: "Phase 3", title: "Prévention et maintien", body: "Hygiène, suivi parodontal, conseils personnalisés et entretien à long terme." },
  { num: "Phase 4", title: "Options esthétiques ou optimisations", body: "Lorsque la base est stable, certaines optimisations peuvent être envisagées selon vos objectifs." },
  { num: "Phase 5", title: "Suivi à long terme", body: "Selon la situation clinique et la stabilité atteinte." },
]

const idealAlternatives = [
  "Le plan idéal lorsque pertinent",
  "Les alternatives raisonnables",
  "Les limites de chaque option",
  "Les conséquences possibles de ne pas traiter",
  "La possibilité de séquencer dans le temps",
]

const documentsRemis = [
  "Résumé personnalisé de santé buccodentaire",
  "Plan de traitement par phases",
  "Estimation",
  "Instructions postopératoires",
  "Fiche éducative",
  "Documents d'assurance",
  "Référence spécialiste",
  "Photos ou explications visuelles",
  "Recommandations de suivi",
]

export default function PlanTraitementVisuelPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Plan de traitement"
        title="Un plan clair avant de commencer."
        subtitle="Pour certains cas, une simple explication en fin de rendez-vous ne suffit pas. Lorsque la situation demande une réflexion plus complète, nous pouvons présenter le plan de traitement dans un rendez-vous dédié, à l'aide de photos, radiographies, modèles, scans et documents visuels."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label="Pourquoi" title="Pourquoi on ne décide pas tout en 5 minutes">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Certaines décisions dentaires ont des implications biologiques, fonctionnelles, esthétiques et financières. Prendre le temps de les expliquer permet de mieux comprendre les priorités, les alternatives et la séquence de traitement.
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={2} label="Contenu" title="Ce qui peut être présenté">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {peutEtrePresente.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label="Phases" title="Les phases du plan">
                <div className="space-y-6">
                  {phases.map((p, i) => (
                    <div key={p.num} className="border-t border-border pt-5 first:border-t-0 first:pt-0 grid sm:grid-cols-[8rem_1fr] gap-3 sm:gap-6">
                      <div>
                        <div className="font-display text-sm text-accent/80 tabular-nums">0{i + 1}</div>
                        <div className="font-display text-base text-foreground">{p.num}</div>
                      </div>
                      <div>
                        <div className="font-display text-xl text-foreground mb-2">{p.title}</div>
                        <p className="text-base text-muted-foreground leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label="Choix" title="Plan idéal, alternatives et statu quo">
                <ul className="space-y-3">
                  {idealAlternatives.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label="Remis" title="Documents remis au patient">
                <div className="bg-surface/60 border border-border p-8 md:p-10">
                  <p className="text-base text-muted-foreground leading-relaxed mb-8 italic">
                    Selon la situation, le patient peut recevoir des documents concrets pour relire, comparer, réfléchir et poser ses questions.
                  </p>
                  <DocumentList items={documentsRemis} />
                </div>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Comprendre avant de décider
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Une évaluation complète est nécessaire pour déterminer si un rendez-vous de présentation du plan est indiqué dans votre cas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Demander une première visite
              </Link>
              <Link
                href={`/${lang}/le-studio`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Comprendre notre approche
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
