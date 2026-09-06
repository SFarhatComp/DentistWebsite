import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslationList, getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/** Flèche de liaison entre deux niveaux du diagramme. Purement décorative. */
function Fleche() {
  return (
    <div
      className="py-2 text-center text-lg leading-none"
      aria-hidden="true"
      style={{ color: "hsl(var(--foreground) / .55)" }}
    >
      ↓
    </div>
  )
}

function Stade({
  label,
  title,
  labelColor,
  className,
  style,
  dense = false,
  children,
}: {
  label: string
  title: string
  labelColor?: string
  className?: string
  style?: React.CSSProperties
  /** Stade posé côte à côte avec un autre : resserré tant que la place manque. */
  dense?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={`rounded-xl text-center ${dense ? "px-3 py-5 sm:px-6 sm:py-6" : "px-6 py-6"} ${className ?? ""}`}
      style={style}
    >
      <div
        className={`tracking-[0.18em] ${dense ? "text-[10px] sm:text-[11px]" : "text-[11px]"}`}
        style={labelColor ? { color: labelColor } : undefined}
      >
        {label}
      </div>
      <div
        className={`mt-2 font-display leading-[1.15] ${
          dense ? "text-base sm:text-xl md:text-2xl" : "text-xl md:text-2xl"
        }`}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

interface Checkpoint {
  q: string
  d: string
}
interface OptionSoin {
  code: string
  titre: string
  note: string
  d: string
}

/**
 * @param detaille Ajoute les checkpoints et la présentation des options, tirés
 *   du document *Parcours [de facto]*. Réservé à la page dédiée : sur l'accueil,
 *   ces deux blocs alourdiraient une page déjà longue.
 */
export function ParcoursSection({ lang, detaille = false }: { lang: Locale; detaille?: boolean }) {
  const t = getTranslations(lang)
  const points = getTranslationList(lang, "home.parcoursSection.pasLigneDroitePoints")
  const checkpoints = getTranslationObjectList<Checkpoint>(lang, "home.parcoursSection.checkpoints")
  const options = getTranslationObjectList<OptionSoin>(lang, "home.parcoursSection.options")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <SectionLabel>{t("home.parcoursSection.label")}</SectionLabel>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
            {t("home.parcoursSection.title")}
          </h2>
          <p className="mt-5 max-w-[68ch] text-[17px] leading-[1.6] text-muted-foreground">
            {t("home.parcoursSection.intro")}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mx-auto mt-12 max-w-3xl rounded-[14px] border border-border p-6 md:p-10">
            {/* Entrée dans le parcours */}
            <div className="flex justify-center">
              <span className="rounded-full bg-accent px-[30px] py-[14px] text-[15px] font-semibold text-accent-foreground">
                {t("home.parcoursSection.entree")}
              </span>
            </div>
            <Fleche />

            <Stade
              label={t("home.parcoursSection.s0Label")}
              title={t("home.parcoursSection.s0Title")}
              labelColor="hsl(var(--accent))"
              className="border border-border bg-surface"
            />
            <Fleche />

            {/* Stade 1 accentué : c'est le passage obligé du parcours. */}
            <Stade
              label={t("home.parcoursSection.s1Label")}
              title={t("home.parcoursSection.s1Title")}
              labelColor="#6B3648"
              className="bg-primary text-primary-foreground"
            />
            <Fleche />

            {/* Stades 2 et 4 sont des voies parallèles : ils restent côte à côte
                jusque sur mobile, sinon l'empilement les fait lire comme une suite. */}
            <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4">
              <Stade
                dense
                label={t("home.parcoursSection.s2Label")}
                title={t("home.parcoursSection.s2Title")}
                labelColor="hsl(var(--accent))"
                className="border"
                style={{ borderColor: "hsl(var(--accent))" }}
              />
              <Stade
                dense
                label={t("home.parcoursSection.s4Label")}
                title={t("home.parcoursSection.s4Title")}
                className="border text-muted-foreground"
                style={{ borderColor: "hsl(var(--foreground) / .4)" }}
              />
            </div>
            <Fleche />

            <Stade
              label={t("home.parcoursSection.s3Label")}
              title={t("home.parcoursSection.s3Title")}
              labelColor="hsl(var(--primary))"
              className="border bg-surface"
              style={{ borderColor: "hsl(var(--primary))" }}
            >
              <p className="mt-3 text-sm text-muted-foreground">{t("home.parcoursSection.s3Note")}</p>
            </Stade>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <div className="text-[11px] tracking-[0.18em] text-accent">
              {t("home.parcoursSection.pasLigneDroiteLabel")}
            </div>
            <p className="mt-4 text-sm leading-[1.6] text-muted-foreground">
              {t("home.parcoursSection.pasLigneDroiteBody")}
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="text-sm leading-[1.6] text-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="right">
            <div className="border border-border bg-surface p-7">
              <div className="text-[11px] tracking-[0.18em] text-accent">
                {t("home.parcoursSection.precisionLabel")}
              </div>
              <p className="mt-4 text-sm leading-[1.6] text-muted-foreground">
                {t("home.parcoursSection.precisionBody")}
              </p>
            </div>
          </FadeIn>
        </div>

        {detaille && (
          <>
            <FadeIn>
              <div className="mt-16 border-t border-border pt-12">
                <SectionLabel>{t("home.parcoursSection.checkpointsLabel")}</SectionLabel>
                <h3 className="font-display text-2xl leading-[1.15] md:text-3xl">
                  {t("home.parcoursSection.checkpointsTitle")}
                </h3>
                <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {checkpoints.map((c, i) => (
                    <li key={c.q} className="grid grid-cols-[32px_1fr] gap-3">
                      <span className="font-display text-lg tabular-nums text-accent" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-[15px] leading-[1.4]">{c.q}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{c.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-14 border-t border-border pt-12">
                <SectionLabel>{t("home.parcoursSection.optionsLabel")}</SectionLabel>
                <h3 className="font-display text-2xl leading-[1.15] md:text-3xl">
                  {t("home.parcoursSection.optionsTitle")}
                </h3>
                <div className="mt-8 grid gap-[1px] bg-border sm:grid-cols-2 lg:grid-cols-4">
                  {options.map((o) => (
                    <div key={o.titre} className="bg-background px-5 py-6">
                      <div className="font-display text-lg text-accent" aria-hidden="true">
                        {o.code}
                      </div>
                      <div className="mt-2 font-display text-lg leading-[1.2]">{o.titre}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {o.note}
                      </div>
                      <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{o.d}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[70ch] text-sm leading-[1.6] text-muted-foreground">
                  {t("home.parcoursSection.optionsNote")}
                </p>
              </div>
            </FadeIn>
          </>
        )}
      </Container>
    </section>
  )
}
