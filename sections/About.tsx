"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Trophy,
  Trees,
  Waves,
  Baby,
  ShieldCheck,
  GraduationCap,
  Dumbbell,
  Atom,
  Sparkles,
  Rocket,
  BookOpen,
  Building2,
  MonitorSmartphone,
  Camera,
  Music4,
  Target,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const sports = [
  "Half Olympic Swimming Pool",
  "Ice Skating Arena",
  "Roller Skating",
  "Roll Ball",
  "Pickleball",
  "Lawn Tennis",
  "Basketball",
  "Badminton",
  "Football",
  "Cricket",
  "Gymnastics",
  "Archery",
  "Shooting Range",
];

const labs = [
  {
    title: "Robotics & AI Lab",
    icon: Brain,
  },
  {
    title: "STEM Innovation Lab",
    icon: Rocket,
  },
  {
    title: "Mathematics Discovery Lab",
    icon: Atom,
  },
  {
    title: "Digital Learning Studio",
    icon: MonitorSmartphone,
  },
  {
    title: "Science Discovery Labs",
    icon: Sparkles,
  },
  {
    title: "Media Creation Studio",
    icon: Camera,
  },
];

export default function HomeSections() {
  return (
    <main className="bg-white overflow-hidden">
      {/* HERO SECTION */}

      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/school-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60 z-10" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-20 max-w-6xl px-6"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm tracking-wide">
            <Sparkles className="w-4 h-4" />
            A New Era of DPS Education
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-white">
            Beyond Classrooms.
            <br />
            Beyond Expectations.
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            A premium 5.5-acre future-ready learning ecosystem combining
            academic excellence, world-class sports infrastructure, innovation
            labs, experiential learning, and holistic child development.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white">
              5.5 Acre Green Campus
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white">
              Integrated Sports Excellence
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white">
              Future-Ready Innovation Labs
            </div>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-5">
            <button className="bg-green-600 hover:bg-green-700 transition-all px-8 py-4 rounded-full text-white font-semibold shadow-2xl">
              Become a Founding Family
            </button>

            <button className="border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all px-8 py-4 rounded-full text-white font-semibold">
              Explore Campus Vision
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
          <ChevronDown />
        </div>
      </section>

      {/* WHY DIFFERENT */}

      <section className="py-28 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <span className="text-green-600 font-semibold tracking-widest uppercase">
              Redefining the DPS Experience
            </span>

            <h2 className="mt-4 text-4xl md:text-6xl font-black text-slate-900">
              Where Innovation Meets Values
            </h2>

            <p className="mt-6 max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
              Rooted in the trusted legacy of DPS and designed for the future,
              the campus creates an inspiring ecosystem where children learn,
              innovate, compete, collaborate, and grow with confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: Brain,
                title: "Future-Ready Learning",
                text: "AI, Robotics, STEM, experiential learning, leadership, and global skills integrated into education.",
              },
              {
                icon: Trophy,
                title: "Sports Excellence Campus",
                text: "Elite sports infrastructure focused on fitness, discipline, confidence, and competitive excellence.",
              },
              {
                icon: ShieldCheck,
                title: "Holistic Child Development",
                text: "Balanced focus on academics, creativity, emotional intelligence, wellness, and life skills.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
              >
                <item.icon className="w-14 h-14 text-green-600" />

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS */}

      <section className="py-28 px-6 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-green-400 font-semibold tracking-widest uppercase">
                Integrated Sports Excellence
              </span>

              <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
                Building Champions Beyond Academics
              </h2>

              <p className="mt-8 text-slate-300 text-lg leading-relaxed">
                Designed to nurture confidence, resilience, teamwork, and
                excellence through world-class sporting infrastructure and
                professional training environments.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {sports.map((sport, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-md hover:bg-green-600/20 transition-all"
                  >
                    {sport}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full" />

              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: Waves,
                      title: "Half Olympic Pool",
                    },
                    {
                      icon: Dumbbell,
                      title: "Gymnastics Arena",
                    },
                    {
                      icon: Target,
                      title: "Shooting Range",
                    },
                    {
                      icon: Trophy,
                      title: "Professional Coaching",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-3xl p-8 border border-white/10"
                    >
                      <item.icon className="w-12 h-12 text-green-400" />

                      <h4 className="mt-5 font-bold text-xl">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KINDERGARTEN */}

      <section className="py-28 px-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-pink-600 font-semibold tracking-widest uppercase">
            Early Learning Excellence
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black text-slate-900">
            A Joyful Beginning for Young Minds
          </h2>

          <p className="mt-6 max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
            Dedicated kindergarten spaces designed to inspire creativity,
            curiosity, confidence, and joyful learning experiences in a safe,
            nurturing, and engaging environment.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-20">
            {[
              {
                icon: Baby,
                title: "Dedicated Activity Areas",
              },
              {
                icon: Waves,
                title: "Splash Pool",
              },
              {
                icon: Trees,
                title: "Outdoor Discovery Zones",
              },
              {
                icon: Music4,
                title: "Creative Expression Spaces",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-10 shadow-xl"
              >
                <item.icon className="w-14 h-14 mx-auto text-pink-500" />

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LABS */}

      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="text-green-600 font-semibold tracking-widest uppercase">
              Future Learning Ecosystem
            </span>

            <h2 className="mt-5 text-4xl md:text-6xl font-black text-slate-900">
              Future-Ready Innovation Labs
            </h2>

            <p className="mt-6 max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
              Immersive learning spaces designed to develop critical thinking,
              creativity, innovation, collaboration, and real-world problem
              solving.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {labs.map((lab, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="border border-slate-200 rounded-3xl p-10 hover:border-green-500 transition-all bg-white shadow-lg"
              >
                <lab.icon className="w-14 h-14 text-green-600" />

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {lab.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Interactive and technology-enabled learning environments that
                  encourage exploration and innovation.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}

      <section className="py-28 px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-green-600 font-semibold tracking-widest uppercase">
              Campus Experience
            </span>

            <h2 className="mt-5 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              A Campus Designed for Inspiration
            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-relaxed">
              A lush green 5.5-acre campus thoughtfully designed with smart
              classrooms, collaborative learning spaces, modern infrastructure,
              wellness-focused environments, and child-friendly architecture.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                "Smart Classrooms",
                "Modern Library",
                "Science Labs",
                "Maths Lab",
                "Language Lab",
                "Collaborative Learning Spaces",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl px-5 py-4 shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-[40px] p-14 text-white shadow-2xl">
            <Building2 className="w-20 h-20" />

            <h3 className="mt-8 text-3xl font-black">
              Supporting Modern Families
            </h3>

            <p className="mt-6 text-green-100 leading-relaxed text-lg">
              Safe and nurturing daycare, crèche, and supervised child engagement
              programs designed to support working parents with complete peace of
              mind.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Crèche Facility",
                "Daycare Programs",
                "Extended Care Support",
                "Safe Child Engagement Areas",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXCELLENCE PROGRAMS */}

      <section className="py-28 px-6 bg-slate-950 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <span className="text-green-400 font-semibold tracking-widest uppercase">
            Beyond School Hours
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black">
            Morning & Evening Excellence Programs
          </h2>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Specialized enrichment programs focused on academics, sports,
            leadership, creativity, innovation, and competitive excellence.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-20">
            {[
              "Elite Sports Coaching",
              "Olympiad Preparation",
              "Robotics & Coding",
              "Leadership Development",
              "Performing Arts",
              "Language Enrichment",
              "Academic Support",
              "Skill Development",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGACY */}

      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <GraduationCap className="w-20 h-20 mx-auto text-green-600" />

          <h2 className="mt-8 text-4xl md:text-6xl font-black text-slate-900">
            Rooted in DPS Legacy.
            <br />
            Designed for the Future.
          </h2>

          <p className="mt-8 text-lg text-slate-600 leading-relaxed">
            Combining the trusted educational values and academic excellence of
            DPS with future-focused learning methodologies, innovation-driven
            education, global exposure, and holistic development.
          </p>

          <button className="mt-12 bg-green-600 hover:bg-green-700 transition-all px-10 py-5 rounded-full text-white font-semibold shadow-xl">
            Experience the Future of Learning
          </button>
        </div>
      </section>
    </main>
  );
}