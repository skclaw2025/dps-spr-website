"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* ============================================================
   STORY TREE — "Roots to Sky"
   A procedurally-grown tree draws itself as you scroll:
   taupe roots (1949) → green trunk (mission) → branches
   (vision) → a gold-and-orange bloom (2027).
   The tree is generated from a fixed seed, so it is identical
   on the server and client (no hydration mismatch).
   ============================================================ */

const GREEN      = "var(--color-green)";
const GREEN_DEEP = "var(--color-green-deep)";
const GOLD       = "var(--color-gold)";
const ORANGE     = "var(--color-orange)";
const ORANGE_DP  = "var(--color-orange-deep)";
const TAUPE      = "var(--color-taupe)";

/* ---- deterministic PRNG (mulberry32) ---- */
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Branch { d: string; depth: number; width: number; t: number }
interface Leaf   { x: number; y: number; r: number; fill: string; t: number }

/* ---- grow the tree once, deterministically ---- */
function buildTree() {
  const rnd = mulberry32(20270411);
  const branches: Branch[] = [];
  const leaves: Leaf[] = [];
  const MAX = 5;

  const leafFill = () => {
    const r = rnd();
    return r < 0.55 ? GOLD : r < 0.8 ? ORANGE : ORANGE_DP;
  };

  function grow(x: number, y: number, angle: number, len: number, width: number, depth: number) {
    if (depth > MAX || len < 8) {
      const n = 1 + (rnd() < 0.5 ? 1 : 0);
      for (let i = 0; i < n; i++) {
        leaves.push({
          x: x + (rnd() - 0.5) * 18, y: y + (rnd() - 0.5) * 18,
          r: 5 + rnd() * 5, fill: leafFill(), t: 0.6 + rnd() * 0.3,
        });
      }
      return;
    }
    const rad = (angle * Math.PI) / 180;
    const x2 = x + Math.cos(rad) * len;
    const y2 = y + Math.sin(rad) * len;
    const mx = (x + x2) / 2, my = (y + y2) / 2;
    const perp = (angle + 90) * Math.PI / 180;
    const bend = (rnd() - 0.5) * len * 0.28;
    const cx = mx + Math.cos(perp) * bend;
    const cy = my + Math.sin(perp) * bend;

    branches.push({
      d: `M${x.toFixed(1)} ${y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      depth, width, t: 0.06 + (depth / MAX) * 0.52,
    });

    // a few outer blossoms for fullness
    if (depth >= 4 && rnd() < 0.5) {
      leaves.push({ x: x2, y: y2, r: 5 + rnd() * 4, fill: leafFill(), t: 0.6 + rnd() * 0.3 });
    }

    const kids = depth < 2 ? 2 : rnd() < 0.22 ? 3 : 2;
    for (let i = 0; i < kids; i++) {
      const spread = 20 + rnd() * 16;
      const dir = kids === 2 ? (i === 0 ? -1 : 1) : i - 1;
      const na = angle + dir * spread + (rnd() - 0.5) * 10;
      const nlen = len * (0.72 + rnd() * 0.08);
      grow(x2, y2, na, nlen, width * 0.66, depth + 1);
    }
  }

  grow(250, 500, -90 + (rnd() - 0.5) * 4, 104, 13, 0);
  return { branches, leaves };
}

const TREE = buildTree();

/* ---- a stroke that draws itself across a scroll range ---- */
function DrawPath({
  d, progress, start, end, stroke, width,
}: {
  d: string; progress: MotionValue<number>; start: number; end: number; stroke: string; width: number;
}) {
  const pathLength = useTransform(progress, [start, Math.min(end, 1)], [0, 1]);
  return (
    <motion.path d={d} fill="none" stroke={stroke} strokeWidth={width}
      strokeLinecap="round" strokeLinejoin="round" style={{ pathLength }} />
  );
}

/* ---- a blossom that buds in ---- */
function Bud({
  progress, at, cx, cy, r, fill,
}: {
  progress: MotionValue<number>; at: number; cx: number; cy: number; r: number; fill: string;
}) {
  const opacity = useTransform(progress, [at, Math.min(at + 0.06, 1)], [0, 1]);
  const scale   = useTransform(progress, [at, Math.min(at + 0.09, 1)], [0.1, 1]);
  return (
    <motion.circle cx={cx} cy={cy} r={r} fill={fill}
      style={{ opacity, scale, transformBox: "fill-box", transformOrigin: "center" }} />
  );
}

/* ---- a crossfading story caption ---- */
function Caption({
  progress, range, eyebrow, title, children,
}: {
  progress: MotionValue<number>; range: [number, number, number, number];
  eyebrow: string; title: string; children: React.ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y       = useTransform(progress, range, [26, 0, 0, -18]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="mb-4 flex items-center gap-3">
        <span className="gold-bar" />
        <p className="t-label" style={{ color: GREEN }}>{eyebrow}</p>
      </div>
      <h3 className="t-h2 mb-5" style={{ color: "var(--color-ink)" }}>{title}</h3>
      <div className="t-body max-w-md" style={{ color: "var(--color-muted)" }}>{children}</div>
    </motion.div>
  );
}

export default function StoryTree() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const glow = useTransform(progress, [0.55, 0.9], [0, 0.5]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="wrap grid w-full items-center gap-8 lg:grid-cols-2">

          {/* ── Left: the story in stages ── */}
          <div className="relative order-2 h-[320px] lg:order-1 lg:h-[440px]">
            <Caption progress={progress} range={[0.0, 0.08, 0.22, 0.3]}
              eyebrow="Our Roots · Since 1949" title="A story that began 75 years ago.">
              It started with one idea — that a school should shape not just careers, but
              character. Three-quarters of a century on, the DPS Society is one of India&apos;s
              most trusted names in learning.
            </Caption>

            <Caption progress={progress} range={[0.32, 0.4, 0.52, 0.58]}
              eyebrow="Our Mission" title="Innovation with values.">
              We nurture the whole child — academically excellent, emotionally resilient,
              socially responsible, globally aware. Every choice answers one question: will
              this help a child discover who they can become?
            </Caption>

            <Caption progress={progress} range={[0.6, 0.68, 0.78, 0.84]}
              eyebrow="Our Vision" title="A school built for tomorrow.">
              A place children are excited to attend every single day — where sport matters as
              much as study, creativity as much as academics, and every child from Nursery to
              Class 7 is given room to find their extraordinary.
            </Caption>

            <Caption progress={progress} range={[0.84, 0.92, 1.0, 1.2]}
              eyebrow="April 2027" title="Now the story turns a new page.">
              <p className="mb-6">
                Delhi Public School, Southern Peripheral Road opens in Gurugram in April 2027.
                The Founding Batch writes the first chapter.
              </p>
              <Link href="/admissions" className="btn-orange">Join the Founding Batch →</Link>
            </Caption>
          </div>

          {/* ── Right: the tree that grows as you read ── */}
          <div className="order-1 flex justify-center lg:order-2">
            <svg viewBox="0 0 500 620" className="h-[46vh] w-auto lg:h-[80vh]" aria-hidden>
              {/* soft canopy glow */}
              <motion.ellipse cx={250} cy={250} rx={175} ry={155} fill={GOLD}
                style={{ opacity: glow, filter: "blur(30px)" }} />

              {/* ground */}
              <DrawPath d="M80 502 L420 502" progress={progress} start={0.02} end={0.12} stroke={TAUPE} width={2} />

              {/* roots */}
              <DrawPath d="M250 502 C 234 528 212 540 186 556" progress={progress} start={0.04} end={0.24} stroke={TAUPE} width={2.6} />
              <DrawPath d="M250 502 C 250 532 248 554 248 576" progress={progress} start={0.05} end={0.24} stroke={TAUPE} width={2.6} />
              <DrawPath d="M250 502 C 268 528 294 540 322 556" progress={progress} start={0.06} end={0.25} stroke={TAUPE} width={2.6} />
              <DrawPath d="M250 502 C 230 522 202 530 172 538" progress={progress} start={0.05} end={0.24} stroke={TAUPE} width={2} />
              <DrawPath d="M250 502 C 270 522 300 530 330 538" progress={progress} start={0.06} end={0.25} stroke={TAUPE} width={2} />

              {/* branches (generated) */}
              {TREE.branches.map((b, i) => (
                <DrawPath key={i} d={b.d} progress={progress}
                  start={b.t} end={b.t + 0.16}
                  stroke={b.depth <= 1 ? GREEN_DEEP : GREEN}
                  width={Math.max(b.width, 1.3)} />
              ))}

              {/* bloom (generated) */}
              {TREE.leaves.map((l, i) => (
                <Bud key={i} progress={progress} at={l.t} cx={l.x} cy={l.y} r={l.r} fill={l.fill} />
              ))}
            </svg>
          </div>
        </div>

        {/* fixed eyebrow */}
        <div className="pointer-events-none absolute left-0 top-8 w-full">
          <div className="wrap"><p className="t-label" style={{ color: TAUPE }}>Our Story · DPS SPR</p></div>
        </div>
      </div>
    </section>
  );
}