"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  GraduationCap,
  Trophy,
  HeartHandshake,
  Trees,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Future-Ready Learning",
    description:
      "Blending academic excellence with innovation, creativity, and technology-driven education for tomorrow’s world.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Nurturing Campus",
    description:
      "A secure, student-focused environment designed to ensure safety, emotional wellbeing, and confidence.",
  },
  {
    icon: Trophy,
    title: "Holistic Development",
    description:
      "Beyond academics, students grow through sports, performing arts, leadership, and experiential learning.",
  },
  {
    icon: HeartHandshake,
    title: "Strong Parent Partnership",
    description:
      "We believe education is a collaborative journey between school, parents, and students.",
  },
  {
    icon: Trees,
    title: "Modern Green Campus",
    description:
      "A thoughtfully designed eco-conscious campus that inspires learning, creativity, and exploration.",
  },
  {
    icon: Sparkles,
    title: "Premium Learning Experience",
    description:
      "International-standard infrastructure and modern teaching methodologies creating a world-class environment.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_35%)]" />

      <div className="absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-emerald-100 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-white/80 px-5 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-xl">
            Why DPS SPR
          </span>

          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Why Choose
            <br />
            DPS SPR School
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
            Creating a future-focused educational ecosystem where students grow
            academically, creatively, socially, and emotionally.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-300"
              >
                {/* Gradient Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 mb-6 inline-flex rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-5xl rounded-[40px] border border-white/60 bg-white/70 px-8 py-14 text-center shadow-[0_10px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl md:px-16"
        >
          <h3 className="text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Empowering Young Minds
            <br />
            For A Changing World
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            At DPS SPR, education goes beyond textbooks. We nurture curiosity,
            confidence, innovation, leadership, and values to prepare students
            for lifelong success.
          </p>

          <button
              onClick={() => {

                const event = new CustomEvent("openAdmission");
                window.dispatchEvent(event);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-medium text-white shadow-lg shadow-emerald-200 transition hover:scale-105 hover:bg-emerald-700"
            >
              Begin Admission Journey
            </button>
        </motion.div>
      </div>
    </section>
  );
}