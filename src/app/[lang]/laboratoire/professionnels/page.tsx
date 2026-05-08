import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Espace professionnels — Laboratoire",
  description:
    "Un laboratoire intégré pensé pour une communication clinique claire et des restaurations planifiées avec précision. Espace dédié aux dentistes référents.",
}

const services = [
  "Couronnes et ponts en céramique ou zircone",
  "Modèles imprimés et guides chirurgicaux",
  "Gouttières et appareils sur mesure",
  "Wax-up diagnostiques",
  "Provisoires et temporaires",
]

const prescription = [
  "Prescription numérique acceptée",
  "Communication des préférences cliniques",
  "Validation des détails avant fabrication",
  "Possibilité de communication directe lors de la planification",
]

const casAcceptes = [
  "Restaurations indirectes (couronnes, ponts, onlays)",
  "Cas avec indication esthétique",
  "Modèles d'étude et planification numérique",
  "Cas complexes coordonnés avec spécialistes au besoin",
]

const teinte = [
  "Photos cliniques annotées",
  "Analyse de teinte standardisée",
  "Communication avec le technicien lorsque pertinent",
  "Maquillage ou stratification selon le matériau",
]

const fichiers = [
  "Scans intraoraux (formats standards)",
  "Photos cliniques",
  "Radiographies pertinentes",
  "Notes de prescription",
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

      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <FadeIn>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cet espace s&apos;adresse aux dentistes référents et collègues qui souhaitent collaborer avec notre laboratoire intégré. Nous privilégions une communication directe, une documentation claire et une coordination précise entre la prescription, la fabrication et la livraison.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-20">
            <FadeIn>
              <NumberedSection number={1} label="Services" title="Services de laboratoire">
                <ul className="space-y-3">
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
              <NumberedSection number={2} label="Prescription" title="Prescription numérique">
                <ul className="space-y-3">
                  {prescription.map((p) => (
                    <li key={p} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={3} label="Cas" title="Cas acceptés">
                <ul className="space-y-3">
                  {casAcceptes.map((c) => (
                    <li key={c} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={4} label="Teinte" title="Prise de teinte">
                <ul className="space-y-3">
                  {teinte.map((t) => (
                    <li key={t} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={5} label="Fichiers" title="Envoi de fichiers">
                <ul className="space-y-3 mb-6">
                  {fichiers.map((f) => (
                    <li key={f} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">→</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  Les modalités exactes (canaux, formats, dépôts sécurisés) sont précisées lors du premier contact professionnel.
                </p>
              </NumberedSection>
            </FadeIn>

            <FadeIn>
              <NumberedSection number={6} label="Contact" title="Contact professionnel">
                <div className="bg-surface/60 border border-border p-8 md:p-10">
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Le formulaire de prescription numérique en ligne est en cours de finalisation. Pour le moment, contactez-nous directement pour discuter d&apos;un cas, demander une prise de teinte ou transmettre une prescription.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/${lang}/contact`}
                      className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                    >
                      Nous joindre
                    </Link>
                    <a
                      href="tel:+15148637805"
                      className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                    >
                      514 863 7805
                    </a>
                  </div>
                </div>
              </NumberedSection>
            </FadeIn>
          </div>
        </Container>
      </section>

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
