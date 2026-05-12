import Link from "next/link"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { PatientNeedsMatrix } from "@/components/services/patient-needs-matrix"
import { ServiceCard } from "@/components/services/service-card"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getAllServices } from "@/lib/content"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale, Service } from "@/types"

export const metadata: Metadata = {
  title: "Soins dentaires à Ahuntsic",
  description:
    "Examen complet, prévention, restaurations, parodontie, couronnes, endodontie, implantologie, aligneurs, esthétique et urgences — tous les soins proposés par Studio Dentaire De Facto à Ahuntsic, Montréal.",
}

const ESSENTIELS = ["examen-complet", "prevention-hygiene", "dentisterie-operatoire", "parodontie", "urgences"]
const RESTAURATEURS = ["couronnes-ponts", "esthetique-dentaire", "aligneurs"]
const AVANCES = ["endodontie", "implantologie"]

function CategorySection({
  label,
  title,
  description,
  services,
  lang,
}: {
  label: string
  title: string
  description?: string
  services: Service[]
  lang: Locale
}) {
  return (
    <section className="py-16 md:py-20 border-b border-border last:border-b-0">
      <Container>
        <FadeIn className="max-w-2xl mb-10">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-4">{title}</h2>
          {description && (
            <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
          )}
        </FadeIn>
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {services.map((service) => (
            <FadeIn key={service.slug} className="bg-background">
              <ServiceCard service={service} lang={lang} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function SoinsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const allServices = getAllServices(lang)
  const bySlug = (slug: string) => allServices.find((s) => s.slug === slug)

  const essentiels = ESSENTIELS.map(bySlug).filter((s): s is Service => Boolean(s))
  const restaurateurs = RESTAURATEURS.map(bySlug).filter((s): s is Service => Boolean(s))
  const avances = AVANCES.map(bySlug).filter((s): s is Service => Boolean(s))

  return (
    <>
      <PageHero
        label={t("services.label")}
        title={t("services.pageTitle")}
        subtitle={t("services.pageSubtitle")}
      />

      <PatientNeedsMatrix lang={lang} />

      <CategorySection
        label="Soins essentiels"
        title="Soins essentiels"
        services={essentiels}
        lang={lang}
      />

      <CategorySection
        label="Soins restaurateurs et esthétiques"
        title="Soins restaurateurs et esthétiques"
        services={restaurateurs}
        lang={lang}
      />

      <CategorySection
        label="Soins avancés ou coordonnés"
        title="Soins avancés ou coordonnés"
        description="Pour les cas plus complexes, certains traitements peuvent être réalisés au studio ou coordonnés avec des spécialistes appropriés."
        services={avances}
        lang={lang}
      />

      <section className="py-20 md:py-24 bg-surface/40 border-t border-border">
        <Container>
          <FadeIn className="max-w-3xl">
            <SectionLabel>Références spécialisées</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
              Collaboration avec les spécialistes
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Lorsque la situation dépasse le champ de traitement indiqué au studio, nous coordonnons la référence vers un spécialiste approprié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/laboratoire`}
                className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                Laboratoire intégré
              </Link>
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
              >
                Demander un rendez-vous
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
