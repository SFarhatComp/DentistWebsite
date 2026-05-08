"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function HeroSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PlaceholderImage aspect="wide" className="h-full w-full" label="facade-studio-de-facto.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>
      <Container>
        <div className="max-w-3xl py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="label-sm text-accent mb-6"
          >
            {t("home.hero.label")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-8"
          >
            {t("home.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
          >
            {t("home.hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
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
