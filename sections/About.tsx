"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 bg-white overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[140px]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >

          <p className="uppercase tracking-[5px] text-green-700 text-sm">
            About DPS SPR
          </p>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold leading-tight text-slate-900">

            Designed For <br />

            <span className="text-green-700">
              Future-Ready Learning
            </span>

          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">

            DPS SPR School is a next-generation educational ecosystem
            where innovation, creativity, technology, leadership,
            and holistic development come together to nurture
            confident global citizens.

          </p>

        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mt-24 items-center">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="relative">

              <img
                src="/campus.jpg"
                alt="Campus"
                className="rounded-[40px] shadow-2xl"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-10 -right-10 bg-white shadow-2xl rounded-3xl p-8 max-w-xs">

                <h3 className="text-3xl font-bold text-green-700">
                  AI + Smart Learning
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  Integrated digital classrooms and
                  future learning methodologies.
                </p>

              </div>

            </div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="grid gap-8">

              {/* Card */}
              <div className="bg-white shadow-xl rounded-[30px] p-8 border border-slate-100 hover:-translate-y-2 transition-all duration-300">

                <h3 className="text-2xl font-bold text-slate-900">
                  Innovation-Driven Curriculum
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  Encouraging analytical thinking,
                  creativity, leadership, and
                  future-ready problem solving.
                </p>

              </div>

              {/* Card */}
              <div className="bg-green-700 text-white rounded-[30px] p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">

                <h3 className="text-2xl font-bold">
                  Global Exposure
                </h3>

                <p className="mt-4 leading-7 text-green-100">
                  Preparing students for international
                  opportunities through modern educational
                  practices and technology integration.
                </p>

              </div>

              {/* Card */}
              <div className="bg-white shadow-xl rounded-[30px] p-8 border border-slate-100 hover:-translate-y-2 transition-all duration-300">

                <h3 className="text-2xl font-bold text-slate-900">
                  Holistic Development
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  Academics, sports, arts, confidence,
                  communication, and personality development
                  in one ecosystem.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}