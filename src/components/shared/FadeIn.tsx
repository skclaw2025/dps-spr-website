"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children, delay = 0, y = 28, x = 0, className = "", once = true
}: Props) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
