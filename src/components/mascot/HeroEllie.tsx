"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EllieSVG from "./EllieSVG";

const MESSAGES = [
  "Hi! I'm Ellie! 👋\nExplore our school below!",
  "DPS SPR opens\nApril 2027! 🎓",
  "Scroll down to see\nour amazing campus! 🏫",
];

export default function HeroEllie() {
  const [msg, setMsg]     = useState(0);
  const [show, setShow]   = useState(true);
  const [mood, setMood]   = useState<"wave"|"happy">("wave");

  const handleClick = () => {
    const next = (msg + 1) % MESSAGES.length;
    setMsg(next);
    setMood("happy");
    setShow(false);
    setTimeout(() => { setShow(true); setMood("wave"); }, 200);
  };

  return (
    <motion.div
      className="absolute bottom-16 right-6 sm:right-14 z-30 flex flex-col items-end"
      initial={{ opacity: 0, y: 60, scale: 0.82 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-2 mr-4"
          >
            <div
              className="bg-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[170px] text-center"
              style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.20)" }}
            >
              {MESSAGES[msg].split("\n").map((line, i) => (
                <p key={i} className="text-xs font-bold text-ink leading-snug">{line}</p>
              ))}
            </div>
            {/* Tail */}
            <div className="flex justify-end mr-3">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid white",
                  borderTop: "8px solid white",
                  borderBottom: "8px solid transparent",
                  filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.08))",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ellie floating */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <EllieSVG
          mood={mood}
          size={152}
          onClick={handleClick}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        className="w-20 h-2.5 rounded-full mx-auto"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.28) 0%, transparent 70%)" }}
        animate={{ scaleX: [1, 0.82, 1], opacity: [0.28, 0.16, 0.28] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
