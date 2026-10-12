import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Piece {
  num: string
  nom: string
  texte: string
  alt: string
}

/** Les huit photos, dans l'ordre de la visite : de la rue jusqu'à l'atelier. */
const IMAGES = [
  "/v2/facade.webp",
  "/v2/salle-attente.webp",
  "/v2/couloir.webp",
  "/v2/bureau.webp",
  "/v2/salle-soins-1.webp",
  "/v2/salle-soins-2.webp",
  "/v2/conception.webp",
  "/v2/atelier.webp",
]

/**
 * « Le studio, pièce par pièce ».
 *
 * Une bande horizontale qui défile, pas une grille : la maquette fixe des
 * vignettes de 340 px qui débordent volontairement du cadre, pour qu'on
 * comprenne d'un coup d'œil qu'il y en a d'autres à droite.
 *
 * Le titre est dans un conteneur séparé de la bande : celle-ci porte le
 * défilement et doit pouvoir déborder, alors que le titre reste aligné sur la
 * grille de la page.
 */
export function PiecesSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const pieces = getTranslationObjectList<Piece>(lang, "apropos.pieces.liste")

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] pb-6 pt-24">
        <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
          {t("apropos.pieces.titre")}
        </h2>
      </div>

      <ul className="mx-auto flex max-w-page list-none gap-6 overflow-x-auto px-[clamp(16px,5vw,56px)] pb-24 pt-4">
        {pieces.map((p, i) => (
          <li key={p.num} className="flex-[0_0_340px]">
            <figure className="m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[i]}
                alt={p.alt}
                loading="lazy"
                className="block aspect-[3/4] w-full rounded-[2px] object-cover"
              />
              <figcaption className="mt-4 flex gap-4">
                <span className="font-display text-[22px] leading-none text-muted-foreground">{p.num}</span>
                <span>
                  <strong className="block font-medium">{p.nom}</strong>
                  <span className="text-base text-foreground/75">{p.texte}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
