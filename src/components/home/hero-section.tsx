"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface HeroSectionProps {
  lang: Locale
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = getTranslations(lang)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t("site.tagline")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("home.hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground sm:text-xl"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href={`/${lang}/cases`}>
                {t("home.hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${lang}/contact`}>{t("home.hero.contact")}</Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-background"
        >
          <path
            d="M0 50L60 45.7C120 41 240 33 360 35.8C480 39 600 53 720 57.2C840 61 960 57 1080 50C1200 43 1320 33 1380 28.3L1440 24V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
