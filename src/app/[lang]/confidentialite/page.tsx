import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("confidentialite.metaTitle"),
    description: t("confidentialite.metaDescription"),
  }
}

type Section = { title: string; body: string }

export default async function ConfidentialitePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const sections = getTranslationObjectList<Section>(lang, "confidentialite.sections")
  return (
    <>
      <PageHero
        label={t("confidentialite.label")}
        title={t("confidentialite.title")}
        subtitle={t("confidentialite.subtitle")}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="bg-surface/60 border border-border p-6 md:p-8 mb-12">
                <p className="text-base text-foreground leading-relaxed italic">
                  {t("confidentialite.intro")}
                </p>
              </div>
            </FadeIn>

            <div className="space-y-10">
              {sections.map((s, i) => (
                <FadeIn key={s.title}>
                  <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-display text-sm text-accent/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-xl md:text-2xl text-foreground">{s.title}</h2>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <p className="mt-12 text-sm text-muted-foreground italic">
                {t("confidentialite.lastUpdated")}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
