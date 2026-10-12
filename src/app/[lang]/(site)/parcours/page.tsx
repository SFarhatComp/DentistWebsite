import type { Metadata } from "next"
import { HeroPage } from "@/components/v2/hero-page"
import { SchemaParcours } from "@/components/v2/schema-parcours"
import { GrilleFilets, CaseFilets } from "@/components/v2/grille-filets"
import { BandeCta } from "@/components/v2/bande-cta"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Detail {
  etiquette: string
  titre: string
  texte: string
}
interface Savoir {
  titre: string
  texte: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("parcours.metaTitre") }, description: t("parcours.metaDescription") }
}

export default async function ParcoursPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const detail = getTranslationObjectList<Detail>(lang, "parcours.detail")
  const savoir = getTranslationObjectList<Savoir>(lang, "parcours.savoir")

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={t("parcours.surtitre")}
        titre={t("parcours.titre")}
        intro={t("parcours.intro")}
        hauteur={680}
      />

      <section className="bg-plum-deep text-white">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-28">
          <h2 className="m-0 text-center font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("parcours.schema.titre")}
          </h2>
          <p className="mx-auto mt-4 max-w-[60ch] text-center text-white/85">{t("parcours.schema.intro")}</p>

          <SchemaParcours lang={lang} />

          {/* Le stade 0 tient toute la largeur : c'est le point d'entrée commun,
              les quatre autres se partagent la rangée suivante. */}
          <GrilleFilets ton="sombre" className="mt-14">
            {detail.map((d, i) => (
              <CaseFilets
                key={d.etiquette}
                pleineLargeur={i === 0}
                base={220}
                fond={i === 0 ? "bg-plum-mid" : "bg-plum-deep"}
                className={i === 0 ? "px-6 py-7 text-center" : ""}
              >
                <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
                  {d.etiquette}
                </p>
                <h3 className="mt-2 font-display text-[27px] font-semibold leading-[1.2]">{d.titre}</h3>
                <p className="mt-2.5 text-base text-white/85">{d.texte}</p>
              </CaseFilets>
            ))}
          </GrilleFilets>

          <p className="mt-8 max-w-[68ch] text-white/85">{t("parcours.note")}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("parcours.savoirTitre")}
          </h2>
          <GrilleFilets className="mt-10">
            {savoir.map((s) => (
              <CaseFilets key={s.titre}>
                <p className="m-0 font-display text-[26px] leading-[1.2]">{s.titre}</p>
                <p className="mt-2 text-foreground/80">{s.texte}</p>
              </CaseFilets>
            ))}
          </GrilleFilets>
          <p className="mt-8 max-w-[68ch] text-foreground/90">{t("parcours.savoirNote")}</p>
        </div>
      </section>

      <BandeCta lang={lang} titre={t("parcours.ctaTitre")} />
    </>
  )
}
