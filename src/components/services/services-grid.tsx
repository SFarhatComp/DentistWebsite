import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { ServiceCard } from "./service-card"
import type { Service, Locale } from "@/types"

export function ServicesGrid({ services, lang }: { services: Service[]; lang: Locale }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <StaggerContainer className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} lang={lang} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
