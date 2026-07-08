"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Smile, Heart, BookOpen,
  Palette, Music, Star, Shield, Users, Sparkles,
} from "lucide-react";

// ── Day schedule ─────────────────────────────────────────────
const SCHEDULE = [
  { time: "8:00 AM",  act: "Morning Circle",        detail: "Songs, stories & sharing time"            },
  { time: "8:45 AM",  act: "Exploration Time",       detail: "Play-based learning centres"              },
  { time: "10:00 AM", act: "Creative Expression",    detail: "Art, craft, building & making"            },
  { time: "11:00 AM", act: "Outdoor Play",           detail: "Physical activity & nature exploration"   },
  { time: "12:00 PM", act: "Story & Rest",           detail: "Guided storytelling & quiet time"         },
  { time: "1:00 PM",  act: "Music & Dance",          detail: "Rhythm, movement & self-expression"       },
  { time: "1:30 PM",  act: "Goodbye Circle",         detail: "Reflection, sharing & warm farewell"      },
];

// ── 6 experience cards ────────────────────────────────────────
const MOMENTS = [
  { icon: Smile,    color: "#D97706", bg: "#FFFBEB", label: "Joy & Play",          desc: "Learning through laughter, movement, and imagination every single day."             },
  { icon: Heart,    color: "#DC2626", bg: "#FFF5F5", label: "Emotional Safety",    desc: "Every child feels seen, heard, and genuinely loved in our Early Years wing."        },
  { icon: BookOpen, color: "#006C33", bg: "#E8F5EE", label: "Early Literacy",      desc: "Stories, phonics, and language that spark a lifelong love of reading and writing."  },
  { icon: Palette,  color: "#7C3AED", bg: "#F5F3FF", label: "Creative Expression", desc: "Painting, clay, building blocks — creativity is the first language of learning."    },
  { icon: Music,    color: "#EC4899", bg: "#FDF2F8", label: "Music & Movement",    desc: "Rhythm, dance, and instruments build confidence and coordination naturally."         },
  { icon: Star,     color: "#D97706", bg: "#FFFBEB", label: "Wonder & Curiosity",  desc: "We celebrate 'why?' — curiosity is the most important subject we teach."            },
];

// ── Reassurance blocks ────────────────────────────────────────
const REASSURE = [
  { icon: Shield, text: "Your child will feel safe.",            sub: "Dedicated staff, CCTV, controlled access, medical room"     },
  { icon: Users,  text: "Your child will make friends.",         sub: "Small class sizes, structured social time, buddy system"    },
  { icon: Sparkles, text: "Your child will love coming to school.", sub: "Play-led learning, warm teachers, joyful environment"    },
];

export default function EarlyYears() {
  const headRef  = useRef(null);
  const headView = useInView(headRef, { once: true, amount: 0.2 });
  const ellieRef = useRef(null);
  const ellieView = useInView(ellieRef, { once: true, amount: 0.3 });
  const [ellieMood, setEllieMood] = useState<"sit"|"happy"|"wink">("sit");
  const [factIdx, setFactIdx] = useState(0);

  const FACTS = [
    "Did you know? Elephants never forget! Great schools work the same way 🧠",
    "At DPS SPR, every child is known by name — not by number! 💚",
    "Our Early Years teachers are specially trained for ages 3–8 🎓",
    "We have a Splash Pool just for the youngest learners! 🏊",
    "Morning & Evening programmes let children explore their passions! ⭐",
  ];

  const handleEllieClick = () => {
    setFactIdx((f) => (f + 1) % FACTS.length);
    setEllieMood((m) => m === "sit" ? "happy" : m === "happy" ? "wink" : "sit");
  };

  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFF0F8 0%, #FFF5FB 40%, #FDF0F8 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle,#FFD700 0%,transparent 70%)" }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#006C33 0%,transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle,#EC4899 0%,transparent 70%)" }} />

      <div className="wrap relative z-10">

        {/* ── Section header ── */}
        <div ref={headRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-4"
          >
            <span className="pill-green">Early Years · Nursery to Class 2 · Main Focus</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="t-h1 text-ink text-balance"
          >
            Your child&apos;s first steps
            <br />
            should feel like{" "}
            <span style={{
              background: "linear-gradient(135deg,#EC4899,#D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              magic.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.65 }}
            className="t-body text-gray-500 mt-5"
          >
            Our Early Years programme is designed entirely around the world of a
            3 to 8 year old — where wonder is the curriculum and joy is the outcome.
          </motion.p>
        </div>

        {/* ── Ellie + Schedule + Reassurance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-14">

          {/* Ellie column */}
          <div ref={ellieRef} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={ellieView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              {/* Fact bubble */}
              <motion.div
                key={factIdx}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-3 bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[200px] text-center shadow-md border border-pink-100"
              >
                <p className="text-xs font-semibold text-gray-800 leading-snug">
                  {FACTS[factIdx]}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={ellieView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="t-label text-gray-400 text-center mt-3"
              >
                Tap Ellie for fun facts! 🐘
              </motion.p>
            </motion.div>

            {/* ⭐ Gold focus note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ellieView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 w-full bg-white rounded-2xl border-2 border-gold/40 p-4 text-center"
              style={{ boxShadow: "0 4px 20px rgba(255,215,0,0.15)" }}
            >
              <p className="text-2xl mb-1.5">⭐</p>
              <p className="font-bold text-ink text-sm mb-1">Main Focus — Nursery to Class 2</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                DPS SPR launches with Nursery to Class 7. Our deepest care and
                most intentional design is built for children aged 3–8.
              </p>
            </motion.div>
          </div>

          {/* Day schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-md">
              {/* Top strip */}
              <div className="h-1.5"
                style={{ background: "linear-gradient(90deg,#EC4899,#FFD700,#006C33)" }} />

              <div className="p-7 sm:p-9">
                <p className="t-label text-gray-400 mb-2">A Day in Early Years</p>
                <h3 className="t-h3 text-ink mb-7">
                  Every morning begins with a warm hug<br className="hidden sm:block" />
                  and a new adventure.
                </h3>

                <div className="flex flex-col gap-0">
                  {SCHEDULE.map((d, i) => (
                    <motion.div
                      key={d.time}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.07, duration: 0.55 }}
                      className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0 group"
                    >
                      {/* Time pill */}
                      <span
                        className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-full mt-0.5 w-[76px] text-center"
                        style={{
                          background: i % 2 === 0 ? "#FFF0F8" : "#F0FDF4",
                          color: i % 2 === 0 ? "#EC4899" : "#006C33",
                        }}
                      >
                        {d.time}
                      </span>
                      {/* Dot connector */}
                      <div className="flex flex-col items-center mt-1.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full"
                          style={{ background: i % 2 === 0 ? "#EC4899" : "#006C33" }} />
                        {i < SCHEDULE.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 mt-1 mb-0" style={{ minHeight: 20 }} />
                        )}
                      </div>
                      <div className="pb-3">
                        <p className="font-semibold text-ink text-sm">{d.act}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{d.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reassurance blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {REASSURE.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.text}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm"
                  >
                    <Icon size={18} className="text-pink-400 mb-2" />
                    <p className="font-bold text-ink text-sm leading-tight mb-1">{r.text}</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{r.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 6 moment cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {MOMENTS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22,1,0.36,1] }}
                className="bg-white rounded-2xl border border-pink-50 p-6 group cursor-default"
                style={{
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.35s ease",
                }}
                whileHover={{ y: -7, boxShadow: "0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.10)" }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: m.bg }}
                >
                  <Icon size={20} style={{ color: m.color }} strokeWidth={2} />
                </div>
                <p className="font-bold text-ink text-sm mb-2">{m.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                <div
                  className="mt-4 h-0.5 rounded-full w-8 transition-all duration-400 group-hover:w-full"
                  style={{ background: m.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="t-body text-gray-400 mb-6">
            We have a dedicated Early Years page — daily schedules, Ellie&apos;s world,
            and everything parents of young children need to know.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/kindergarten" className="btn-green group">
              Explore Early Years
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/admissions" className="btn-outline-dark">
              Reserve a Seat — 2027
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
