import type { Metadata } from "next"
import Link from "next/link"
import { HeroPage } from "@/components/v2/hero-page"
import { Section, TitreSection } from "@/components/v2/section"
import { CartesNumerotees, type CarteNumerotee } from "@/components/v2/cartes-numerotees"
import * as Ic from "@/components/v2/icones"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { metaPage } from "@/lib/metadonnees"
import type { Locale } from "@/types"

interface Etape {
  num: string
  titre: string
  texte: string
}
interface Repere {
  num: string
  texte: string
}
interface Bloc {
  titre: string
  texte: string
}

/** Les six repères illustrés de l'examen, dans l'ordre de la maquette. */
const REPERES = [Ic.Icone02, Ic.Icone03, Ic.Icone04, Ic.Icone05, Ic.Icone06, Ic.Icone07]

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return metaPage(params.lang as Locale, "/premiere-visite", { titre: t("visite.metaTitre"), description: t("visite.metaDescription") })
}

/** Liste à puces terracotta, reprise dans « Quoi apporter » et « Annulation ». */
function ListePuces({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((x) => (
        <li key={x} className="flex gap-2.5 leading-relaxed text-foreground/85">
          <span aria-hidden="true" className="shrink-0 text-primary">
            —
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function PremiereVisitePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const troisTemps = getTranslationObjectList<CarteNumerotee>(lang, "visite.troisTemps")
  const commencer = getTranslationObjectList<CarteNumerotee>(lang, "visite.commencer")
  const examen = getTranslationObjectList<Etape>(lang, "visite.examen")
  const reperes = getTranslationObjectList<Repere>(lang, "visite.reperes")
  const savoir = getTranslationObjectList<Bloc>(lang, "visite.savoir")

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={t("visite.surtitre")}
        titre={t("visite.titre")}
        intro={t("visite.intro")}
        image="/v2/bureau.webp"
        alt={t("visite.altHero")}
        cta={t("nav.cta")}
        hauteur={700}
      />

      <Section fond="ivoire">
        <TitreSection>{t("visite.troisTempsTitre")}</TitreSection>
        <CartesNumerotees cartes={troisTemps} tete="chiffre" base={280} />
      </Section>

      <Section>
        <TitreSection>{t("visite.commencerTitre")}</TitreSection>
        <p className="mt-4 max-w-[60ch] text-[19px] leading-[1.6] text-foreground/80">
          {t("visite.commencerIntro")}
        </p>
        {/* Ici la tête de carte porte une durée, pas un numéro d'étape. */}
        <CartesNumerotees cartes={commencer} tete="etiquette" base={300} />
      </Section>

      {/* Les six temps de l'examen. La maquette met le détail à gauche et, à
          droite, une grille de six repères illustrés : on peut saisir le
          déroulé d'un coup d'œil sans lire les six paragraphes. */}
      <section className="bg-surface">
        <div className="mx-auto flex max-w-page flex-wrap items-start gap-16 px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1.2_1_460px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("visite.examenTitre")}
            </h2>
            <ol className="m-0 mt-10 grid list-none gap-x-10 gap-y-7 p-0">
              {examen.map((e) => (
                <li key={e.num} className="grid grid-cols-[44px_1fr] gap-4 border-t border-border pt-5">
                  <span className="font-display text-[22px] leading-none text-primary" aria-hidden="true">
                    {e.num}
                  </span>
                  <span>
                    <span className="block font-medium">{e.titre}</span>
                    <span className="mt-1.5 block leading-relaxed text-foreground/80">{e.texte}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="m-0 grid flex-[0.8_1_340px] list-none grid-cols-2 gap-px self-center overflow-hidden rounded-sm bg-foreground/15 p-0">
            {reperes.map((r, i) => {
              const Icone = REPERES[i]
              return (
                <li key={r.num} className="flex flex-col gap-3.5 bg-surface px-5 py-6">
                  <span className="flex items-start justify-between text-muted-foreground">
                    {Icone ? <Icone /> : <span />}
                    <span className="font-display text-[22px] leading-none">{r.num}</span>
                  </span>
                  <span className="font-medium leading-[1.35]">{r.texte}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* « Quoi apporter » : deux blocs prune à texte blanc. Ce renversement de
          contraste isole la seule section de la page qui demande une action
          avant la visite. */}
      <Section>
        <TitreSection>{t("visite.apporterTitre")}</TitreSection>
        <div className="mt-10 flex flex-wrap gap-10">
          <div className="flex-[1_1_380px] rounded-sm bg-foreground p-9 text-white">
            <h3 className="m-0 font-sans text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
              {t("visite.apporterMinimumTitre")}
            </h3>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {getTranslationList(lang, "visite.apporterMinimum").map((x) => (
                <li key={x} className="flex gap-2.5 leading-relaxed text-white/90">
                  <span aria-hidden="true" className="shrink-0 text-primary-pale">
                    —
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-[1_1_380px] rounded-sm bg-foreground p-9 text-white">
            <h3 className="m-0 font-sans text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
              {t("visite.apporterIdealementTitre")}
            </h3>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {getTranslationList(lang, "visite.apporterIdealement").map((x) => (
                <li key={x} className="flex gap-2.5 leading-relaxed text-white/90">
                  <span aria-hidden="true" className="shrink-0 text-primary-pale">
                    ☐
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-white/70">{t("visite.apporterNote")}</p>
          </div>
        </div>
      </Section>

      <Section fond="lavande">
        <TitreSection>{t("visite.couvertureTitre")}</TitreSection>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <p className="leading-relaxed">
            {t("visite.couvertureRcsd")}{" "}
            <a
              href={t("liensExternes.rcsd")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-hover underline-offset-4"
            >
              {t("visite.couvertureRcsdLien")}
            </a>
            .
          </p>
          <p className="leading-relaxed">
            {t("visite.couvertureRamq")}{" "}
            <a
              href={t("liensExternes.ramq")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-hover underline-offset-4"
            >
              {t("visite.couvertureRamqLien")}
            </a>
            .
          </p>
          <p className="leading-relaxed">{t("visite.couverturePrivees")}</p>
          <p className="leading-relaxed">{t("visite.couverturePaiement")}</p>
          <p className="leading-relaxed md:col-span-2">{t("visite.couvertureFinancement")}</p>
        </div>
        <p className="mt-6 font-display text-[24px] leading-[1.3]">{t("visite.couvertureNote")}</p>
      </Section>

      <Section>
        <TitreSection>{t("visite.savoirTitre")}</TitreSection>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {savoir.map((b) => (
            <div key={b.titre} className="border-t border-border pt-5">
              <h3 className="font-medium">{b.titre}</h3>
              <p className="mt-2 leading-relaxed text-foreground/80">{b.texte}</p>
            </div>
          ))}
          <div className="border-t border-border pt-5">
            <h3 className="font-medium">{t("visite.annulationTitre")}</h3>
            <div className="mt-3">
              <ListePuces items={getTranslationList(lang, "visite.annulation")} />
            </div>
          </div>
        </div>
      </Section>

      <Section fond="prune">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <TitreSection className="max-w-[20ch]">{t("visite.ctaTitre")}</TitreSection>
          <p className="m-0 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lang}/rendez-vous`}
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
            >
              {t("nav.cta")}
            </Link>
            <span className="text-white/70">{t("visite.ctaOu")}</span>
            <a href={`tel:${t("contact.phoneTel")}`} className="font-display text-[28px] text-white no-underline">
              {t("contact.phoneDisplay")}
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}
