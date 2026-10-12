import Link from "next/link"
import { ReservationRapide } from "./reservation-rapide"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Espace {
  num: string
  nom: string
}

/**
 * Plan d'ouverture de l'accueil.
 *
 * Fond en dégradé radial prune, titre Cormorant jusqu'à 104 px, photo du bureau
 * encadrée avec un filet terracotta décalé, et le mini-formulaire de réservation
 * en verre dépoli posé en bas.
 *
 * Le remplissage haut de 156 à 176 px dégage les deux étages de l'en-tête, qui
 * flotte par-dessus.
 */
export function HeroAccueil({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const espaces = getTranslationObjectList<Espace>(lang, "accueil.hero.espaces")

  return (
    <section className="relative flex min-h-[clamp(640px,100svh,900px)] flex-col overflow-hidden bg-hero text-white">
      <div className="relative mx-auto flex w-full max-w-page flex-grow flex-wrap items-end justify-between gap-10 px-[clamp(16px,5vw,56px)] pb-10 pt-[clamp(156px,16vw,176px)]">
        <div className="max-w-[760px] flex-[1_1_560px]">
          <h1 className="m-0 font-semibold">
            <span className="block font-sans text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
              {t("accueil.hero.surtitre")}
            </span>
            <span className="mt-5 block font-display text-[clamp(44px,8.4vw,104px)] leading-[0.98] tracking-[-0.015em]">
              {t("accueil.hero.titre1")}
              <br />
              {t("accueil.hero.titre2")}
            </span>
          </h1>
          <p className="mt-7 max-w-[54ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/90">
            {t("accueil.hero.intro")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/rendez-vous`}
              className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
            >
              {t("nav.cta")}
            </Link>
            <a
              href={`tel:${t("contact.phoneTel")}`}
              className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm px-[26px] text-base font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] transition-colors hover:bg-white/10"
            >
              {t("accueil.hero.appeler")}
            </a>
          </div>
        </div>

        <div className="flex w-full max-w-[400px] flex-[0_1_400px] flex-col gap-8">
          <figure className="relative m-0 mb-4 mr-4 w-full max-w-[400px] flex-[0_1_400px]">
            {/* Filet terracotta décalé : l'encadrement double de la maquette. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2px] border border-primary"
            />
            <div className="relative rounded-[2px] bg-plum-mid p-3 shadow-[inset_0_0_0_1px_hsl(var(--lavender)/0.55),0_24px_48px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/v2/bureau.webp"
                alt={t("accueil.hero.altBureau")}
                className="block aspect-[4/5] w-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
              />
            </div>
          </figure>

          {/* Les trois espaces, énumérés sous la photo. Masqués sous 1024 px :
              la maquette les retire plutôt que de les empiler. */}
          <div
            aria-hidden="true"
            className="hidden flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.16em] text-white/80 lg:flex"
          >
            {espaces.map((e) => (
              <div key={e.num} className="flex items-baseline gap-4">
                <span className="font-display text-xl normal-case tracking-normal text-surface-alt">{e.num}</span>
                {e.nom}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReservationRapide lang={lang} />
    </section>
  )
}
