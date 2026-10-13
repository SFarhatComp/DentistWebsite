import { HeroPage } from "@/components/v2/hero-page"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import { metaPage } from "@/lib/metadonnees"
import type { Locale } from "@/types"

interface Section {
  title: string
  body: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return metaPage(params.lang as Locale, "/confidentialite", { titre: t("confidentialite.title"), description: t("confidentialite.subtitle") })
}

export default async function ConfidentialitePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const sections = getTranslationObjectList<Section>(lang, "confidentialite.sections")

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={`[ ${t("confidentialite.label")} ]`}
        titre={t("confidentialite.title")}
        intro={t("confidentialite.subtitle")}
        hauteur={460}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <div className="max-w-[72ch]">
            <p className="m-0 border-l-2 border-primary bg-surface py-5 pl-6 pr-5 text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground/85">
              {t("confidentialite.intro")}
            </p>

            <div className="mt-12">
              {sections.map((s, i) => (
                <div key={s.title} className="border-t border-foreground/15 pt-8 first:border-t-0 first:pt-0 [&+&]:mt-10">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[22px] leading-none text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{s.title}</h2>
                  </div>
                  <p className="mt-3 text-foreground/85">{s.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-[15px] text-muted-foreground">{t("confidentialite.lastUpdated")}</p>
          </div>
        </div>
      </section>
    </>
  )
}
