import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { XCircle, CheckCircle2 } from "lucide-react"

export function TheProblem() {
  const targetRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  })

  // We have 3 paragraphs. Depending on scroll progress, we swap the visualizations.
  const visualState = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.33) return 0
    if (pos < 0.66) return 1
    return 2
  })

  const [activeVisual, setActiveVisual] = React.useState(0)

  React.useEffect(() => {
    return visualState.onChange((latest) => setActiveVisual(latest))
  }, [visualState])

  return (
    <section id="why-it-matters" ref={targetRef} className="relative w-full bg-[#fdfdfc] py-32 border-y border-black/5">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          
          {/* Left Column: Narrative paragraphs */}
          <div className="relative z-10 space-y-32 py-10">
            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <h2 className="text-3xl font-serif mb-6 text-foreground">The Confidence Trap</h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                General-purpose AI Assistants give confident answers, even when they are entirely wrong. As a student, you can't rely on synthetic knowledge when academic integrity and exact definitions matter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <h2 className="text-3xl font-serif mb-6 text-foreground">Wasting Time Verifying</h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                When an AI gives you an answer, you spend just as much time verifying it in your textbook as you would have spent just reading the book. The tool designed to save time becomes a liability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <h2 className="text-3xl font-serif mb-6 text-foreground">The Solution is in Your Notes</h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                You already have the truth—in your lecture slides, textbooks, and notes. AskMyNotes bridges the gap, allowing you to converse exclusively with your curated materials.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Sticky Visualizations */}
          <div className="lg:sticky lg:top-32 relative h-[500px] w-full mt-10 lg:mt-0">
            {/* Visual 0: Confident Wrong Answer */}
            <motion.div
              initial={false}
              animate={{ opacity: activeVisual === 0 ? 1 : 0, scale: activeVisual === 0 ? 1 : 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-[400px] rounded-xl bg-background border border-black/10 shadow-paper p-6 relative overflow-hidden">
                <div className="flex items-center gap-2 text-red-500/80 mb-4 text-sm font-medium">
                  <XCircle className="w-4 h-4" /> Unreliable Output
                </div>
                <p className="text-foreground/90 leading-relaxed font-serif">
                  "The mitochondria is solely responsible for all cellular metabolic pathways..."
                </p>
                {/* Red squiggly underline effect */}
                <div className="w-full h-1 mt-2 border-b-2 border-dashed border-red-500/40" />
                <div className="absolute inset-0 bg-red-500/5 mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Visual 1: Wasting Time */}
            <motion.div
              initial={false}
              animate={{ opacity: activeVisual === 1 ? 1 : 0, scale: activeVisual === 1 ? 1 : 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-4"
            >
               <div className="w-full max-w-[400px] rounded-xl bg-background border border-black/10 shadow-sm p-4 opacity-50 blur-[1px]">
                <p className="text-foreground/90 font-serif text-sm">
                  "The mitochondria is solely responsible..."
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-2 text-foreground/40">
                <div className="w-px h-8 bg-black/10" />
                <span className="text-xs uppercase tracking-widest font-mono">Fact Checking</span>
                <div className="w-px h-8 bg-black/10" />
              </div>

               <div className="w-full max-w-[420px] rounded-xl bg-white border border-black/10 shadow-paper p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-foreground/60 uppercase">Textbook.pdf</span>
                  <span className="text-xs font-mono text-foreground/60">Page 142</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-black/5 rounded" />
                  <div className="h-3 w-3/4 bg-black/5 rounded" />
                  <div className="h-3 w-full bg-accent-blue/10 rounded" />
                  <div className="h-3 w-full bg-accent-blue/10 rounded" />
                </div>
               </div>
            </motion.div>

            {/* Visual 2: Grounded Solution */}
            <motion.div
              initial={false}
              animate={{ opacity: activeVisual === 2 ? 1 : 0, scale: activeVisual === 2 ? 1 : 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-[400px] rounded-xl bg-white border border-black/10 shadow-paper-deep p-6">
                <div className="flex items-center gap-2 text-accent-green mb-4 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Grounded in Notes
                </div>
                <p className="text-foreground/90 leading-relaxed font-serif">
                  "The mitochondria is primarily responsible for ATP production, but glycolysis occurs in the cytoplasm <sup className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 font-mono text-[9px] font-medium text-accent-blue mx-0.5 pointer-events-none">1</sup>."
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Self-drawing divider line */}
        <div className="w-full max-w-4xl mx-auto mt-32 h-[1px] relative overflow-hidden bg-black/5">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-0 bg-accent-blue/30 origin-left"
          />
        </div>
      </div>
    </section>
  )
}
