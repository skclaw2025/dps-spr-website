"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PANELS = [
  {
    id: "mission",
    title: "Our Mission",
    emoji: "🎯",
    color: "#006C33",
    colorLight: "#E8F5EE",
    heading: "Innovation with Values",
    full: "At DPS SPR, our mission is to nurture the whole child — academically excellent, emotionally resilient, socially responsible, and globally aware. We bring together the 75-year legacy of the DPS Society with modern innovation in learning, technology, and sport. Every decision we make is guided by one question: Will this help a child discover who they can become?",
  },
  {
    id: "vision",
    title: "Our Vision",
    emoji: "🌟",
    color: "#B8960C",
    colorLight: "#FFFBEB",
    heading: "A School Built for Tomorrow",
    full: "Our vision is to create a school that parents are proud to be part of and children are excited to attend every single day. DPS SPR will be a place where sport is as important as study, where creativity is celebrated as much as academics, and where every child — from Nursery to Class 7 — is given the space, support, and belief to find their extraordinary.",
  },
];

// ── SVG Envelope ──────────────────────────────────────────────────────────────
function EnvelopeSVG({
  color, isOpen, width = 320, height = 220,
}: {
  color: string; isOpen: boolean; width?: number; height?: number;
}) {
  const pale = color === "#006C33" ? "#E8F5EE" : "#FFFBEB";
  const mid  = color === "#006C33" ? "#C8E6D4" : "#F5E4A0";

  return (
    <svg viewBox="0 0 320 220" width={width} height={height} fill="none">
      {/* Envelope body */}
      <rect x="4" y="44" width="312" height="172" rx="10" fill="white"
        stroke={color} strokeWidth="2.5"/>
      {/* Inner shade */}
      <rect x="4" y="44" width="312" height="172" rx="10" fill={pale} opacity="0.6"/>

      {/* Bottom triangle fold lines */}
      <line x1="4" y1="216" x2="160" y2="138" stroke={mid} strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="316" y1="216" x2="160" y2="138" stroke={mid} strokeWidth="1.5" strokeDasharray="4 3"/>

      {/* Left flap */}
      <path d="M4 44 L4 216 L160 138 Z" fill={pale} stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" opacity="0.8"/>
      {/* Right flap */}
      <path d="M316 44 L316 216 L160 138 Z" fill={mid} stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" opacity="0.75"/>

      {/* Seal circle */}
      <circle cx="160" cy="138" r="18" fill={color} opacity="0.15"/>
      <circle cx="160" cy="138" r="13" fill={color} opacity="0.25"/>
      <circle cx="160" cy="138" r="8"  fill={color}/>
      <text x="160" y="142" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold"
        fontFamily="Georgia,serif">D</text>

      {/* Top flap — animated open/close */}
      <motion.path
        d={isOpen
          ? "M4 44 L160 4 L316 44 L160 8 Z"   // flat / open
          : "M4 44 L160 124 L316 44 L160 44 Z" // pointing down / closed
        }
        fill={isOpen ? pale : color}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity={isOpen ? 0.6 : 0.9}
        animate={{
          d: isOpen
            ? "M4 44 L160 4 L316 44 L160 8 Z"
            : "M4 44 L160 124 L316 44 L160 44 Z",
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Envelope shadow line */}
      <line x1="4" y1="44" x2="316" y2="44" stroke={color} strokeWidth="1.5" opacity="0.3"/>
    </svg>
  );
}

// ── Portal modal ──────────────────────────────────────────────────────────────
function EnvelopeModal({
  open, onClose, panel,
}: {
  open: boolean; onClose: () => void; panel: typeof PANELS[number];
}) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.52)",
          }}
        >
          {/* Opened envelope behind the card */}
          <motion.div
            initial={{ scale: 0.4, y: 120, opacity: 0 }}
            animate={{ scale: 1, y: 60, opacity: 1 }}
            exit={{ scale: 0.4, y: 120, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", zIndex: 1, pointerEvents: "none" }}
          >
            <EnvelopeSVG color={panel.color} isOpen={true} width={380} height={260}/>
          </motion.div>

          {/* Letter / card flying out of envelope */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 180 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.5, y: 160 }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative", zIndex: 10,
              width: "100%", maxWidth: 480,
              borderRadius: 20, overflow: "hidden", background: "#fff",
              boxShadow: "0 32px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            {/* Top color band */}
            <div style={{ height: 6, background: `linear-gradient(90deg,${panel.color},${panel.color}88)` }}/>

            {/* Wavy top edge — letter paper feel */}
            <svg viewBox="0 0 480 18" width="100%" style={{ display:"block", marginTop:-1 }}>
              <path d="M0 18 Q24 4 48 12 Q72 20 96 10 Q120 0 144 12 Q168 22 192 10 Q216 0 240 12 Q264 22 288 10 Q312 0 336 12 Q360 22 384 10 Q408 0 432 12 Q456 22 480 10 L480 18 Z"
                fill={panel.colorLight}/>
            </svg>

            <div style={{ background: panel.colorLight, padding: "0 1.75rem 1.5rem" }}>
              {/* Emoji + header */}
              <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:4 }}>
                <div style={{
                  width:48, height:48, borderRadius:14, fontSize:24,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"white", flexShrink:0,
                  boxShadow:`0 2px 12px ${panel.color}25`,
                }}>
                  {panel.emoji}
                </div>
                <div>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", color:panel.color, margin:0 }}>
                    DPS SPR
                  </p>
                  <h3 style={{ fontFamily:"Georgia,serif", fontWeight:700, margin:0,
                    fontSize:"clamp(1.15rem,2.5vw,1.5rem)", color:"#111827",
                    letterSpacing:"-0.02em" }}>
                    {panel.heading}
                  </h3>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding:"1.5rem 1.75rem 1.75rem", background:"#fff" }}>
              {/* Lined paper lines */}
              {Array.from({length:8}).map((_,i) => (
                <div key={i} style={{
                  height:1, background:"rgba(0,0,0,0.04)",
                  marginBottom:22, borderRadius:1,
                }}/>
              ))}
              <p style={{
                color:"#4B5563", lineHeight:1.78, fontSize:"0.9375rem",
                marginTop:-172, position:"relative", zIndex:1,
              }}>
                {panel.full}
              </p>

              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                <button onClick={onClose}
                  style={{
                    flex:1, padding:"11px 0", borderRadius:12, border:"none",
                    fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer",
                    background:`linear-gradient(135deg,${panel.color}dd,${panel.color})`,
                    boxShadow:`0 4px 16px ${panel.color}45`, transition:"all 0.2s",
                  }}>
                  Close ✕
                </button>
                <a href="/vision"
                  style={{
                    flex:1, padding:"11px 0", borderRadius:12, border:`2px solid ${panel.color}`,
                    fontSize:13, fontWeight:700, color:panel.color,
                    textAlign:"center", textDecoration:"none", display:"block",
                    transition:"all 0.2s",
                  }}>
                  Learn More →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Envelope card ─────────────────────────────────────────────────────────────
function EnvelopeCard({
  panel, index, isOpen, onOpen,
}: {
  panel: typeof PANELS[number]; index: number; isOpen: boolean; onOpen: () => void;
}) {
  const [hover, setHover] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <>
      <EnvelopeModal open={isOpen} onClose={onOpen} panel={panel}/>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4 cursor-pointer select-none"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onOpen}
      >
        {/* Envelope */}
        <motion.div
          animate={{ y: hover ? -10 : 0, scale: hover ? 1.04 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: hover
              ? `drop-shadow(0 20px 40px ${panel.color}55)`
              : `drop-shadow(0 8px 20px rgba(0,0,0,0.18))`,
            transition: "filter 0.35s",
          }}
        >
          <EnvelopeSVG color={panel.color} isOpen={hover || isOpen} width={300} height={206}/>
        </motion.div>

        {/* Label below envelope */}
        <div className="text-center">
          <motion.div
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
            style={{
              background: hover ? panel.color : `${panel.color}15`,
              color:      hover ? "#fff" : panel.color,
              border:     `2px solid ${panel.color}`,
              transition: "all 0.3s",
              boxShadow:  hover ? `0 4px 20px ${panel.color}45` : "none",
            }}
          >
            <span>{panel.emoji}</span>
            {panel.title}
            <motion.span animate={{ rotate: hover ? 45 : 0 }} transition={{ duration: 0.25 }}>
              ✉
            </motion.span>
          </motion.div>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            {hover ? "Click to open" : "Hover to peek inside"}
          </p>
        </div>
      </motion.div>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Imagine() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet"/>
      <section className="bg-white" style={{ padding: "4rem 0 7rem", overflow: "visible" }}>
        <div className="wrap">

          <div ref={ref} className="text-center mb-2">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Dancing Script',cursive",
                fontSize: "clamp(5rem,13vw,10.5rem)",
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
            style={{ fontSize: "clamp(1.5rem,3.5vw,2.25rem)", letterSpacing: "-0.02em" }}
          >
            Imagine a School Like No Other.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center text-gray-500 max-w-2xl mx-auto leading-relaxed mb-20"
            style={{ fontSize: "1rem" }}
          >
            Delhi Public School, Southern Peripheral Road is opening in April 2027 under the aegis of the{" "}
            <span className="font-semibold" style={{ color: "#006C33" }}>DPS Society, New Delhi</span>
            {" "}— one of India&apos;s most trusted school networks since 1949.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 max-w-3xl mx-auto">
            {PANELS.map((panel, i) => (
              <EnvelopeCard
                key={panel.id}
                panel={panel}
                index={i}
                isOpen={openId === panel.id}
                onOpen={() => setOpenId(openId === panel.id ? null : panel.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
