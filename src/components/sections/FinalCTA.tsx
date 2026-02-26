import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/Button"
import { UploadCloud, Shield } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-[#fdfdfc]">
      {/* Background visual flair */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-[0.02]">
        <div className="w-[800px] h-[800px] rounded-full border border-black/50" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-black/50" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-black/50" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[32px] border border-black/5 shadow-paper-deep p-12 md:p-20 relative overflow-hidden"
        >
          {/* Decorative Corner Folds */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-transparent via-transparent to-black/5" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-transparent via-transparent to-black/5" />

          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Stop guessing.<br />
            <span className="italic text-accent-blue/90">Start verifying.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
            Experience the only study copilot that treats your academic material with the rigor it deserves.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button size="lg" className="h-14 px-8 text-base gap-2 group w-full sm:w-auto">
              <UploadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Upload Your Notes
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-foreground/50 font-medium font-mono uppercase tracking-widest bg-black/5 px-4 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Your files never leave your workspace
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
