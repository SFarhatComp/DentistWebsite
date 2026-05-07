"use client"

import { motion } from "framer-motion"
import { Award, Users, CheckCircle } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface AboutSectionProps {
  lang: Locale
}

export function AboutSection({ lang }: AboutSectionProps) {
  const t = getTranslations(lang)

  const stats = [
    { icon: Award, value: "15+", label: t("home.about.experience") },
    { icon: Users, value: "5,000+", label: t("home.about.patients") },
    { icon: CheckCircle, value: "10,000+", label: t("home.about.procedures") },
  ]

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <FadeIn direction="left">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                {t("home.about.title")}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {t("home.about.description")}
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <StaggerContainer className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-lg border bg-card p-6 text-center shadow-sm"
                >
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <div className="mb-1 text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
