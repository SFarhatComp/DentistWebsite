import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Bloc {
  title: string
  body: string
}

interface Equipement {
  categorie: string
  materiel: string
  benefice: string
}

export function LaboratoireSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const blocs = getTranslationObjectList<Bloc>(lang, "home.laboratoireSection.blocs")
  const plateau = getTranslationObjectList<Equipement>(lang, "home.laboratoireSection.plateau")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <SectionLabel>{t("home.laboratoireSection.label")}</SectionLabel>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem] max-w-[24ch]">
            {t("home.laboratoireSection.title")}
          </h2>
          <p className="mt-5 max-w-[68ch] text-[17px] leading-[1.6] text-muted-foreground">
            {t("home.laboratoireSection.intro")}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          <div>
            {blocs.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.06}>
                <div className="border-t border-border py-7 first:border-t-0 first:pt-0">
                  <h3 className="font-display text-xl leading-[1.18] tracking-[-0.01em]">{b.title}</h3>
                  <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{b.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn direction="right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/salle-1.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full object-cover opacity-[0.86]"
              style={{ aspectRatio: "3 / 4" }}
            />
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-16">
            <SectionLabel>{t("home.laboratoireSection.plateauLabel")}</SectionLabel>
            <div className="mt-6 grid gap-[1px] bg-border sm:grid-cols-2 lg:grid-cols-3">
              {plateau.map((e) => (
                <div key={e.materiel} className="bg-background px-6 py-7">
                  <div className="text-[11px] tracking-[0.18em] text-accent">{e.categorie}</div>
                  <div className="mt-3 font-display text-[17px] leading-[1.2]">{e.materiel}</div>
                  <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{e.benefice}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mt-12 max-w-[64ch] font-display text-xl leading-[1.3] text-primary md:text-2xl">
            {t("home.laboratoireSection.cloture")}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
