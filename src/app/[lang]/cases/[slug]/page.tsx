import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CaseGallery } from "@/components/cases/case-gallery"
import { FadeIn } from "@/components/motion/fade-in"
import { getCaseBySlug, getAllCaseSlugs, markdownToHtml } from "@/lib/content"
import { getTranslations, formatDate } from "@/lib/i18n"
import type { Locale } from "@/types"

interface CaseDetailPageProps {
  params: { lang: string; slug: string }
}

export async function generateStaticParams() {
  return getAllCaseSlugs()
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const lang = params.lang as Locale
  const caseItem = getCaseBySlug(params.slug, lang)

  if (!caseItem) {
    return { title: "Case Not Found" }
  }

  return {
    title: caseItem.title,
    description: caseItem.excerpt,
  }
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const caseItem = getCaseBySlug(params.slug, lang)

  if (!caseItem) {
    notFound()
  }

  const contentHtml = markdownToHtml(caseItem.content)

  return (
    <article className="py-16 lg:py-24">
      <Container>
        {/* Back button */}
        <FadeIn className="mb-8">
          <Button asChild variant="ghost" className="group">
            <Link href={`/${lang}/cases`}>
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t("cases.backToList")}
            </Link>
          </Button>
        </FadeIn>

        {/* Header */}
        <FadeIn className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(caseItem.date, lang)}
            </span>
            {caseItem.featured && (
              <Badge variant="default">{t("cases.featured")}</Badge>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {caseItem.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{caseItem.excerpt}</p>

          {/* Tags */}
          {caseItem.tags && caseItem.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {caseItem.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </FadeIn>

        {/* Cover Image */}
        <FadeIn delay={0.1} className="mb-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={caseItem.coverImage}
              alt={caseItem.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.2} className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </FadeIn>

        {/* Gallery */}
        {caseItem.gallery && caseItem.gallery.length > 0 && (
          <FadeIn delay={0.3} className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">{t("cases.gallery")}</h2>
            <CaseGallery images={caseItem.gallery} lang={lang} />
          </FadeIn>
        )}
      </Container>
    </article>
  )
}
