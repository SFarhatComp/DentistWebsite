import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/en">Back to Home</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
