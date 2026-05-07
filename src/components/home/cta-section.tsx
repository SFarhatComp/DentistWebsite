import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function CtaSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <Container>
        <FadeIn className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">{t("home.cta.title")}</h2>
          <p className="text-lg opacity-80 leading-relaxed mb-10">{t("home.cta.body")}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${lang}/rendez-vous`} className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide">{t("home.cta.primary")}</Link>
            <Link href={`/${lang}/contact`} className="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3.5 text-sm font-medium tracking-wide transition-colors">{t("home.cta.secondary")}</Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
