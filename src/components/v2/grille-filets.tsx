/**
 * Grille dont les séparations sont des filets d'un pixel.
 *
 * Le procédé de la maquette : le conteneur porte la couleur du filet, les
 * cases portent celle du fond, et un `gap` d'un pixel laisse voir le conteneur
 * entre elles. Les filets se placent donc tout seuls, y compris quand les
 * cases se replient sur plusieurs rangées — ce qu'une bordure par case ne sait
 * pas faire sans doubler les traits.
 *
 * `ton` suit le fond de la section : « clair » sur papier, « sombre » sur prune.
 */
export function GrilleFilets({
  children,
  ton = "clair",
  className = "",
}: {
  children: React.ReactNode
  ton?: "clair" | "sombre"
  className?: string
}) {
  const filet = ton === "sombre" ? "bg-white/[0.12]" : "bg-foreground/15"
  return (
    <div className={`flex flex-wrap gap-px overflow-hidden rounded-sm ${filet} ${className}`}>
      {children}
    </div>
  )
}

/** Une case de la grille. `base` est sa largeur de repli (flex-basis). */
export function CaseFilets({
  children,
  base = 240,
  pleineLargeur = false,
  fond = "bg-background",
  className = "",
}: {
  children: React.ReactNode
  base?: number
  pleineLargeur?: boolean
  fond?: string
  className?: string
}) {
  return (
    <div
      className={`${fond} p-6 ${className}`}
      style={{ flex: pleineLargeur ? "1 1 100%" : `1 1 ${base}px` }}
    >
      {children}
    </div>
  )
}
