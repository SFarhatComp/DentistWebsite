import { Photo } from "./Photo"

/**
 * La visite du studio en « pellicule » : un défilement horizontal natif avec
 * aimantation, chaque pièce numérotée comme un plan. Fonctionne au toucher, à
 * la molette et au clavier (la bande est focalisable), sans JavaScript.
 */
export function Filmstrip({
  items,
  label,
  hint,
}: {
  items: { image: string; title: string; text: string; alt: string }[]
  label: string
  hint?: string
}) {
  return (
    <div className="relative">
      <ol
        tabIndex={0}
        aria-label={label}
        className="filmstrip flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 sm:gap-6"
        style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}
      >
        {items.map((it, i) => (
          <li key={it.image + i} className="w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw]">
            <figure>
              <Photo name={it.image} alt={it.alt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw" className="aspect-[3/4] rounded-[2px]" />
              <figcaption className="mt-4 flex gap-4">
                <span className="font-display text-[22px] leading-none text-mauve-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-medium">{it.title}</span>
                  <span className="mt-1 block text-[16px] text-aub/75">{it.text}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      {hint && (
        <p aria-hidden className="frame eyebrow mt-1 text-mauve-ink">
          {hint} →
        </p>
      )}
    </div>
  )
}
