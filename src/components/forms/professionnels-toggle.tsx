"use client"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { PartnerOnboardingForm } from "@/components/forms/partner-onboarding-form"
import { LabPrescriptionForm } from "@/components/forms/lab-prescription-form"
import { ReferredCaseForm } from "@/components/forms/referred-case-form"
import { getTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

type Choice = "partenaire" | "prescription" | "reference"

type Card = { kind: Choice; num: string; titleKey: string; descKey: string }

const CARDS: Card[] = [
  { kind: "partenaire", num: "01", titleKey: "professionnelsToggle.card1Title", descKey: "professionnelsToggle.card1Description" },
  { kind: "prescription", num: "02", titleKey: "professionnelsToggle.card2Title", descKey: "professionnelsToggle.card2Description" },
  { kind: "reference", num: "03", titleKey: "professionnelsToggle.card3Title", descKey: "professionnelsToggle.card3Description" },
]

export function ProfessionnelsToggle({
  lang,
  defaultActive = null,
}: {
  lang: Locale
  defaultActive?: Choice | null
}) {
  const [active, setActive] = useState<Choice | null>(defaultActive)
  const reduce = useReducedMotion()
  const t = getTranslations(lang)

  const enter = reduce
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div>
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border border-border mb-12">
        {CARDS.map((c) => (
          <ToggleCard
            key={c.kind}
            card={c}
            active={active}
            onClick={() => setActive(active === c.kind ? null : c.kind)}
            lang={lang}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {active === "partenaire" && (
          <motion.div
            key="partenaire"
            {...enter}
            className="max-w-3xl pt-4 pb-16 scroll-mt-24"
            id="form-active"
          >
            <div className="label-sm text-primary mb-4">{t("professionnelsToggle.partenaireLabel")}</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("professionnelsToggle.partenaireHeading")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t("professionnelsToggle.partenaireBody")}
            </p>
            <PartnerOnboardingForm lang={lang} />
          </motion.div>
        )}

        {active === "prescription" && (
          <motion.div
            key="prescription"
            {...enter}
            className="max-w-3xl pt-4 pb-16 scroll-mt-24"
            id="form-active"
          >
            <div className="label-sm text-primary mb-4">{t("professionnelsToggle.prescriptionLabel")}</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("professionnelsToggle.prescriptionHeading")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t("professionnelsToggle.prescriptionBody")}
            </p>
            <LabPrescriptionForm lang={lang} />
          </motion.div>
        )}

        {active === "reference" && (
          <motion.div
            key="reference"
            {...enter}
            className="max-w-3xl pt-4 pb-16 scroll-mt-24"
            id="form-active"
          >
            <div className="label-sm text-primary mb-4">{t("professionnelsToggle.referenceLabel")}</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              {t("professionnelsToggle.referenceHeading")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t("professionnelsToggle.referenceBody")}
            </p>
            <ReferredCaseForm lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToggleCard({
  card,
  active,
  onClick,
  lang,
}: {
  card: Card
  active: Choice | null
  onClick: () => void
  lang: Locale
}) {
  const isActive = active === card.kind
  const t = getTranslations(lang)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "text-left p-6 md:p-8 transition-colors h-full w-full bg-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
        isActive ? "bg-primary/5" : "hover:bg-surface/40",
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span
          className={cn(
            "font-display text-sm tabular-nums",
            isActive ? "text-primary" : "text-accent/70",
          )}
        >
          {card.num}
        </span>
        <div
          className={cn(
            "w-3 h-3 rounded-full border transition-colors mt-1",
            isActive ? "bg-primary border-primary" : "bg-transparent border-muted-foreground/40",
          )}
          aria-hidden="true"
        />
      </div>
      <h3 className="font-display text-lg md:text-xl mb-2">{t(card.titleKey)}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
    </button>
  )
}
