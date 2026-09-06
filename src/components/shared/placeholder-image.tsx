import { cn } from "@/lib/utils"

interface PlaceholderImageProps {
  className?: string
  aspect?: "square" | "video" | "portrait" | "wide"
  label?: string
}

export function PlaceholderImage({ className, aspect = "video", label }: PlaceholderImageProps) {
  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[4/5]",
    wide: "aspect-[16/9]",
  }[aspect]
  return (
    <div
      className={cn("relative overflow-hidden bg-surface border border-border", aspectClass, className)}
      role="img"
      aria-label={label || "Image en attente"}
    >
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="font-display text-4xl text-primary/30 tracking-widest">DF</div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "12px 12px" }}
      />
      {label && <div className="absolute bottom-3 left-3 label-sm text-muted-foreground">{label}</div>}
    </div>
  )
}
