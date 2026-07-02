"use client";
import { useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import EllieSVG, { type EllieMood } from "./EllieSVG";

const MILESTONES = [
  { pct: 0,  mood: "wave"  as EllieMood, msg: "Hi! I'm Ellie! 👋" },
  { pct: 12, mood: "climb" as EllieMood, msg: "Come explore! 🌟"  },
  { pct: 30, mood: "climb" as EllieMood, msg: "World-class campus! 🏫" },
  { pct: 50, mood: "climb" as EllieMood, msg: "20+ sports here! 🏊" },
  { pct: 68, mood: "climb" as EllieMood, msg: "Amazing labs await! 🔬" },
  { pct: 84, mood: "happy" as EllieMood, msg: "Apply for 2027! 🎓" },
  { pct: 96, mood: "happy" as EllieMood, msg: "Join our family! 💚" },
];

export default function ScrollEllie() {
  const [mood,      setMood]      = useState<EllieMood>("wave");
  const [bubble,    setBubble]    = useState("Hi! I'm Ellie! 👋");
  const [showBubble,setShowBubble]= useState(true);
  const [prevMs,    setPrevMs]    = useState(0);

  const rawY    = useMotionValue(80);
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 16 });

  const update = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const pct = Math.min(100, (window.scrollY / docH) * 100);
    const maxY = window.innerHeight * 0.78 - 110;
    rawY.set(80 + (pct / 100) * Math.max(0, maxY - 80));
    const active = [...MILESTONES].reverse().find(m => pct >= m.pct);
    if (active && active.pct !== prevMs) {
      setPrevMs(active.pct);
      setMood(active.mood);
      setBubble(active.msg);
      setShowBubble(true);
    }
  }, [rawY, prevMs]);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(false), 2600);
    return () => clearTimeout(t);
  }, [bubble]);

  const handleClick = () => {
    const msgs = ["Click me! 😄", "DPS SPR 2027! 🎊", "Best school! 🏆", "Join us! 🌟"];
    setBubble(msgs[Math.floor(Math.random() * msgs.length)]);
    setMood("happy");
    setShowBubble(true);
  };

  return (
    /* Hidden on mobile — only shows on md+ screens */
    <div className="hidden md:block fixed z-40 pointer-events-none"
      style={{ right: 12, top: 0, bottom: 0, width: 110 }}
    >
      {/* Rope */}
      <div className="absolute pointer-events-none"
        style={{ right: 44, top: 80, bottom: "18%" }}>
        <div className="w-1.5 h-full rounded-full"
          style={{ background: "repeating-linear-gradient(180deg,#8B6914 0px,#C9A030 6px,#8B6914 12px)" }} />
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="absolute w-3 h-1.5 rounded-full"
            style={{ top:`${(i/9)*92}%`, left:"50%", transform:"translateX(-50%)", background:"#6B4F0E", opacity:0.5 }} />
        ))}
      </div>

      {/* Ellie */}
      <motion.div className="absolute pointer-events-auto" style={{ y: smoothY, right: 0, x: -4 }}>
        <AnimatePresence mode="wait">
          {showBubble && (
            <motion.div key={bubble}
              initial={{ opacity:0, x:8, scale:0.85 }}
              animate={{ opacity:1, x:0, scale:1 }}
              exit={{ opacity:0, x:8, scale:0.85 }}
              transition={{ duration:0.25 }}
              className="absolute right-full mr-2 bottom-[55%] w-28"
            >
              <div className="bg-white rounded-xl rounded-br-sm px-2.5 py-2 border border-gray-100"
                style={{ boxShadow:"0 4px 14px rgba(0,0,0,0.13)" }}>
                <p className="text-[11px] font-bold text-gray-800 text-center leading-tight">{bubble}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <EllieSVG mood={mood} size={96} onClick={handleClick} className="drop-shadow-lg" />
      </motion.div>
    </div>
  );
}
