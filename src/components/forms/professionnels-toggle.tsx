"use client"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { PartnerOnboardingForm } from "@/components/forms/partner-onboarding-form"
import { LabPrescriptionForm } from "@/components/forms/lab-prescription-form"
import { ReferredCaseForm } from "@/components/forms/referred-case-form"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

type Choice = "partenaire" | "prescription" | "reference"

const CARDS: { kind: Choice; num: string; title: string; description: string }[] = [
  {
    kind: "partenaire",
    num: "01",
    title: "Devenir partenaire de soin",
    description: "Premier contact pour discuter d’une collaboration.",
  },
  {
    kind: "prescription",
    num: "02",
    title: "Transmettre une prescription",
    description: "Prescription d’appareil ou de restauration avec fichiers STL.",
  },
  {
    kind: "reference",
    num: "03",
    title: "Référer un cas",
    description: "Référer un patient pour prise de teinte, réparation ou service technique.",
  },
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
            <div className="label-sm text-primary mb-4">Partenariat professionnel</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Devenir partenaire de soin
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Avant de débuter une collaboration, nous souhaitons échanger directement avec vous afin de mieux comprendre votre pratique et les types d’appareils que vous souhaitez confier au laboratoire.
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
            <div className="label-sm text-primary mb-4">Prescription laboratoire</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Transmettre une prescription
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Permettre la prescription d’un appareil ou d’une restauration et la transmission de fichiers STL, radiographies, photos ou documents cliniques.
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
            <div className="label-sm text-primary mb-4">Référence clinique</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Référer un cas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Référer un patient pour prise de teinte, réparation ou service technique. Le patient demeure le vôtre.
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
}: {
  card: { kind: Choice; num: string; title: string; description: string }
  active: Choice | null
  onClick: () => void
}) {
  const isActive = active === card.kind
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
      <h3 className="font-display text-lg md:text-xl mb-2">{card.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
    </button>
  )
}
