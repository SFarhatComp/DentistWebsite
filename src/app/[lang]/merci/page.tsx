import Link from "next/link"
import { Container } from "@/components/layout/container"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = { title: "Merci", robots: { index: false } }

export default function MerciPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  return (
    <Container>
      <div className="py-32 max-w-2xl">
        <div className="label-sm text-accent mb-4">Confirmation</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
          Merci, votre demande a été reçue.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Notre équipe prendra contact avec vous afin de confirmer les prochaines étapes. En cas d&apos;urgence
          médicale, contactez les services d&apos;urgence (911).
        </p>
        <Link href={`/${lang}`} className="text-primary hover:underline text-base">
          Retour à l&apos;accueil →
        </Link>
      </div>
    </Container>
  )
}
