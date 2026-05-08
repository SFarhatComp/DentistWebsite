"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { SectionLabel } from "./section-label"

interface PageHeroProps { label?: string; title: string; subtitle?: string }

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  const reduce = useReducedMotion()
  const labelInit = reduce ? false : { opacity: 0, y: 16 }
  const labelAnim = { opacity: 1, y: 0 }
  const titleInit = reduce ? false : { opacity: 0, y: 24 }
  const titleAnim = { opacity: 1, y: 0 }
  const subInit = reduce ? false : { opacity: 0, y: 16 }
  const subAnim = { opacity: 1, y: 0 }

  return (
    <section className="border-b border-border bg-surface/40">
      <Container>
        <div className="py-20 md:py-28 max-w-3xl">
          {label && (
            <motion.div
              initial={labelInit}
              animate={labelAnim}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionLabel>{label}</SectionLabel>
            </motion.div>
          )}
          <motion.h1
            initial={titleInit}
            animate={titleAnim}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-6"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={subInit}
              animate={subAnim}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.25, ease: "easeOut" }}
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
