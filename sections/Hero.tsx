"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Fallback Image */}
        <img
          src="/images/hero-fallback.jpg"
          alt="DPS SPR School"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-fallback.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        >
          <source src="/school-video.webm" type="video/webm" />
          <source src="/school-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 text-center md:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md md:px-6"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white md:text-xs">
              Delhi Public School • SPR
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Future-Ready
            <span className="block text-green-400">
              Learning Experience
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-lg"
          >
            Empowering young minds through innovation, leadership,
            discipline, and academic excellence in a world-class
            learning environment.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button className="rounded-full bg-green-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:scale-105">
              Explore Campus
            </button>

            <button className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-105">
              Discover Programs
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 justify-center rounded-full border border-white/40">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            className="mt-2 h-2 w-2 rounded-full bg-white"
          />
        </div>
      </motion.button>
    </section>
  );
}