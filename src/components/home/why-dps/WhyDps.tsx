"use client";

import { motion } from "framer-motion";

//import FeatureCard from "./FeatureCard";
import DpsDuality from "./DpsDuality";
//import FloatingImage from "./FloatingImage";
import SchoolTour from "./SchoolTour";

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


            {/* Feature Card */}

            <div className="mt-10">

              <DpsDuality />

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

            <SchoolTour />
            {/* Buttons */}

          </motion.div>

        </div>

      </div>

    </section>
  );
}