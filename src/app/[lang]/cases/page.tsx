import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { CaseCard } from "@/components/cases/case-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in"
import { getAllCases } from "@/lib/content"
import { getTranslations, getDictionary } from "@/lib/i18n"
import type { Locale } from "@/types"

interface CasesPageProps {
  params: { lang: string }
}

export async function generateMetadata({
  params,
}: CasesPageProps): Promise<Metadata> {
  const lang = params.lang as Locale
  const dict = getDictionary(lang)
  const cases = dict.cases as { title: string; subtitle: string }

  return {
    title: cases.title,
    description: cases.subtitle,
  }
}

export default function CasesPage({ params }: CasesPageProps) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const cases = getAllCases(lang)

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("cases.title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("cases.subtitle")}</p>
        </FadeIn>

        {cases.length === 0 ? (
          <FadeIn className="py-12 text-center">
            <p className="text-lg text-muted-foreground">{t("cases.noCases")}</p>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem) => (
              <StaggerItem key={caseItem.slug}>
                <CaseCard caseItem={caseItem} lang={lang} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  )
}
