import type { Metadata } from "next"
import Link from "next/link"
import { HeroPage } from "@/components/v2/hero-page"
import { PiecesSection } from "@/components/v2/pieces-section"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Bloc {
  titre: string
  texte: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("apropos.metaTitre") }, description: t("apropos.metaDescription") }
}

export default async function AProposPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  // Le premier bloc tient toute la largeur et porte un filet plein ; les
  // suivants se partagent la ligne sous un filet effacé. C'est ce contraste de
  // filets, et non une différence de taille, qui met le dentiste en avant.
  const [dentiste, ...secondaires] = getTranslationObjectList<Bloc>(lang, "apropos.blocs")

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={t("apropos.surtitre")}
        titre={t("apropos.titre")}
        intro={t("apropos.intro")}
        image="/v2/facade-proche.webp"
        alt={t("apropos.altHero")}
        hauteur={680}
      />

      <PiecesSection lang={lang} />

      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap gap-x-16 gap-y-12 px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1_1_100%] border-t border-foreground pt-6">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {dentiste.titre}
            </h2>
            <p className="mt-4 max-w-[68ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
              {dentiste.texte}
            </p>
          </div>

          {secondaires.map((b) => (
            <div key={b.titre} className="flex-[1_1_340px] border-t border-foreground/15 pt-6">
              <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{b.titre}</h2>
              <p className="mt-3 text-foreground/85">{b.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto flex max-w-page flex-wrap items-end justify-between gap-10 px-[clamp(16px,5vw,56px)] py-28">
          <h2 className="m-0 font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
            {t("apropos.ctaTitre")}
          </h2>
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
              {t("apropos.ctaAppeler")}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
