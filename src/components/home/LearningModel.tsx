"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const STEPS = [
  {
    n:     "01",
    step:  "Know",
    color: "#006C33",
    bg:    "#E8F5EE",
    emoji: "📚",
    short: "Build a strong foundation",
    desc:  "Every child deserves a rock-solid foundation of knowledge across academics, arts, and life skills. At DPS SPR, we don't rush — we build deep understanding, strong literacy, and genuine curiosity from the very first year.",
    tags:  ["Curriculum Excellence", "Strong Literacy", "Conceptual Clarity"],
  },
  {
    n:     "02",
    step:  "Think",
    color: "#1D4ED8",
    bg:    "#EFF6FF",
    emoji: "🧠",
    short: "Develop critical reasoning",
    desc:  "We train children to question, analyse, and reason independently. Through Socratic classrooms, debates, and real-world problem sets, thinking becomes a habit — not just an exam skill.",
    tags:  ["Critical Thinking", "Debate & Discussion", "Problem-Solving"],
  },
  {
    n:     "03",
    step:  "Create",
    color: "#D97706",
    bg:    "#FFFBEB",
    emoji: "🎨",
    short: "Express and innovate",
    desc:  "From our Robotics Lab to the Art & Design Studio, children make things. They prototype, build, compose, and perform. Creation is treated as the highest form of intelligence — and we make space for it every single day.",
    tags:  ["Robotics & ATL Lab", "Art & Design", "VR & Innovation"],
  },
  {
    n:     "04",
    step:  "Connect",
    color: "#7C3AED",
    bg:    "#F5F3FF",
    emoji: "🌍",
    short: "Link learning to the world",
    desc:  "Knowledge becomes powerful when it connects to real life, to other people, and to global challenges. Our students collaborate across disciplines, participate in community projects, and develop genuine empathy.",
    tags:  ["Community Projects", "Collaboration", "Global Awareness"],
  },
  {
    n:     "05",
    step:  "Contribute",
    color: "#004F24",
    bg:    "#F0FDF4",
    emoji: "💚",
    short: "Give back with purpose",
    desc:  "The DPS motto is Service Before Self. Every DPS SPR student learns to use their talents to make a difference — through social initiatives, environmental action, and compassionate leadership in their community.",
    tags:  ["Service Before Self", "Leadership", "Social Responsibility"],
  },
];

export default function LearningModel() {
  const [active, setActive] = useState<number | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section bg-white border-t border-black/[0.05]">
      <div className="wrap">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <div className="gold-bar" />
              <p className="t-label text-gray-400">Our Learning Philosophy</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="t-h1 text-ink text-balance max-w-xl"
            >
              Five steps to a{" "}
              <span style={{ background:"linear-gradient(135deg,#004F24,#006C33)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                complete education.
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/learning-model"
              className="btn-outline-dark btn-sm inline-flex items-center gap-1.5 group">
              Full Learning Model
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.09 + 0.15, duration: 0.65, ease: [0.22,1,0.36,1] }}
              >
                <motion.button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-400 focus:outline-none"
                  style={{
                    borderColor: isOpen ? s.color : "rgba(0,0,0,0.07)",
                    background:  isOpen ? s.color : "white",
                  }}
                  whileTap={{ scale: 0.995 }}
                >
                  {/* Row */}
                  <div className="flex items-center gap-5 px-6 py-5">
                    {/* Number */}
                    <span
                      className="font-serif font-bold text-4xl leading-none flex-shrink-0 w-14 transition-all duration-400"
                      style={{ color: isOpen ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)" }}
                    >
                      {s.n}
                    </span>

                    {/* Emoji */}
                    <motion.span
                      className="text-2xl flex-shrink-0"
                      animate={{ scale: isOpen ? 1.2 : 1, rotate: isOpen ? 8 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {s.emoji}
                    </motion.span>

                    {/* Step name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-serif font-bold text-2xl transition-colors duration-300"
                          style={{ color: isOpen ? "white" : "#111827" }}>
                          {s.step}
                        </p>
                        <span
                          className="text-sm transition-colors duration-300"
                          style={{ color: isOpen ? "rgba(255,255,255,0.65)" : "#9CA3AF" }}
                        >
                          — {s.short}
                        </span>
                      </div>
                    </div>

                    {/* Toggle icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                      style={{
                        borderColor: isOpen ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.12)",
                        background:  isOpen ? "rgba(255,255,255,0.15)" : "transparent",
                      }}
                    >
                      <ArrowRight
                        size={14}
                        style={{ color: isOpen ? "white" : "#9CA3AF" }}
                      />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 pt-1 border-t border-white/15">
                          <p className="text-white/80 text-[0.9375rem] leading-relaxed max-w-2xl mb-5">
                            {s.desc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {s.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide"
                                style={{
                                  background: "rgba(255,255,255,0.18)",
                                  color: "rgba(255,255,255,0.90)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center t-label text-gray-300 mt-8"
        >
          Tap each step to explore
        </motion.p>
      </div>
    </section>
  );
}
