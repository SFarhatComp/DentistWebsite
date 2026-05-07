"use client"

import { motion } from "framer-motion"
import { Smile, Heart, Shield } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface ServicesSectionProps {
  lang: Locale
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = getTranslations(lang)

  const services = [
    {
      icon: Smile,
      title: t("home.services.cosmetic.title"),
      description: t("home.services.cosmetic.description"),
    },
    {
      icon: Heart,
      title: t("home.services.restorative.title"),
      description: t("home.services.restorative.description"),
    },
    {
      icon: Shield,
      title: t("home.services.preventive.title"),
      description: t("home.services.preventive.description"),
    },
  ]

  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("home.services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("home.services.subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full border-0 bg-background shadow-md">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
