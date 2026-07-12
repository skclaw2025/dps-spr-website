"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";

/* ============================================================
   SCHOOL TOUR
   A video/image frame with round place-buttons below it.
   Tap a button → that place's media crossfades into the frame,
   so a visitor can "walk" the whole campus.
   Edit PLACES: set type "video" or "image", point src/thumb at
   your files. thumb is the small round preview.
   ============================================================ */

type Media = { id: string; label: string; type: "video" | "image"; src: string; thumb: string };

const PLACES: Media[] = [
  { id: "campus",  label: "Campus",     type: "video", src: "/videos/campus.mp4", thumb: "/images/front.jpg" },
  { id: "sports",  label: "Sports",     type: "image", src: "/images/tour/sports.jpg", thumb: "/images/tour/sports.jpg" },
  { id: "library", label: "Library",    type: "image", src: "/images/tour/library.jpg", thumb: "/images/tour/library.jpg" },
  { id: "labs",    label: "Labs",       type: "image", src: "/images/tour/labs.jpg",   thumb: "/images/tour/labs.jpg" },
  { id: "pool",    label: "Aquatics",   type: "image", src: "/images/tour/pool.jpg",   thumb: "/images/tour/pool.jpg" },
  { id: "arts",    label: "Arts",       type: "image", src: "/images/tour/arts.jpg",   thumb: "/images/tour/arts.jpg" },
];

const GREEN = "var(--color-green)";

export default function SchoolTour() {
  const [activeId, setActiveId] = useState(PLACES[0].id);
  const active = PLACES.find((p) => p.id === activeId)!;

  return (
    <div className="w-full">
      {/* ── Media frame ── */}
      <div
        className="relative w-full overflow-hidden rounded-[20px]"
        style={{
          aspectRatio: "16 / 10",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {active.type === "video" ? (
              <video
                key={active.src}
                className="h-full w-full object-cover"
                autoPlay muted loop playsInline preload="auto"
                poster={active.thumb}
              >
                <source src={active.src} type="video/mp4" />
              </video>
            ) : (
              <Image src={active.src} alt={active.label} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* readability gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* live-tour pill */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold text-white"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
          <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "var(--color-gold)" }}>
            <Play size={8} style={{ fill: "#111827", color: "#111827", marginLeft: 1 }} />
          </span>
          Virtual Tour
        </div>

        {/* current place label */}
        <div className="absolute bottom-5 left-5 z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Now Exploring</p>
          <AnimatePresence mode="wait">
            <motion.h3
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-0.5 text-3xl font-bold text-white"
            >
              {active.label}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Round place-buttons (3 per line) ── */}
      <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-6">
        {PLACES.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`View ${p.label}`}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className="relative mx-auto block aspect-square w-full max-w-[84px] sm:max-w-[150px] overflow-hidden rounded-full transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  outline: isActive ? `3px solid ${GREEN}` : "3px solid transparent",
                  outlineOffset: 3,
                  boxShadow: isActive ? "0 12px 28px rgba(0,0,0,0.22)" : "0 4px 14px rgba(0,0,0,0.12)",
                }}
              >
                <Image src={p.thumb} alt={p.label} fill sizes="(max-width:640px) 84px, 150px" className="object-cover" />
                {/* dim inactive slightly for focus */}
                <span
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.28)", opacity: isActive ? 0 : 1 }}
                />
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.92)" }}>
                      <Play size={15} style={{ fill: GREEN, color: GREEN, marginLeft: 1 }} />
                    </span>
                  </span>
                )}
              </span>
              <span
                className="text-xs font-semibold transition-colors sm:text-sm"
                style={{ color: isActive ? GREEN : "var(--color-muted)" }}
              >
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── CTAs (centered on all screens) ── */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
        <button className="btn-green">Explore Campus →</button>
        <button className="btn-outline-dark">Book School Tour →</button>
      </div>
    </div>
  );
}