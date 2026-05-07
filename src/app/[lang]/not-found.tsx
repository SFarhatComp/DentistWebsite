import Link from "next/link"
import { Container } from "@/components/layout/container"

export default function NotFound() {
  return (
    <Container>
      <div className="py-32 text-center">
        <div className="label-sm text-accent mb-4">404</div>
        <h1 className="font-display text-5xl mb-6">Page introuvable</h1>
        <Link href="/fr" className="text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    </Container>
  )
}
