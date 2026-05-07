import { PageHero } from "@/components/shared/page-hero"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Ressources patients" }

export default function RessourcesPage() {
  return (
    <PageHero
      label="Bientôt"
      title="Ressources patients"
      subtitle="Instructions post-opératoires, conseils de prévention et documents téléchargeables seront publiés ici."
    />
  )
}
