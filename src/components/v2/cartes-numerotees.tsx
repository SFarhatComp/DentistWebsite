export interface CarteNumerotee {
  /** Chiffre d'étape, ou durée selon la variante choisie. */
  num: string
  titre: string
  intro?: string
  points?: string[]
  note?: string
}

/**
 * Grille de cartes à filets.
 *
 * Les séparateurs ne sont pas des bordures mais l'espace de la grille : un
 * `gap` d'un pixel laisse voir le fond, ce qui donne des filets parfaitement
 * continus quel que soit le nombre de colonnes.
 *
 * Deux variantes dans la maquette, qui ne diffèrent que par la tête de carte :
 *  - `chiffre` : grand numéro Cormorant de 64 px, pour une suite d'étapes ;
 *  - `etiquette` : surtitre de 13 px en capitales, pour une durée ou une
 *    condition. Les deux occupent la même place, d'où un seul composant.
 */
export function CartesNumerotees({
  cartes,
  tete = "chiffre",
  base = 280,
}: {
  cartes: CarteNumerotee[]
  tete?: "chiffre" | "etiquette"
  /** Largeur de base d'une colonne avant renvoi à la ligne. */
  base?: 280 | 300
}) {
  return (
    <div
      className="mt-10 flex flex-wrap gap-px overflow-hidden rounded-sm"
      style={{ background: "hsl(var(--foreground) / 0.15)" }}
    >
      {cartes.map((c) => (
        <div
          key={c.titre}
          className="flex flex-col bg-background p-10"
          style={{ flex: `1 1 ${base}px` }}
        >
          {tete === "chiffre" ? (
            <p className="m-0 font-display text-[64px] leading-none text-muted-foreground">{c.num}</p>
          ) : (
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
              {c.num}
            </p>
          )}
          <h3 className="mt-3 font-display text-[27px] font-semibold leading-[1.2]">{c.titre}</h3>
          {c.intro && <p className="mt-3 text-foreground/80">{c.intro}</p>}
          {c.points && c.points.length > 0 && (
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0 text-foreground/85">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span aria-hidden="true" className="shrink-0 text-primary">
                    —
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          {c.note && <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{c.note}</p>}
        </div>
      ))}
    </div>
  )
}
