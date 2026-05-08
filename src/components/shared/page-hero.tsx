"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { SectionLabel } from "./section-label"

interface PageHeroProps { label?: string; title: string; subtitle?: string }

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface/40">
      <Container>
        <div className="py-20 md:py-28 max-w-3xl">
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionLabel>{label}</SectionLabel>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-6"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  )
}
