import { PageHero } from "@/components/shared/page-hero"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Laboratoire intégré" }

export default function LaboratoirePage() {
  return (
    <PageHero
      label="Bientôt"
      title="Laboratoire intégré"
      subtitle="La page dédiée au laboratoire intégré sera publiée prochainement."
    />
  )
}
