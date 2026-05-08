import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Laboratoire intégré",
  description:
    "Le laboratoire intégré de Studio Dentaire De Facto facilite la communication clinique, la planification et la personnalisation de certaines restaurations dentaires.",
}

const communication = [
  "Photos",
  "Scans",
  "Teintes",
  "Modèles",
  "Instructions cliniques",
  "Validation des détails",
  "Communication plus fluide",
]

const services = [
  "Couronnes",
  "Ponts",
  "Modèles imprimés",
  "Guides chirurgicaux",
  "Gouttières",
  "Temporaires",
  "Wax-up diagnostiques",
  "Prise de teinte",
  "Assistance à la planification",
]

const qualite = [
  "Vérification des ajustements",
  "Documentation",
  "Matériaux",
  "Communication",
  "Limites techniques",
  "Révision avant livraison",
]

const teintes = [
  "Photos",
  "Analyse de teinte",
  "Communication avec le laboratoire",
  "Maquillage ou stratification selon le cas",
  "Limites selon matériau et situation",
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

export default function LaboratoirePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <>
      <PageHero
        label="Laboratoire"
        title="Laboratoire intégré"
        subtitle="Une proximité directe entre la planification clinique et certaines étapes de fabrication."
      />

      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 grid gap-12 md:grid-cols-2 items-center">
            <FadeIn>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un laboratoire intégré permet une communication plus directe entre la planification clinique et certaines étapes de fabrication. Cette proximité peut faciliter la personnalisation, la compréhension des détails et la cohérence entre le diagnostic, le plan et la restauration.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <PlaceholderImage aspect="video" label="laboratoire-integre-de-facto.jpg" />
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label="Communication" title="Communication clinique-laboratoire">
                <BulletList items={communication} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={2} label="Services" title="Services possibles">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <li key={s} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label="Qualité" title="Contrôle qualité">
                <BulletList items={qualite} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label="Teintes" title="Personnalisation des teintes">
                <BulletList items={teintes} />
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label="Limites" title="Limites et laboratoires partenaires">
                <div className="bg-surface/60 border border-border p-8 md:p-10">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Certains cas peuvent nécessiter une collaboration avec des laboratoires partenaires ou des spécialistes selon la complexité, le matériau, la situation clinique ou les objectifs du traitement.
                  </p>
                </div>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <div className="label-sm text-accent/80 mb-4">Pour les professionnels</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Espace dédié aux dentistes référents
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Prescription numérique, cas acceptés, communication clinique, prise de teinte, envoi de fichiers et contact professionnel.
            </p>
            <Link
              href={`/${lang}/laboratoire/professionnels`}
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              Accéder à l&apos;espace professionnels
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
