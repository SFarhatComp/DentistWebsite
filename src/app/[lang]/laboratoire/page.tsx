import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { NumberedSection } from "@/components/shared/numbered-section"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations, getTranslationList } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return {
    title: t("laboratoire.metaTitle"),
    description: t("laboratoire.metaDescription"),
  }
}

// 4 piliers du laboratoire
const piliersLabKeys = ["1", "2", "3", "4"] as const

// Services offerts — 12 catégories (cahier §13.1)
const servicesLabKeys = [
  "orthodontie",
  "prosthodontie_amovible",
  "prosthodontie_fixe",
  "plaques_occlusales",
  "gouttieres",
  "waxup",
  "stratification",
  "documentation",
] as const

// Équipements (cahier §16A.2)
const equipementsKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const

// Fiche de traçabilité (cahier §16A.4)
const fichesTracabiliteKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"] as const

export default async function LaboratoirePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <>
      <PageHero
        label={t("laboratoire.heroLabel")}
        title={t("laboratoire.heroTitle")}
      />

      {/* Intro pour professionnels (cahier §12.4) */}
      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <FadeIn>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>{t("laboratoire.intro1")}</p>
                <p>{t("laboratoire.intro2")}</p>
                <p>{t("laboratoire.intro3")}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 2 chemins dès le top */}
      <section className="border-b border-border">
        <Container>
          <div className="py-12 md:py-16 grid gap-px bg-border md:grid-cols-2 border border-border">
            <FadeIn className="bg-background">
              <a
                href="#philosophie"
                className="block p-8 md:p-10 hover:bg-surface/40 transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-display text-2xl text-accent/70 tabular-nums">01</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                  {t("laboratoire.paths.patientTitle")}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("laboratoire.paths.patientBody")}
                </p>
              </a>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/partenaires`}
                className="block p-8 md:p-10 hover:bg-primary-hover transition-colors h-full group text-primary-foreground"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-display text-2xl text-accent/90 tabular-nums">02</span>
                  <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl mb-3">
                  {t("laboratoire.paths.proTitle")}
                </h2>
                <p className="text-base opacity-80 leading-relaxed mb-6">
                  {t("laboratoire.paths.proBody")}
                </p>
                <div className="space-y-1.5 text-sm opacity-75">
                  <div>{t("laboratoire.paths.proItem1")}</div>
                  <div>{t("laboratoire.paths.proItem2")}</div>
                  <div>{t("laboratoire.paths.proItem3")}</div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Philosophie — La technologie au service de la prédictibilité */}
      <section id="philosophie" className="py-20 md:py-24 scroll-mt-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl">
            <FadeIn>
              <SectionLabel>{t("laboratoire.philosophie.label")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                {t("laboratoire.philosophie.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("laboratoire.philosophie.body")}
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <PlaceholderImage aspect="video" label={t("laboratoire.philosophie.imageAlt")} />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Engagement de non-sollicitation */}
      {/* TODO juridique : faire valider cette formulation avant publication finale (cahier §12.5) */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>{t("laboratoire.engagement.label")}</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                {t("laboratoire.engagement.title")}
              </h2>
              <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                <p>{t("laboratoire.engagement.body1")}</p>
                <p>{t("laboratoire.engagement.body2")}</p>
                <p>{t("laboratoire.engagement.body3")}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 4 piliers du laboratoire */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>{t("laboratoire.piliers.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">{t("laboratoire.piliers.title")}</h2>
          </FadeIn>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border border-border">
            {piliersLabKeys.map((key, i) => (
              <FadeIn key={key} className="bg-background">
                <div className="p-8 md:p-10 h-full">
                  <div className="font-display text-3xl text-accent/40 mb-6">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight">{t(`laboratoire.piliers.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`laboratoire.piliers.${key}.body`)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Services offerts — 12 catégories */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>{t("laboratoire.services.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-4">
              {t("laboratoire.services.title")}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("laboratoire.services.intro")}
            </p>
          </FadeIn>

          <div className="space-y-10 max-w-4xl">
            {servicesLabKeys.map((code, i) => {
              const category = t(`laboratoire.services.${code}.category`)
              const items = getTranslationList(lang, `laboratoire.services.${code}.items`)
              return (
                <FadeIn key={code}>
                  <NumberedSection number={i + 1} label={t("laboratoire.services.categoryLabel")} title={category}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {items.map((item) => (
                        <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                          <span className="text-accent shrink-0 mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </NumberedSection>
                </FadeIn>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Équipements */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn className="max-w-2xl mb-12">
            <SectionLabel>{t("laboratoire.equipements.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">
              {t("laboratoire.equipements.title")}
            </h2>
          </FadeIn>

          <div className="max-w-4xl">
            <FadeIn>
              <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
                {equipementsKeys.map((key, i) => (
                  <div key={key} className="bg-background p-5 h-full">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-xs text-accent/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-sm md:text-base text-foreground">{t(`laboratoire.equipements.${key}.name`)}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-7">
                      {t(`laboratoire.equipements.${key}.role`)}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Contrôle qualité + Fiche de traçabilité */}
      <section className="py-20 md:py-24 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl mb-12">
            <FadeIn>
              <SectionLabel>{t("laboratoire.tracabilite.label")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
                {t("laboratoire.tracabilite.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t("laboratoire.tracabilite.intro1")}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("laboratoire.tracabilite.intro2")}
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="border border-border bg-background overflow-hidden max-w-4xl">
              {fichesTracabiliteKeys.map((key, i) => (
                <div
                  key={key}
                  className={`grid grid-cols-1 md:grid-cols-[14rem_1fr] ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="p-4 md:p-5 font-medium text-sm text-foreground bg-surface/40 flex items-center gap-3">
                    <span className="font-display text-xs text-accent/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(`laboratoire.tracabilite.${key}.item`)}
                  </div>
                  <div className="p-4 md:p-5 text-sm text-muted-foreground leading-relaxed border-t md:border-t-0 md:border-l border-border">
                    {t(`laboratoire.tracabilite.${key}.desc`)}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA professionnel — 3 boutons distincts */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-3xl mb-10">
            <div className="label-sm text-accent/80 mb-4">{t("laboratoire.cta.label")}</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("laboratoire.cta.title")}
            </h2>
            <p className="text-lg opacity-80 leading-relaxed">
              {t("laboratoire.cta.body")}
            </p>
          </FadeIn>

          <div className="grid gap-px bg-primary-foreground/10 md:grid-cols-3">
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/partenaires`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">01</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">{t("laboratoire.cta.partenaireTitle")}</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  {t("laboratoire.cta.partenaireBody")}
                </p>
              </Link>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/prescription`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">02</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">{t("laboratoire.cta.prescriptionTitle")}</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  {t("laboratoire.cta.prescriptionBody")}
                </p>
              </Link>
            </FadeIn>
            <FadeIn className="bg-primary">
              <Link
                href={`/${lang}/laboratoire/reference-clinique`}
                className="block p-6 md:p-8 hover:bg-primary-hover transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-display text-sm text-accent/90 tabular-nums">03</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2">{t("laboratoire.cta.referenceTitle")}</h3>
                <p className="text-sm opacity-75 leading-relaxed">
                  {t("laboratoire.cta.referenceBody")}
                </p>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
