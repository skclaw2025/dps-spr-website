"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ImagePanelProps {
  image: string;
  title: string;
}

export default function ImagePanel({
  image,
  title,
}: ImagePanelProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.div
          key={image}
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="40vw"
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Title */}
          <div className="absolute bottom-10 left-10 z-20">
            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
              }}
              className="text-4xl font-bold text-white"
            >
              {title}
            </motion.h2>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}