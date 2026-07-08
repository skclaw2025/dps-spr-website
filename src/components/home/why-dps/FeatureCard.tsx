"use client";

import { motion } from "framer-motion";

import FeatureItem from "./FeatureItem";
import { features } from "./data";

export default function FeatureCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -80,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/50
        bg-white/70
        p-8
        shadow-[0_35px_80px_rgba(0,0,0,.08)]
        backdrop-blur-xl
      "
    >
      {/* Decorative Circle */}

      <div
        className="
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-[#0F6B50]/5
        "
      />

      {/* Decorative Circle */}

      <div
        className="
          absolute
          -bottom-16
          -left-16
          h-40
          w-40
          rounded-full
          bg-[#D8B24C]/10
        "
      />

      <div className="relative z-10">

        <div className="mb-8">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#0F6B50]
            "
          >
            Why Families Choose Us
          </p>

          <h3
            className="
              mt-3
              text-4xl
              font-black
              leading-tight
              text-[#222]
            "
          >
            Inspiring Every Child
            <br />
            To Dream Bigger.
          </h3>

        </div>

        <div className="space-y-3">

          {features.map((feature, index) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}

        </div>

      </div>

    </motion.div>
  );
}