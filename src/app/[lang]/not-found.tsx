import Link from "next/link"
import { Container } from "@/components/layout/container"

// not-found.tsx ne reçoit pas params.lang. Affichage bilingue pour rester
// lisible quel que soit le visiteur.
export default function NotFound() {
  return (
    <Container>
      <div className="py-32 text-center">
        <div className="label-sm text-accent mb-4">404</div>
        <h1 className="font-display text-5xl mb-6">Page introuvable / Page not found</h1>
        <div className="flex gap-6 justify-center">
          <Link href="/fr" className="text-primary hover:underline">Retour à l&apos;accueil</Link>
          <span className="text-muted-foreground">·</span>
          <Link href="/en" className="text-primary hover:underline">Back to home</Link>
        </div>
      </div>
    </Container>
  )
}
