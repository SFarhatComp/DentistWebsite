"use client"
import { useState, useId } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  question: string
  children: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("divide-y divide-border border-t border-b border-border", className)}>{children}</div>
}

export function AccordionItem({ question, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const reduce = useReducedMotion()

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        className="w-full py-6 md:py-7 flex items-baseline gap-6 text-left group"
      >
        <span className="font-display text-base text-accent/70 tabular-nums shrink-0 mt-1">
          {/* index injected by parent if desired; keeping marker minimal */}
        </span>
        <span className="font-display text-lg md:text-xl text-foreground flex-1 leading-snug group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-7 pr-12 text-base text-muted-foreground leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
