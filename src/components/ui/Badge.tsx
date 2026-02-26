import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "neutral" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-foreground text-background shadow",
    success: "border-transparent bg-accent-green/10 text-accent-green",
    neutral: "border-transparent bg-black/5 text-foreground/80",
    outline: "text-foreground border-black/10",
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
