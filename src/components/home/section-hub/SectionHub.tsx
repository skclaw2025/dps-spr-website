"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Baby,
  GraduationCap,
  Trophy,
  Building2,
  Trees,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   SECTION DATA — edit labels / copy / accents here.
   ──────────────────────────────────────────────────────────── */
type Accent = "green" | "gold" | "orange" | "orange-deep" | "taupe";

interface HubSection {
  id: string;
  label: string;
  eyebrow: string;
  blurb: string;
  icon: LucideIcon;
  accent: Accent;
  onDark: boolean; // true → white text on this accent
}

const SECTIONS: HubSection[] = [
  { id: "kindergarten", label: "Kindergarten", eyebrow: "The Early Years",  blurb: "Where little learners take their first confident steps.",    icon: Baby,           accent: "green",       onDark: true  },
  { id: "academics",    label: "Academics",    eyebrow: "How We Learn",     blurb: "A future-ready CBSE curriculum built around every child.",    icon: GraduationCap,  accent: "gold",        onDark: false },
  { id: "sports",       label: "Sports",       eyebrow: "Body & Spirit",    blurb: "20+ disciplines, from the swimming pool to the ice rink.",    icon: Trophy,         accent: "orange-deep", onDark: true  },
  { id: "facilities",   label: "Facilities",   eyebrow: "World-Class",      blurb: "Labs, library, arts and innovation spaces to thrive in.",     icon: Building2,      accent: "orange",      onDark: false },
  { id: "campus",       label: "Campus",       eyebrow: "Our Green Home",   blurb: "Acres of open, leafy space in the heart of Gurugram.",        icon: Trees,          accent: "taupe",       onDark: false },
  { id: "admissions",   label: "Admissions",   eyebrow: "Join DPS SPR",     blurb: "Founding Batch seats for April 2027 are open now.",           icon: ClipboardCheck, accent: "orange-deep", onDark: true  },
];

const accentVar: Record<Accent, string> = {
  green:         "var(--color-green)",
  gold:          "var(--color-gold)",
  orange:        "var(--color-orange)",
  "orange-deep": "var(--color-orange-deep)",
  taupe:         "var(--color-taupe)",
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SectionHub() {
  const stripRef = useRef<HTMLDivElement>(null);
  const blockEls = useRef<Record<string, HTMLButtonElement | null>>({});

  const [active, setActive]     = useState<string>(SECTIONS[0].id);
  const [overflow, setOverflow] = useState(false);      // true only in the mobile carousel
  const [thumb, setThumb]       = useState({ w: 30, left: 0 });
  const [sliderOn, setSliderOn] = useState(false);      // show slider while scrolling (touch)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scrollspy — active block follows whichever section is on screen */
  useEffect(() => {
    const els = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Detect whether the strip overflows (mobile) + size the slider thumb */
  const measure = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setOverflow(el.scrollWidth > el.clientWidth + 1);
    const trackable = el.scrollWidth - el.clientWidth || 1;
    const wRatio = el.clientWidth / el.scrollWidth;
    setThumb({ w: wRatio * 100, left: (el.scrollLeft / trackable) * (100 - wRatio * 100) });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Keep the active block centered in the strip (drives the carousel):
     tap the right block → it slides left, revealing the next;
     tap the left block → it slides right, revealing the previous. */
  useEffect(() => {
    const el = stripRef.current;
    const btn = blockEls.current[active];
    if (!el || !btn || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({
      left: btn.offsetLeft - (el.clientWidth - btn.clientWidth) / 2,
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  }, [active]);

  const onStripScroll = () => {
    measure();
    setSliderOn(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setSliderOn(false), 900);
  };

  const goTo = (id: string) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="relative bg-white">
      {/* ── STICKY SQUARE-BLOCK MENU (one line; no forced snap) ── */}
      <nav className="hub-bar border-b border-black/[0.06] bg-white/85 backdrop-blur-md">
        <div className="wrap h-full">
          <div className="group relative flex h-full items-center">
            <div
              ref={stripRef}
              onScroll={onStripScroll}
              className="flex w-full items-center gap-3 overflow-x-auto scrollbar-hide
                         snap-x snap-mandatory
                         lg:justify-center lg:gap-4 lg:overflow-visible lg:snap-none"
            >
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    ref={(el) => { blockEls.current[s.id] = el; }}
                    onClick={() => goTo(s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex h-[84px] shrink-0 snap-start flex-col items-center
                                justify-center gap-1.5 rounded-2xl px-3
                                basis-[46%] sm:basis-[30%] lg:basis-auto lg:w-[116px]
                                transition-[transform] duration-300
                                ${isActive ? "-translate-y-1" : "hover:-translate-y-0.5"}`}
                    style={{
                      background: "#fff",
                      border: `1px solid ${isActive ? "transparent" : "var(--color-line)"}`,
                      boxShadow: isActive
                        ? "0 12px 28px rgba(0,0,0,0.18)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Accent fill — fades/scales in on the active block */}
                    <motion.span
                      aria-hidden
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: accentVar[s.accent] }}
                    />
                    <Icon
                      size={24}
                      strokeWidth={1.9}
                      className="relative z-10 transition-colors duration-200"
                      style={{ color: isActive ? "#fff" : accentVar[s.accent] }}
                    />
                    <span
                      className="relative z-10 text-[10px] font-bold uppercase tracking-[0.09em] transition-colors duration-200"
                      style={{ color: isActive ? "#fff" : "var(--color-ink)" }}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hidden slider — appears on hover (desktop) or while scrolling (mobile) */}
            {overflow && (
              <div
                className="pointer-events-none absolute inset-x-1 bottom-1 h-1 rounded-full
                           bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ opacity: sliderOn ? 1 : undefined }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${thumb.w}%`, marginLeft: `${thumb.left}%`, background: "var(--color-green)" }}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── THE 6 SECTIONS (placeholder content — swap in later) ── */}
      {SECTIONS.map((s) => {
        const Icon = s.icon;
        return (
          <section
            key={s.id}
            id={s.id}
            className="hub-section flex items-center"
            style={{ background: s.onDark ? accentVar[s.accent] : "var(--color-sand)" }}
          >
            <div className="wrap w-full py-20" style={{ color: s.onDark ? "#fff" : "var(--color-ink)" }}>
              <div
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white"
                style={{ background: s.onDark ? "rgba(255,255,255,0.16)" : accentVar[s.accent] }}
              >
                <Icon size={30} strokeWidth={1.8} />
              </div>
              <p className="t-label mb-3" style={{ color: s.onDark ? "rgba(255,255,255,0.75)" : "var(--color-green)" }}>
                {s.eyebrow}
              </p>
              <h2 className="t-display mb-5 max-w-4xl">{s.label}</h2>
              <p className="t-body max-w-xl" style={{ color: s.onDark ? "rgba(255,255,255,0.85)" : "var(--color-muted)" }}>
                {s.blurb} This section is a placeholder — drop the real {s.label.toLowerCase()} content in here.
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
}