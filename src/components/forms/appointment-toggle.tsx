"use client"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { AppointmentForm } from "@/components/forms/appointment-form"
import { EmergencyForm } from "@/components/forms/emergency-form"
import { MedicalEmergencyNotice } from "@/components/forms/medical-emergency-notice"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types"

type Choice = "regulier" | "urgence"

export function AppointmentToggle({ lang }: { lang: Locale }) {
  const [active, setActive] = useState<Choice | null>(null)
  const reduce = useReducedMotion()

  // Animation à l'entrée : fade + slide vers le haut.
  // À la sortie : fade out plus rapide pour ne pas garder de form fantôme.
  const enter = reduce
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="max-w-4xl">
      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        <ToggleCard
          kind="regulier"
          active={active}
          onClick={() => setActive(active === "regulier" ? null : "regulier")}
        />
        <ToggleCard
          kind="urgence"
          active={active}
          onClick={() => setActive(active === "urgence" ? null : "urgence")}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {active === "regulier" && (
          <motion.div
            key="regulier"
            {...enter}
            className="max-w-3xl pt-4 pb-16 scroll-mt-24"
            id="form-active"
          >
            <div className="label-sm text-primary mb-4">Rendez-vous régulier</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Demande de rendez-vous
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Remplissez ce formulaire pour que notre équipe puisse préparer votre dossier. Les informations transmises restent confidentielles.
            </p>
            <AppointmentForm lang={lang} />
          </motion.div>
        )}

        {active === "urgence" && (
          <motion.div
            key="urgence"
            {...enter}
            className="max-w-3xl pt-4 pb-16 scroll-mt-24"
            id="form-active"
          >
            <div className="label-sm text-accent mb-4">Urgence dentaire</div>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">
              Urgence dentaire
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Pour une réponse rapide, remplissez ce formulaire. Notre équipe vous contactera au plus tôt.
            </p>
            <MedicalEmergencyNotice />
            <EmergencyForm lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToggleCard({
  kind,
  active,
  onClick,
}: {
  kind: Choice
  active: Choice | null
  onClick: () => void
}) {
  const isActive = active === kind
  const isUrgence = kind === "urgence"

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "text-left p-6 border bg-surface/40 transition-all h-full w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isUrgence ? "border-2" : "border",
        isActive && !isUrgence && "border-primary bg-primary/5",
        isActive && isUrgence && "border-accent bg-accent/10",
        !isActive && !isUrgence && "border-border hover:border-primary",
        !isActive && isUrgence && "border-accent bg-accent/5 hover:bg-accent/10",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={cn("label-sm", isUrgence ? "text-accent" : "text-primary")}>
          {isUrgence ? "Parcours secondaire" : "Parcours principal"}
        </div>
        <div
          className={cn(
            "w-3 h-3 rounded-full border transition-colors mt-1",
            isActive && !isUrgence && "bg-primary border-primary",
            isActive && isUrgence && "bg-accent border-accent",
            !isActive && "bg-transparent border-muted-foreground/40",
          )}
          aria-hidden="true"
        />
      </div>
      <h2 className="font-display text-xl md:text-2xl text-foreground mb-3">
        {isUrgence ? "J’ai une urgence dentaire" : "Demander un rendez-vous régulier"}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {isUrgence
          ? "Douleur, traumatisme, enflure, dent cassée."
          : "Première visite, examen, suivi, traitement planifié."}
      </p>
    </button>
  )
}
