"use client";

import { motion } from "framer-motion";
import {
  Building2,
  BookOpen,
  Globe2,
  Sparkles,
  Trophy,
  CheckCircle2,
} from "lucide-react";

import { Feature } from "./types";

interface Props {
  feature: Feature;
  index: number;
}

const icons = {
  building: Building2,
  book: BookOpen,
  globe: Globe2,
  sparkles: Sparkles,
  trophy: Trophy,
};

export default function FeatureItem({
  feature,
  index,
}: Props) {
  const Icon =
    icons[feature.icon as keyof typeof icons] ?? CheckCircle2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.12,
        duration: 0.55,
      }}
      whileHover={{
        x: 10,
      }}
      className="group"
    >
      <div
        className="
          flex
          items-start
          gap-5
          rounded-2xl
          p-5
          transition-all
          duration-300
          hover:bg-white
          hover:shadow-xl
        "
      >
        {/* Icon */}

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#0F6B50]
            text-white
            shadow-lg
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-6
          "
        >
          <Icon size={26} />
        </div>

        {/* Text */}

        <div>

          <h4
            className="
              text-xl
              font-bold
              text-[#0F6B50]
            "
          >
            {feature.title}
          </h4>

          <p
            className="
              mt-2
              text-[15px]
              leading-7
              text-neutral-600
            "
          >
            {feature.description}
          </p>

        </div>

      </div>

    </motion.div>
  );
}