import type { Metadata } from "next"
import Link from "next/link"
import { GrilleFilets, CaseFilets } from "@/components/v2/grille-filets"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { i18n } from "@/lib/i18n-config"
import type { Locale } from "@/types"

interface Question {
  q: string
  r: string
}

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("nouveauPatient.metaTitre") }, description: t("nouveauPatient.metaDescription") }
}

/* --------------------------------------------------------------------------
 * Page d'annonce (Google Ads).
 *
 * Hors du groupe (site) : pas de menu, pas de pied de page complet. Une page
 * d'annonce n'offre qu'une porte — réserver ou appeler — et chaque lien de
 * sortie supplémentaire coûte des visiteurs qui ont été payés pour venir.
 *
 * Les deux prix sont volontairement de la même taille (44 px), comme l'exige
 * l'article 3.09.07 du Code de déontologie des dentistes : un prix barré en
 * petit à côté d'un prix d'appel en gros serait une annonce trompeuse. Qui
 * modifiera cette page doit garder cette égalité.
 * ----------------------------------------------------------------------- */

export default async function NouveauPatientPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const atouts = getTranslationList(lang, "nouveauPatient.atouts")
  const comprend = getTranslationList(lang, "nouveauPatient.comprend")
  const heures = getTranslationList(lang, "nouveauPatient.heures")
  const faq = getTranslationObjectList<Question>(lang, "nouveauPatient.faq")

  const prix = "m-0 mt-2 font-display text-[44px] leading-none"

  return (
    <div className="relative bg-background">
      {/* En-tête réduit : le logo ramène à l'accueil, le numéro appelle. Rien
          d'autre — c'est ce que demande la maquette pour cette page. */}
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex h-[84px] max-w-page items-center justify-between gap-4 px-[clamp(16px,5vw,56px)]">
          <Link href={`/${lang}`} aria-label={t("site.name")} className="flex shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v2/logo.svg" alt={t("site.name")} className="block h-[50px] w-auto" />
          </Link>
          <a
            href="tel:+15148637805"
            className="rounded-sm bg-primary px-3 py-1.5 font-medium text-primary-foreground no-underline"
          >
            514 863-7805
          </a>
        </div>
      </header>

      <section className="relative flex min-h-[820px] flex-col overflow-hidden bg-hero text-white">
        <div className="relative mx-auto mb-0 mt-auto flex w-full max-w-page flex-wrap items-end justify-between gap-12 px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
          <div className="min-w-0 flex-[1_1_520px]">
            <h1 className="m-0 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("nouveauPatient.titre")}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">
              {t("nouveauPatient.intro")}
            </p>

            <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {atouts.map((a) => (
                <li key={a} className="flex gap-2.5 text-white/[0.88]">
                  <span aria-hidden="true" className="text-primary">
                    —
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
              >
                {t("nouveauPatient.ctaPrincipal")}
              </Link>
              <a
                href="tel:+15148637805"
                className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm px-[26px] text-base font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-colors hover:bg-white/10"
              >
                514 863-7805
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("nouveauPatient.offreTitre")}
          </h2>

          {/* Les deux prix, de taille égale. Voir la note en tête de fichier. */}
          <GrilleFilets className="mt-8 max-w-[560px]">
            <CaseFilets base={200} fond="bg-background" className="p-5">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {t("nouveauPatient.prixRegulierEtiquette")}
              </p>
              <p className={prix}>{t("nouveauPatient.prixRegulier")}</p>
            </CaseFilets>
            <CaseFilets base={200} fond="bg-background" className="p-5">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {t("nouveauPatient.prixOuvertureEtiquette")}
              </p>
              <p className={prix}>{t("nouveauPatient.prixOuverture")}</p>
            </CaseFilets>
          </GrilleFilets>

          <p className="mt-5 text-base text-foreground/80">{t("nouveauPatient.offreCondition")}</p>

          <div className="mt-10 flex flex-wrap gap-12">
            <div className="flex-[1_1_320px]">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {t("nouveauPatient.comprendTitre")}
              </p>
              <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
                {comprend.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span aria-hidden="true" className="shrink-0 text-primary">
                      —
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-foreground/75">{t("nouveauPatient.comprendNote")}</p>
              <p className="mt-2 text-[15px] text-foreground/75">{t("nouveauPatient.comprendPlus")}</p>
            </div>

            <div className="flex-[1_1_280px]">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                {t("nouveauPatient.comprendPasTitre")}
              </p>
              <p className="mt-3 text-foreground/85">{t("nouveauPatient.comprendPas")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-plum-dark text-white">
        <div className="mx-auto flex max-w-page flex-wrap gap-12 px-[clamp(16px,5vw,56px)] py-20">
          <div className="flex-[1_1_300px]">
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
              {t("nouveauPatient.pratiqueTitre")}
            </p>
            <p className="mt-4 text-white/85">{t("nouveauPatient.adresse")}</p>
            {heures.map((h) => (
              <span key={h} className="mt-1 block text-white/85">
                {h}
              </span>
            ))}
            <p className="mt-4 text-white/85">{t("nouveauPatient.couvertures")}</p>
          </div>

          <div className="flex-[1.4_1_380px]">
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
              {t("nouveauPatient.faqTitre")}
            </p>
            <div className="mt-4 border-t border-white/20">
              {faq.map((x) => (
                <details key={x.q} className="border-b border-white/20">
                  <summary className="cursor-pointer py-4 font-medium">{x.q}</summary>
                  <p className="m-0 pb-5 pr-6 text-white/85">{x.r}</p>
                </details>
              ))}
            </div>
            <Link
              href={`/${lang}/faq`}
              className="mt-5 inline-block text-lavender underline-offset-4 hover:text-white hover:underline"
            >
              {t("nouveauPatient.faqLien")}
            </Link>
          </div>
        </div>
      </section>

      {/* Pied de page réduit : les mentions obligatoires, rien de plus. */}
      <footer className="bg-plum-deep text-white/85">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-12">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <Link href={`/${lang}/confidentialite`} className="text-white/90 no-underline hover:text-white">
              {t("nouveauPatient.piedConfidentialite")}
            </Link>
            <Link href={`/${lang}/conditions-utilisation`} className="text-white/90 no-underline hover:text-white">
              {t("nouveauPatient.piedConditions")}
            </Link>
            <Link href={`/${lang}/contact#accessibilite`} className="text-white/90 no-underline hover:text-white">
              {t("nouveauPatient.piedAccessibilite")}
            </Link>
          </div>
          <p className="mt-6 text-[15px]">{t("nouveauPatient.piedMentions")}</p>
          <p className="mt-2 text-sm text-white/70">{t("nouveauPatient.piedResponsable")}</p>
          <p className="mt-2 text-sm text-white/70">{t("nouveauPatient.piedAvis")}</p>
        </div>
      </footer>
    </div>
  )
}
