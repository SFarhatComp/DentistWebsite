import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslationList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * Praticien + Première visite, deux colonnes séparées par un filet vertical.
 *
 * Le portrait du Dr Ramdani n'a pas encore été fourni : on garde un
 * `PlaceholderImage` jusque-là (handoff §4). Pour le remplacer, déposer la photo
 * dans `public/img/` et substituer le placeholder par une balise `img`.
 */
export function PraticienVisiteSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const credentials = getTranslationList(lang, "home.praticienVisite.credentials")
  const etapes = getTranslationList(lang, "home.praticienVisite.etapes")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <div className="grid gap-12 md:grid-cols-2 md:gap-14">
          <FadeIn direction="left">
            <div className="text-[11px] tracking-[0.18em] text-accent">
              {t("home.praticienVisite.praticienLabel")}
            </div>
            <div className="mt-6 w-[190px]">
              <PlaceholderImage aspect="portrait" className="aspect-[3/4]" label="dr-bader-ramdani" />
            </div>
            <h2 className="mt-6 font-display text-2xl leading-[1.15]">{t("home.praticienVisite.nom")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("home.praticienVisite.role")}</p>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-[1.6]">
                  <span className="select-none text-accent" aria-hidden="true">
                    —
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn direction="right" className="md:border-l md:border-border md:pl-14">
            <div className="text-[11px] tracking-[0.18em] text-accent">
              {t("home.praticienVisite.visiteLabel")}
            </div>
            <ol className="mt-6">
              {etapes.map((e, i) => (
                <li
                  key={e}
                  className="grid grid-cols-[40px_1fr] gap-4 border-b border-border py-5 last:border-b-0"
                >
                  <span className="font-display text-lg tabular-nums text-accent" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.6]">{e}</span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
