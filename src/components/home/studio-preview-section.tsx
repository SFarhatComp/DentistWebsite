import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function StudioPreviewSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl">
          <FadeIn>
            <SectionLabel>{t("home.studioPreview.label")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("home.studioPreview.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("home.studioPreview.body")}
            </p>
            <Link
              href={`/${lang}/le-studio`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline group"
            >
              <span>{t("home.studioPreview.cta")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
          <FadeIn direction="right">
            <PlaceholderImage aspect="portrait" label="reception-studio-de-facto.jpg" />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
