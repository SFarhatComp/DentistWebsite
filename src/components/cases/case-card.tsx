"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Case, Locale } from "@/types"
import { getTranslations, formatDate } from "@/lib/i18n"

interface CaseCardProps {
  caseItem: Case
  lang: Locale
}

export function CaseCard({ caseItem, lang }: CaseCardProps) {
  const t = getTranslations(lang)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={caseItem.coverImage}
            alt={caseItem.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {caseItem.featured && (
            <Badge className="absolute right-3 top-3" variant="default">
              {t("cases.featured")}
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <p className="mb-2 text-sm text-muted-foreground">
            {formatDate(caseItem.date, lang)}
          </p>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">
            {caseItem.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {caseItem.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {caseItem.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button asChild variant="ghost" className="group/btn p-0">
            <Link href={`/${lang}/cases/${caseItem.slug}`}>
              {t("cases.viewCase")}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
