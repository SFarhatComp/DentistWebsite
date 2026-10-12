import Link from "next/link"
import type { Locale } from "@/types"

/**
 * Héros commun aux pages intérieures.
 *
 * Même composition que l'accueil — dégradé prune, photo encadrée d'un filet
 * terracotta décalé — mais d'un cran plus bas : le titre plafonne à 68 px au
 * lieu de 104.
 *
 * Le remplissage haut de 150 px dégage les deux étages de l'en-tête, qui flotte
 * par-dessus. Toute page sans ce héros rendrait l'en-tête illisible.
 *
 * `hauteur` est la hauteur minimale du bloc, et la maquette la fixe page par
 * page : 820 px pour la page Google Ads, 460 px seulement pour la FAQ. Sans
 * elle, le héros se replie sur la hauteur de son texte et une page courte
 * perd l'aplomb que lui donne la maquette.
 */
export function HeroPage({
  lang,
  surtitre,
  titre,
  intro,
  image,
  alt,
  cta,
  ctaHref,
  hauteur = 680,
}: {
  lang: Locale
  surtitre: string
  titre: string
  intro?: string
  image?: string
  alt?: string
  cta?: string
  ctaHref?: string
  hauteur?: number
}) {
  return (
    <section
      className="relative flex flex-col overflow-hidden bg-hero text-white"
      style={{ minHeight: `${hauteur}px` }}
    >
      <div className="relative mx-auto mb-0 mt-auto flex w-full max-w-page flex-wrap items-end justify-between gap-12 px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
        <div className="min-w-0 flex-[1_1_520px]">
          <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">{surtitre}</p>
          <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
            {titre}
          </h1>
          {intro && (
            <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">{intro}</p>
          )}
          {cta && (
            <Link
              href={ctaHref ?? `/${lang}/rendez-vous`}
              className="mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
            >
              {cta}
            </Link>
          )}
        </div>

        {image && (
          <figure className="relative m-0 mb-4 mr-4 w-full max-w-[400px] flex-[0_1_400px]">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2px] border border-primary"
            />
            <div className="relative rounded-[2px] bg-plum-mid p-3 shadow-[inset_0_0_0_1px_hsl(var(--lavender)/0.55),0_24px_48px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={alt ?? ""}
                className="block aspect-[4/5] w-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
              />
            </div>
          </figure>
        )}
      </div>
    </section>
  )
}
