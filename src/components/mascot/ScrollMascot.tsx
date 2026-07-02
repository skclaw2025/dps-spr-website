"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ScrollMascot — Ellie climbs a rope as parent scrolls down the page
// Fixed position overlay, stays with the page
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import EllieSVG, { type EllieMood } from "./EllieSVG";

const ROPE_TOP    = 80;   // px from top of viewport where rope starts
const ROPE_BOTTOM = 85;   // % of viewport height where rope ends

export default function ScrollMascot() {
  const [scrollPct, setScrollPct] = useState(0);
  const [mood, setMood]           = useState<EllieMood>("wave");
  const [bubble, setBubble]       = useState<string | null>("Hi! I'm Ellie! 👋");
  const [showBubble, setShowBubble] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const rawY   = useMotionValue(ROPE_TOP);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 18 });

  // Bubble messages at different scroll points
  const BUBBLES = [
    { pct: 0,   msg: "Hi! I'm Ellie! 👋",           mood: "wave"  as EllieMood },
    { pct: 15,  msg: "Wheee! 🎉 Hold tight!",        mood: "climb" as EllieMood },
    { pct: 35,  msg: "Our school is amazing! 🏫",    mood: "climb" as EllieMood },
    { pct: 55,  msg: "Almost there... 💪",            mood: "climb" as EllieMood },
    { pct: 75,  msg: "I love DPS SPR! 💚",           mood: "happy" as EllieMood },
    { pct: 92,  msg: "Come join us! 🌟",             mood: "happy" as EllieMood },
  ];

  const updateScroll = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const pct = Math.min(100, (window.scrollY / docH) * 100);
    setScrollPct(pct);

    if (pct > 5 && !hasScrolled) setHasScrolled(true);

    // Rope position — map 0-100% scroll to rope top-bottom
    const vhBottom = (window.innerHeight * ROPE_BOTTOM) / 100;
    const newY = ROPE_TOP + (pct / 100) * (vhBottom - ROPE_TOP - 120);
    rawY.set(newY);

    // Mood + bubble
    const active = [...BUBBLES].reverse().find(b => pct >= b.pct);
    if (active) {
      setMood(active.mood);
      setBubble(active.msg);
    }
  }, [hasScrolled, rawY]);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  // Auto-hide bubble after 2.5s then show again on milestone
  useEffect(() => {
    setShowBubble(true);
    const t = setTimeout(() => setShowBubble(false), 2800);
    return () => clearTimeout(t);
  }, [bubble]);

  const handleClick = () => {
    const msgs = ["You found me! 🎊", "DPS SPR 2027! 🎓", "Apply now! ✨", "Best school ever! 🏆"];
    setBubble(msgs[Math.floor(Math.random() * msgs.length)]);
    setMood("happy");
  };

  return (
    <div className="fixed right-4 sm:right-8 top-0 bottom-0 z-40 pointer-events-none"
      style={{ width: 120 }}>

      {/* Rope */}
      <div
        className="absolute right-[52px] pointer-events-none"
        style={{ top: ROPE_TOP, bottom: "15%" }}
      >
        {/* Main rope */}
        <div className="w-1.5 h-full rounded-full"
          style={{ background: "linear-gradient(180deg, #8B6914 0%, #C9A030 30%, #8B6914 60%, #C9A030 100%)" }}
        />
        {/* Rope texture knots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-2 rounded-full left-1/2 -translate-x-1/2"
            style={{ top: `${(i / 11) * 92}%`, background: "#8B6914", opacity: 0.6 }}
          />
        ))}
      </div>

      {/* Ellie on the rope */}
      <motion.div
        className="absolute right-0 pointer-events-auto"
        style={{ y: smoothY, x: -8 }}
      >
        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          {showBubble && bubble && (
            <motion.div
              key={bubble}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-full mr-3 bottom-[60%] w-36"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
            >
              <div className="bg-white rounded-2xl rounded-br-sm px-3 py-2.5 border border-gray-100">
                <p className="text-xs font-bold text-gray-800 leading-tight text-center">{bubble}</p>
              </div>
              {/* Bubble tail */}
              <div className="absolute right-0 bottom-0 translate-x-1 translate-y-0.5">
                <div className="w-0 h-0"
                  style={{ borderLeft:"8px solid transparent", borderRight:"8px solid #ffffff", borderTop:"8px solid #ffffff", borderBottom:"8px solid transparent" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ellie */}
        <EllieSVG
          mood={mood}
          size={110}
          onClick={handleClick}
          className="drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
}
