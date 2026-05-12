import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Laboratoire intégré",
  description:
    "Le laboratoire De Facto collabore avec les dentistes et spécialistes, qu'ils exercent ou non au Studio Dentaire De Facto. Communication directe, protocoles rigoureux, technologie et supervision clinique.",
}

const piliers = [
  {
    num: "01",
    title: "Communication constante",
    body: "Communication directe avec le professionnel et avec les personnes qui confectionnent les appareils.",
  },
  {
    num: "02",
    title: "Protocoles rigoureux et traçabilité",
    body: "Chaque cas est soutenu par une fiche technique, une traçabilité des matériaux et une documentation des étapes pertinentes.",
  },
  {
    num: "03",
    title: "Technologie au service du savoir-faire",
    body: "Équipements numériques, impression, usinage et protocoles contrôlés au service de la précision clinique.",
  },
  {
    num: "04",
    title: "Supervision technique et clinique",
    body: "Un technicien et un dentiste responsable participent à la vérification des étapes importantes de production.",
  },
]

const servicesOfferts: { category: string; items: string[] }[] = [
  {
    category: "Orthodontie",
    items: [
      "Gouttière de rétention",
      "Plaque de Hawley",
      "Twin Block",
      "HAAS",
      "Hyrax",
      "Mainteneur d'espace",
      "Fil lingual",
    ],
  },
  {
    category: "Prosthodontie amovible",
    items: [
      "Prothèse complète imprimée",
      "Prothèse complète usinée",
      "Prothèse partielle en résine imprimée",
      "Réparations selon les cas",
      "Confection express selon les besoins",
    ],
  },
  {
    category: "Prosthodontie fixe",
    items: [
      "Facettes",
      "Incrustations",
      "Couronnes",
      "Couronnes e.max pressées",
      "Incrustations e.max pressées",
      "Facettes e.max pressées",
      "Couronnes zircone usinées",
      "Ponts zircone",
      "Prothèses dentaires fixes sur implant",
      "Couronnes et ponts temporaires imprimés",
    ],
  },
  {
    category: "PLO (prothèses linguales et orthopédiques)",
    items: ["PLO imprimés", "PLO usinés si applicable", "Ajustements selon prescription"],
  },
  {
    category: "Esthétique",
    items: [
      "Stratification céramique",
      "Maquillage de cas esthétiques",
      "Temporaires esthétiques",
      "Permanents esthétiques",
    ],
  },
  {
    category: "Gouttières",
    items: [
      "Gouttières de protection",
      "Gouttières de blanchiment si applicable",
      "Gouttières de rétention",
      "Gouttières selon prescription",
    ],
  },
  {
    category: "Planification",
    items: [
      "Wax-up diagnostique numérique",
      "Modèles imprimés",
      "Prise de teinte",
      "Photos intraorales et extraorales pour cas complexes et esthétiques",
    ],
  },
]

const equipements = [
  "Scanner intraoral",
  "Imprimante 3D",
  "Usineuse",
  "Four de pressée",
  "Four de sintérisation",
  "Matériaux approuvés par Santé Canada lorsque requis",
  "Résines dentaires",
  "Zircone",
  "Disilicate de lithium",
  "Céramiques",
  "Matériaux temporaires",
]

export default function LaboratoirePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Laboratoire"
        title="Laboratoire intégré"
        subtitle="Le laboratoire De Facto collabore avec les dentistes et spécialistes, qu'ils exercent ou non au Studio Dentaire De Facto."
      />

      {/* 2 chemins dès le top */}
      <section className="border-b border-border">
        <Container>
          <div className="py-12 md:py-16 grid gap-px bg-border md:grid-cols-2 border border-border">
            <FadeIn className="bg-background">
              <a
                href="#patient"
                className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-display text-2xl text-accent/70 tabular-nums">01</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                  Je suis un patient
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Comprendre comment le laboratoire intégré soutient mes soins.
                </p>
              </a>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/professionnels`}
                className="block p-8 md:p-10 hover:bg-primary-hover transition-colors h-full group text-primary-foreground"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-display text-2xl text-accent/90 tabular-nums">02</span>
                  <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl mb-3">
                  Je suis un professionnel dentaire
                </h2>
                <p className="text-base opacity-80 leading-relaxed mb-6">
                  Accéder à l&apos;espace professionnels, transmettre une prescription, référer un cas.
                </p>
                <div className="space-y-1.5 text-sm opacity-75">
                  <div>→ Transmettre une prescription</div>
                  <div>→ Référer un cas</div>
                  <div>→ Demander une prise de teinte</div>
                  <div>→ Contacter le laboratoire</div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Engagement de non-sollicitation */}
      {/* TODO juridique : faire valider cette formulation avant publication finale (Brouillon 2 §7.2) */}
      <section className="py-16 md:py-20 bg-surface/40 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Engagement</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Engagement de non-sollicitation
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>
                  Nous respectons la relation entre chaque professionnel et sa patientèle. Lorsqu&apos;un patient est référé au laboratoire pour une prise de teinte, une photographie clinique, une réparation ou un service technique, aucune sollicitation clinique ne sera effectuée par le Studio Dentaire De Facto.
                </p>
                <p>
                  Pour formaliser cet engagement, une déclaration de non-inscription au Studio Dentaire De Facto pour une période de trois ans pourra être signée par le patient référé et transmise au professionnel référent.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Philosophie */}
      <section id="patient" className="py-20 md:py-24 scroll-mt-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl">
            <FadeIn>
              <SectionLabel>Philosophie</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                La technologie au service de la prédictibilité
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre laboratoire utilise des équipements reconnus, des protocoles rigoureux et des matériaux approuvés par Santé Canada lorsque requis. La technologie n&apos;est pas une fin en soi : elle soutient le savoir-faire, la communication et la constance des résultats.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <PlaceholderImage aspect="video" label="laboratoire-integre-de-facto.jpg" />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 4 piliers */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Piliers du laboratoire</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              Quatre piliers
            </h2>
          </FadeIn>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border border-border">
            {piliers.map((p) => (
              <FadeIn key={p.num} className="bg-background">
                <div className="p-8 md:p-10 h-full">
                  <div className="font-display text-3xl text-accent/40 mb-6">{p.num}</div>
                  <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Services offerts */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-4">
              Services offerts
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Une gamme complète de restaurations, prothèses, gouttières et accessoires de planification, offerts aux patients du studio et aux professionnels référents.
            </p>
          </FadeIn>

          <div className="space-y-12 max-w-4xl">
            {servicesOfferts.map((cat, i) => (
              <FadeIn key={cat.category}>
                <NumberedSection number={i + 1} label="Catégorie" title={cat.category}>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                        <span className="text-accent shrink-0 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </NumberedSection>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* e.max + zircone highlights */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 max-w-5xl">
            <FadeIn>
              <SectionLabel>e.max pressé</SectionLabel>
              <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight">
                Précision et esthétique contrôlées
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Les restaurations e.max pressées peuvent offrir une excellente précision, une esthétique contrôlée et une résistance adaptée à de nombreuses situations cliniques lorsqu&apos;elles sont bien indiquées.
              </p>
            </FadeIn>
            <FadeIn>
              <SectionLabel>Zircone usinée</SectionLabel>
              <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight">
                Résistance et reproductibilité
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                La zircone usinée permet de produire des restaurations résistantes et reproductibles, particulièrement utiles dans plusieurs situations restauratrices ou prothétiques, selon l&apos;indication clinique.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Traçabilité */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Contrôle qualité</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Traçabilité et documentation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chaque cas peut être accompagné d&apos;un rapport de traçabilité précisant les matériaux utilisés, les équipements, les limites techniques et les étapes pertinentes de production.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Équipements et matériaux utilisés */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Équipements et matériaux</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              Équipements et matériaux utilisés
            </h2>
          </FadeIn>
          <div className="grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3 border border-border max-w-4xl">
            {equipements.map((eq, i) => (
              <FadeIn key={eq} className="bg-background">
                <div className="p-5 md:p-6 h-full flex items-baseline gap-4">
                  <span className="font-display text-sm text-accent/70 tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-foreground leading-snug">{eq}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA professionnel */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <div className="label-sm text-accent/80 mb-4">Pour les professionnels</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Espace dédié aux dentistes référents
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Prescription numérique, référence de cas, prise de teinte, contact direct. Découvrez l&apos;espace dédié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/laboratoire/professionnels`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Espace professionnels
              </Link>
              <Link
                href={`/${lang}/laboratoire/partenaire-de-soin`}
                className="inline-flex items-center justify-center border border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/5 text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Devenir partenaire
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
