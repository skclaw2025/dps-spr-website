"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   STORY BOOK — "Turn the page"
   Pinned section: scrolling turns the pages (like the tree).
   Click the right half to go forward, left half to go back.
   Arrows, dots and ← → keys also work — all of them just
   scroll to the matching page, so scroll stays the source of truth.
   ============================================================ */

type Spread =
  | { kind: "cover" }
  | { kind: "text"; chapter: string; title: string; body: string; drop: string; accent: string }
  | { kind: "closing" };

const GREEN  = "var(--color-green)";
const GOLD   = "var(--color-gold)";
const ORANGE = "var(--color-orange-deep)";

const SPREADS: Spread[] = [
  { kind: "cover" },
  {
    kind: "text", chapter: "Chapter One · Our Story", title: "Seventy-five years in the making.",
    drop: "I", accent: GREEN,
    body:
      "It began in 1949, with a single conviction — that education should shape not just careers, but character. Three-quarters of a century later, the DPS Society is one of India's most trusted names in learning. Now that story turns a new page in Gurugram.",
  },
  {
    kind: "text", chapter: "Our Mission", title: "Innovation with values.",
    drop: "W", accent: GOLD,
    body:
      "We nurture the whole child — academically excellent, emotionally resilient, socially responsible and globally aware. We bring the 75-year DPS legacy together with modern learning, technology and sport. Every decision answers one question: will this help a child discover who they can become?",
  },
  {
    kind: "text", chapter: "Our Vision", title: "A school built for tomorrow.",
    drop: "A", accent: ORANGE,
    body:
      "A school parents are proud to belong to and children are excited to attend every single day. DPS SPR will be a place where sport is as important as study, creativity as celebrated as academics, and every child — from Nursery to Class 7 — is given the space, support and belief to find their extraordinary.",
  },
  { kind: "closing" },
];

const CHAPTERS = ["Cover", "Our Story", "Our Mission", "Our Vision", "Begin"];
const N = SPREADS.length;

const pageVariants = {
  enter:  (d: number) => ({ rotateY: d > 0 ? 96 : -96, opacity: 0 }),
  center: { rotateY: 0, opacity: 1 },
  exit:   (d: number) => ({ rotateY: d > 0 ? -96 : 96, opacity: 0 }),
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function StoryBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const last = N - 1;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  /* scroll drives the page (like the tree drives the bloom) */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = Math.min(last, Math.max(0, Math.floor(v * N)));
    setPage((prev) => (prev[0] === p ? prev : [p, p > prev[0] ? 1 : -1]));
  });

  /* every control scrolls to a page's band, so scroll stays the source of truth */
  const goToPage = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(last, i));
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((clamped + 0.5) / N) * scrollable;
    window.scrollTo({ top: target, behavior: prefersReduced() ? "auto" : "smooth" });
  }, [last]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage(page + 1);
      if (e.key === "ArrowLeft")  goToPage(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, goToPage]);

  const onBookClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return; // don't hijack CTAs
    const rect = e.currentTarget.getBoundingClientRect();
    goToPage(e.clientX - rect.left < rect.width * 0.4 ? page - 1 : page + 1);
  };

  const spread = SPREADS[page];

  return (
    <section ref={sectionRef} style={{ height: `${N * 70}vh`, background: "var(--color-sand)" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <div className="wrap w-full">
          {/* header */}
          <div className="mb-8 flex items-center gap-3">
            <span className="gold-bar" />
            <p className="t-label" style={{ color: GREEN }}>Imagine a School Like No Other</p>
          </div>

          <div className="mx-auto w-full max-w-6xl">
            {/* the book */}
            <div
              onClick={onBookClick}
              className="relative w-full cursor-pointer select-none"
              style={{ perspective: "2200px" }}
            >
              <div
                className="relative w-full overflow-hidden rounded-r-2xl rounded-l-md
                           min-h-[500px] md:min-h-0 md:h-[460px] lg:h-[520px]"
                style={{
                  background: "#FFFDF7",
                  boxShadow: "0 40px 90px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10"
                  style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.10), transparent)" }} />

                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={page}
                    custom={dir}
                    variants={pageVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                    className="absolute inset-0"
                  >
                    {spread.kind === "cover"   && <Cover />}
                    {spread.kind === "text"    && <TextPage spread={spread} page={page} />}
                    {spread.kind === "closing" && <Closing />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* controls */}
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="Previous page"
                className="flex h-11 w-11 items-center justify-center rounded-full border transition disabled:opacity-30"
                style={{ borderColor: "var(--color-line-strong)", color: GREEN }}>
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {SPREADS.map((_, i) => (
                  <button key={i} onClick={() => goToPage(i)} aria-label={`Go to ${CHAPTERS[i]}`}
                    className="h-2 rounded-full transition-all"
                    style={{ width: i === page ? 26 : 8, background: i === page ? GREEN : "rgba(0,0,0,0.15)" }} />
                ))}
              </div>

              <button onClick={() => goToPage(page + 1)} disabled={page === last} aria-label="Next page"
                className="flex h-11 w-11 items-center justify-center rounded-full border transition disabled:opacity-30"
                style={{ borderColor: "var(--color-line-strong)", color: GREEN }}>
                <ChevronRight size={20} />
              </button>
            </div>

            <p className="mt-3 text-center t-label" style={{ color: "var(--color-muted)" }}>
              {CHAPTERS[page]} · scroll or click to turn the page
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Cover ── */
function Cover() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <p className="t-label mb-6" style={{ color: "var(--color-gold-ink)" }}>A DPS SPR Story</p>
      <h2 className="t-display" style={{ color: GREEN }}>Imagine</h2>
      <div className="my-6 h-px w-24" style={{ background: "var(--color-gold)" }} />
      <p className="t-body max-w-sm" style={{ color: "var(--color-muted)" }}>
        The story of a new school — told in four short pages.
      </p>
      <p className="mt-10 t-label" style={{ color: "var(--color-muted)" }}>Est. 1949 · Opening April 2027</p>
    </div>
  );
}

/* ── Story / mission / vision ── */
function TextPage({ spread, page }: { spread: Extract<Spread, { kind: "text" }>; page: number }) {
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[0.8fr_1.5fr] lg:grid-cols-[0.65fr_1.6fr]">
      <div className="hidden items-center justify-center border-r md:flex" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "10rem", lineHeight: 1, color: spread.accent, opacity: 0.9 }}>
          {spread.drop}
        </span>
      </div>
      <div className="flex flex-col justify-center px-8 py-10 md:px-12 lg:px-16">
        <p className="t-label mb-4" style={{ color: "var(--color-gold-ink)" }}>{spread.chapter}</p>
        <h3 className="t-h2 mb-5 max-w-xl" style={{ color: "var(--color-ink)" }}>{spread.title}</h3>
        <p className="t-body max-w-2xl" style={{ color: "var(--color-muted)" }}>{spread.body}</p>
        <p className="mt-auto pt-8 text-xs" style={{ color: "var(--color-muted)" }}>{page} / {N - 1}</p>
      </div>
    </div>
  );
}

/* ── Closing ── */
function Closing() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <p className="t-label mb-4" style={{ color: "var(--color-gold-ink)" }}>The End — and the Beginning</p>
      <h3 className="t-h1 mb-5 max-w-md" style={{ color: GREEN }}>Chapter One begins April 2027.</h3>
      <p className="t-body mb-8 max-w-sm" style={{ color: "var(--color-muted)" }}>
        Founding Batch seats are open now. Be part of the very first page.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/admissions" className="btn-orange">Join the Founding Batch →</Link>
        <Link href="/visit" className="btn-outline-dark">Book a Visit</Link>
      </div>
    </div>
  );
}