import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/Button"

export function Navbar() {
  const { scrollY } = useScroll()
  
  // Make the navbar blur gradually increase as we scroll down
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(247, 246, 242, 0)", "rgba(247, 246, 242, 0.8)"]
  )
  
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  )
  
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(0, 0, 0, 0)", "1px solid rgba(0, 0, 0, 0.05)"]
  )

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter,
        borderBottom,
        WebkitBackdropFilter: backdropFilter,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-7xl px-6 md:px-12 flex h-20 items-center justify-between">
        
        {/* Aesthetic Typographic Logo */}
        <a href="#" className="flex items-baseline tracking-tight group hover:opacity-90 transition-opacity">
          <span className="font-serif text-[26px] font-bold text-foreground">Ask</span>
          <span className="font-serif text-[26px] font-light italic text-foreground/80">MyNotes</span>
          <span className="text-accent-blue/80 text-[26px] ml-[2px] font-serif transition-colors group-hover:text-accent-blue">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#why-it-matters" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Why It Matters</a>
          <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">How It Works</a>
          <a href="#use-cases" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Use Cases</a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Button size="sm" className="shadow-none relative overflow-hidden group">
             <span className="relative z-10 font-medium tracking-wide">Get Started</span>
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Button>
        </div>

      </div>
    </motion.header>
  )
}
