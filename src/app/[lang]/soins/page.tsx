import { PageHero } from "@/components/shared/page-hero"
import { ServicesGrid } from "@/components/services/services-grid"
import { PatientNeedsMatrix } from "@/components/services/patient-needs-matrix"
import { getAllServices } from "@/lib/content"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Services dentaires à Ahuntsic",
  description:
    "Examen complet, prévention, restaurations, couronnes, endodontie, parodontie, implantologie, aligneurs, esthétique et urgences — tous les services proposés par Studio Dentaire De Facto à Ahuntsic, Montréal.",
}

export default function ServicesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const services = getAllServices(lang)
  return (
    <>
      <PageHero
        label={t("services.label")}
        title={t("services.pageTitle")}
        subtitle={t("services.pageSubtitle")}
      />
      <PatientNeedsMatrix lang={lang} />
      <ServicesGrid services={services} lang={lang} />
    </>
  )
}
