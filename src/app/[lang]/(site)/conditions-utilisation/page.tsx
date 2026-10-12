import { HeroPage } from "@/components/v2/hero-page"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

interface Section {
  title: string
  body: string
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("conditions.title") }, description: t("conditions.subtitle") }
}

export default async function ConditionsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const sections = getTranslationObjectList<Section>(lang, "conditions.sections")

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={`[ ${t("conditions.label")} ]`}
        titre={t("conditions.title")}
        intro={t("conditions.subtitle")}
        hauteur={460}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <div className="max-w-[72ch]">
            {sections.map((s) => (
              <div key={s.title} className="border-t border-foreground/15 pt-8 first:border-t-0 first:pt-0 [&+&]:mt-10">
                <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{s.title}</h2>
                <p className="mt-3 text-foreground/85">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
