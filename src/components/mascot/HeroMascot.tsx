"use client";
// Ellie standing in front of the hero video — bottom right
import { motion } from "framer-motion";
import EllieSVG from "./EllieSVG";
import { useState } from "react";

export default function HeroMascot() {
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      className="absolute bottom-20 right-8 sm:right-16 z-30 flex flex-col items-center"
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Intro bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-2 relative"
        style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.25))" }}
      >
        <div className="bg-white rounded-2xl rounded-b-sm px-4 py-3 max-w-[180px]">
          <p className="text-xs font-bold text-gray-800 text-center leading-tight">
            {clicked ? "See you inside! 🏫✨" : "Hi! I'm Ellie!\nScroll down to explore 👇"}
          </p>
        </div>
        {/* Tail pointing down */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
          <div className="w-0 h-0"
            style={{ borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderTop:"12px solid #ffffff" }}
          />
        </div>
      </motion.div>

      {/* Ellie */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <EllieSVG
          mood={clicked ? "happy" : "wave"}
          size={160}
          onClick={() => setClicked(c => !c)}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        className="w-24 h-3 rounded-full mt-1"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)" }}
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
