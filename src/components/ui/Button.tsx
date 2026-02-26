import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Academic, tactile button styles
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-foreground text-background shadow-paper hover:bg-foreground/90 hover:shadow-paper-hover hover:-translate-y-[1px]",
      outline: "border border-black/10 bg-transparent hover:bg-black/5 text-foreground shadow-sm",
      ghost: "hover:bg-black/5 text-foreground",
      link: "text-accent-blue underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-10 px-5 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-md px-8 text-base",
      icon: "h-9 w-9",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
