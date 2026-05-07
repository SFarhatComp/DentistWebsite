import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { ServicesSection } from "@/components/home/services-section"
import { FeaturedCasesSection } from "@/components/home/featured-cases-section"
import { getFeaturedCases } from "@/lib/content"
import type { Locale } from "@/types"

interface HomePageProps {
  params: { lang: string }
}

export default function HomePage({ params }: HomePageProps) {
  const lang = params.lang as Locale
  const featuredCases = getFeaturedCases(lang, 3)

  return (
    <>
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <ServicesSection lang={lang} />
      <FeaturedCasesSection cases={featuredCases} lang={lang} />
    </>
  )
}
