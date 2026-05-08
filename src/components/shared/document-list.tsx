import { cn } from "@/lib/utils"

interface DocumentListProps {
  items: string[]
  className?: string
  variant?: "default" | "bordered"
}

export function DocumentList({ items, className, variant = "default" }: DocumentListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className={cn(
            "flex gap-4 text-base text-foreground leading-relaxed",
            variant === "bordered" && "border-t border-border pt-3 first:border-t-0 first:pt-0",
          )}
        >
          <span className="font-display text-sm text-accent/70 tabular-nums min-w-[2rem] pt-1">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
