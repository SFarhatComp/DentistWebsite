import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Centre de ressources pour les patients de Studio Dentaire De Facto : première visite, assurances, confidentialité et questions fréquentes.",
}

interface HubLink {
  title: string
  body: string
  href: string
}

export default function RessourcesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale

  const essentielles: HubLink[] = [
    {
      title: "Nouveaux patients",
      body: "Parcours d'orientation pour préparer votre première rencontre avec le studio.",
      href: `/${lang}/nouveaux-patients`,
    },
    {
      title: "Première visite",
      body: "Déroulement en deux rendez-vous, durée, documents à apporter.",
      href: `/${lang}/premiere-visite`,
    },
    {
      title: "Assurances et paiements",
      body: "Estimations, transmission aux assureurs, RCSD, RAMQ et politique de rendez-vous.",
      href: `/${lang}/assurances-paiements`,
    },
    {
      title: "Questions fréquentes",
      body: "Réponses aux interrogations les plus courantes des nouveaux patients.",
      href: `/${lang}/questions-frequentes`,
    },
    {
      title: "Confidentialité",
      body: "Comment vos renseignements personnels et de santé sont recueillis, utilisés et protégés.",
      href: `/${lang}/confidentialite`,
    },
    {
      title: "Urgence dentaire",
      body: "Quoi faire en cas de douleur, traumatisme ou enflure.",
      href: `/${lang}/urgence`,
    },
  ]

  const professionnels: HubLink[] = [
    {
      title: "Espace professionnels",
      body: "Pour dentistes et spécialistes — laboratoire, partenariat, prescription, référence.",
      href: `/${lang}/laboratoire/professionnels`,
    },
    {
      title: "Référence / Prescription",
      body: "Référer un cas patient ou transmettre une prescription au laboratoire.",
      href: `/${lang}/laboratoire/prescription`,
    },
  ]

  return (
    <>
      <PageHero
        label="Ressources"
        title="Ressources"
        subtitle="Documentation et parcours d'orientation pour préparer votre visite et comprendre votre dossier."
      />

      <section className="py-20 md:py-24">
        <Container>
          <FadeIn>
            <SectionLabel>Patients</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl">
              Pour préparer votre visite
            </h2>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {essentielles.map((link, i) => (
              <FadeIn key={link.title} className="bg-background">
                <Link href={link.href} className="block p-8 hover:bg-surface/40 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-xl text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{link.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{link.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>Lire</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24 border-t border-border bg-surface/40">
        <Container>
          <FadeIn>
            <SectionLabel>Professionnels</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl">
              Pour les dentistes et spécialistes
            </h2>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 border border-border max-w-4xl">
            {professionnels.map((link, i) => (
              <FadeIn key={link.title} className="bg-background">
                <Link href={link.href} className="block p-8 hover:bg-surface/30 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-xl text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{link.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{link.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>Accéder</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
