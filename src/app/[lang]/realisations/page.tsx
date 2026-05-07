import { PageHero } from "@/components/shared/page-hero"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Réalisations" }

export default function RealisationsPage() {
  return (
    <PageHero
      label="Bientôt"
      title="Réalisations cliniques"
      subtitle="Cette section présentera des cas traités au studio. Elle sera publiée après une révision clinique et le consentement des patients concernés."
    />
  )
}
