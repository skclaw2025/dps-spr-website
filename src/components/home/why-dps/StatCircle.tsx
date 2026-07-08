"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { CircleProps } from "./types";

export default function StatCircle({ stat }: CircleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      animate={{ y: [0, -10, 0] }}
      whileHover={{ scale: 1.08, rotate: 2 }}
      className="absolute scale-75 sm:scale-90 lg:scale-100"
      style={{ top: stat.top, left: stat.left }}
    >
      <motion.div
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`
          relative flex flex-col items-center justify-center
          h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-44 lg:w-44
          rounded-full border-[10px]
          ${stat.color === "green"
            ? "bg-[#0F6B50] border-[#E8E2D4]"
            : "bg-white border-[#F4F1EA]"
          }
          shadow-[0_25px_60px_rgba(0,0,0,0.18)]
        `}
      >
        {/* Decorative */}
        <span className="absolute inset-2 rounded-full border-2 border-dashed border-[#D8B24C]/40 rotate-6" />
        <span className="absolute top-3 right-6 h-4 w-10 rounded-full bg-[#D8B24C]/20 blur-sm" />

        {/* Number */}
        <h3 className={`
          text-base sm:text-lg md:text-xl lg:text-2xl
          font-black leading-none
          ${stat.color === "green" ? "text-white" : "text-[#0F6B50]"}
        `}>
          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
        </h3>

        {/* Title */}
        <p className={`
          mt-1
          text-xs sm:text-sm md:text-sm lg:text-base
          font-semibold text-center leading-tight px-2
          ${stat.color === "green" ? "text-white" : "text-[#0F6B50]"}
        `}>
          {stat.title}
        </p>

        {/* Subtitle */}
        <p className={`
          mt-0.5
          text-[10px] sm:text-xs md:text-xs lg:text-xs
          text-center leading-tight px-3
          ${stat.color === "green" ? "text-white/80" : "text-neutral-600"}
        `}>
          {stat.subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}