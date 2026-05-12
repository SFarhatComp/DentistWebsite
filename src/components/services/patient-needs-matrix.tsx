import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import type { Locale } from "@/types"

interface NeedItem {
  label: string
  serviceSlug: string
}

const NEEDS: NeedItem[] = [
  { label: "J'ai mal", serviceSlug: "urgences" },
  { label: "J'ai une dent cassée", serviceSlug: "urgences" },
  { label: "Je veux un examen complet", serviceSlug: "examen-complet" },
  { label: "Je veux améliorer mon sourire", serviceSlug: "esthetique-dentaire" },
  { label: "Je veux remplacer une dent", serviceSlug: "implantologie" },
  { label: "Je veux aligner mes dents", serviceSlug: "aligneurs" },
  { label: "Mes gencives saignent", serviceSlug: "parodontie" },
  { label: "Je veux comprendre un plan de traitement", serviceSlug: "examen-complet" },
  { label: "J'ai besoin d'une urgence", serviceSlug: "urgences" },
]

export function PatientNeedsMatrix({ lang }: { lang: Locale }) {
  return (
    <section className="py-20 md:py-24 border-b border-border bg-surface/40">
      <Container>
        <div className="max-w-2xl mb-12">
          <FadeIn>
            <SectionLabel>Vous consultez parce que…</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Trouver le bon point de départ
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Choisissez ce qui correspond le mieux à votre situation actuelle. Une évaluation clinique reste nécessaire pour confirmer l&apos;approche adaptée.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {NEEDS.map((need, i) => (
            <FadeIn key={need.label} className="bg-background">
              <Link
                href={`/${lang}/soins/${need.serviceSlug}`}
                className="block p-6 md:p-7 hover:bg-surface/50 transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="font-display text-sm text-accent/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="font-display text-lg md:text-xl text-foreground leading-snug">
                  {need.label}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
