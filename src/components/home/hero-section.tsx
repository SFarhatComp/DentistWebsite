"use client"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function HeroSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const reduce = useReducedMotion()
  const fade = (y: number, delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease: "easeOut" as const },
  })
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PlaceholderImage aspect="wide" className="h-full w-full" label="facade-studio-de-facto.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>
      <Container>
        <div className="max-w-3xl py-32">
          <motion.div {...fade(16)} className="label-sm text-accent mb-6">
            {t("home.hero.label")}
          </motion.div>
          <motion.h1
            {...fade(24, 0.1)}
            className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-8"
          >
            {t("home.hero.title")}
          </motion.h1>
          <motion.p
            {...fade(16, 0.25)}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
          >
            {t("home.hero.subtitle")}
          </motion.p>
          <motion.div {...fade(16, 0.4)} className="flex flex-wrap gap-4">
            <Link
              href={`/${lang}/premiere-visite`}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              {t("home.hero.ctaPrimary")}
            </Link>
            <Link
              href={`/${lang}/rendez-vous`}
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              {t("home.hero.ctaTertiary")}
            </Link>
            <Link
              href={`/${lang}/le-studio`}
              className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              {t("home.hero.ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
