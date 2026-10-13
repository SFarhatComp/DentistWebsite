import type { Metadata } from "next"
import { GrilleFilets, CaseFilets } from "@/components/v2/grille-filets"
import { BandeCta } from "@/components/v2/bande-cta"
import * as Ic from "@/components/v2/icones"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Change {
  titre: string
  texte: string
}
interface Item {
  texte: string
  sous?: string[]
}
interface Famille {
  famille: string
  items: Item[]
}
interface Equip {
  role: string
  nom: string
}
interface Photo {
  num: string
  texte: string
}

/** Les sept pièces annoncées dans le héros, dans l'ordre de la maquette. */
const PIECES = [Ic.Icone21, Ic.Icone19, Ic.Icone20, Ic.Icone41, Ic.Icone42, Ic.Icone22, Ic.Icone23]
/** Les cinq postes de l'atelier. */
const EQUIP = [Ic.Icone43, Ic.Icone44, Ic.Icone45, Ic.Icone46, Ic.Icone47]
const PHOTOS = ["/v2/conception.webp", "/v2/impression-3d.webp", "/v2/atelier.webp"]

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("atelier.metaTitre") }, description: t("atelier.metaDescription") }
}

export default async function AtelierPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const pieces = getTranslationList(lang, "atelier.pieces")
  const change = getTranslationObjectList<Change>(lang, "atelier.change")
  const fabrique = getTranslationObjectList<Famille>(lang, "atelier.fabrique")
  const equipement = getTranslationObjectList<Equip>(lang, "atelier.equipement")
  const photos = getTranslationObjectList<Photo>(lang, "atelier.photos")

  return (
    <>
      {/* Héros propre à cette page : il porte la grille des sept pièces et une
          photo légendée, que le héros commun ne sait pas rendre. */}
      <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-hero text-white">
        <div className="relative mx-auto mb-0 mt-auto flex w-full max-w-page flex-wrap items-end justify-between gap-12 px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
              {t("atelier.surtitre")}
            </p>
            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("atelier.titre")}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">
              {t("atelier.intro")}
            </p>

            <ul className="mt-9 grid max-w-[640px] list-none grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-3 gap-y-4 p-0">
              {pieces.map((nom, i) => {
                const Icone = PIECES[i]
                return (
                  <li key={nom} className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-lavender/60 text-surface-alt">
                      {Icone ? <Icone /> : null}
                    </span>
                    <span className="text-[13px] leading-[1.3] text-white/[0.88]">{nom}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <figure className="relative m-0 mb-4 mr-4 w-full max-w-[400px] flex-[0_1_400px]">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2px] border border-primary"
            />
            <div className="relative rounded-[2px] bg-plum-mid p-3 shadow-[inset_0_0_0_1px_hsl(var(--lavender)/0.55),0_24px_48px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/v2/planification.webp"
                alt={t("atelier.altHero")}
                className="block aspect-[4/5] w-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
              />
            </div>
            <figcaption className="mt-7 text-sm text-white/80">{t("atelier.legendeHero")}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("atelier.changeTitre")}
          </h2>
          <p className="mt-4 max-w-[68ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
            {t("atelier.changeIntro")}
          </p>
          <GrilleFilets className="mt-10">
            {change.map((c) => (
              <CaseFilets key={c.titre} base={300} className="p-9">
                <h3 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{c.titre}</h3>
                <p className="mt-3 text-foreground/85">{c.texte}</p>
              </CaseFilets>
            ))}
          </GrilleFilets>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <div className="max-w-[72ch]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("atelier.fabriqueTitre")}
            </h2>
            <p className="mt-4 text-foreground/85">{t("atelier.fabriqueIntro")}</p>

            {fabrique.map((f) => (
              <div key={f.famille} className="mt-7">
                <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                  {f.famille}
                </p>
                <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
                  {f.items.map((it) => (
                    <li key={it.texte} className="flex gap-3">
                      <span aria-hidden="true" className="font-display text-muted-foreground">
                        [ ]
                      </span>
                      <span>
                        {it.texte}
                        {it.sous && (
                          <ul className="m-0 mt-1.5 flex list-none flex-col gap-1 p-0 pl-[18px]">
                            {it.sous.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-10 border-t border-foreground/15 pt-6">
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">
                {t("atelier.equipementTitre")}
              </h2>
              <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-px overflow-hidden rounded-sm bg-foreground/15">
                {equipement.map((e, i) => {
                  const Icone = EQUIP[i]
                  return (
                    <div key={e.nom} className="flex items-center gap-3.5 bg-background p-4">
                      <span className="flex shrink-0 text-foreground">{Icone ? <Icone /> : null}</span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{e.role}</span>
                        <span className="font-display text-[22px] leading-[1.1]">{e.nom}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{t("atelier.equipementNote")}</p>
            </div>

            <div className="mt-10 border-t border-foreground/15 pt-6">
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("atelier.equipeTitre")}</h2>
              <p className="mt-3 text-foreground/85">{t("atelier.equipeTexte")}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Les trois photos ont leur propre section : la maquette les sort de la
          colonne de texte pour qu'elles puissent respirer sur toute la largeur. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] pb-6 pt-24">
          <p className="m-0 max-w-[68ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
            {t("atelier.photosIntro")}
          </p>
        </div>
        <ul className="mx-auto flex max-w-page list-none gap-6 overflow-x-auto px-[clamp(16px,5vw,56px)] pb-24 pt-4">
          {photos.map((p, i) => (
            <li key={p.num} className="flex-[0_0_340px]">
              <figure className="m-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS[i]}
                  alt={p.texte}
                  loading="lazy"
                  className="block aspect-[3/4] w-full rounded-[2px] object-cover"
                />
                <figcaption className="mt-4 flex gap-4">
                  <span className="font-display text-[22px] leading-none text-muted-foreground">{p.num}</span>
                  <span className="text-base text-foreground/75">{p.texte}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <BandeCta lang={lang} titre={t("atelier.ctaTitre")} />
    </>
  )
}
