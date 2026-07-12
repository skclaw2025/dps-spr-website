"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* Big word-stack headline (one word/phrase per line, staggered reveal). */
const LINES: { t: string; gold?: boolean }[] = [
  { t: "A Place" },
  { t: "Where" },
  { t: "Children" },
  { t: "Discover", gold: true },
  { t: "Who They" },
  { t: "Can Become." },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative w-full" style={{ minHeight: "100svh", background: "#f8f9f4" }}>
      {/* ── Background (clipped here, so content can never be cut) ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/images/hero-bg.png" alt="" fill priority className="object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "rgba(248,249,244,0.18)" }} />
      </div>

      {/* ── Content: full height, vertically centered, grows if needed ── */}
      <motion.div className="relative z-10 flex min-h-[100svh] items-center" style={{ y, opacity }}>
        <div className="wrap w-full">
          <div
            className="max-w-4xl"
            style={{ paddingTop: "clamp(96px, 13vh, 140px)", paddingBottom: "clamp(56px, 9vh, 110px)" }}
          >
            {/* eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="pill-gold"
            >
              Admissions Open · April 2027
            </motion.span>

            {/* BIG word-stack headline — sized by the SMALLER of width & height so it never overflows */}
            <h1
              className="mt-6 font-serif font-bold"
              style={{
                fontSize: "clamp(2.7rem, min(7.6vw, 8.6vh), 5.7rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
              }}
            >
              {LINES.map((w, i) => (
                <span key={w.t} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={ready ? { y: "0%" } : {}}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    style={w.gold ? { color: "var(--color-gold-ink)" } : undefined}
                  >
                    {w.t}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link href="/admissions" className="btn-orange">Join the Founding Batch →</Link>
              <Link href="/visit" className="btn-outline-dark">Book a Visit</Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}