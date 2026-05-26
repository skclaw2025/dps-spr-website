"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  MonitorSmartphone,
  FlaskConical,
  BriefcaseBusiness,
  Globe2,
  ArrowRight,
} from "lucide-react";

const innovations = [
  {
    id: 1,
    title: "AI & Future Technologies",
    icon: BrainCircuit,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    description:
      "Students engage with artificial intelligence, coding, robotics, and emerging technologies through experiential learning.",
    points: [
      "AI-assisted learning",
      "Coding & robotics",
      "Innovation workshops",
      "Future-ready curriculum",
    ],
  },
  {
    id: 2,
    title: "Smart Digital Classrooms",
    icon: MonitorSmartphone,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    description:
      "Immersive digital classrooms combine modern technology with engaging learning experiences.",
    points: [
      "Interactive smart boards",
      "Hybrid learning systems",
      "Digital collaboration",
      "Immersive presentations",
    ],
  },
  {
    id: 3,
    title: "Innovation & Research Labs",
    icon: FlaskConical,
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop",
    description:
      "Purpose-built innovation labs encourage experimentation, creativity, and real-world exploration.",
    points: [
      "Advanced STEM labs",
      "Design thinking spaces",
      "Research-based learning",
      "Hands-on experimentation",
    ],
  },
  {
    id: 4,
    title: "Entrepreneurship & Leadership",
    icon: BriefcaseBusiness,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    description:
      "Students develop confidence, leadership, and entrepreneurial thinking through collaborative programs.",
    points: [
      "Leadership workshops",
      "Startup mindset",
      "Public speaking",
      "Business simulations",
    ],
  },
  {
    id: 5,
    title: "Global Learning Environment",
    icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
    description:
      "A globally inspired environment preparing students to thrive in an interconnected world.",
    points: [
      "Global exposure",
      "Communication excellence",
      "International collaborations",
      "Future-ready mindset",
    ],
  },
];

export default function Innovation() {
  const [activeTab, setActiveTab] = useState(innovations[0]);

  return (
    <section id="innovation" className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_35%)]" />

      <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-emerald-100 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-green-100 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-white/80 px-5 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-xl">
            Innovation Ecosystem
          </span>

          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Innovation Beyond
            <br />
            Classrooms
          </h2>

          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            Designed for the next generation of thinkers, creators, leaders,
            and innovators.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] overflow-hidden rounded-[32px]"
            >
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-semibold">
                  {activeTab.title}
                </h3>

                <p className="mt-4 max-w-xl text-white/80">
                  {activeTab.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Tabs */}
          <div className="flex flex-col gap-5">
            {innovations.map((item) => {
              const Icon = item.icon;
              const active = activeTab.id === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item)}
                  whileHover={{ scale: 1.01 }}
                  className={`relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 ${
                    active
                      ? "border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.12)]"
                      : "border-white/60 bg-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-2xl p-3 ${
                        active
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>

                      {active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.4 }}
                          className="mt-5"
                        >
                          <div className="grid gap-3">
                            {item.points.map((point, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 text-sm text-slate-700"
                              >
                                <div className="h-2 w-2 rounded-full bg-emerald-600" />

                                {point}
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-semibold text-slate-900 md:text-5xl">
            Preparing Students For The Future
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            DPS SPR blends innovation, creativity, technology, and global
            learning to shape future-ready students.
          </p>

            <button
              onClick={() => {

                const event = new CustomEvent("openAdmission");
                window.dispatchEvent(event);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-medium text-white shadow-lg shadow-emerald-200 transition hover:scale-105 hover:bg-emerald-700"
            >
              Apply For Admission
               <ArrowRight className="h-5 w-5" />
            </button>
          
        </motion.div>
      </div>
    </section>
  );
}