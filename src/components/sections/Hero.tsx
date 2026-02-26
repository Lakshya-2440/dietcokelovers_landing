import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { ChatBubble } from "../ui/ChatBubble"
import { Citation } from "../ui/Citation"
import { UploadCloud, PlayCircle, ShieldCheck } from "lucide-react"

export function Hero() {
  const { scrollY } = useScroll()
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // state for chat mockup
  const [chatState, setChatState] = React.useState<"idle" | "typing" | "answered">("idle")
  
  React.useEffect(() => {
    // Auto-play the demo after a short delay
    const timer1 = setTimeout(() => setChatState("typing"), 600)
    const timer2 = setTimeout(() => setChatState("answered"), 2100)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-background pt-32 pb-20">
      {/* Background Parallax Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <motion.div 
          style={{ y: y1 }}
          className="absolute right-[-10%] top-[10%] h-[600px] w-[800px] rotate-[-6deg] rounded-3xl bg-white shadow-paper border border-black/5"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute right-[5%] top-[20%] h-[500px] w-[700px] rotate-[3deg] rounded-3xl bg-[#fdfdfc] shadow-paper-hover border border-black/5"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-8"
          >
            <Badge variant="outline" className="text-accent-blue bg-accent-blue/5 border-accent-blue/20">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Study with Certainty
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-serif text-foreground leading-[1.1] md:text-6xl lg:text-7xl text-balance">
                Answers that <span className="italic text-accent-blue/90">only</span> come from your notes.
              </h1>
              <p className="text-lg text-foreground/75 md:text-xl max-w-xl text-balance leading-relaxed">
                No hallucinations. No guessing. Every answer is rigorously backed by your uploaded material.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="gap-2 group">
                <UploadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Upload Notes
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Chat Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[500px] rounded-2xl bg-white/80 glass-paper p-6 shadow-paper-deep"
          >
            {/* Mockup Header */}
            <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-foreground/60">
                  BIOL 101 - Cell Biology
                </span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex min-h-[320px] flex-col gap-6">
              <ChatBubble role="user">
                What are the three main components of the cytoskeleton?
              </ChatBubble>

              {chatState === "typing" && (
                <ChatBubble role="assistant" delay={0.2}>
                  <span className="flex items-center gap-1.5 h-6">
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                  </span>
                </ChatBubble>
              )}

              {chatState === "answered" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-3"
                >
                  <ChatBubble role="assistant">
                    Based on your notes, the three main components of the cytoskeleton are:
                    <ol className="mt-2 list-decimal pl-5 space-y-1">
                      <li>
                        <Citation number={1}>Microtubules</Citation> - thickest filaments
                      </li>
                      <li>
                        <Citation number={2}>Microfilaments</Citation> (actin filaments) - thinnest
                      </li>
                      <li>
                        <Citation number={3}>Intermediate filaments</Citation>
                      </li>
                    </ol>
                  </ChatBubble>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge variant="success" className="gap-1.5 py-1">
                      <ShieldCheck className="h-3 w-3" />
                      100% Sourced from Notes
                    </Badge>
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            {/* Input Mockup */}
            <div className="mt-6 flex h-12 w-full items-center rounded-xl border border-black/10 bg-background/50 px-4">
              <div className="h-4 w-1/2 rounded bg-foreground/10" />
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-foreground/20 to-transparent" />
      </motion.div>
    </section>
  )
}
