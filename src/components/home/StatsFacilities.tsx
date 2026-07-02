"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Waves, Trophy, FlaskConical, BookOpen, Baby,
  Cpu, Music, Dumbbell, Leaf, GraduationCap,
} from "lucide-react";

// ── Animated counter ─────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }: {
  end: number; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// ── Stats data ───────────────────────────────────────────────
const STATS = [
  { end: 3,   suffix: "+", label: "Acres of",       sub: "Lush Green Playground",   color: "#006C33" },
  { end: 20,  suffix: "+", label: "Sports",          sub: "Disciplines Offered",     color: "#D97706" },
  { end: 10,  suffix: "+", label: "Modern",          sub: "Academic Laboratories",   color: "#1D4ED8" },
  { end: 500, suffix: "+", label: "DPS Schools",     sub: "Across India",            color: "#7C3AED" },
  { end: 75,  suffix: "+", label: "Years of",        sub: "DPS Society Legacy",      color: "#006C33" },
  { end: 100, suffix: "%", label: "Focus on",        sub: "Holistic Development",    color: "#DC2626" },
];

// ── Facility cards ───────────────────────────────────────────
const FACILITIES = [
  {
    icon: Waves,       color: "#1D4ED8", bg: "#EFF6FF",
    name: "Aquatic Complex",
    desc: "Swimming pool + Splash pool for young children",
  },
  {
    icon: Trophy,      color: "#006C33", bg: "#E8F5EE",
    name: "Sports Complex",
    desc: "20+ sports — badminton, basketball, lawn tennis, pickleball & more",
  },
  {
    icon: FlaskConical,color: "#7C3AED", bg: "#F5F3FF",
    name: "Science Labs",
    desc: "Physics, Chemistry, Biology — composite & specialist labs",
  },
  {
    icon: Cpu,         color: "#D97706", bg: "#FFFBEB",
    name: "Robotics & ATL Lab",
    desc: "Atal Tinkering Lab — STEM, robotics, 3D printing & innovation",
  },
  {
    icon: BookOpen,    color: "#006C33", bg: "#E8F5EE",
    name: "Two-Floor Library",
    desc: "Modern library with digital resources and quiet reading spaces",
  },
  {
    icon: Baby,        color: "#EC4899", bg: "#FDF2F8",
    name: "Early Years Wing",
    desc: "Dedicated spaces for Nursery to Class 2 — designed for little ones",
  },
  {
    icon: Cpu,         color: "#0891B2", bg: "#ECFEFF",
    name: "VR Lab",
    desc: "Virtual Reality learning — immersive science, history & geography",
  },
  {
    icon: Music,       color: "#7C3AED", bg: "#F5F3FF",
    name: "Performing Arts",
    desc: "Music, dance, drama — dedicated studio and rehearsal spaces",
  },
  {
    icon: Dumbbell,    color: "#DC2626", bg: "#FFF5F5",
    name: "Fitness & Yoga",
    desc: "Dedicated fitness programme + yoga for all students daily",
  },
  {
    icon: Leaf,        color: "#006C33", bg: "#E8F5EE",
    name: "Lush Green Campus",
    desc: "3+ acres of trees, gardens, open spaces and fresh air",
  },
  {
    icon: GraduationCap, color: "#D97706", bg: "#FFFBEB",
    name: "Ice Sports Centre",
    desc: "Special classes — Ice Skating, Ice Figure Skating & Ice Hockey",
  },
  {
    icon: Trophy,      color: "#0891B2", bg: "#ECFEFF",
    name: "Roller Sports",
    desc: "Roller Skating, Roller Figure Skating, Roller Hockey, Roll Ball",
  },
];

export default function StatsFacilities() {
  const statsRef  = useRef(null);
  const statsView = useInView(statsRef, { once: true, amount: 0.2 });
  const facilRef  = useRef(null);
  const facilView = useInView(facilRef, { once: true, amount: 0.1 });

  return (
    <section className="section bg-[#F9FAFB] border-t border-black/[0.05]">
      <div className="wrap">

        {/* ── Stats grid ── */}
        <div ref={statsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={statsView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-10"
          >
            <div className="gold-bar" />
            <p className="t-label text-gray-400">By the Numbers</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black/[0.06] rounded-2xl overflow-hidden">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22,1,0.36,1] }}
                className="bg-white px-6 py-8 flex flex-col gap-1 group hover:bg-[#006C33] transition-colors duration-400 cursor-default"
              >
                <p className="font-serif font-bold leading-none transition-colors duration-300"
                  style={{
                    fontSize: "clamp(2rem,3.5vw,2.75rem)",
                    color: s.color,
                  }}
                >
                  <Counter end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-[11px] font-bold text-gray-500 group-hover:text-white/60 transition-colors duration-300 tracking-wide mt-1">
                  {s.label}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-white/45 transition-colors duration-300 leading-snug">
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Facilities ── */}
        <div ref={facilRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={facilView ? { opacity: 1, y: 0 } : {}}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="gold-bar" />
              <div>
                <p className="t-label text-gray-400">World-Class Facilities</p>
                <h3 className="t-h2 text-ink mt-1">
                  Everything your child{" "}
                  <span style={{ background:"linear-gradient(135deg,#004F24,#006C33)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                    needs to thrive.
                  </span>
                </h3>
              </div>
            </div>
            <p className="t-label text-gray-300 hidden sm:block">Scroll to explore →</p>
          </motion.div>

          {/* Horizontal scroll strip */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg,#F9FAFB,transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{ background: "linear-gradient(270deg,#F9FAFB,transparent)" }} />

            <div
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {FACILITIES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={facilView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22,1,0.36,1] }}
                    className="flex-shrink-0 bg-white rounded-2xl border border-black/[0.06] p-5 group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
                    style={{
                      width: 220,
                      scrollSnapAlign: "start",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: f.bg }}
                    >
                      <Icon size={20} style={{ color: f.color }} strokeWidth={2} />
                    </div>
                    {/* Name */}
                    <p className="font-bold text-ink text-sm mb-1.5 leading-tight">{f.name}</p>
                    {/* Desc */}
                    <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                    {/* Bottom bar */}
                    <div
                      className="mt-4 h-0.5 rounded-full w-8 transition-all duration-400 group-hover:w-full"
                      style={{ background: f.color }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
