"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark, BookOpen, Award, Trophy,          // legacy faces
  Sparkles, Cpu, HeartPulse, Waves,            // modern faces
  RotateCw, RotateCcw, type LucideIcon,
} from "lucide-react";

/* ============================================================
   WHY DPS SPR — the duality
   Each card: front = a DPS value parents already trust,
   flip = the same strength, reimagined for 2027.
   Shows "rooted in DPS values + modern innovation" without
   ever having to claim it in words.
   ============================================================ */

interface Card {
  legacyIcon: LucideIcon; legacyKicker: string; legacyTitle: string;
  modIcon: LucideIcon;    modKicker: string;    modTitle: string;
}

const CARDS: Card[] = [
  { legacyIcon: Landmark, legacyKicker: "Since 1949",     legacyTitle: "75 years of trust",
    modIcon: Sparkles,    modKicker: "DPS SPR · 2027",    modTitle: "A brand-new, purpose-built campus" },
  { legacyIcon: BookOpen, legacyKicker: "DPS Rigour",     legacyTitle: "Academic excellence",
    modIcon: Cpu,         modKicker: "Modern learning",   modTitle: "AI, robotics & tinkering labs" },
  { legacyIcon: Award,    legacyKicker: "DPS Character",  legacyTitle: "Values & discipline",
    modIcon: HeartPulse,  modKicker: "The whole child",   modTitle: "Wellbeing, yoga & mindfulness" },
  { legacyIcon: Trophy,   legacyKicker: "DPS Spirit",     legacyTitle: "Sport & excellence",
    modIcon: Waves,       modKicker: "World-class",       modTitle: "Badminton, aquatics & 20+ sports" },
];

function DualCard({ card, index }: { card: Card; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const L = card.legacyIcon, M = card.modIcon;

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative aspect-[4/3] w-full text-left"
      style={{ perspective: 1200 }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT — DPS legacy */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl p-5"
          style={{ backfaceVisibility: "hidden", background: "var(--color-green)", boxShadow: "0 12px 30px rgba(0,0,0,0.14)" }}
        >
          <div className="flex items-center justify-between">
            <L size={26} className="text-white" strokeWidth={1.8} />
            <RotateCw size={15} className="text-white/40 transition-transform duration-300 group-hover:rotate-90" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-gold)" }}>{card.legacyKicker}</p>
            <p className="mt-1 text-lg font-bold leading-snug text-white">{card.legacyTitle}</p>
          </div>
        </div>

        {/* BACK — modern DPS SPR */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl p-5"
          style={{
            backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: "#fff", border: "1px solid var(--color-line)", boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgb(var(--orange-deep-rgb) / 0.12)" }}>
              <M size={20} style={{ color: "var(--color-orange-deep)" }} strokeWidth={1.9} />
            </span>
            <RotateCcw size={15} style={{ color: "var(--color-line-strong)" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-orange-deep)" }}>{card.modKicker}</p>
            <p className="mt-1 text-lg font-bold leading-snug" style={{ color: "var(--color-ink)" }}>{card.modTitle}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function DpsDuality() {
  return (
    <div>
      {/* eyebrow */}
      <div className="flex items-center gap-3">
        <span className="gold-bar" />
        <p className="t-label" style={{ color: "var(--color-green)" }}>Why DPS SPR</p>
      </div>

      {/* headline — evocative, not a sales line */}
      <h2 className="t-h1 mt-6" style={{ color: "var(--color-ink)" }}>
        Rooted deep.{" "}
        <span className="text-dps-green">Built for what&apos;s next.</span>
      </h2>

      {/* invites the interaction; lets the cards make the case */}
      <p className="mt-5 max-w-xl t-body" style={{ color: "var(--color-muted)" }}>
        Flip a card — the DPS values you already trust on one side, and the
        modern school we&apos;re building around them on the other.
      </p>

      {/* the duality */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        {CARDS.map((c, i) => (
          <DualCard key={c.legacyTitle} card={c} index={i} />
        ))}
      </div>
    </div>
  );
}