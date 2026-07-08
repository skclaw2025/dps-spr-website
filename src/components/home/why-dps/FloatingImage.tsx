"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

import StatCircle from "./StatCircle";
import { stats } from "./data";

export default function FloatingImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 60,
    damping: 18,
  });

  const y = useSpring(mouseY, {
    stiffness: 60,
    damping: 18,
  });

  function handleMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set((e.clientX - rect.width / 2) / 35);

    mouseY.set((e.clientY - rect.height / 2) / 35);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x,
        y,
      }}
      className="
relative
w-full
h-[420px]
sm:h-[520px]
md:h-[650px]
lg:h-[980px]
"
    >
      {/* School Image */}

      <motion.div
        initial={{
          opacity: 0,
          scale: .88,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: .9,
        }}
        className="
relative
overflow-hidden
w-full
max-w-[760px]
mx-auto
lg:absolute
lg:right-0
lg:top-0
          rounded-[5px]
          shadow-[0_40px_120px_rgba(0,0,0,.18)]
        "
      >
        <Image
    src="/images/front.jpg"
    alt="DPS SPR"
    width={820}
    height={900}
    priority
    className="
        w-full

        h-[320px]

        sm:h-[420px]

        md:h-[520px]

        lg:h-[760px]

        xl:h-[820px]

        object-cover
        transition-all
        duration-700
        hover:scale-105
    "
/>

        {/* Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0F6B50]/30
            via-transparent
            to-transparent
          "
        />
      </motion.div>

      {/* Floating Statistics */}

      {stats.map((stat) => (
        <StatCircle
          key={stat.id}
          stat={stat}
        />
      ))}
    </motion.div>
  );
}