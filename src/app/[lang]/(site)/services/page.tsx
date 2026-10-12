import type { Metadata } from "next"
import Link from "next/link"
import { BandeUrgence } from "@/components/v2/bande-urgence"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import * as Ic from "@/components/v2/icones"
import type { Locale } from "@/types"

interface Raccourci {
  nom: string
  slug: string
}
interface Soin {
  nom: string
  desc: string
  slug: string
}
interface Famille {
  num: string
  titre: string
  intro: string
  image?: string
  alt?: string
  habitudes?: string[]
  soins: Soin[]
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("servicesPage.metaTitre") }, description: t("servicesPage.metaDescription") }
}

/** Icônes de la rangée de raccourcis, dans l'ordre de la maquette. */
const ICONES_RACCOURCIS = [
  Ic.Icone13, Ic.Icone14, Ic.Icone15, Ic.Icone16, Ic.Icone17, Ic.Icone18,
  Ic.Icone19, Ic.Icone20, Ic.Icone21, Ic.Icone22, Ic.Icone23, Ic.Icone24,
]

/** Icônes des habitudes de prévention (famille 04). */
const ICONES_HABITUDES = [Ic.Icone25, Ic.Icone26, Ic.Icone27, Ic.Icone28, Ic.Icone29, Ic.Icone30]

export default async function ServicesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const raccourcis = getTranslationObjectList<Raccourci>(lang, "servicesPage.raccourcis")
  const familles = getTranslationObjectList<Famille>(lang, "servicesPage.familles")

  return (
    <>
      {/* Héros : titre, les deux paragraphes et la rangée de raccourcis vivent
          tous sur le fond sombre. La rangée déborde légèrement vers la droite
          (translateX), ce qui l'empêche de se lire comme une simple colonne. */}
      <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-hero text-white">
        <div className="relative mx-auto mb-0 mt-auto flex w-full max-w-page flex-wrap items-end justify-between gap-12 px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
              {t("servicesPage.surtitre")}
            </p>
            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("servicesPage.titre")}
            </h1>
            <div className="mt-7 flex max-w-[46ch] flex-col gap-[18px]">
              <p className="m-0 text-[clamp(17px,1.5vw,19px)] leading-[1.7] text-white/[0.88]">
                {t("servicesPage.intro1")}
              </p>
              <p className="m-0 text-[clamp(17px,1.5vw,19px)] leading-[1.7] text-white/[0.88]">
                {t("servicesPage.intro2")}
              </p>
            </div>
          </div>

          <div
            className="min-w-0 max-w-[620px] flex-[1_1_480px] pb-6"
            style={{ transform: "translateX(clamp(0px, 5vw, 72px))" }}
          >
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))" }}
            >
              {raccourcis.map((r, i) => {
                const Icone = ICONES_RACCOURCIS[i]
                return (
                  <Link
                    key={r.nom}
                    href={`/${lang}/services/${r.slug}`}
                    className="flex min-h-[120px] flex-col items-center justify-center gap-2.5 rounded-xl border border-white/[0.18] bg-white/[0.04] px-2 py-4 text-center text-white no-underline transition-colors hover:border-white/40 hover:bg-white/[0.08]"
                  >
                    <span className="flex text-surface-alt">{Icone && <Icone taille={40} />}</span>
                    <span className="text-sm leading-[1.3]">{r.nom}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Les cinq familles : une seule section, séparées par 80 px. */}
      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-col gap-20 px-[clamp(16px,5vw,56px)] py-24">
          {familles.map((f) => (
            <div key={f.num} className="flex flex-wrap items-start gap-14">
              <div className="min-w-0 flex-[0.8_1_340px]">
                <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                  {f.num}
                </p>
                <h2 className="mt-2.5 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
                  {f.titre}
                </h2>
                <p className="mt-4 max-w-[40ch] leading-[1.6] text-foreground/80">{f.intro}</p>

                {f.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.image}
                    alt={f.alt ?? ""}
                    loading="lazy"
                    className="mt-8 block aspect-[4/3] w-full rounded-[2px] object-cover"
                  />
                )}

                {f.habitudes && (
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                    {f.habitudes.map((h, k) => {
                      const Icone = ICONES_HABITUDES[k]
                      return (
                        <span key={h} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                          {Icone && <Icone taille={24} />}
                          {h}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              <div
                className="min-w-0 flex-[1.2_1_460px] border-t"
                style={{ borderColor: "hsl(var(--foreground) / 0.2)" }}
              >
                {f.soins.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${lang}/services/${s.slug}`}
                    className="flex justify-between gap-6 border-b border-border py-4 text-foreground no-underline transition-colors hover:text-primary"
                  >
                    <span>
                      <strong className="block font-medium">{s.nom}</strong>
                      <span className="text-base text-foreground/75">{s.desc}</span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Dernier élément de la colonne, à 80 px des familles comme le reste. */}
          <BandeUrgence lang={lang} />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <h2 className="m-0 font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
              {t("servicesPage.ctaTitre1")}
              <br />
              {t("servicesPage.ctaTitre2")}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
              >
                {t("nav.cta")}
              </Link>
              <a
                href={`tel:${t("contact.phoneTel")}`}
                className="inline-flex min-h-12 items-center justify-center rounded-sm px-[26px] text-base font-medium text-foreground no-underline shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.3)] transition-colors hover:text-primary"
              >
                {t("servicesPage.ctaAppeler")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
