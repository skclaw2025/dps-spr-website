"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import HeroEllie from "@/components/mascot/HeroEllie";

// ── Particle canvas ──────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mx = W / 2, my = H / 2;

    window.addEventListener("resize", () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    const DOTS = Array.from({ length: 80 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      r:     Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.45 + 0.12,
      gold:  Math.random() > 0.55,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      DOTS.forEach((d) => {
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) { d.vx += (dx / dist) * 0.045; d.vy += (dy / dist) * 0.045; }
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > 1.1) { d.vx *= 0.94; d.vy *= 0.94; }
        d.x = (d.x + d.vx + W) % W;
        d.y = (d.y + d.vy + H) % H;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.gold
          ? `rgba(255,215,0,${d.alpha})`
          : `rgba(255,255,255,${d.alpha * 0.55})`;
        ctx.fill();
      });

      // Connect close dots
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x;
          const dy = DOTS[i].y - DOTS[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 75) {
            ctx.beginPath();
            ctx.moveTo(DOTS[i].x, DOTS[i].y);
            ctx.lineTo(DOTS[j].x, DOTS[j].y);
            ctx.strokeStyle = `rgba(255,215,0,${0.07 * (1 - d / 75)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
}

// ── Word reveal ──────────────────────────────────────────────────
function RevealWord({
  text, delay, gold = false,
}: { text: string; delay: number; gold?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${gold ? "text-gold" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ── Main Hero ────────────────────────────────────────────────────
export default function Hero() {
  const ref   = useRef<HTMLElement>(null);
  const [noVid, setNoVid]   = useState(false);
  const [ready, setReady]   = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 250); return () => clearTimeout(t); }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const springY = useSpring(contentY, { stiffness: 70, damping: 18 });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] overflow-hidden flex items-center"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        {!noVid ? (
          <video
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline
            onError={() => setNoVid(true)}
          >
            <source src="/videos/campus.webm" type="video/webm" />
            <source src="/videos/campus1.mp4"  type="video/mp4"  />
          </video>
        ) : (
          /* Fallback gradient — green forest feel */
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #002614 0%, #003D1E 30%, #006C33 65%, #004F24 100%)",
            }}
          />
        )}
      </motion.div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[1] hero-overlay" />
      {/* Subtle green tint at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2]"
        style={{ background: "linear-gradient(0deg, rgba(0,40,16,0.65) 0%, transparent 100%)" }}
      />
      {/* Radial gold glow top-center */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Particles ── */}
      <Particles />

      {/* ── Ellie mascot ── */}
      <HeroEllie />

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-20 wrap w-full pt-28"
        style={{ y: springY, opacity: fadeOut }}
      >
        <div className="max-w-[720px]">

          {/* Founding pill */}
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 flex items-center gap-3 flex-wrap"
            >
              <span className="pill-white">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#FFD700", animation: "pulse_dot 2s infinite" }}
                />
                Admissions Open · Founding Batch April 2027
              </span>
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[#FFD700] text-[11px] tracking-[0.14em] uppercase">
                DPS Society, New Delhi
              </span>
            </motion.div>
          )}

          {/* Eyebrow */}
          {ready && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 t-label mb-3"
            >
              Not just a school.
            </motion.p>
          )}

          {/* ── Kinetic headline ── */}
          <h1 className="t-display text-3xl md:text-4xl lg:text-5xl text-white mb-0 leading-none tracking-tight">
            {ready && (
              <>
                <span className="block">
                  <RevealWord text="A Place" delay={0.36} />
                  {" "}
                  <RevealWord text="Where" delay={0.50} />
                </span>
                <span className="block">
                  <RevealWord text="Children" delay={0.64} />
                </span>
                <span className="block">
                  <RevealWord text="Discover" delay={0.80} gold />
                  {" "}
                  <RevealWord text="Who" delay={0.94} />
                </span>
                <span className="block">
                  <RevealWord text="They" delay={1.08} />
                  {" "}
                  <RevealWord text="Can" delay={1.20} />
                  {" "}
                  <RevealWord text="Become." delay={1.34} />
                </span>
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.65, duration: 0.7 }}
            className="text-white/60 text-lg leading-relaxed mt-7 mb-10 max-w-[500px]"
          >
            Delhi Public School, Southern Peripheral Road, Gurugram.
            <br />
            Innovation with Values · Opening April 2027.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.85, duration: 0.65 }}
            className="flex flex-wrap gap-3.5"
          >
            <Link href="/admissions" className="btn-gold group">
              Apply for 2027
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link href="/campus" className="btn-outline-white group">
              <Play size={14} className="fill-white" />
              See Our Campus
            </Link>
          </motion.div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-14 pt-7 border-t border-white/[0.12] flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              { v: "1949", l: "DPS Society Founded"   },
              { v: "500+", l: "DPS Schools Nationwide" },
              { v: "20+",  l: "Sports Disciplines"     },
              { v: "K–7",  l: "Classes Offered"        },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif font-bold text-white text-[1.6rem] leading-none">
                  {s.v}
                </p>
                <p className="t-label text-[#FFD700] mt-1.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
