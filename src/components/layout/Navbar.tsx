"use client";
import { useState, useRef, useEffect } from "react";
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
        { label: "DPS Society",          href: "/dps-society",  desc: "A legacy since 1949",           icon: "🏛️" },
        { label: "Vision & Mission",     href: "/vision",       desc: "What we believe and why",       icon: "🎯" },
        { label: "Core Values",          href: "/core-values",  desc: "Service Before Self",           icon: "💚" },
      ]},
      { group: "Leadership", items: [
        { label: "Chairperson Message",  href: "/chairperson",  desc: "A word from our Chairperson",  icon: "👑" },
        { label: "Founder's Message",    href: "/founder",      desc: "The vision behind DPS SPR",    icon: "⭐" },
        { label: "Principal's Message",  href: "/principal",    desc: "A message from the Principal", icon: "🎓" },
      ]},
    ],
  },
  {
    label: "Academics", href: "/academics",
    sub: [
      { group: "Learning Framework", items: [
        { label: "Learning Model",  href: "/learning-model", desc: "Know → Think → Create",      icon: "🧠" },
        { label: "Future-Ready",    href: "/future-ready",   desc: "AI, robotics & innovation",   icon: "🚀" },
      ]},
      { group: "School Programmes", items: [
        { label: "Early Years",     href: "/kindergarten",   desc: "Nursery, Prep & Class 1–2",   icon: "🌸" },
        { label: "Primary School",  href: "/primary",        desc: "Class 3 – Class 5",           icon: "📚" },
        { label: "Middle School",   href: "/middle",         desc: "Class 6 – Class 7",           icon: "⭐" },
      ]},
    ],
  },
  {
    label: "Campus", href: "/campus",
    sub: [
      { group: "Learning Spaces", items: [
        { label: "Classrooms",       href: "/campus#classrooms", desc: "Smart, future-ready classrooms",  icon: "🏫" },
        { label: "Labs & Innovation",href: "/campus#labs",       desc: "10+ modern labs incl. VR & ATL",  icon: "🔬" },
        { label: "Library",          href: "/campus#library",    desc: "Two-floor modern library",         icon: "📖" },
      ]},
      { group: "Sports & Wellbeing", items: [
        { label: "Sports Complex",   href: "/sports",            desc: "20+ sports disciplines",           icon: "🏆" },
        { label: "Security Features",href: "/campus#security",   desc: "CCTV, access control & safety",    icon: "🔒" },
        { label: "Green Campus",     href: "/campus#green",      desc: "3+ acres of lush greenery",        icon: "🌿" },
      ]},
    ],
  },
  {
    label: "School Life", href: "/school-life",
    sub: [
      { group: "Activities & Wellbeing", items: [
        { label: "Beyond Classroom", href: "/beyond-classroom",        desc: "Clubs, arts & co-curricular", icon: "🎭" },
        { label: "Wellbeing",        href: "/wellbeing",               desc: "Emotional safety & care",      icon: "💛" },
        { label: "Scholarships",     href: "/admissions#scholarships", desc: "Sports & academic awards",     icon: "🏅" },
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
      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50"
    >
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-black/[0.06] rotate-45" />
      <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden"
        style={{ boxShadow: "0 16px 56px rgba(0,0,0,0.14)", minWidth: cols === 2 ? 480 : 240 }}>
        <div className="h-[3px] bg-[#006C33]" />
        <div className={cn("p-3", cols === 2 && "grid grid-cols-2 gap-1")}>
          {item.sub.map((group, gi) => (
            <div key={group.group} className={cn(cols === 1 && gi > 0 && "mt-1 pt-1 border-t border-gray-100")}>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 px-3 py-2">{group.group}</p>
              {group.items.map((s, si) => (
                <motion.div key={s.href}
                  initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (gi * 3 + si) * 0.03 + 0.05 }}>
                  <Link href={s.href} onClick={onClose}
                    className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E8F5EE] transition-colors">
                    <span className="text-lg leading-none mt-0.5 flex-shrink-0">{s.icon}</span>
                    <div className="flex-1 min-w-0">
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const lastY      = useRef(0);
  const ticking    = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 80);
        if (y <= 80) {
          setVisible(true);
        } else if (y > lastY.current && y > 400) {
          setVisible(false);
        } else if (y < lastY.current) {
          setVisible(true);
        } else if (y > 80 && y <= 400) {
          setVisible(true);
        }
        lastY.current   = y;
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDrop  = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(label); };
  const closeDrop = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 110); };
  const keepDrop  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  // Height: announcement bar is ~36px, nav bar is 68px = 104px total when not scrolled
  // When scrolled: only 68px nav bar
  const barHeight = scrolled ? 0 : 36;
  const navHeight = 68;

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50"
        style={{
          transform:  visible ? "translateY(0)" : "translateY(-120px)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* ── Announcement bar — only at top ── */}
        <div style={{
          backgroundColor: "#006C33",
          maxHeight:  scrolled ? 0 : 40,
          opacity:    scrolled ? 0 : 1,
          overflow:   "hidden",
          transition: "max-height 0.3s ease, opacity 0.25s ease",
        }}>
          <div className="wrap flex items-center justify-center gap-2 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0 animate-pulse" />
            <p className="text-white/80 text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-center leading-tight">
              <span className="text-[#FFD700] font-bold">Founding Batch April 2027</span>
              <span className="hidden sm:inline"> — Admissions Open — DPS Society, New Delhi</span>
            </p>
            <a href="tel:+91XXXXXXXXXX"
              className="hidden md:flex items-center gap-1 ml-3 text-white/50 hover:text-white text-[10px]">
              <Phone size={10} /> +91 XXXXX XXXXX
            </a>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div style={{
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          borderBottom:    scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
          boxShadow:       scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          transition:      "background-color 0.4s ease, box-shadow 0.4s ease",
        }}>
          <div className="wrap flex items-center justify-between h-[64px] sm:h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center" style={{ height: 40 }}>
              <div style={{ position: "relative", width: 180, height: 40 }}>
                <Image src="/images/logo/logo1.png" alt="DPS SPR" width={280} height={52} priority
                  style={{
                    position: "absolute", top: 0, left: 0,
                    height: 40, width: "auto", objectFit: "contain",
                    opacity: scrolled ? 1 : 0, transition: "opacity 0.4s ease",
                    pointerEvents: scrolled ? "auto" : "none",
                  }}
                />
                <Image src="/images/logo/logolight.png" alt="DPS SPR" width={280} height={52} priority
                  style={{
                    position: "absolute", top: 0, left: 0,
                    height: 40, width: "auto", objectFit: "contain",
                    opacity: scrolled ? 0 : 1, transition: "opacity 0.4s ease",
                    pointerEvents: scrolled ? "none" : "auto",
                  }}
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.sub.length && openDrop(item.label)}
                  onMouseLeave={closeDrop}>
                  <Link href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      item.cta
                        ? scrolled
                          ? "bg-[#006C33] text-white hover:bg-[#004F24] rounded-full px-5 ml-2"
                          : "bg-[#FFD700] text-[#111827] font-bold hover:bg-[#E6C200] rounded-full px-5 ml-2"
                        : scrolled
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                    )}>
                    {item.label}
                    {item.sub.length > 0 && (
                      <ChevronDown size={13}
                        style={{ transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                    )}
                  </Link>
                  <AnimatePresence>
                    {openMenu === item.label && item.sub.length > 0 && (
                      <div onMouseEnter={keepDrop} onMouseLeave={closeDrop}>
                        <MegaMenu item={item} onClose={() => setOpenMenu(null)} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Mobile: Apply CTA + Burger */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/admissions"
                className="text-[11px] font-bold px-3.5 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: scrolled ? "#006C33" : "#FFD700",
                  color:           scrolled ? "#ffffff"  : "#111827",
                }}>
                Apply
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
                )}>
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.15}}><X size={20}/></motion.span>
                    : <motion.span key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.15}}><Menu size={20}/></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile full-screen panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />

            <motion.div
              initial={{x:"100%"}} animate={{x:"0%"}} exit={{x:"100%"}}
              transition={{duration:0.34, ease:[0.22,1,0.36,1]}}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col lg:hidden bg-white"
              style={{ width: "min(340px, 90vw)", boxShadow: "-8px 0 40px rgba(0,0,0,0.18)" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 flex-shrink-0">
                <Image src="/images/logo/logo1.png" alt="DPS SPR"
                  width={160} height={34} className="h-8 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable links */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="px-3 py-3">

                  {/* Home link */}
                  <Link href="/" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors mb-1">
                    🏠 Home
                  </Link>

                  {/* Nav items with accordion */}
                  {NAV.filter(i => i.sub.length > 0).map((item) => (
                    <div key={item.label} className="mb-1">
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={15} className="text-gray-400 transition-transform duration-200"
                          style={{ transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0)" }} />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2">
                              {item.sub.map((group) => (
                                <div key={group.group} className="mt-1">
                                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 px-3 py-1.5">
                                    {group.group}
                                  </p>
                                  {group.items.map((s) => (
                                    <Link key={s.href} href={s.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-[#E8F5EE] hover:text-[#006C33] transition-colors group">
                                      <span className="text-base w-6 text-center flex-shrink-0">{s.icon}</span>
                                      <span className="font-medium flex-1">{s.label}</span>
                                      <ArrowUpRight size={12} className="text-gray-300 group-hover:text-[#FFD700] flex-shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white">
                <Link href="/admissions" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-[#111827] transition-all active:scale-95"
                  style={{ background: "#FFD700", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}>
                  Apply for Founding Batch 2027
                  <ArrowUpRight size={15} />
                </Link>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Opening April 2027 · Limited Seats
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
