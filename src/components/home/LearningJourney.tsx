"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ExternalLink } from "lucide-react";

const STAGES = [
  {
    id:"early", label:"Early Years", short:"Nursery – Class 2",
    age:"Ages 3 – 8", color:"#EC4899", colorDark:"#9D174D", colorPale:"#FDF2F8",
    emoji:"🌸", grad:"linear-gradient(135deg,#F9A8D4,#EC4899)",
    desc:"The most magical years. Play, wonder, creativity and emotional safety — every single day.",
    highlights:[
      {icon:"🎨",text:"Play-based learning"},
      {icon:"📖",text:"Early literacy & phonics"},
      {icon:"🎵",text:"Music, dance & arts"},
      {icon:"🌿",text:"Nature & discovery"},
      {icon:"💛",text:"Emotional safety"},
      {icon:"🏊",text:"Splash pool & play"},
    ],
    quote:"Every child is a seed. Our job is to make sure every one gets sunlight.",
    page:"/kindergarten", pageLbl:"Explore Early Years",
  },
  {
    id:"primary", label:"Primary Years", short:"Class 3 – Class 5",
    age:"Ages 8 – 11", color:"#006C33", colorDark:"#004F24", colorPale:"#E8F5EE",
    emoji:"🚀", grad:"linear-gradient(135deg,#6EE7A0,#006C33)",
    desc:"Curiosity takes flight. Children discover their passions and build the confidence to pursue them.",
    highlights:[
      {icon:"🧠",text:"Critical thinking"},
      {icon:"🔬",text:"Science & maths labs"},
      {icon:"💻",text:"Coding & digital"},
      {icon:"🏏",text:"20+ sports"},
      {icon:"🎭",text:"Drama & debate"},
      {icon:"🤝",text:"Leadership"},
    ],
    quote:"This is where children discover that learning is the greatest adventure.",
    page:"/learning-journey", pageLbl:"Primary Programme",
  },
  {
    id:"middle", label:"Middle Years", short:"Class 6 – Class 7",
    age:"Ages 11 – 13", color:"#1D4ED8", colorDark:"#1E3A8A", colorPale:"#EFF6FF",
    emoji:"⭐", grad:"linear-gradient(135deg,#93C5FD,#1D4ED8)",
    desc:"Potential meets purpose. Students explore careers, lead teams and shape the future.",
    highlights:[
      {icon:"🤖",text:"Robotics & ATL Lab"},
      {icon:"🌐",text:"VR & immersive learning"},
      {icon:"📊",text:"Research & projects"},
      {icon:"🏆",text:"Competitive sports"},
      {icon:"🎓",text:"Career mentorship"},
      {icon:"🌍",text:"Global citizenship"},
    ],
    quote:"We prepare students not just for the next class — but for the next chapter of life.",
    page:"/learning-journey", pageLbl:"Middle Programme",
  },
] as const;

function StageModal({ stage, onClose }: { stage: typeof STAGES[number]|null; onClose:()=>void }) {
  if (!stage) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{backdropFilter:"blur(12px)",background:"rgba(0,0,0,0.45)"}}
        onClick={onClose}>
        <motion.div
          initial={{opacity:0,scale:0.88,y:32}} animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:0.88,y:32}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}
          className="bg-white rounded-3xl overflow-hidden w-full"
          style={{maxWidth:440, boxShadow:"0 24px 80px rgba(0,0,0,0.22)"}}
          onClick={e=>e.stopPropagation()}>
          <div className="relative px-7 pt-7 pb-5" style={{background:stage.grad}}>
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center">
              <X size={16} className="text-white"/>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">
                {stage.emoji}
              </div>
              <div>
                <span className="text-white/65 text-[11px] font-bold tracking-widest uppercase">{stage.age}</span>
                <h3 className="font-serif font-bold text-2xl text-white leading-tight">{stage.label}</h3>
                <p className="text-white/70 text-sm">{stage.short}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{stage.desc}</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {stage.highlights.map(h=>(
                <div key={h.text} className="flex items-start gap-2 rounded-xl p-2.5" style={{background:stage.colorPale}}>
                  <span className="text-sm flex-shrink-0">{h.icon}</span>
                  <span className="text-[11px] font-semibold leading-snug" style={{color:stage.colorDark}}>{h.text}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 mb-5 border-l-4" style={{background:stage.colorPale,borderColor:stage.color}}>
              <p className="text-xs italic font-medium leading-relaxed" style={{color:stage.colorDark}}>&ldquo;{stage.quote}&rdquo;</p>
            </div>
            <Link href={stage.page}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white hover:opacity-90 transition-all"
              style={{background:stage.grad,boxShadow:`0 4px 20px ${stage.color}40`}}
              onClick={onClose}>
              {stage.pageLbl} <ExternalLink size={14}/>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CarDot({ color }: { color: string }) {
  return (
    <div style={{ width:34, height:34, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <motion.div style={{ position:"absolute", width:34, height:34, borderRadius:"50%", background:color, opacity:0.15 }}
        animate={{ scale:[1,1.8,1], opacity:[0.15,0,0.15] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeOut" }}/>
      <motion.div style={{ position:"absolute", width:22, height:22, borderRadius:"50%", background:color, opacity:0.25 }}
        animate={{ scale:[1,1.5,1], opacity:[0.25,0.05,0.25] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeOut", delay:0.2 }}/>
      <div style={{ width:14, height:14, borderRadius:"50%", background:color, border:"2.5px solid white",
        boxShadow:`0 0 0 3px ${color}35, 0 3px 10px ${color}60`, position:"relative" }}>
        <div style={{ position:"absolute", width:4, height:4, borderRadius:"50%", background:"white", top:2, left:3, opacity:0.7 }}/>
      </div>
    </div>
  );
}

export default function LearningJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef(null);
  const titleView  = useInView(titleRef, { once:true, amount:0.25 });
  const [active, setActive]     = useState<typeof STAGES[number]|null>(null);
  const [dotColor, setDotColor] = useState("#EC4899");

  // Road waypoints — carefully tuned for the SVG path
  // viewBox is "0 0 900 380" but we use percentage-based rendering
  // So we work in 0-900 x, 0-380 y space
  const WX = [55, 130, 220, 330, 440, 555, 660, 775, 858];
  const WY = [195, 195, 300, 330, 305, 195, 195, 300, 255];
  const WP = [0, 0.11, 0.24, 0.37, 0.50, 0.62, 0.74, 0.87, 1.0];

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start center", "end center"],
  });

  const rawX = useTransform(scrollYProgress, WP, WX);
  const rawY = useTransform(scrollYProgress, WP, WY);
  const dotX = useSpring(rawX, { stiffness:280, damping:32, mass:0.4 });
  const dotY = useSpring(rawY, { stiffness:280, damping:32, mass:0.4 });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => {
      if (v < 0.38)      setDotColor("#EC4899");
      else if (v < 0.70) setDotColor("#006C33");
      else               setDotColor("#1D4ED8");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {active && <StageModal stage={active} onClose={() => setActive(null)}/>}

      <section ref={sectionRef} className="relative overflow-hidden bg-white border-t border-black/[0.05]"
        style={{ paddingTop:"4rem", paddingBottom:"4rem" }}>

        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"linear-gradient(rgba(0,0,0,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.022) 1px,transparent 1px)",
          backgroundSize:"48px 48px",
        }}/>

        <div className="wrap relative z-10">

          {/* Header */}
          <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <motion.div initial={{opacity:0,y:14}} animate={titleView?{opacity:1,y:0}:{}} className="flex justify-center mb-4">
              <span className="pill-green">The DPS SPR Learning Journey</span>
            </motion.div>
            <motion.h2 initial={{opacity:0,y:24}} animate={titleView?{opacity:1,y:0}:{}} transition={{delay:0.1,duration:0.75,ease:[0.22,1,0.36,1]}}
              className="t-h1 text-ink text-balance">
              A road built for{" "}
              <span style={{background:"linear-gradient(135deg,#EC4899 0%,#006C33 50%,#1D4ED8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                every child.
              </span>
            </motion.h2>
            <motion.p initial={{opacity:0}} animate={titleView?{opacity:1}:{}} transition={{delay:0.25}}
              className="text-gray-400 text-sm mt-4 leading-relaxed">
              Scroll to move through each stage · Tap any card to explore
            </motion.p>
          </div>

          {/* ── Road canvas — DESKTOP only with scroll dot ── */}
          <div className="hidden sm:block">
            <div className="relative mx-auto" style={{ width:"100%", maxWidth:920, height:380 }}>

              {/* SVG road */}
              <svg viewBox="0 0 900 380" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#EC4899" stopOpacity="0.18"/>
                    <stop offset="42%"  stopColor="#006C33" stopOpacity="0.18"/>
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.18"/>
                  </linearGradient>
                </defs>
                {/* Road layers */}
                <path d="M 55 195 C 90 195 140 290 220 315 C 300 340 370 340 445 310 C 520 280 548 195 625 195 C 690 195 730 285 795 310 C 825 322 852 288 865 258"
                  stroke="url(#rg2)" strokeWidth="50" strokeLinecap="round" fill="none"/>
                <path d="M 55 195 C 90 195 140 290 220 315 C 300 340 370 340 445 310 C 520 280 548 195 625 195 C 690 195 730 285 795 310 C 825 322 852 288 865 258"
                  stroke="white" strokeWidth="42" strokeLinecap="round" fill="none" opacity="0.7"/>
                <path d="M 55 195 C 90 195 140 290 220 315 C 300 340 370 340 445 310 C 520 280 548 195 625 195 C 690 195 730 285 795 310 C 825 322 852 288 865 258"
                  stroke="#F3F4F6" strokeWidth="38" strokeLinecap="round" fill="none"/>
                <path d="M 55 195 C 90 195 140 290 220 315 C 300 340 370 340 445 310 C 520 280 548 195 625 195 C 690 195 730 285 795 310 C 825 322 852 288 865 258"
                  stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M 55 195 C 90 195 140 290 220 315 C 300 340 370 340 445 310 C 520 280 548 195 625 195 C 690 195 730 285 795 310 C 825 322 852 288 865 258"
                  stroke="#FFD700" strokeWidth="2" strokeDasharray="20 14" strokeLinecap="round" fill="none" opacity="0.55"/>

                {/* Milestone dots */}
                <circle cx="55"  cy="195" r="18" fill="#EC4899" opacity="0.08"/>
                <circle cx="55"  cy="195" r="10" fill="#EC4899" opacity="0.2"/>
                <circle cx="55"  cy="195" r="6"  fill="#EC4899"/>
                <circle cx="55"  cy="195" r="2.5" fill="white"/>

                <circle cx="445" cy="310" r="18" fill="#006C33" opacity="0.08"/>
                <circle cx="445" cy="310" r="10" fill="#006C33" opacity="0.2"/>
                <circle cx="445" cy="310" r="6"  fill="#006C33"/>
                <circle cx="445" cy="310" r="2.5" fill="white"/>

                <circle cx="865" cy="258" r="18" fill="#1D4ED8" opacity="0.08"/>
                <circle cx="865" cy="258" r="10" fill="#1D4ED8" opacity="0.2"/>
                <circle cx="865" cy="258" r="6"  fill="#1D4ED8"/>
                <circle cx="865" cy="258" r="2.5" fill="white"/>

                {/* Connector lines to cards */}
                <line x1="55"  y1="178" x2="55"  y2="88"  stroke="#EC4899" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
                <line x1="445" y1="328" x2="445" y2="372" stroke="#006C33" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
                <line x1="865" y1="241" x2="865" y2="88"  stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4"/>
              </svg>

              {/* Dot — clamped within SVG viewBox percentages */}
              <motion.div className="absolute z-20 pointer-events-none"
                style={{
                  left: 0, top: 0,
                  x: dotX, y: dotY,
                  translateX:"-50%", translateY:"-50%",
                }}>
                <CarDot color={dotColor}/>
              </motion.div>

              {/* EARLY YEARS card — top left */}
              <motion.button
                initial={{opacity:0,y:-12}} animate={titleView?{opacity:1,y:0}:{}} transition={{delay:0.4}}
                onClick={()=>setActive(STAGES[0])}
                className="absolute text-left group" style={{left:"0%",top:"2%",width:185}}>
                <div className="bg-white rounded-2xl border-2 border-pink-100 p-4 shadow-sm group-hover:border-pink-300 group-hover:shadow-md group-hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0"/>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-pink-400">Ages 3–8</span>
                  </div>
                  <p className="font-serif font-bold text-ink text-sm leading-tight mb-0.5">Early Years</p>
                  <p className="text-gray-400 text-[11px]">Nursery · Prep · Class 1–2</p>
                  <div className="flex items-center gap-1 text-pink-500 text-[11px] font-bold mt-3">Tap to explore <ArrowRight size={10}/></div>
                </div>
                <div className="w-px h-10 bg-pink-200 ml-8"/>
              </motion.button>

              {/* PRIMARY YEARS card — bottom center */}
              <motion.button
                initial={{opacity:0,y:12}} animate={titleView?{opacity:1,y:0}:{}} transition={{delay:0.55}}
                onClick={()=>setActive(STAGES[1])}
                className="absolute text-left group" style={{left:"41%",bottom:"0%",transform:"translateX(-50%)",width:185}}>
                <div className="w-px h-8 bg-green-200 ml-8"/>
                <div className="bg-white rounded-2xl border-2 border-green-100 p-4 shadow-sm group-hover:border-green-400 group-hover:shadow-md group-hover:translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"/>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-green-600">Ages 8–11</span>
                  </div>
                  <p className="font-serif font-bold text-ink text-sm leading-tight mb-0.5">Primary Years</p>
                  <p className="text-gray-400 text-[11px]">Class 3 · Class 4 · Class 5</p>
                  <div className="flex items-center gap-1 text-green-600 text-[11px] font-bold mt-3">Tap to explore <ArrowRight size={10}/></div>
                </div>
              </motion.button>

              {/* MIDDLE YEARS card — top right */}
              <motion.button
                initial={{opacity:0,y:-12}} animate={titleView?{opacity:1,y:0}:{}} transition={{delay:0.7}}
                onClick={()=>setActive(STAGES[2])}
                className="absolute text-left group" style={{right:"0%",top:"2%",width:185}}>
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-4 shadow-sm group-hover:border-blue-400 group-hover:shadow-md group-hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"/>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500">Ages 11–13</span>
                  </div>
                  <p className="font-serif font-bold text-ink text-sm leading-tight mb-0.5">Middle Years</p>
                  <p className="text-gray-400 text-[11px]">Class 6 · Class 7</p>
                  <div className="flex items-center gap-1 text-blue-500 text-[11px] font-bold mt-3">Tap to explore <ArrowRight size={10}/></div>
                </div>
                <div className="w-px h-10 bg-blue-200 ml-8"/>
              </motion.button>
            </div>
          </div>

          {/* ── MOBILE: Simple 3 cards stacked ── */}
          <div className="sm:hidden grid grid-cols-1 gap-4 mb-6">
            {STAGES.map((s) => (
              <motion.button key={s.id}
                initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}}
                onClick={()=>setActive(s)}
                className="text-left w-full rounded-2xl border-2 p-5 transition-all duration-200 active:scale-98"
                style={{borderColor: s.color + "30", background: s.colorPale}}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                    style={{background: s.color + "20", color: s.colorDark}}>
                    {s.age}
                  </span>
                </div>
                <p className="font-serif font-bold text-ink text-lg mb-1">{s.label}</p>
                <p className="text-gray-500 text-xs mb-3">{s.short}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1.5 text-sm font-bold" style={{color: s.color}}>
                  Explore {s.label} <ArrowRight size={13}/>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Pills */}
          <motion.div initial={{opacity:0}} animate={titleView?{opacity:1}:{}} transition={{delay:0.85}}
            className="flex flex-wrap justify-center gap-3 mt-6 sm:mt-8">
            {STAGES.map(s => (
              <button key={s.id} onClick={()=>setActive(s)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{borderColor:s.color, background:`${s.color}10`, color:s.colorDark}}>
                {s.emoji} {s.label} <span className="opacity-50 font-normal">{s.age}</span>
              </button>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial={{opacity:0,y:20}} animate={titleView?{opacity:1,y:0}:{}} transition={{delay:0.95}}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F9FAFB] border border-black/[0.06] rounded-3xl p-6 sm:p-8">
            <div className="text-center sm:text-left">
              <p className="font-serif font-bold text-ink text-xl mb-1">Every child&apos;s journey is unique.</p>
              <p className="text-gray-400 text-sm">Talk to our team to understand how DPS SPR supports your child at every stage.</p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/learning-journey" className="btn-green btn-sm inline-flex items-center gap-1.5 group">
                Full Learning Journey <ArrowRight size={13} className="transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link href="/admissions" className="btn-outline-dark btn-sm inline-flex">Apply for 2027</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
