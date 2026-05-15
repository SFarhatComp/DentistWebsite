import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import type { Locale } from "@/types"

export function StudioPreviewSection({ lang }: { lang: Locale }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl">
          <FadeIn>
            <SectionLabel>Le Studio</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Un studio dentaire conçu pour ralentir, comprendre et mieux planifier.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              L&apos;espace, l&apos;approche clinique et les outils numériques sont réunis pour créer une continuité entre l&apos;analyse, la décision et le traitement.
            </p>
            <Link
              href={`/${lang}/le-studio`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline group"
            >
              <span>Découvrir le studio</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
          <FadeIn direction="right">
            <PlaceholderImage aspect="portrait" label="reception-studio-de-facto.jpg" />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
