"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/", sub: [] },
  {
    label: "DPS Family", href: "/dps-family",
    sub: [
      { group: "About DPS Society", items: [
        { label: "DPS Society",         href: "/dps-society",   desc: "A legacy since 1949",          icon: "🏛️" },
        { label: "Vision & Mission",    href: "/vision",        desc: "What we believe and why",      icon: "🎯" },
        { label: "Core Values",         href: "/core-values",   desc: "Service Before Self",          icon: "💚" },
      ]},
      { group: "Leadership", items: [
        { label: "Chairperson Message", href: "/chairperson",   desc: "A word from our Chairperson", icon: "👑" },
        { label: "Founder's Message",   href: "/founder",       desc: "The vision behind DPS SPR",   icon: "⭐" },
        { label: "Principal's Message", href: "/principal",     desc: "A message from the Principal",icon: "🎓" },
      ]},
    ],
  },
  {
    label: "Academics", href: "/academics",
    sub: [
      { group: "Learning Framework", items: [
        { label: "Learning Model",  href: "/learning-model", desc: "Know → Think → Create → Contribute", icon: "🧠" },
        { label: "Future-Ready",    href: "/future-ready",   desc: "AI, robotics & innovation labs",      icon: "🚀" },
      ]},
      { group: "School Programmes", items: [
        { label: "Early Years",     href: "/kindergarten",   desc: "Nursery, Prep & Class 1–2",           icon: "🌸" },
        { label: "Primary School",  href: "/primary",        desc: "Class 3 – Class 5",                   icon: "📚" },
        { label: "Middle School",   href: "/middle",         desc: "Class 6 – Class 7",                   icon: "⭐" },
      ]},
    ],
  },
  {
    label: "Campus", href: "/campus",
    sub: [
      { group: "Learning Spaces", items: [
        { label: "Classrooms",      href: "/campus#classrooms", desc: "Smart, future-ready classrooms",     icon: "🏫" },
        { label: "Labs & Innovation",href: "/campus#labs",      desc: "10+ modern labs incl. VR & ATL",    icon: "🔬" },
        { label: "Library",         href: "/campus#library",    desc: "Two-floor modern library",           icon: "📖" },
      ]},
      { group: "Sports & Wellbeing", items: [
        { label: "Sports Complex",  href: "/sports",            desc: "20+ sports disciplines",             icon: "🏆" },
        { label: "Security Features",href: "/campus#security",  desc: "CCTV, access control & safety",      icon: "🔒" },
        { label: "Green Campus",    href: "/campus#green",      desc: "3+ acres of lush greenery",          icon: "🌿" },
      ]},
    ],
  },
  {
    label: "School Life", href: "/school-life",
    sub: [
      { group: "Activities & Wellbeing", items: [
        { label: "Beyond Classroom", href: "/beyond-classroom",          desc: "Clubs, arts & co-curricular", icon: "🎭" },
        { label: "Wellbeing",        href: "/wellbeing",                 desc: "Emotional safety & care",     icon: "💛" },
        { label: "Scholarships",     href: "/admissions#scholarships",   desc: "Sports & academic awards",    icon: "🏅" },
      ]},
    ],
  },
  { label: "Admissions", href: "/admissions", sub: [], cta: true },
];

function MegaMenu({ item, onClose }: { item: typeof NAV[number]; onClose: () => void }) {
  const cols = item.sub.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50"
    >
      {/* Arrow tip */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-black/[0.06] rotate-45" />
      <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden"
        style={{ boxShadow: "0 16px 56px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)", minWidth: cols === 2 ? 480 : 240 }}>
        <div className="h-[3px] bg-[#006C33]" />
        <div className={cn("p-3", cols === 2 && "grid grid-cols-2 gap-1")}>
          {item.sub.map((group, gi) => (
            <div key={group.group} className={cn(cols === 1 && gi > 0 && "mt-1 pt-1 border-t border-gray-100")}>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 px-3 py-2">{group.group}</p>
              {group.items.map((s, si) => (
                <motion.div key={s.href}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (gi * 3 + si) * 0.03 + 0.05 }}
                >
                  <Link href={s.href} onClick={onClose}
                    className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E8F5EE] transition-colors duration-150">
                    <span className="text-lg leading-none mt-0.5 flex-shrink-0">{s.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#006C33] transition-colors">{s.label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                    <ArrowUpRight size={13} className="flex-shrink-0 text-gray-200 group-hover:text-[#FFD700] mt-1 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [visible,    setVisible]    = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu,   setOpenMenu]   = useState<string | null>(null);

  const lastY   = useRef(0);
  const ticking = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── THE FIX: simple, reliable scroll logic ───────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // White background once past hero
        setScrolled(y > 80);

        // Visibility: ALWAYS show. Only hide when scrolling DOWN past 400px
        if (y <= 80) {
          setVisible(true);           // top of page → always show
        } else if (y > lastY.current) {
          // scrolling DOWN — keep showing until past 400px, then hide
          if (y > 400) setVisible(false);
          else         setVisible(true);
        } else {
          // scrolling UP — always show immediately
          setVisible(true);
        }

        lastY.current  = y;
        ticking.current = false;
      });
    };

    // Set initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 110);
  };
  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* ── Header — y controlled by inline style, NOT framer animate ── */}
      <div
        className="fixed inset-x-0 top-0 z-50"
        style={{
          transform:  visible ? "translateY(0)" : "translateY(-120px)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Announcement bar */}
        <div
          style={{
            backgroundColor: "#006C33",
            overflow: "hidden",
            maxHeight: scrolled ? 0 : 40,
            opacity:   scrolled ? 0 : 1,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}
        >
          <div className="wrap flex items-center justify-center gap-3 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />
            <p className="text-white/75 text-[11px] tracking-[0.13em] uppercase text-center">
              Admissions Open —&nbsp;
              <span className="text-[#FFD700] font-bold">Founding Batch April 2027</span>
              &nbsp;— DPS Society, New Delhi
            </p>
            <a href="tel:+91XXXXXXXXXX"
              className="hidden sm:flex items-center gap-1.5 ml-4 text-white/55 hover:text-white transition-colors text-[11px]">
              <Phone size={11} /> +91 XXXXX XXXXX
            </a>
          </div>
        </div>

        {/* Main bar */}
        <div style={{
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          borderBottom:    scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
          boxShadow:       scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          backdropFilter:  scrolled ? "blur(16px)" : "none",
          transition:      "background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
        }}>
          <div className="wrap flex items-center justify-between h-[68px]">

            {/* Logo — crossfade between light and dark versions */}
            <Link href="/" className="flex-shrink-0" style={{ height: 44, display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative", width: 220, height: 44 }}>
                {/* Dark logo (for white bg) */}
                <Image src="/images/logo/logo1.png" alt="DPS SPR"
                  width={320} height={60} priority
                  style={{
                    position: "absolute", top: 0, left: 0,
                    height: 44, width: "auto", objectFit: "contain",
                    opacity:       scrolled ? 1 : 0,
                    transition:    "opacity 0.4s ease",
                    pointerEvents: scrolled ? "auto" : "none",
                  }}
                />
                {/* Light logo (for dark/video bg) */}
                <Image src="/images/logo/logolight.png" alt="DPS SPR"
                  width={320} height={60} priority
                  style={{
                    position: "absolute", top: 0, left: 0,
                    height: 44, width: "auto", objectFit: "contain",
                    opacity:       scrolled ? 0 : 1,
                    transition:    "opacity 0.4s ease",
                    pointerEvents: scrolled ? "none" : "auto",
                  }}
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.sub.length && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      item.cta
                        ? scrolled
                          ? "bg-[#006C33] text-white hover:bg-[#004F24] rounded-full px-5 ml-2"
                          : "bg-[#FFD700] text-[#111827] font-bold hover:bg-[#E6C200] rounded-full px-5 ml-2"
                        : scrolled
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    {item.sub.length > 0 && (
                      <ChevronDown size={13}
                        style={{ transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.2s" }} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {openMenu === item.label && item.sub.length > 0 && (
                      <div onMouseEnter={handleDropdownEnter} onMouseLeave={handleMouseLeave}>
                        <MegaMenu item={item} onClose={() => setOpenMenu(null)} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Burger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.15}}><X size={21}/></motion.span>
                  : <motion.span key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.15}}><Menu size={21}/></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{x:"100%"}} animate={{x:"0%"}} exit={{x:"100%"}}
              transition={{duration:0.36, ease:[0.22,1,0.36,1]}}
              className="fixed top-0 right-0 bottom-0 z-50 w-[88vw] max-w-[360px] bg-white flex flex-col lg:hidden"
              style={{boxShadow:"-8px 0 48px rgba(0,0,0,0.18)"}}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
                <Image src="/images/logo/logo1.png" alt="DPS SPR"
                  width={180} height={38} className="h-9 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-400 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                {NAV.map((item, i) => (
                  <motion.div key={item.label}
                    initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
                    transition={{delay: i * 0.04}} className="mb-1"
                  >
                    {item.sub.length > 0 ? (
                      <>
                        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 px-3 pt-4 pb-1">{item.label}</p>
                        {item.sub.map(group => group.items.map(s => (
                          <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-[#E8F5EE] hover:text-[#006C33] transition-colors group">
                            <span className="text-base">{s.icon}</span>
                            <span className="font-medium flex-1">{s.label}</span>
                            <ArrowUpRight size={12} className="text-gray-300 group-hover:text-[#FFD700]" />
                          </Link>
                        )))}
                      </>
                    ) : item.cta ? null : (
                      <Link href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        {item.label}
                        <ArrowUpRight size={13} className="text-gray-300" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100">
                <Link href="/admissions" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-[#111827]"
                  style={{background:"#FFD700", boxShadow:"0 4px 16px rgba(255,215,0,0.35)"}}>
                  Apply for Founding Batch 2027 <ArrowUpRight size={15} />
                </Link>
                <p className="text-center text-[11px] text-gray-400 mt-2.5">Opening April 2027 · Limited Seats</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
