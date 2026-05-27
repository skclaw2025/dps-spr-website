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
          src="/schoolfront.png"
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
          poster="/schoolfront.png"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        >
          <source src="/school-video.webm" type="video/webm" />
          <source src="/school-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
      </div>

      
    </section>
  );
}