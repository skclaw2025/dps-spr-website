"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import HeroEllie from "@/components/mascot/HeroEllie";

const WORDS = ["Discover", "Who They", "Can Become."];

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
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const move   = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    const DOTS = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4, alpha: Math.random() * 0.4 + 0.1,
      gold: Math.random() > 0.5,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      DOTS.forEach(d => {
        const dx = d.x - mx, dy = d.y - my, dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 100) { d.vx += (dx/dist)*0.04; d.vy += (dy/dist)*0.04; }
        const spd = Math.sqrt(d.vx*d.vx+d.vy*d.vy);
        if (spd > 1.0) { d.vx *= 0.93; d.vy *= 0.93; }
        d.x = (d.x + d.vx + W) % W; d.y = (d.y + d.vy + H) % H;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
        ctx.fillStyle = d.gold ? `rgba(255,215,0,${d.alpha})` : `rgba(255,255,255,${d.alpha*0.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); window.removeEventListener("mousemove",move); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
}

function RevealWord({ text, delay, gold = false }: { text: string; delay: number; gold?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-bottom mr-[0.2em]">
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

export default function Hero() {
  const ref    = useRef<HTMLElement>(null);
  const [noVid, setNoVid]  = useState(false);
  const [ready, setReady]  = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 250); return () => clearTimeout(t); }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const springY  = useSpring(contentY, { stiffness: 70, damping: 18 });

  return (
    <section ref={ref}
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: "100svh" }}
    >
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        {!noVid ? (
          <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  disablePictureInPicture
  onError={() => setNoVid(true)}
  style={{ WebkitPlaysinline: true } as React.CSSProperties}
>
  <source src="/videos/campus1.mp4"  type="video/mp4" />
  <source src="/videos/campus.webm" type="video/webm" />
</video>
        ) : (
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#002614 0%,#003D1E 35%,#006C33 65%,#004F24 100%)" }} />
        )}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.52) 0%,rgba(0,0,0,0.18) 45%,rgba(0,0,0,0.65) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2]" style={{ background: "linear-gradient(0deg,rgba(0,30,12,0.6) 0%,transparent 100%)" }} />

      <Particles />

      {/* Ellie — hidden on mobile */}
      <div className="hidden sm:block">
        <HeroEllie />
      </div>

      {/* Content — padded for navbar height */}
      <motion.div
        className="relative z-20 wrap w-full"
        style={{ y: springY, opacity: fadeOut, paddingTop: "clamp(100px, 20vh, 160px)", paddingBottom: "clamp(60px, 10vh, 100px)" }}
      >
        <div className="max-w-[680px]">

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
              <span className="text-gold text-[15px] tracking-[0.14em] uppercase">
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

          {/* Kinetic headline */}
          <h1 className="t-display text-white mb-0 leading-none">
            {ready && (
              <>
                <span className="block"><RevealWord text="A Place" delay={0.3} /> <RevealWord text="Where" delay={0.44} /></span>
                <span className="block"><RevealWord text="Children" delay={0.58} /></span>
                <span className="block"><RevealWord text="Discover" delay={0.72} gold /></span>
                <span className="block"><RevealWord text="Who" delay={0.86} /> <RevealWord text="They" delay={0.98} /></span>
                <span className="block"><RevealWord text="Can" delay={1.1} /> <RevealWord text="Become." delay={1.22} /></span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity:0, y:16 }} animate={ready ? { opacity:1, y:0 } : {}}
            transition={{ delay:1.55, duration:0.7 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed mt-6 mb-8 max-w-[480px]"
          >
            Delhi Public School, Southern Peripheral Road, Gurugram.
            Innovation with Values · Opening April 2027.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:14 }} animate={ready ? { opacity:1, y:0 } : {}}
            transition={{ delay:1.75, duration:0.65 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/admissions" className="btn-gold group text-sm sm:text-sm">
              Apply for 2027
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/campus" className="btn-outline-white group text-sm">
              <Play size={13} className="fill-white" />
              See Our Campus
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity:0 }} animate={ready ? { opacity:1 } : {}}
            transition={{ delay:2.1, duration:0.8 }}
            className="mt-10 pt-7 border-t border-white/[0.12] flex flex-wrap gap-x-8 gap-y-4"
          >
            {[
              { v:"1949", l:"DPS Founded"     },
              { v:"500+", l:"DPS Schools"     },
              { v:"20+",  l:"Sports"          },
              { v:"K–7",  l:"Classes"         },
            ].map(s => (
              <div key={s.l}>
                <p className="font-serif font-bold text-white text-xl sm:text-2xl leading-none">{s.v}</p>
                <p className="t-label text-gold mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.8, duration:1 }}
      >
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }}>
          <ChevronDown size={22} className="text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
