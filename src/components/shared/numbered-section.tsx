import { cn } from "@/lib/utils"

interface NumberedSectionProps {
  number: string | number
  label?: string
  title: string
  children?: React.ReactNode
  id?: string
  className?: string
}

export function NumberedSection({ number, label, title, children, id, className }: NumberedSectionProps) {
  const formatted = typeof number === "number" ? String(number).padStart(2, "0") : number
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="flex items-baseline gap-6 mb-8">
        <span className="font-display text-3xl md:text-4xl text-accent/70 tabular-nums">{formatted}</span>
        <div className="h-px flex-1 bg-border self-end mb-3" />
      </div>
      {label && <div className="label-sm text-muted-foreground mb-3">{label}</div>}
      <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6 text-foreground">{title}</h2>
      {children && <div className="mt-6">{children}</div>}
    </section>
  )
}
