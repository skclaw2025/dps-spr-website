"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PANELS = [
  {
    id: "mission",
    title: "Our Mission",
    emoji: "🎯",
    heading: "Innovation with Values",
    full: "At DPS SPR, our mission is to nurture the whole child — academically excellent, emotionally resilient, socially responsible, and globally aware. We bring together the 75-year legacy of the DPS Society with modern innovation in learning, technology, and sport. Every decision we make is guided by one question: Will this help a child discover who they can become?",
  },
  {
    id: "vision",
    title: "Our Vision",
    emoji: "🌟",
    heading: "A School Built for Tomorrow",
    full: "Our vision is to create a school that parents are proud to be part of and children are excited to attend every single day. DPS SPR will be a place where sport is as important as study, where creativity is celebrated as much as academics, and where every child — from Nursery to Class 7 — is given the space, support, and belief to find their extraordinary.",
  },
];

// ── Wooden box lid animation ───────────────────────────────────────────────────
function WoodenBox({ panel, index }: { panel: typeof PANELS[number]; index: number }) {
  const [open, setOpen]   = useState(false);
  const [glow, setGlow]   = useState(false);
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, amount: 0.3 });
  const isGreen = index === 0;

  // Wood grain colors
  const woodDark   = isGreen ? "#2D5A1B" : "#6B4C11";
  const woodMid    = isGreen ? "#3A7023" : "#8B6914";
  const woodLight  = isGreen ? "#4D8A32" : "#A67C1F";
  const woodPale   = isGreen ? "#5E9E42" : "#C9A030";
  const metalColor = isGreen ? "#C9A030" : "#006C33";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer select-none"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setGlow(true)}
      onMouseLeave={() => setGlow(false)}
      onClick={() => setOpen(true)}
    >
      {/* ── WOODEN BOX ── */}
      <motion.div
        whileHover={{ y: -8, rotateY: index === 0 ? 3 : -3 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-visible"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Box shadow / depth */}
        <motion.div
          className="absolute rounded-2xl"
          animate={{ opacity: glow ? 0.7 : 0.35, scale: glow ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            inset: "-4px 8px -12px 8px",
            background: woodDark,
            filter: "blur(16px)",
            zIndex: 0,
          }}
        />

        {/* ── Box body (bottom) ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden z-10"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                ${woodDark}   0px,
                ${woodMid}    3px,
                ${woodLight}  6px,
                ${woodMid}    9px,
                ${woodDark}   12px,
                ${woodPale}   15px,
                ${woodDark}   18px
              )
            `,
            boxShadow: `
              inset 0 0 0 2px ${woodDark},
              inset 0 2px 8px rgba(0,0,0,0.35),
              inset 0 -4px 8px rgba(0,0,0,0.25)
            `,
          }}
        >
          {/* Wood horizontal grain lines */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i}
              className="absolute w-full"
              style={{
                top: `${(i / 14) * 100}%`,
                height: i % 3 === 0 ? 2 : 1,
                background: `linear-gradient(90deg, transparent, ${woodDark}80, ${woodDark}40, transparent)`,
                opacity: 0.4 + (i % 3) * 0.1,
              }}
            />
          ))}

          {/* Knot circles */}
          <div className="absolute rounded-full"
            style={{ width: 28, height: 20, top: "35%", left: "15%",
              background: `radial-gradient(ellipse, ${woodDark} 0%, transparent 70%)`,
              opacity: 0.5 }}/>
          <div className="absolute rounded-full"
            style={{ width: 18, height: 14, top: "60%", right: "20%",
              background: `radial-gradient(ellipse, ${woodDark} 0%, transparent 70%)`,
              opacity: 0.4 }}/>

          {/* Corner metal brackets */}
          {[
            { t: "8px",  l: "8px",  br: "0 0 6px 0" },
            { t: "8px",  r: "8px",  bl: "0 0 0 6px" },
            { b: "8px",  l: "8px",  tr: "0 6px 0 0" },
            { b: "8px",  r: "8px",  tl: "6px 0 0 0" },
          ].map((pos, i) => (
            <div key={i}
              className="absolute"
              style={{
                top: pos.t, left: pos.l, bottom: pos.b, right: pos.r,
                width: 20, height: 20,
                background: metalColor,
                borderRadius: pos.br || pos.bl || pos.tr || pos.tl || "4px",
                boxShadow: `0 1px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)`,
                opacity: 0.9,
              }}
            />
          ))}

          {/* Center metal latch */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
            <div className="w-8 h-1.5 rounded-full" style={{ background: metalColor, boxShadow: `0 1px 4px rgba(0,0,0,0.3)` }}/>
            <div className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${woodPale}, ${metalColor})`,
                boxShadow: `0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: woodDark }}/>
            </div>
            <div className="w-8 h-1.5 rounded-full" style={{ background: metalColor, boxShadow: `0 1px 4px rgba(0,0,0,0.3)` }}/>
          </div>

          {/* Title text */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-2xl mb-1">{panel.emoji}</p>
            <h3 className="font-serif font-bold text-white drop-shadow-lg"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              {panel.title}
            </h3>
          </div>

          {/* ── LID (hinged at top, opens upward) ── */}
          <motion.div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{ height: "52%", transformOrigin: "top center", zIndex: 20 }}
            animate={{ rotateX: glow ? -18 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `
                  repeating-linear-gradient(
                    90deg,
                    ${woodLight}  0px,
                    ${woodPale}   4px,
                    ${woodMid}    8px,
                    ${woodLight}  12px,
                    ${woodDark}   16px,
                    ${woodLight}  20px
                  )
                `,
                boxShadow: `
                  inset 0 0 0 2px ${woodDark},
                  inset 0 -3px 8px rgba(0,0,0,0.3),
                  inset 0 2px 4px rgba(255,255,255,0.1)
                `,
                borderRadius: "12px 12px 0 0",
              }}
            >
              {/* Lid grain */}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="absolute w-full"
                  style={{ top: `${(i / 7) * 100}%`, height: 1,
                    background: `linear-gradient(90deg, transparent, ${woodDark}60, transparent)`,
                    opacity: 0.5 }} />
              ))}
              {/* Lid hinge strip */}
              <div className="absolute bottom-0 left-4 right-4 h-2 rounded-sm"
                style={{ background: metalColor, opacity: 0.8,
                  boxShadow: `0 1px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)` }} />
            </div>
          </motion.div>

          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: glow ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: `radial-gradient(circle at 50% 30%, ${woodPale}25, transparent 65%)` }}
          />
        </div>

        {/* OPEN badge circle — always visible, changes on hover */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center rounded-full cursor-pointer"
          style={{
            width: 64, height: 64,
            background: `radial-gradient(circle, ${woodPale}, ${metalColor})`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 3px rgba(255,255,255,0.3)`,
            border: `3px solid ${woodDark}`,
          }}
          animate={{ scale: glow ? 1.15 : 1, y: glow ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="font-bold text-white text-center leading-tight"
            style={{ fontSize: glow ? "9px" : "11px", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
            animate={{ opacity: 1 }}
          >
            {glow ? "Click to\nOpen" : "OPEN"}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ── POPUP — content flies out of the box ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.55)" }}
            onClick={() => setOpen(false)}
          >
            {/* Content erupts FROM the box position */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 200, rotateX: -40 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 160, rotateX: -30 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: 520,
                borderRadius: 24,
                background: `repeating-linear-gradient(90deg, ${woodDark} 0px, ${woodMid} 4px, ${woodLight} 8px, ${woodMid} 12px, ${woodDark} 16px)`,
                boxShadow: `0 40px 100px rgba(0,0,0,0.4), 0 0 0 2px ${woodDark}`,
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Wood grain overlay on popup */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute w-full pointer-events-none"
                  style={{ top: `${(i / 20) * 100}%`, height: 1,
                    background: `linear-gradient(90deg, transparent, ${woodDark}50, transparent)`,
                    opacity: 0.3 }} />
              ))}

              {/* Metal top strip */}
              <div className="relative h-3" style={{ background: metalColor, opacity: 0.9 }} />

              {/* Content area — white paper out of the box */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative m-3 rounded-xl bg-white p-7"
                style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)" }}
              >
                {/* Paper texture lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="absolute left-8 right-8 h-px"
                    style={{ top: `${24 + i * 32}px`, background: "rgba(0,0,0,0.04)" }} />
                ))}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${woodMid}18`, border: `2px solid ${woodMid}30` }}>
                      {panel.emoji}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: woodMid }}>
                        DPS SPR
                      </p>
                      <h3 className="font-serif font-bold text-gray-900"
                        style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.02em" }}>
                        {panel.heading}
                      </h3>
                    </div>
                  </div>

                  <div className="h-px mb-5" style={{ background: `linear-gradient(90deg,${woodMid}60,transparent)` }} />

                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                    {panel.full}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setOpen(false)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: `linear-gradient(135deg,${woodDark},${woodMid})`,
                        boxShadow: `0 4px 16px ${woodDark}50` }}>
                      Close Box
                    </button>
                    <a href="/vision"
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-center border-2 transition-all hover:-translate-y-0.5"
                      style={{ borderColor: woodMid, color: woodMid }}>
                      Learn More →
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Bottom metal strip */}
              <div className="h-3" style={{ background: metalColor, opacity: 0.9 }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Imagine() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet"/>
      <section className="bg-white overflow-hidden" style={{ padding: "4rem 0 7rem" }}>
        <div className="wrap">

          <div ref={ref} className="text-center mb-2">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize:   "clamp(5rem, 13vw, 10.5rem)",
                fontWeight: 700, color: "#006C33",
                lineHeight: 1.05, display: "block",
              }}
            >
              Imagine
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="text-center font-serif font-bold text-gray-900 mb-4"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}
          >
            Imagine a School Like No Other.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center text-gray-500 max-w-2xl mx-auto leading-relaxed mb-16"
            style={{ fontSize: "1rem" }}
          >
            Delhi Public School, Southern Peripheral Road is opening in April 2027 under the aegis of the{" "}
            <span className="font-semibold" style={{ color: "#006C33" }}>DPS Society, New Delhi</span>
            {" "}— one of India&apos;s most trusted school networks since 1949.
          </motion.p>

          {/* Wooden boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-24 max-w-3xl mx-auto">
            {PANELS.map((panel, i) => (
              <WoodenBox key={panel.id} panel={panel} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
