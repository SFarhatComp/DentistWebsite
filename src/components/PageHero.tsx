import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Haut des pages intérieures : photo plein cadre et voile aubergine, titre à
 * empattement aligné à gauche, entrée par masque (transformation seulement,
 * aucun fondu d'opacité : le texte est lisible avant tout script).
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  alt = "",
  position = "50% 50%",
  crumbs,
  crumbsLabel,
  children,
  tall = false,
}: {
  eyebrow: string
  title: string
  lede?: ReactNode
  image?: string
  alt?: string
  position?: string
  crumbs?: { href: string; label: string }[]
  crumbsLabel?: string
  children?: ReactNode
  tall?: boolean
}) {
  return (
    <section
      className={cn(
        "hero relative isolate flex overflow-hidden bg-aub-deep text-white",
        image ? (tall ? "min-h-[88svh]" : "min-h-[72svh] md:min-h-[78svh]") : "min-h-[46svh]",
      )}
    >
      {image ? (
        <>
          <div className="hero-media absolute inset-0 -z-20">
            <Image
              src={`/img/${image}.webp`}
              alt={alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: position }}
            />
          </div>
          <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_10%,#3A2940_0%,#1B111F_60%)]" />
          <span className="brackets-giant absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none text-white/[0.04] md:text-[26vw]">
            [&nbsp;&nbsp;]
          </span>
        </div>
      )}

      <div className="frame relative mt-auto pb-12 pt-[150px] sm:pb-16 md:pb-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label={crumbsLabel} className="slide-in mb-6 text-[14px] text-white/90">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <Link href={c.href} className="hover:text-white hover:underline">
                    {c.label}
                  </Link>
                  <span aria-hidden>/</span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow slide-in text-mauve-mist">
          <span aria-hidden className="mr-2 text-mauve">[</span>
          {eyebrow}
          <span aria-hidden className="ml-2 text-mauve">]</span>
        </p>
        <h1 className="t-1 mt-4 max-w-[20ch]">
          <span className="mask">
            <span>{title}</span>
          </span>
        </h1>
        {lede && <div className="lede slide-in d1 mt-6 max-w-[58ch] text-white/88">{lede}</div>}
        {children && <div className="slide-in d2 mt-8">{children}</div>}
      </div>
    </section>
  )
}
