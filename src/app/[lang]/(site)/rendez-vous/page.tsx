import type { Metadata } from "next"
import { Suspense } from "react"
import { HeroPage } from "@/components/v2/hero-page"
import { PlanningGoogle } from "@/components/v2/planning-google"
import { FormulaireRappel } from "@/components/v2/formulaire-rappel"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Duree {
  motif: string
  duree: string
  enLigne: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("rdv.metaTitre") }, description: t("rdv.metaDescription") }
}

export default async function RendezVousPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const durees = getTranslationObjectList<Duree>(lang, "rdv.durees")
  const colonnes = getTranslationList(lang, "rdv.dureesColonnes")
  const heures = getTranslationList(lang, "rdv.heures")

  const tel = (
    <a href="tel:+15148637805" className="text-primary no-underline hover:underline">
      514 863-7805
    </a>
  )

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={t("rdv.surtitre")}
        titre={t("rdv.titre")}
        hauteur={600}
      />

      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap items-start gap-[72px] px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1.15_1_480px]">
            <p className="m-0 max-w-[68ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
              {t("rdv.introAvant")}
              {tel}
              {t("rdv.introApres")}
            </p>

            <h2 className="mt-12 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("rdv.horaireTitre")}
            </h2>
            <p className="mt-4 max-w-[68ch] text-foreground/85">{t("rdv.horaireTexte")}</p>

            <div className="mt-8">
              <PlanningGoogle lang={lang} />
            </div>
          </div>

          <div className="flex flex-[0.85_1_340px] flex-col gap-10">
            <div>
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("rdv.rappelTitre")}</h2>
              <p className="mt-3 text-foreground/85">{t("rdv.rappelTexte")}</p>
              <div className="mt-6">
                {/* useSearchParams exige une frontiere de suspense : sans elle,
                    toute la page bascule en rendu dynamique. */}
                <Suspense fallback={null}>
                  <FormulaireRappel lang={lang} />
                </Suspense>
              </div>
              <p className="mt-5 text-[15px] text-foreground/75">
                {t("rdv.urgenceAvant")}
                {tel}
                {t("rdv.urgenceApres")}
              </p>
            </div>

            <div className="border-t border-foreground/15 pt-6">
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("rdv.dureesTitre")}</h2>
              <table className="mt-5 w-full border-collapse text-left">
                <thead>
                  <tr>
                    {colonnes.map((c) => (
                      <th
                        key={c}
                        scope="col"
                        className="border-b border-foreground/25 pb-2 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {durees.map((d) => (
                    <tr key={d.motif}>
                      <td className="border-b border-foreground/[0.12] py-3 pr-4 align-top">{d.motif}</td>
                      <td className="whitespace-nowrap border-b border-foreground/[0.12] py-3 pr-4 align-top text-foreground/80">
                        {d.duree}
                      </td>
                      <td className="border-b border-foreground/[0.12] py-3 align-top text-foreground/80">
                        {d.enLigne}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[15px] text-foreground/75">
                {t("rdv.dureesNoteAvant")}
                {tel}
                {t("rdv.dureesNoteApres")}
              </p>
            </div>

            <div className="border-t border-foreground/15 pt-6 text-[15px] text-foreground/75">
              <p className="m-0">{t("rdv.adresse")}</p>
              {heures.map((h) => (
                <span key={h} className="mt-1 block">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
