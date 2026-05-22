import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations, getTranslationList } from "@/lib/i18n"
import type { Locale } from "@/types"

// Slugs cibles par ordre des labels — gardés stables côté code,
// les libellés sont traduits via t().
const NEED_SLUGS = [
  "urgences",
  "urgences",
  "examen-complet",
  "esthetique-dentaire",
  "implantologie",
  "aligneurs",
  "parodontie",
  "examen-complet",
  "urgences",
]

export function PatientNeedsMatrix({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const labels = getTranslationList(lang, "patientNeeds.needs")
  return (
    <section className="py-20 md:py-24 border-b border-border bg-surface/40">
      <Container>
        <div className="max-w-2xl mb-12">
          <FadeIn>
            <SectionLabel>{t("patientNeeds.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("patientNeeds.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("patientNeeds.body")}
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {labels.map((label, i) => (
            <FadeIn key={label} className="bg-background">
              <Link
                href={`/${lang}/soins/${NEED_SLUGS[i]}`}
                className="block p-6 md:p-7 hover:bg-surface/50 transition-colors h-full group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="font-display text-sm text-accent/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="font-display text-lg md:text-xl text-foreground leading-snug">
                  {label}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
