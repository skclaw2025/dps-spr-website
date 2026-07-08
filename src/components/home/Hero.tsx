"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const ref    = useRef<HTMLElement>(null);
  const [noVid, setNoVid] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#f8f9f4" }}
    >
      {/* ── Watercolor BG image ── */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* ── Subtle white wash so text stays readable ── */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "rgba(248,249,244,0.18)" }} />

      {/* ── Main content grid ── */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center"
        style={{ y: contentY, opacity }}
      >
        <div className="wrap w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            style={{ paddingTop: "clamp(100px,18vh,160px)", paddingBottom: "clamp(60px,10vh,100px)" }}>

            {/* ── LEFT: Text ── */}
            <div className="flex flex-col justify-center">

              
              {/* ── BIG headline — NIS style ── */}
              <div className="overflow-hidden">
                {ready && (
                  <>
                    {[
                      { text: "A Place",  delay: 0.1,  gold: false },
                      { text: "Where",    delay: 0.22, gold: false },
                      { text: "Children", delay: 0.34, gold: false },
                      { text: "Discover", delay: 0.46, gold: true  },
                      { text: "Who They", delay: 0.58, gold: false },
                      { text: "Can Become.", delay: 0.70, gold: false },
                    ].map((w) => (
                      <div key={w.text} className="overflow-hidden leading-none">
                        <motion.h1
                          initial={{ y: "105%" }}
                          animate={{ y: "0%" }}
                          transition={{ delay: w.delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                          className="block font-serif font-bold leading-[1.0]"
                          style={{
                            fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
                            letterSpacing: "-0.03em",
                            color: w.gold ? "#C9A030" : "#111827",
                          }}
                        >
                          {w.text}
                        </motion.h1>
                      </div>
                    ))}
                  </>
                )}
              </div>

              
            </div>

            {/* ── RIGHT: Video window ── */}
            {ready && (
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full lg:w-[118%] lg:-ml-8"
                style={{ aspectRatio: "16/10" }}
              >
                {/* Video frame */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  {!noVid ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay muted loop playsInline preload="auto"
                      onError={() => setNoVid(true)}
                      style={{ WebkitPlaysinline: true } as React.CSSProperties}
                    >
                      <source src="/videos/campus1.mp4"  type="video/mp4" />
                      <source src="/videos/campus.webm" type="video/webm" />
                    </video>
                  ) : (
                    /* Fallback gradient */
                    <div className="w-full h-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,#003D1E,#006C33)" }}>
                      <div className="text-center">
                        <p className="text-white/50 text-sm font-medium">Campus Video</p>
                      </div>
                    </div>
                  )}

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-end justify-end p-5 pointer-events-none">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
                      <div className="w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                        <Play size={9} style={{ fill: "#111827", color: "#111827", marginLeft: 1 }} />
                      </div>
                      Play Full Video
                    </div>
                  </div>
                </div>

                {/* DPS Society badge — bottom left of video */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute -bottom-5 -left-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: "white",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#006C33" }}>
                    <span className="text-white text-xs font-bold">DPS</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">DPS Society</p>
                    <p className="text-[10px] text-gray-400">New Delhi · Est. 1949</p>
                  </div>
                </motion.div>

                {/* Founding batch badge — top right of video */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "#006C33",
                    boxShadow: "0 6px 20px rgba(0,108,51,0.30)",
                  }}
                >
                  <p className="text-white text-[11px] font-bold tracking-wide">⭐ Founding Batch</p>
                  <p className="text-white/70 text-[10px]">April 2027 · Limited Seats</p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
