import { Container } from "@/components/layout/container"
import { SectionLabel } from "./section-label"

interface PageHeroProps { label?: string; title: string; subtitle?: string }

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface/40">
      <Container>
        <div className="py-20 md:py-28 max-w-3xl">
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-6">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{subtitle}</p>}
        </div>
      </Container>
    </section>
  )
}
