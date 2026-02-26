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
        
        {/* Aesthetic Visual Logo */}
        <a href="#" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
          <div className="relative flex items-center justify-center w-8 h-8 text-foreground">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="transform group-hover:-rotate-[4deg] transition-transform duration-500 ease-out"
            >
              <title>AskMyNotes Logo</title>
              {/* Back Paper (Abstract) */}
              <rect x="7" y="10" width="16" height="20" rx="1.5" transform="rotate(-6 7 10)" className="fill-current opacity-10" />
              <rect x="7" y="10" width="16" height="20" rx="1.5" transform="rotate(-6 7 10)" className="stroke-current" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Front Paper (Main Note) */}
              <rect x="10" y="6" width="16" height="20" rx="1.5" className="fill-[#F7F6F2] stroke-current" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Note Content (Lines) */}
              <path d="M14 12H22" className="stroke-accent-blue" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 16H22" className="stroke-accent-blue" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 20H18" className="stroke-accent-blue" strokeWidth="2" strokeLinecap="round" />
              
              {/* The "Ask/Intelligence" Spark intersecting the notes */}
              <circle cx="26" cy="6" r="4.5" className="fill-accent-green stroke-[#F7F6F2]" strokeWidth="2" />
            </svg>
          </div>
          <span className="font-serif text-[22px] font-medium tracking-tight text-foreground -mt-0.5">
            AskMyNotes
          </span>
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
