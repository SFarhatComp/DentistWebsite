import Link from "next/link"
import { BandeUrgence } from "@/components/v2/bande-urgence"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Famille {
  titre: string
  soins: { nom: string; slug: string }[]
}

/**
 * « La carte des soins ».
 *
 * Les familles sont posées en `flex-wrap` sur une base de 340 px, et non en
 * grille à colonnes fixes : c'est ce qui permet au nombre de colonnes de suivre
 * la largeur sans jamais couper un nom de soin sur deux lignes.
 *
 * Chaque titre de famille porte un filet sous lui, plus marqué que ceux des
 * lignes de soins — 20 % contre 10 % d'encre.
 */
export function CarteSoinsSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const familles = getTranslationObjectList<Famille>(lang, "accueil.carte.familles")

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
              {t("accueil.carte.surtitre")}
            </p>
            <h2 className="mt-3 font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("accueil.carte.titre")}
            </h2>
            <p className="mt-4 text-[19px] leading-[1.6] text-foreground/80">{t("accueil.carte.intro")}</p>
          </div>
          <Link href={`/${lang}/services`} className="font-medium underline-offset-4 hover:text-primary">
            {t("accueil.carte.lien")}
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-12">
          {familles.map((f) => (
            <div key={f.titre} className="flex-[1_1_340px]">
              <h3
                className="m-0 border-b pb-4 font-display text-[27px] font-semibold leading-[1.6]"
                style={{ borderColor: "hsl(var(--foreground) / 0.2)" }}
              >
                {f.titre}
              </h3>
              <div className="flex flex-col">
                {f.soins.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${lang}/services/${s.slug}`}
                    className="flex justify-between gap-4 border-b border-border py-3.5 font-medium text-foreground no-underline transition-colors hover:text-primary"
                  >
                    <span>{s.nom}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* La maquette range la bande d'urgence dans cette section, sous la
            carte des soins : elle accompagne la liste, elle ne la coupe pas. */}
        <div className="mt-20">
          <BandeUrgence lang={lang} />
        </div>
      </div>
    </section>
  )
}
