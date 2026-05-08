import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { Accordion, AccordionItem } from "@/components/shared/accordion"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Réponses aux questions fréquentes sur les premières visites, examens, assurances, références aux spécialistes et autres aspects pratiques chez Studio Dentaire De Facto.",
}

const faq = [
  {
    q: "Est-ce que je peux venir seulement pour une urgence ?",
    a: "Oui, les urgences peuvent être évaluées selon les disponibilités. L'objectif d'un rendez-vous d'urgence est d'évaluer la situation, soulager lorsque possible et déterminer les prochaines étapes. Un examen complet peut être recommandé par la suite selon le contexte.",
  },
  {
    q: "Est-ce que l'examen complet est obligatoire pour un nouveau patient ?",
    a: "Pour établir une relation clinique structurée et proposer des soins adaptés, un examen complet est généralement recommandé pour les nouveaux patients. Certaines urgences peuvent toutefois nécessiter une évaluation ciblée d'abord.",
  },
  {
    q: "Combien de temps dure la première visite ?",
    a: "La durée varie selon la situation, les informations à recueillir et les examens nécessaires. L'objectif est de prendre le temps de bien comprendre votre santé buccodentaire.",
  },
  {
    q: "Est-ce que vous prenez les assurances ?",
    a: "Nous pouvons vous accompagner dans la transmission de certaines informations ou estimations selon les systèmes disponibles. La couverture, les limites et les soldes non remboursés demeurent toutefois la responsabilité du patient.",
  },
  {
    q: "Est-ce que vous traitez les enfants ?",
    a: "Certains soins peuvent être offerts aux enfants selon l'âge, la coopération et la situation clinique. Lorsque nécessaire, une référence appropriée peut être recommandée.",
  },
  {
    q: "Est-ce que vous offrez les aligneurs ?",
    a: "Oui, certains cas d'alignement peuvent être évalués. Lorsque la situation dépasse les indications appropriées, une référence en orthodontie peut être recommandée.",
  },
  {
    q: "Est-ce que vous faites les traitements de canal ?",
    a: "Certains traitements endodontiques peuvent être évalués ou réalisés selon la situation. Les cas complexes peuvent être référés à un spécialiste en endodontie.",
  },
  {
    q: "Est-ce que vous référez aux spécialistes ?",
    a: "Oui. Lorsque la situation dépasse le champ de traitement indiqué au studio, nous coordonnons la référence vers un spécialiste approprié.",
  },
  {
    q: "Est-ce que je recevrai un plan écrit ?",
    a: "Selon le cas, un résumé, un plan par phases, une estimation ou des documents explicatifs peuvent être remis afin de faciliter la compréhension des prochaines étapes.",
  },
  {
    q: "Est-ce que je peux envoyer mes radiographies ?",
    a: "Oui, si vous avez des radiographies récentes ou des documents pertinents, ils peuvent être transmis à l'équipe avant ou après la prise de rendez-vous.",
  },
]

export default function FAQPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Ressources"
        title="Questions fréquentes"
        subtitle="Réponses aux interrogations les plus courantes. Pour toute autre question, l'équipe est joignable directement."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <Accordion>
                {faq.map((item) => (
                  <AccordionItem key={item.q} question={item.q}>
                    {item.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Une autre question ?
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Notre équipe répond aux demandes par téléphone ou par formulaire de contact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Nous contacter
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
