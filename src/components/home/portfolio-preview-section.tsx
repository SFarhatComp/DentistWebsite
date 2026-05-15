import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import type { Locale } from "@/types"

const VISUELS = [
  { title: "Photo intraorale", alt: "photo-intraorale-anonymisee-de-facto.jpg" },
  { title: "Modèle 3D", alt: "modele-3d-de-facto.jpg" },
  { title: "Plan de traitement", alt: "plan-traitement-visuel-de-facto.jpg" },
  { title: "Restauration", alt: "restauration-laboratoire-de-facto.jpg" },
]

export function PortfolioPreviewSection({ lang }: { lang: Locale }) {
  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <Container>
        <div className="max-w-2xl mb-12">
          <FadeIn>
            <SectionLabel>Portfolio clinique</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              La méthode De Facto en images
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Certains cas peuvent être documentés à l&apos;aide de photographies, radiographies, scans, modèles numériques ou plans de traitement visuels. Ces outils permettent de mieux comprendre, comparer et planifier les soins.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 border border-border mb-12">
          {VISUELS.map((v, i) => (
            <FadeIn key={v.alt} className="bg-background">
              <div className="p-5 h-full flex flex-col">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-sm text-accent/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <PlaceholderImage aspect="video" label={v.alt} className="mb-3" />
                <h3 className="font-display text-base text-foreground">{v.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <Link
            href={`/${lang}/portfolio-clinique`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline group"
          >
            <span>Voir le portfolio clinique</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <FadeIn>
          <p className="mt-10 text-xs text-muted-foreground italic max-w-3xl leading-relaxed">
            Les cas cliniques sont présentés uniquement avec le consentement explicite des patients et dans le respect de la confidentialité.
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
