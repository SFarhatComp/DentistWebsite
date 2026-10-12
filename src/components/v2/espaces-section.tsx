import Link from "next/link"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Espace {
  num: string
  nom: string
  texte: string
  alt: string
  alt2?: string
}

/**
 * « Un studio en trois espaces ».
 *
 * Trois colonnes décalées en escalier (0, 64, 112 px de retrait) : la maquette
 * évite ainsi l'alignement en rangée, qui ferait catalogue. Les salles de soins
 * sont la seule colonne à deux photos, empilées.
 *
 * Les cadres sont tenus par deux filets lavande verticaux, sans bordure haute
 * ni basse — c'est ce qui donne l'impression de planches suspendues.
 */
export function EspacesSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const espaces = getTranslationObjectList<Espace>(lang, "accueil.espaces.liste")
  // Seule la colonne du milieu descend, de 64 px : c'est ce léger décrochage qui
  // casse l'alignement en rangée sans donner un escalier.
  const decalages = ["mt-0", "mt-0 md:mt-16", "mt-0"]

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
              {t("accueil.espaces.surtitre")}
            </p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("accueil.espaces.titre")}
            </h2>
          </div>
          <Link href={`/${lang}/a-propos`} className="font-medium underline-offset-4 hover:text-primary">
            {t("accueil.espaces.lien")}
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-start gap-8">
          {espaces.map((e, i) => (
            <figure key={e.num} className={`m-0 flex-[1_1_280px] ${decalages[i] ?? "mt-0"}`}>
              <div className="border-x-[1.5px] border-lavender p-2.5">
                {e.alt2 ? (
                  <div className="grid gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/v2/salle-soins-1.webp"
                      alt={e.alt}
                      loading="lazy"
                      className="block aspect-[8/5] w-full object-cover"
                      style={{ objectPosition: "50% 60%" }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/v2/salle-soins-2.webp"
                      alt={e.alt2}
                      loading="lazy"
                      className="block aspect-[8/5] w-full object-cover"
                      style={{ objectPosition: "60% 60%" }}
                    />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={i === 0 ? "/v2/bureau.webp" : "/v2/atelier.webp"}
                    alt={e.alt}
                    loading="lazy"
                    className="block aspect-[4/5] w-full object-cover"
                  />
                )}
              </div>
              <figcaption className="mt-6 leading-relaxed">
                <span className="font-display text-[22px] text-muted-foreground">{e.num}</span>{" "}
                <strong className="font-medium">{e.nom}</strong>{" "}
                <span className="text-foreground/80">{e.texte}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
