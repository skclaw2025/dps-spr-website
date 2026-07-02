"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ExternalLink } from "lucide-react";

// ─── Stage data ───────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "early", label: "Early Years", short: "Nursery – Class 2",
    age: "Ages 3 – 8", color: "#EC4899", colorDark: "#9D174D",
    colorPale: "#FDF2F8", emoji: "🌸",
    grad: "linear-gradient(135deg,#F9A8D4,#EC4899)",
    desc: "The most magical years. Play, wonder, creativity and emotional safety — every single day.",
    highlights: [
      { icon:"🎨", text:"Play-based learning & creativity" },
      { icon:"📖", text:"Early literacy & phonics"         },
      { icon:"🎵", text:"Music, dance & performing arts"   },
      { icon:"🌿", text:"Nature walks & discovery"         },
      { icon:"💛", text:"Emotional safety & friendships"   },
      { icon:"🏊", text:"Splash pool & indoor play"        },
    ],
    quote: "Every child is a seed of extraordinary potential. Our job is to make sure every one gets sunlight.",
    page: "/kindergarten", pageLbl: "Explore Early Years",
  },
  {
    id: "primary", label: "Primary Years", short: "Class 3 – Class 5",
    age: "Ages 8 – 11", color: "#006C33", colorDark: "#004F24",
    colorPale: "#E8F5EE", emoji: "🚀",
    grad: "linear-gradient(135deg,#6EE7A0,#006C33)",
    desc: "Curiosity takes flight. Children discover their passions and build the confidence to pursue them.",
    highlights: [
      { icon:"🧠", text:"Critical thinking & reasoning" },
      { icon:"🔬", text:"Science & maths labs"          },
      { icon:"💻", text:"Coding & digital literacy"     },
      { icon:"🏏", text:"20+ sports disciplines"        },
      { icon:"🎭", text:"Drama, debate & speaking"      },
      { icon:"🤝", text:"Leadership & community"        },
    ],
    quote: "This is where children discover that learning is the greatest adventure of their lives.",
    page: "/learning-journey", pageLbl: "Primary Programme",
  },
  {
    id: "middle", label: "Middle Years", short: "Class 6 – Class 7",
    age: "Ages 11 – 13", color: "#1D4ED8", colorDark: "#1E3A8A",
    colorPale: "#EFF6FF", emoji: "⭐",
    grad: "linear-gradient(135deg,#93C5FD,#1D4ED8)",
    desc: "Potential meets purpose. Students explore careers, lead teams and shape the future.",
    highlights: [
      { icon:"🤖", text:"Robotics & ATL Innovation Lab"  },
      { icon:"🌐", text:"VR & immersive learning"        },
      { icon:"📊", text:"Research & project work"        },
      { icon:"🏆", text:"Competitive sports & skating"   },
      { icon:"🎓", text:"Career exploration & mentorship"},
      { icon:"🌍", text:"Global citizenship & ethics"    },
    ],
    quote: "We prepare students not just for the next class — but for the next chapter of their extraordinary life.",
    page: "/learning-journey", pageLbl: "Middle Programme",
  },
] as const;

// ─── Car dot ──────────────────────────────────────────────────────────────────
function CarDot({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 36, height: 36, background: color, opacity: 0.18 }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.18, 0, 0.18] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Mid ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 24, height: 24, background: color, opacity: 0.28 }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.28, 0.05, 0.28] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
      />
      {/* Core dot */}
      <div
        className="relative rounded-full border-2 border-white"
        style={{
          width: 16, height: 16,
          background: color,
          boxShadow: `0 0 0 3px ${color}40, 0 3px 12px ${color}70`,
        }}
      />
      {/* Inner shine */}
      <div
        className="absolute rounded-full bg-white"
        style={{ width: 5, height: 5, top: 5, left: 8, opacity: 0.65 }}
      />
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function StageModal({ stage, onClose }: {
  stage: typeof STAGES[number] | null;
  onClose: () => void;
}) {
  if (!stage) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ backdropFilter: "blur(14px)", background: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.86, y: 40 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl overflow-hidden max-w-md w-full"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.22)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-8 pt-7 pb-6" style={{ background: stage.grad }}>
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors">
              <X size={16} className="text-white" />
            </button>
            <div className="flex items-center gap-4">
              {/* Big emoji */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl flex-shrink-0">
                {stage.emoji}
              </div>
              <div>
                <span className="text-white/65 text-[11px] font-bold tracking-widest uppercase">{stage.age}</span>
                <h3 className="font-serif font-bold text-2xl text-white leading-tight">{stage.label}</h3>
                <p className="text-white/70 text-sm">{stage.short}</p>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="p-7">
            <p className="text-gray-500 leading-relaxed text-sm mb-5">{stage.desc}</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {stage.highlights.map(h => (
                <div key={h.text}
                  className="flex items-start gap-2 rounded-xl p-2.5"
                  style={{ background: stage.colorPale }}>
                  <span className="text-sm flex-shrink-0">{h.icon}</span>
                  <span className="text-[11px] font-semibold leading-snug"
                    style={{ color: stage.colorDark }}>{h.text}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 mb-5 border-l-4"
              style={{ background: stage.colorPale, borderColor: stage.color }}>
              <p className="text-xs italic font-medium leading-relaxed"
                style={{ color: stage.colorDark }}>&ldquo;{stage.quote}&rdquo;</p>
            </div>
            <Link href={stage.page}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: stage.grad, boxShadow: `0 4px 20px ${stage.color}40` }}
              onClick={onClose}>
              {stage.pageLbl} <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LearningJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef(null);
  const titleView  = useInView(titleRef, { once: true, amount: 0.25 });
  const [active, setActive]       = useState<typeof STAGES[number] | null>(null);
  const [dotColor, setDotColor]   = useState("#EC4899");

  // Road waypoints — match SVG path exactly
  const WX = [55,  130, 220, 340, 450, 570, 680, 790, 860];
  const WY = [210, 210, 310, 340, 310, 210, 210, 310, 260];
  const WP = [0, 0.11, 0.24, 0.37, 0.50, 0.62, 0.74, 0.87, 1.0];

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start center", "end center"],
  });

  const rawX = useTransform(scrollYProgress, WP, WX);
  const rawY = useTransform(scrollYProgress, WP, WY);

  // Very responsive spring
  const dotX = useSpring(rawX, { stiffness: 280, damping: 32, mass: 0.4 });
  const dotY = useSpring(rawY, { stiffness: 280, damping: 32, mass: 0.4 });

  // Color transitions as dot passes each stage zone
  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => {
      if (v < 0.38)      setDotColor("#EC4899");
      else if (v < 0.70) setDotColor("#006C33");
      else               setDotColor("#1D4ED8");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {active && <StageModal stage={active} onClose={() => setActive(null)} />}

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white border-t border-black/[0.05]"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        

        <div className="wrap relative z-10">

          {/* ── Header ── */}
          <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={titleView ? { opacity: 1, y: 0 } : {}}
              className="flex justify-center mb-4"
            >
              <span className="pill-green">The DPS SPR Learning Journey</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={titleView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.22,1,0.36,1] }}
              className="t-h1 text-ink text-balance"
            >
              A road built for{" "}
              <span style={{
                background: "linear-gradient(135deg,#EC4899 0%,#006C33 50%,#1D4ED8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                every child.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={titleView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="text-gray-400 text-sm mt-4 leading-relaxed"
            >
              Scroll to move through each stage of the journey.
              Tap any milestone card to explore that programme.
            </motion.p>
          </div>

          {/* ── Road canvas ── */}
          <div
            className="relative mx-auto"
            style={{ width: "100%", maxWidth: 920, height: 420 }}
          >
            {/* SVG road */}
            <svg
              viewBox="0 0 900 420"
              className="absolute inset-0 w-full h-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Road gradient: pink → green → blue */}
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#EC4899" stopOpacity="0.18"/>
                  <stop offset="40%"  stopColor="#006C33" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.18"/>
                </linearGradient>
                <linearGradient id="roadStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#EC4899" stopOpacity="0.35"/>
                  <stop offset="40%"  stopColor="#006C33" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.35"/>
                </linearGradient>
                {/* Shadow filter */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.06"/>
                </filter>
              </defs>

              {/* ── Road layers ── */}
              {/* Wide soft road fill */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="url(#roadGrad)"
                strokeWidth="52"
                strokeLinecap="round"
                fill="none"
              />
              {/* Road border — top edge */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="url(#roadStroke)"
                strokeWidth="52"
                strokeLinecap="round"
                fill="none"
              />
              {/* Inner road surface — slightly lighter */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="white"
                strokeWidth="42"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              {/* Road surface color */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="#F3F4F6"
                strokeWidth="38"
                strokeLinecap="round"
                fill="none"
              />
              {/* Road edge lines */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Center dashed line — yellow road marking */}
              <path
                d="M 55 210 C 90 210 140 300 220 325 C 300 350 370 350 450 320 C 530 290 560 210 640 210 C 700 210 740 300 800 325 C 830 338 855 295 870 265"
                stroke="#FFD700"
                strokeWidth="2"
                strokeDasharray="20 14"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />

              {/* ── Milestone dots on road ── */}
              {/* Early Years — left */}
              <circle cx="55"  cy="210" r="20" fill="#EC4899" opacity="0.08"/>
              <circle cx="55"  cy="210" r="13" fill="#EC4899" opacity="0.14"/>
              <circle cx="55"  cy="210" r="8"  fill="#EC4899" opacity="0.90"/>
              <circle cx="55"  cy="210" r="3.5" fill="white"/>

              {/* Primary Years — bottom center */}
              <circle cx="450" cy="320" r="20" fill="#006C33" opacity="0.08"/>
              <circle cx="450" cy="320" r="13" fill="#006C33" opacity="0.14"/>
              <circle cx="450" cy="320" r="8"  fill="#006C33" opacity="0.90"/>
              <circle cx="450" cy="320" r="3.5" fill="white"/>

              {/* Middle Years — right */}
              <circle cx="870" cy="265" r="20" fill="#1D4ED8" opacity="0.08"/>
              <circle cx="870" cy="265" r="13" fill="#1D4ED8" opacity="0.14"/>
              <circle cx="870" cy="265" r="8"  fill="#1D4ED8" opacity="0.90"/>
              <circle cx="870" cy="265" r="3.5" fill="white"/>

              {/* ── Connector lines to label cards ── */}
              <line x1="55"  y1="193" x2="55"  y2="95"
                stroke="#EC4899" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
              <line x1="450" y1="338" x2="450" y2="410"
                stroke="#006C33" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
              <line x1="870" y1="248" x2="870" y2="95"
                stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
            </svg>

            {/* ── Moving dot (car) ── */}
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: 0, top: 0,
                x: dotX,
                y: dotY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <motion.div animate={{ color: dotColor }} transition={{ duration: 0.5 }}>
                <CarDot color={dotColor} />
              </motion.div>
            </motion.div>

            {/* ── EARLY YEARS card — top left ── */}
            <motion.button
              initial={{ opacity: 0, y: -12 }}
              animate={titleView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              onClick={() => setActive(STAGES[0])}
              className="absolute text-left group"
              style={{ left: "0%", top: "2%", width: 192 }}
            >
              <div className="bg-white rounded-2xl border-2 border-pink-100 p-4 shadow-sm group-hover:border-pink-300 group-hover:shadow-md group-hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0"/>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-pink-400">Ages 3 – 8</span>
                </div>
                <p className="font-serif font-bold text-ink text-base leading-tight mb-0.5">Early Years</p>
                <p className="text-gray-400 text-[11px]">Nursery · Prep · Class 1–2</p>
                <div className="flex items-center gap-1 text-pink-500 text-[11px] font-bold mt-3">
                  Tap to explore <ArrowRight size={10}/>
                </div>
              </div>
              {/* Connector dot below card */}
              <div className="w-px h-12 bg-pink-200 ml-[2.2rem]"/>
            </motion.button>

            {/* ── PRIMARY YEARS card — bottom center ── */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={titleView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              onClick={() => setActive(STAGES[1])}
              className="absolute text-left group"
              style={{ left: "40%", bottom: "0%", transform: "translateX(-50%)", width: 192 }}
            >
              <div className="w-px h-10 bg-green-200 ml-[2.2rem]"/>
              <div className="bg-white rounded-2xl border-2 border-green-100 p-4 shadow-sm group-hover:border-green-400 group-hover:shadow-md group-hover:translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"/>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-green-600">Ages 8 – 11</span>
                </div>
                <p className="font-serif font-bold text-ink text-base leading-tight mb-0.5">Primary Years</p>
                <p className="text-gray-400 text-[11px]">Class 3 · Class 4 · Class 5</p>
                <div className="flex items-center gap-1 text-green-600 text-[11px] font-bold mt-3">
                  Tap to explore <ArrowRight size={10}/>
                </div>
              </div>
            </motion.button>

            {/* ── MIDDLE YEARS card — top right ── */}
            <motion.button
              initial={{ opacity: 0, y: -12 }}
              animate={titleView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              onClick={() => setActive(STAGES[2])}
              className="absolute text-left group"
              style={{ right: "0%", top: "2%", width: 192 }}
            >
              <div className="bg-white rounded-2xl border-2 border-blue-100 p-4 shadow-sm group-hover:border-blue-400 group-hover:shadow-md group-hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"/>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500">Ages 11 – 13</span>
                </div>
                <p className="font-serif font-bold text-ink text-base leading-tight mb-0.5">Middle Years</p>
                <p className="text-gray-400 text-[11px]">Class 6 · Class 7</p>
                <div className="flex items-center gap-1 text-blue-500 text-[11px] font-bold mt-3">
                  Tap to explore <ArrowRight size={10}/>
                </div>
              </div>
              <div className="w-px h-12 bg-blue-200 ml-[2.2rem]"/>
            </motion.button>
          </div>

          {/* ── Stage pills ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {STAGES.map(s => (
              <button key={s.id} onClick={() => setActive(s)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: s.color,
                  background:  `${s.color}10`,
                  color:       s.colorDark,
                }}
              >
                {s.emoji} {s.label}
                <span className="opacity-50 font-normal">{s.age}</span>
              </button>
            ))}
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.95 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-[#F9FAFB] border border-black/[0.06] rounded-3xl p-6 sm:p-8"
          >
            <div className="text-center sm:text-left">
              <p className="font-serif font-bold text-ink text-xl mb-1">
                Every child&apos;s journey is unique.
              </p>
              <p className="text-gray-400 text-sm">
                Talk to our team to understand how DPS SPR supports your child at every stage.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/learning-journey"
                className="btn-green btn-sm inline-flex items-center gap-1.5 group">
                Full Learning Journey
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link href="/admissions" className="btn-outline-dark btn-sm inline-flex">
                Apply for 2027
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
