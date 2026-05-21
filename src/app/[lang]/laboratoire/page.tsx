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
  title: "Laboratoire dentaire intégré",
  description:
    "Un laboratoire dentaire intégré, ouvert aux professionnels. Communication directe, traçabilité, non-sollicitation.",
}

// 4 piliers du laboratoire
const piliersLab = [
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

// Services offerts — 12 catégories (cahier §13.1)
const servicesLab: { category: string; items: string[] }[] = [
  {
    category: "Orthodontie",
    items: [
      "Gouttières de rétention",
      "Plaques de Hawley",
      "Twin Block",
      "HAAS",
      "Hyrax",
      "Mainteneurs d'espace",
      "Fils linguaux",
    ],
  },
  {
    category: "Prosthodontie amovible",
    items: [
      "Prothèses complètes imprimées ou usinées",
    ],
  },
  {
    category: "Prosthodontie fixe",
    items: [
      "Restaurations unitaires (couronne, incrustation, facette, restauration partielle collée)",
      "Restaurations plurales (pont conventionnel, pont collé)",
      "Restaurations implantaires (couronne ou pont sur implants)",
      "Planification prothétique (wax-up, mock-up, modèle imprimé)",
    ],
  },
  {
    category: "Plaques occlusales",
    items: [
      "Plaque occlusale rigide Formlabs LT Clear",
      "Plaque occlusale flexible Formlabs LT Comfort",
    ],
  },
  {
    category: "Gouttières",
    items: [
      "Gouttière de blanchiment",
      "Gouttière de rétention",
      "Gouttière pour sport de combat et extrême",
    ],
  },
  {
    category: "Wax-up diagnostique",
    items: [
      "Wax-up numérique pour planification esthétique, fonctionnelle ou prothétique",
    ],
  },
  {
    category: "Stratification et maquillage",
    items: [
      "Maquillage",
      "Stratification céramique",
      "Finition esthétique de cas temporaires ou permanents",
    ],
  },
  {
    category: "Documentation clinique",
    items: [
      "Prise de teinte",
      "Photos intraorales et extraorales pour cas complexes et esthétiques",
    ],
  },
]

// Équipements (cahier §16A.2)
const equipements = [
  { name: "Scanner intraoral", role: "Capture numérique des arcades et communication clinique-laboratoire" },
  { name: "Logiciel de conception numérique", role: "Planification et conception des restaurations ou appareils" },
  { name: "Usinage CAD/CAM", role: "Fabrication de certaines restaurations, modèles ou appareils selon indication" },
  { name: "Four de pressée", role: "Pressée de certaines restaurations en céramique selon protocole" },
  { name: "Four de cristallisation / cuisson", role: "Cristallisation, maquillage, glaçage ou finition selon matériau" },
  { name: "Impression 3D Formlabs Dental", role: "Modèles, guides, gouttières, plaques occlusales, prototypes selon indication" },
  { name: "Lavage et post-polymérisation", role: "Étapes de post-traitement des pièces imprimées selon les protocoles du fabricant" },
  { name: "Finition et polissage", role: "Ajustement, finition, caractérisation et contrôle final" },
  { name: "Documentation photo", role: "Communication de cas, prise de teinte, suivi et contrôle de qualité" },
]

// Matériaux (cahier §16A.3)
const materiaux = [
  { name: "IPS e.max Press", use: "Restaurations pressées en disilicate de lithium selon indication" },
  { name: "IPS e.max CAD", use: "Restaurations usinées en disilicate de lithium selon indication" },
  { name: "Zircone", use: "Couronnes, ponts ou restaurations selon indication clinique" },
  { name: "Résines dentaires imprimables", use: "Modèles, guides, gouttières ou appareils selon indication et matériau" },
  { name: "Résines pour temporaires", use: "Provisoires ou prototypes selon indication" },
  { name: "Matériaux pour plaques occlusales", use: "Plaques occlusales selon indication clinique et matériau validé" },
  { name: "Matériaux de finition", use: "Maquillage, glaçage, polissage et caractérisation selon le cas" },
]

// Fiche de traçabilité (cahier §16A.4)
const fichesTracabilite = [
  { item: "Code du cas", desc: "Identifiant unique" },
  { item: "Date de réception", desc: "Entrée au laboratoire" },
  { item: "Professionnel référent", desc: "Dentiste ou clinique ayant transmis le cas" },
  { item: "Type d'appareil ou restauration", desc: "Couronne, plaque occlusale, modèle, gouttière, etc." },
  { item: "Matériau utilisé", desc: "Nom commercial et famille" },
  { item: "Teinte", desc: "Si applicable" },
  { item: "Fichier numérique", desc: "STL, scan, photo, radiographie" },
  { item: "Étapes de production", desc: "Réception, conception, fabrication, finition, contrôle, livraison" },
  { item: "Opérateur", desc: "Initiales du responsable de chaque étape" },
  { item: "Contrôle qualité", desc: "Vérification finale avant livraison" },
  { item: "Notes techniques", desc: "Particularités, limites, recommandations" },
]

export default function LaboratoirePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Laboratoire"
        title="Un laboratoire dentaire intégré, ouvert aux professionnels."
      />

      {/* Intro pour professionnels (cahier §12.4) */}
      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <FadeIn>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Le laboratoire De Facto accompagne les dentistes et spécialistes qui souhaitent collaborer avec une équipe attentive à la communication, à la précision et à la traçabilité.
                </p>
                <p>
                  Notre objectif est de soutenir le travail clinique du professionnel, sans jamais remplacer sa relation avec son patient.
                </p>
                <p>
                  Nous respectons pleinement nos collègues référents. Aucun patient adressé au laboratoire pour un service technique ne sera sollicité pour devenir patient du Studio Dentaire De Facto.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 2 chemins dès le top */}
      <section className="border-b border-border">
        <Container>
          <div className="py-12 md:py-16 grid gap-px bg-border md:grid-cols-2 border border-border">
            <FadeIn className="bg-background">
              <a
                href="#philosophie"
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
                href={`/${lang}/laboratoire/partenaires`}
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
                  Devenir partenaire, transmettre une prescription, référer un cas.
                </p>
                <div className="space-y-1.5 text-sm opacity-75">
                  <div>→ Devenir partenaire de soins</div>
                  <div>→ Transmettre une prescription</div>
                  <div>→ Référer un patient</div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Philosophie — La technologie au service de la prédictibilité */}
      <section id="philosophie" className="py-20 md:py-24 scroll-mt-24">
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

      {/* Engagement de non-sollicitation */}
      {/* TODO juridique : faire valider cette formulation avant publication finale (cahier §12.5) */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Engagement envers les référents</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Respect de la relation professionnel-patient
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>
                  Lorsqu&apos;un patient est dirigé vers De Facto pour une prise de teinte, une documentation photographique ou un service lié au laboratoire, il demeure le patient du professionnel référent.
                </p>
                <p>
                  Afin d&apos;éviter toute ambiguïté, De Facto peut fournir une déclaration de non-inscription du patient au Studio Dentaire De Facto pour une période déterminée, lorsque la situation le justifie.
                </p>
                <p>
                  Cette mesure vise à protéger la relation de confiance entre le professionnel référent, son patient et notre laboratoire.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 4 piliers du laboratoire */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Piliers du laboratoire</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">Quatre piliers</h2>
          </FadeIn>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border border-border">
            {piliersLab.map((p) => (
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

      {/* Services offerts — 12 catégories */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
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

          <div className="space-y-10 max-w-4xl">
            {servicesLab.map((cat, i) => (
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

      {/* Équipements et matériaux */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>Équipements et matériaux</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              Équipements et matériaux utilisés
            </h2>
          </FadeIn>

          <div className="max-w-4xl mb-12">
            <FadeIn>
              <h3 className="font-display text-xl text-foreground mb-6">Équipements</h3>
              <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
                {equipements.map((eq, i) => (
                  <div key={eq.name} className="bg-background p-5 h-full">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-xs text-accent/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-sm md:text-base text-foreground">{eq.name}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-7">
                      {eq.role}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="max-w-4xl">
            <FadeIn>
              <h3 className="font-display text-xl text-foreground mb-6">Matériaux</h3>
              <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
                {materiaux.map((mat, i) => (
                  <div key={mat.name} className="bg-background p-5 h-full">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-xs text-accent/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-sm md:text-base text-foreground">{mat.name}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-7">
                      {mat.use}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/*
            Sources techniques (interne, non affichées publiquement) :
            - Ivoclar IPS e.max Press : https://www.ivoclar.com/en_ca/products/metal-free-ceramics/ips-e.max-press-lab
            - Ivoclar IPS e.max CAD : https://www.ivoclar.com/en_li/products/digital-processes/ips-e.max-cad
            - Formlabs Form 4B : https://dental.formlabs.com/products/form-4b/
            - Formlabs Materials : https://dental.formlabs.com/materials/
          */}
        </Container>
      </section>

      {/* Contrôle qualité + Fiche de traçabilité */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl mb-12">
            <FadeIn>
              <SectionLabel>Contrôle qualité</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                Fiche de production et traçabilité
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Chaque cas peut être accompagné d&apos;un rapport de traçabilité précisant les matériaux utilisés, les équipements, les limites techniques et les étapes pertinentes de production.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Chaque cas de laboratoire est associé à une fiche de production interne qui documente les étapes pertinentes :
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="border border-border bg-background overflow-hidden max-w-4xl">
              {fichesTracabilite.map((row, i) => (
                <div
                  key={row.item}
                  className={`grid grid-cols-1 md:grid-cols-[14rem_1fr] ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="p-4 md:p-5 font-medium text-sm text-foreground bg-surface/40 flex items-center gap-3">
                    <span className="font-display text-xs text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.item}
                  </div>
                  <div className="p-4 md:p-5 text-sm text-muted-foreground leading-relaxed border-t md:border-t-0 md:border-l border-border">
                    {row.desc}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA professionnel — 3 boutons distincts */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-3xl mb-10">
            <div className="label-sm text-accent/80 mb-4">Pour les professionnels</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Trois parcours dédiés aux dentistes et spécialistes
            </h2>
            <p className="text-lg opacity-80 leading-relaxed">
              Chaque demande professionnelle a son propre formulaire et son propre flux.
            </p>
          </FadeIn>

          <div className="grid gap-px bg-primary-foreground/10 md:grid-cols-3">
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/partenaires`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">01</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">Devenir partenaire</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  Premier contact pour discuter d&apos;une collaboration.
                </p>
              </Link>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/prescription`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">02</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">Transmettre une prescription</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  Prescription d&apos;appareil ou de restauration avec fichiers STL.
                </p>
              </Link>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/reference-clinique`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">03</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">Référer un patient</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  Référence clinique pour évaluation ou traitement.
                </p>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
