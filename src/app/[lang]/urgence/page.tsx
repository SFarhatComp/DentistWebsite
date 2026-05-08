import { PageHero } from "@/components/shared/page-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Urgence dentaire",
  description:
    "Pour une urgence dentaire à Ahuntsic — douleur, traumatisme, enflure, dent cassée. Utilisez le formulaire dédié sur la page Rendez-vous ou appelez la clinique.",
}

export default function UrgencePage() {
  return (
    <PageHero
      label="Urgence"
      title="Urgence dentaire"
      subtitle="Pour une demande d'urgence, utilisez le formulaire dédié sur la page Rendez-vous. Une page autonome est en préparation."
    />
  )
}
