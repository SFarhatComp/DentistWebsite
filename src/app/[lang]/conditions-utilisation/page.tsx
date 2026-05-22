import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return { title: t("conditions.metaTitle") }
}

type Section = { title: string; body: string }

export default async function TermsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const sections = getTranslationObjectList<Section>(lang, "conditions.sections")
  return (
    <>
      <PageHero
        label={t("conditions.label")}
        title={t("conditions.title")}
        subtitle={t("conditions.subtitle")}
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
