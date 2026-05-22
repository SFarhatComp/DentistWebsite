import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations, getTranslationObjectList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("ressources.metaTitle"),
    description: t("ressources.metaDescription"),
  }
}

type HubLinkLabel = { title: string; body: string }

const ESSENTIELLES_HREFS = [
  "nouveaux-patients",
  "premiere-visite",
  "assurances-paiements",
  "questions-frequentes",
  "confidentialite",
  "urgence",
]

const PRO_HREFS = ["laboratoire/professionnels", "laboratoire/prescription"]

export default function RessourcesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const essentielles = getTranslationObjectList<HubLinkLabel>(lang, "ressources.essentielles")
  const professionnels = getTranslationObjectList<HubLinkLabel>(lang, "ressources.professionnels")

  return (
    <>
      <PageHero
        label={t("ressources.label")}
        title={t("ressources.title")}
        subtitle={t("ressources.subtitle")}
      />

      <section className="py-20 md:py-24">
        <Container>
          <FadeIn>
            <SectionLabel>{t("ressources.patientsLabel")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl">
              {t("ressources.patientsTitle")}
            </h2>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {essentielles.map((link, i) => (
              <FadeIn key={link.title} className="bg-background">
                <Link href={`/${lang}/${ESSENTIELLES_HREFS[i]}`} className="block p-8 hover:bg-surface/40 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-xl text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{link.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{link.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>{t("ressources.readCta")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24 border-t border-border bg-surface/40">
        <Container>
          <FadeIn>
            <SectionLabel>{t("ressources.proLabel")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl">
              {t("ressources.proTitle")}
            </h2>
          </FadeIn>

          <div className="grid gap-px bg-border md:grid-cols-2 border border-border max-w-4xl">
            {professionnels.map((link, i) => (
              <FadeIn key={link.title} className="bg-background">
                <Link href={`/${lang}/${PRO_HREFS[i]}`} className="block p-8 hover:bg-surface/30 transition-colors h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-xl text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{link.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{link.body}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary group">
                    <span>{t("ressources.accessCta")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
