"use client";

import { motion } from "framer-motion";

import FeatureCard from "./FeatureCard";
import FloatingImage from "./FloatingImage";

export default function WhyDps() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] py-24 lg:py-32">

      {/* Decorative Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#0F6B50]/5 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-[#D8B24C]/10 blur-[130px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-6 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="lg:col-span-5"
          >

            {/* Small Heading */}

            <div className="flex items-center gap-3">

              <span className="h-[2px] w-16 bg-[#C89A2B]" />

              <p className="text-sm font-semibold tracking-[0.35em] uppercase text-[#0F6B50]">

                WHY DPS SPR

              </p>

            </div>

            {/* Main Heading */}

            <h2 className="mt-6 text-[64px] leading-[1] font-black text-[#222]">

              Why

              <span className="text-[#0F6B50]">

                {" "}DPS SPR?

              </span>

            </h2>

            {/* Subtitle */}

            <h3 className="mt-4 text-[44px] italic font-light text-[#C89A2B]">

              Building Future Leaders.

            </h3>

            {/* Description */}

            <p className="mt-8 max-w-xl text-lg leading-9 text-neutral-600">

              At Delhi Public School SPR we nurture every learner through
              world-class academics, holistic development, sports,
              leadership, innovation and global exposure.

            </p>

            {/* Feature Card */}

            <div className="mt-10">

              <FeatureCard />

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <button className="rounded-full bg-[#0F6B50] px-8 py-4 text-white font-semibold transition hover:scale-105">

                Explore Campus →

              </button>

              <button className="rounded-full border border-[#0F6B50] px-8 py-4 font-semibold text-[#0F6B50] transition hover:bg-[#0F6B50] hover:text-white">

                Book School Tour →

              </button>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative lg:col-span-7 flex justify-end"
          >

            <FloatingImage />

          </motion.div>

        </div>

      </div>

    </section>
  );
}