"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CounterProps } from "./types";

export default function AnimatedCounter({
  end,
  suffix,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={2.4}
          separator=","
          suffix={suffix}
        />
      ) : (
        "0"
      )}
    </span>
  );
}