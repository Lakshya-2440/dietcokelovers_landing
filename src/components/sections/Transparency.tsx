import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { UploadCloud, FileText, Database, Search, Target, Link } from "lucide-react"

const PIPELINE_STEPS = [
  {
    icon: UploadCloud,
    title: "1. Upload",
    desc: "Your course materials (PDFs, PPTs, notes) are securely uploaded to your private workspace.",
  },
  {
    icon: FileText,
    title: "2. Chunking",
    desc: "We break down massive textbooks into granular, semantically meaningful paragraphs.",
  },
  {
    icon: Database,
    title: "3. Embedding",
    desc: "Each chunk is mathematically mapped into a high-dimensional vector space for semantic search.",
  },
  {
    icon: Search,
    title: "4. Retrieval",
    desc: "When you ask a question, we instantly find the most relevant mathematical matches in your notes.",
  },
  {
    icon: Target,
    title: "5. Synthesis",
    desc: "The AI reads only those retrieved chunks, synthesizing a direct answer based on them.",
  },
  {
    icon: Link,
    title: "6. Citation",
    desc: "Every claim is linked back to the exact source document, page, and paragraph for verification.",
  },
]

export function Transparency() {
  const targetRef = React.useRef<HTMLDivElement>(null)
  
  // Create an extensive scroll area to allow for horizontal scrolling
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Map vertical scroll (0 to 1) to horizontal translation
  // Depending on screen width, we need to translate enough to show all cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])

  return (
    <section id="how-it-works" ref={targetRef} className="relative h-[300vh] bg-foreground text-background">
      {/* Sticky container that stays in view while we scroll vertically */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <div className="absolute top-24 left-12 md:left-24 z-10 w-full max-w-xl">
          <h2 className="text-4xl md:text-5xl font-serif text-background mb-4 text-balance">
            Complete Transparency.
          </h2>
          <p className="text-lg text-background/70 text-balance">
            We don't believe in "magic" AI models that obscure how they arrive at an answer. Here is exactly how your data flows from upload to citation.
          </p>
        </div>

        {/* The horizontally scrolling track */}
        <motion.div style={{ x }} className="flex gap-8 px-12 md:px-24 mt-20 pb-20 pt-44">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index}
                className="group relative flex h-[360px] w-[320px] shrink-0 flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-8 shadow-paper backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div>
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-background">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-mono tracking-tight text-xl font-medium text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                    {step.desc}
                  </p>
                </div>
                
                {/* Connecting Line visually indicating pipeline flow */}
                {index < PIPELINE_STEPS.length - 1 && (
                  <div className="absolute top-1/2 -right-8 w-8 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-full h-px bg-white" />
                    <div className="absolute right-0 w-2 h-2 rotate-45 border-t border-r border-white" />
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}
