import { cn } from "@/lib/utils"

/**
 * Enveloppe de section.
 *
 * Reprend le rythme de la maquette : conteneur de 1240 px, gouttières en
 * `clamp(16px, 5vw, 56px)`, 96 px de respiration verticale. `fond` alterne
 * entre le papier et l'ivoire, ce qui sépare les sections sans filet.
 */
export function Section({
  children,
  fond = "papier",
  className,
  id,
}: {
  children: React.ReactNode
  fond?: "papier" | "ivoire" | "lavande" | "prune"
  className?: string
  id?: string
}) {
  const fonds = {
    papier: "bg-background",
    ivoire: "bg-surface",
    // La maquette emploie la lavande claire #F1ECF0 pour les fonds de section,
    // et #E9E1EA pour les aplats sur fond sombre : ce ne sont pas les mêmes.
    lavande: "bg-lavender-soft",
    // Prune plein : la maquette ferme certaines pages sur ce renversement.
    prune: "bg-foreground text-white",
  }
  return (
    <section id={id} className={cn(fonds[fond], className)}>
      <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">{children}</div>
    </section>
  )
}

/** Titre de section secondaire : Cormorant 600, jusqu'à 46 px. */
export function TitreSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]", className)}>
      {children}
    </h2>
  )
}
