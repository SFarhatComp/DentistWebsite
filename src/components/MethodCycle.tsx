"use client"

import { useState } from "react"
import { useHydrated } from "@/lib/use-hydrated"
import { cn } from "@/lib/utils"

type Stage = { n: string; name: string; text: string }

// Positions (en %) dans un cadre 640 × 300 : 0 → 1 → (2 ou 4) → 3, et 3 qui ne s'arrête jamais.
const POS: Record<string, [number, number]> = {
  "0": [9, 50],
  "1": [31, 50],
  "2": [57, 24],
  "4": [57, 76],
  "3": [87, 50],
}

/**
 * Le parcours en cinq stades, en schéma cliquable (onglets accessibles au
 * clavier). Sans script, tous les stades s'affichent l'un sous l'autre.
 */
export function MethodCycle({ stages, label, stageLabel }: { stages: Stage[]; label: string; stageLabel: string }) {
  const ready = useHydrated()
  const [active, setActive] = useState("0")

  const order = ["0", "1", "2", "4", "3"]
  const onKey = (e: React.KeyboardEvent, n: string) => {
    const i = order.indexOf(n)
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? order[(i + 1) % order.length]
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? order[(i - 1 + order.length) % order.length]
          : null
    if (next) {
      e.preventDefault()
      setActive(next)
      document.getElementById(`stage-tab-${next}`)?.focus()
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
      <div className="relative aspect-[640/300] w-full">
        <svg viewBox="0 0 640 300" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#A890AE" />
            </marker>
          </defs>
          <g stroke="#A890AE" strokeWidth="1.5" fill="none">
            <line x1="88" y1="150" x2="168" y2="150" markerEnd="url(#arr)" />
            <path d="M228,138 C270,96 300,78 334,74" markerEnd="url(#arr)" />
            <path d="M228,162 C270,204 300,222 334,226" markerEnd="url(#arr)" />
            <path d="M398,74 C460,80 500,110 524,134" markerEnd="url(#arr)" />
            <path d="M398,226 C460,220 500,190 524,166" markerEnd="url(#arr)" />
            <path d="M557,182 C520,300 120,300 64,184" strokeDasharray="4 6" markerEnd="url(#arr)" />
          </g>
        </svg>
        <div role={ready ? "tablist" : undefined} aria-label={label} className="absolute inset-0">
          {stages.map((s) => {
            const [x, y] = POS[s.n] ?? [50, 50]
            const on = ready && active === s.n
            return (
              <button
                key={s.n}
                id={`stage-tab-${s.n}`}
                type="button"
                role={ready ? "tab" : undefined}
                aria-selected={ready ? on : undefined}
                aria-controls={ready ? `stage-panel-${s.n}` : undefined}
                tabIndex={ready ? (on ? 0 : -1) : 0}
                onClick={() => setActive(s.n)}
                onKeyDown={(e) => onKey(e, s.n)}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border font-display text-[22px] transition-all duration-300 sm:h-16 sm:w-16 sm:text-[30px]",
                    on ? "scale-110 border-cta bg-cta text-white" : "border-white/40 bg-aub-deep text-white group-hover:border-white",
                  )}
                >
                  {s.n}
                </span>
                <span className="sr-only">
                  {stageLabel} {s.n} — {s.name}
                </span>
                <span aria-hidden className="mt-2 hidden whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-white/80 md:block">
                  {s.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        {stages.map((s) => (
          <div
            key={s.n}
            id={`stage-panel-${s.n}`}
            role={ready ? "tabpanel" : undefined}
            aria-labelledby={ready ? `stage-tab-${s.n}` : undefined}
            hidden={ready && active !== s.n}
            className={cn(!ready && "mb-6")}
          >
            <p className="eyebrow text-mauve">
              {stageLabel} {s.n}
            </p>
            <h3 className="t-2 mt-2">{s.name}</h3>
            <p className="lede mt-4 text-white/85">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
