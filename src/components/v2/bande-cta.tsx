import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * La bande qui ferme la plupart des pages : un grand titre à gauche, les deux
 * mêmes boutons à droite — prendre rendez-vous, ou appeler.
 *
 * Le titre change d'une page à l'autre et porte la taille du titre de héros
 * (68 px au plus) : c'est la dernière chose qu'on lit, la maquette lui donne
 * donc le même poids qu'à la première.
 */
export function BandeCta({
  lang,
  titre,
  fond = "ivoire",
}: {
  lang: Locale
  titre: string
  fond?: "ivoire" | "papier"
}) {
  const t = getTranslations(lang)
  return (
    <section className={fond === "ivoire" ? "bg-surface" : "bg-background"}>
      <div className="mx-auto flex max-w-page flex-wrap items-end justify-between gap-10 px-[clamp(16px,5vw,56px)] py-28">
        <h2 className="m-0 font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">{titre}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${lang}/rendez-vous`}
            className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
          >
            {t("nav.cta")}
          </Link>
          <a
            href="tel:+15148637805"
            className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm px-[26px] text-base font-medium text-foreground no-underline shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.35)] transition-colors hover:bg-foreground/5"
          >
            {t("common.appeler")}
          </a>
        </div>
      </div>
    </section>
  )
}
