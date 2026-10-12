import type { Metadata } from "next"
import Link from "next/link"
import { FormulaireUrgence } from "@/components/v2/formulaire-urgence"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { getAllServices } from "@/lib/content"
import * as Ic from "@/components/v2/icones"
import type { Locale } from "@/types"

interface Frais {
  libelle: string
  montant: string
}
interface QA {
  question: string
  answer: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("urgence.metaTitre") }, description: t("urgence.metaDescription") }
}

/** Icônes des sept motifs d'urgence, dans l'ordre de la maquette. */
const ICONES_MOTIFS = [Ic.Icone34, Ic.Icone35, Ic.Icone36, Ic.Icone37, Ic.Icone38, Ic.Icone39, Ic.Icone40]

/** Fiches citées en « services liés » au bas de la page. */
const LIEES = ["traitement-de-canal", "extraction", "protheses-completes-partielles"]

export default async function UrgencePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const motifs = getTranslationList(lang, "urgence.motifs")
  const fonctionne = getTranslationList(lang, "urgence.fonctionne")
  const frais = getTranslationObjectList<Frais>(lang, "urgence.frais")
  const appelerListe = getTranslationList(lang, "urgence.appelerListe")
  const faq = getTranslationObjectList<QA>(lang, "urgence.faq")
  const tous = getAllServices(lang)
  const liees = LIEES.map((s) => tous.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <>
      <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-hero text-white">
        <div className="relative mx-auto mb-0 mt-auto w-full max-w-page px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
          <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
            {t("urgence.surtitre")}
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
            {t("urgence.titre")}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-[1.6]">
            {t("urgence.chapeau1")}{" "}
            <a href={`tel:${t("contact.phoneTel")}`} className="font-medium text-white underline underline-offset-4">
              {t("contact.phoneDisplay")}
            </a>
            . {t("urgence.chapeau2")}
          </p>
          <a
            href={`tel:${t("contact.phoneTel")}`}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
          >
            {t("urgence.appeler")}
          </a>

          <p className="mt-12 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
            {t("urgence.motifsTitre")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {motifs.map((m, i) => {
              const Icone = ICONES_MOTIFS[i]
              return (
                <div
                  key={m}
                  className="flex min-w-[140px] flex-1 flex-col items-center justify-center gap-2.5 rounded-sm border px-3 py-5 text-center"
                  style={{ borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="flex text-primary-pale">{Icone && <Icone taille={40} />}</span>
                  <span className="text-[15px] leading-[1.35]">{m}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap gap-[72px] px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1_1_440px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("urgence.fonctionneTitre")}
            </h2>
            <ol className="m-0 mt-6 list-none border-t border-border p-0">
              {fonctionne.map((x, i) => (
                <li key={x} className="flex gap-5 border-b border-border py-5">
                  <span
                    className="w-14 shrink-0 font-display text-[40px] leading-none text-muted-foreground"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1">{x}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-[1_1_440px] flex-col gap-10">
            {/* Les frais sur fond prune : c'est l'information qu'un patient en
                urgence cherche en premier, elle ne doit pas se fondre. */}
            <div className="rounded-sm bg-foreground p-8 text-white">
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("urgence.fraisTitre")}</h2>
              <div className="mt-5">
                {frais.map((f, i) => (
                  <div
                    key={f.libelle}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      i < frais.length - 1 ? "border-b border-white/15" : ""
                    }`}
                  >
                    <span>{f.libelle}</span>
                    <span className="whitespace-nowrap font-display text-[26px]">{f.montant}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-white/85">{t("urgence.fraisNote")}</p>
            </div>

            <div>
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("urgence.appelerTitre")}</h2>
              <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
                {appelerListe.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="font-display text-muted-foreground">
                      [ ]
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-foreground/80">{t("urgence.appelerHeures")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lavender-soft">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-[72px]">
          <div className="max-w-[70ch] border-l-4 border-primary pl-6">
            <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">
              {t("urgence.horsHeuresTitre")}
            </h2>
            <p className="mt-3 text-[18px] leading-relaxed">{t("urgence.horsHeuresTexte")}</p>
          </div>
        </div>
      </section>

      <section id="formulaire-urgence" className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap gap-[72px] px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1.1_1_460px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("urgence.formTitre")}
            </h2>
            <p className="mt-3 text-foreground/80">{t("urgence.formIntro")}</p>
            <FormulaireUrgence lang={lang} />
          </div>

          <div className="flex-[0.9_1_320px]">
            <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("urgence.faqTitre")}</h2>
            <div className="mt-4">
              {faq.map((q) => (
                <details key={q.question} className="border-t border-border py-4">
                  <summary className="cursor-pointer list-none font-medium marker:hidden">{q.question}</summary>
                  <p className="mt-3 leading-relaxed text-foreground/80">{q.answer}</p>
                </details>
              ))}
            </div>

            <h2 className="m-0 mt-12 font-display text-[27px] font-semibold leading-[1.2]">{t("urgence.liesTitre")}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {liees.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${lang}/services/${r.slug}`}
                  className="font-medium underline-offset-4 hover:text-primary"
                >
                  {r.title} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
