"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Trophy, Zap, Heart, Star } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";

const CARDS = [
  {
    icon:    Trophy,
    color:   "#006C33",
    bg:      "#E8F5EE",
    label:   "DPS Society Legacy",
    stat:    "75+",
    statSub: "Years of Excellence",
    body:    "Part of India's most trusted school network since 1949. Over 500 DPS schools. A name every parent knows and trusts — now in Gurugram's fastest-growing corridor.",
    href:    "/vision",
    cta:     "Our Story",
  },
  {
    icon:    Zap,
    color:   "#D4A800",
    bg:      "#FFFBEB",
    label:   "Future-Ready Learning",
    stat:    "10+",
    statSub: "Modern Labs",
    body:    "Robotics, VR, AI literacy, coding, design thinking — woven into daily learning from Class 1. Your child won't just study for tomorrow. They'll build it.",
    href:    "/future-ready",
    cta:     "See Our Labs",
  },
  {
    icon:    Heart,
    color:   "#DC2626",
    bg:      "#FFF5F5",
    label:   "Whole Child Approach",
    stat:    "100%",
    statSub: "Holistic Focus",
    body:    "Academics are only the beginning. We build resilient, ethical, emotionally intelligent human beings — children who are as kind as they are brilliant.",
    href:    "/wellbeing",
    cta:     "Our Philosophy",
  },
  {
    icon:    Star,
    color:   "#7C3AED",
    bg:      "#F5F3FF",
    label:   "Beyond the Classroom",
    stat:    "20+",
    statSub: "Sports Disciplines",
    body:    "Swimming, ice skating, robotics clubs, performing arts, yoga — a complete childhood, not just a report card. Every child finds their own extraordinary here.",
    href:    "/beyond-classroom",
    cta:     "Explore Activities",
  },
];

function PillarCard({
  card, index,
}: {
  card: typeof CARDS[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Icon   = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay:    index * 0.12,
        duration: 0.7,
        ease:     [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white rounded-2xl border border-black/[0.06] overflow-hidden"
      style={{
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.08)"
          : "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        transform:  hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Top color strip */}
      <motion.div
        className="h-1 w-full"
        style={{ background: card.color }}
        animate={{ scaleX: hovered ? 1 : 0.35, originX: 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-7">
        {/* Icon + stat row */}
        <div className="flex items-start justify-between mb-5">
          {/* Icon bubble */}
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: card.bg }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={22} style={{ color: card.color }} strokeWidth={2} />
          </motion.div>

          {/* Stat */}
          <div className="text-right">
            <p
              className="font-serif font-bold text-3xl leading-none"
              style={{ color: card.color }}
            >
              {card.stat}
            </p>
            <p className="text-[10px] font-bold tracking-wider uppercase text-gray-400 mt-1">
              {card.statSub}
            </p>
          </div>
        </div>

        {/* Label */}
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
          style={{ color: card.color }}>
          {card.label}
        </p>

        {/* Body */}
        <p className="text-[0.9rem] text-gray-500 leading-relaxed mb-6">
          {card.body}
        </p>

        {/* CTA link */}
        <motion.div
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Link
            href={card.href}
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
            style={{ color: card.color }}
          >
            {card.cta}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Hover background wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at top left, ${card.bg} 0%, transparent 65%)`,
        }}
      />
    </motion.div>
  );
}

export default function WhyDPS() {
  const leftRef  = useRef(null);
  const leftView = useInView(leftRef, { once: true, amount: 0.2 });

  return (
    <section className="section bg-white">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── LEFT ── */}
          <div ref={leftRef} className="lg:sticky lg:top-28">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={leftView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="gold-bar" />
              <p className="t-label text-gray-400">Why Choose DPS SPR</p>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="t-h1 text-ink text-balance"
            >
              Will my child be{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#004F24,#006C33)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                happy
              </span>{" "}
              here?
            </motion.h2>

            {/* Gold underline */}
            <motion.div
              className="gold-bar mt-6 mb-7"
              initial={{ scaleX: 0, originX: 0 }}
              animate={leftView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="t-body text-gray-500 max-w-md"
            >
              That is the question every parent asks. At DPS SPR, every decision —
              the curriculum, the spaces, the teachers, the culture — is designed
              around that single question.
            </motion.p>

            {/* Secondary text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.7 }}
              className="t-sm text-gray-400 max-w-md mt-4"
            >
              We bring the values of the DPS Society — Service Before Self —
              together with modern innovation, world-class sports, and a deep love
              for every child's unique potential.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px bg-black/[0.06] my-8 max-w-md"
              initial={{ scaleX: 0, originX: 0 }}
              animate={leftView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.8 }}
            />

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42, duration: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/vision" className="btn-green group">
                Our Philosophy
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link href="/admissions" className="btn-outline-dark group">
                Apply for 2027
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            >
              {[
                { v: "3+",   l: "Acres of greenery"    },
                { v: "20+",  l: "Sports disciplines"   },
                { v: "2027", l: "Founding batch opens" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-2.5">
                  <span className="font-serif font-bold text-xl text-ink">{s.v}</span>
                  <span className="text-xs text-gray-400 font-medium">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — 4 cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARDS.map((card, i) => (
              <PillarCard key={card.label} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
