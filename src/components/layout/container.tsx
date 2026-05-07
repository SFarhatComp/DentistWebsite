import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}>{children}</div>
}
