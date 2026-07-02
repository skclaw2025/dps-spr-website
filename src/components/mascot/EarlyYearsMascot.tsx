"use client";
// Ellie sitting beside the Early Years section content — walks in from left
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import EllieSVG from "./EllieSVG";
import Link from "next/link";

const FUN_FACTS = [
  "Did you know elephants never forget? Just like great schools! 🧠",
  "I love finger painting and story time! 🎨📚",
  "At DPS SPR, every day feels like an adventure! 🌟",
  "My favourite subject? Playing and learning at the same time! 🎮",
  "I can't wait to meet your little one! 🤗",
];

export default function EarlyYearsMascot() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, amount: 0.3 });
  const [fact, setFact]   = useState(0);
  const [mood, setMood]   = useState<"sit"|"happy"|"wink">("sit");
  const [showFact, setShowFact] = useState(false);

  const nextFact = () => {
    setFact(f => (f + 1) % FUN_FACTS.length);
    setMood(["happy", "wink", "sit"][Math.floor(Math.random() * 3)] as "happy"|"wink"|"sit");
    setShowFact(true);
    setTimeout(() => setShowFact(false), 3200);
  };

  return (
    <div ref={ref} className="flex flex-col items-center">

      {/* Walk-in animation */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative flex flex-col items-center"
      >

        {/* Fun fact bubble */}
        <motion.div
          animate={showFact ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="mb-2 px-4 py-3 bg-yellow-50 border-2 border-gold/40 rounded-2xl rounded-bl-sm max-w-[200px]"
          style={{ filter: "drop-shadow(0 4px 12px rgba(255,215,0,0.2))" }}
        >
          <p className="text-xs font-semibold text-gray-800 text-center leading-tight">
            {FUN_FACTS[fact]}
          </p>
        </motion.div>

        {/* Ellie */}
        <EllieSVG mood={mood} size={180} onClick={nextFact} />

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="text-xs text-muted text-center mt-2 font-medium"
        >
          Tap Ellie for a fun fact! 🐘
        </motion.p>

        {/* Bouncing arrow */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3"
        >
          <span className="text-2xl">👇</span>
        </motion.div>
      </motion.div>

      {/* Mini CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center"
      >
        <Link
          href="/kindergarten"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-ink text-xs font-bold transition-all hover:bg-gold-dark hover:-translate-y-0.5"
          style={{ boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}
        >
          Ellie's World 🐘
        </Link>
      </motion.div>
    </div>
  );
}
