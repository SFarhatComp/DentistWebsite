import type { Metadata } from "next"
import Link from "next/link"
import { HeroPage } from "@/components/v2/hero-page"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Question {
  q: string
  r: string
  lien?: { texte: string; vers: string }
}
interface Groupe {
  titre: string
  questions: Question[]
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("faqPage.metaTitre") }, description: t("faqPage.metaDescription") }
}

export default async function FaqPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const groupes = getTranslationObjectList<Groupe>(lang, "faqPage.groupes")
  const heures = getTranslationList(lang, "faqPage.carte.heures")

  /**
   * La réponse peut porter un lien, écrit « {lien} » dans le fichier de langue.
   * On coupe là et on insère l'ancre, plutôt que de laisser du HTML dans les
   * traductions — où il finirait par être échappé ou oublié à la relecture.
   */
  const reponse = (x: Question) => {
    if (!x.lien || !x.r.includes("{lien}")) return x.r
    const [avant, apres] = x.r.split("{lien}")
    return (
      <>
        {avant}
        <Link href={`/${lang}/${x.lien.vers}`} className="text-primary underline-offset-4 hover:underline">
          {x.lien.texte}
        </Link>
        {apres}
      </>
    )
  }

  return (
    <>
      <HeroPage lang={lang} surtitre={t("faqPage.surtitre")} titre={t("faqPage.titre")} hauteur={460} />

      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap items-start gap-[72px] px-[clamp(16px,5vw,56px)] py-24">
          {/* La colonne des questions prend toute la place disponible : le
              facteur 999 la fait passer avant la carte au moment du repli. */}
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
            <p className="m-0 max-w-[68ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
              {t("faqPage.introAvant")}
              <a href="tel:+15148637805" className="text-primary no-underline hover:underline">
                514 863-7805
              </a>
              {t("faqPage.introApres")}
            </p>

            {groupes.map((g) => (
              <div key={g.titre}>
                <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
                  {g.titre}
                </h2>
                <div className="mt-6 border-t border-foreground/15">
                  {g.questions.map((x) => (
                    <details key={x.q} className="border-b border-foreground/15">
                      <summary className="cursor-pointer py-5 text-lg font-medium">{x.q}</summary>
                      <p className="m-0 pb-6 pr-10 text-foreground/85">{reponse(x)}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="relative flex-[1_1_300px] overflow-hidden rounded-sm bg-plum-deep p-8 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/v2/couloir.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,17,31,0.7)_0%,rgba(27,17,31,0.82)_50%,hsl(var(--plum-deep))_100%)]"
            />
            <div className="relative">
              <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-lavender">
                {t("faqPage.carte.surtitre")}
              </p>
              <p className="mt-4 font-display text-[27px] font-semibold leading-[1.2]">{t("faqPage.carte.titre")}</p>
              <p className="mt-3 text-base text-white/85">{t("faqPage.carte.texte")}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/${lang}/rendez-vous`}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                >
                  {t("nav.cta")}
                </Link>
                <a
                  href="tel:+15148637805"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm px-[26px] text-base font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-colors hover:bg-white/10"
                >
                  514 863-7805
                </a>
              </div>

              <div aria-hidden="true" className="my-6 h-px bg-white/30" />
              <p className="m-0 text-[15px] text-white/80">{t("faqPage.carte.adresse")}</p>
              <p className="mt-1 text-[15px] text-white/80">
                {heures.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
