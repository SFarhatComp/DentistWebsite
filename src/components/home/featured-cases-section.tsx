"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { CaseCard } from "@/components/cases/case-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in"
import type { Case, Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface FeaturedCasesSectionProps {
  cases: Case[]
  lang: Locale
}

export function FeaturedCasesSection({ cases, lang }: FeaturedCasesSectionProps) {
  const t = getTranslations(lang)

  if (cases.length === 0) return null

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("home.featured.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("home.featured.subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <StaggerItem key={caseItem.slug}>
              <CaseCard caseItem={caseItem} lang={lang} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href={`/${lang}/cases`}>
              {t("home.featured.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  )
}
