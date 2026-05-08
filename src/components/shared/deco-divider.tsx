import { cn } from "@/lib/utils"

interface DecoDividerProps {
  className?: string
  variant?: "diamond" | "lines"
}

export function DecoDivider({ className, variant = "diamond" }: DecoDividerProps) {
  if (variant === "lines") {
    return (
      <div className={cn("flex items-center justify-center gap-2 my-8", className)} aria-hidden="true">
        <span className="h-px w-12 bg-border" />
        <span className="h-px w-2 bg-accent" />
        <span className="h-px w-12 bg-border" />
      </div>
    )
  }
  return (
    <div className={cn("flex items-center justify-center gap-3 my-8", className)} aria-hidden="true">
      <span className="h-px flex-1 max-w-[6rem] bg-border" />
      <span className="block w-1.5 h-1.5 rotate-45 bg-accent/60" />
      <span className="h-px flex-1 max-w-[6rem] bg-border" />
    </div>
  )
}
