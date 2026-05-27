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
        {/* Background Media */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <img
            src="/schoolfront1.png"
            alt="DPS SPR School"
            className="absolute inset-0 h-full w-full scale-105 object-cover"
          />

          {/* Cinematic Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/schoolfront1.png"
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            style={{
              filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
            }}
            onEnded={(e) => {
              e.currentTarget.style.display = "none";
            }}
            onPause={(e) => {
              e.currentTarget.style.display = "none";
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          >
            <source src="/school-video.webm" type="video/webm" />
            <source src="/school-video.mp4" type="video/mp4" />
          </video>

          {/* Soft Premium Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Elegant Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/40" />

          {/* Luxury Light Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

          {/* Subtle Green Accent Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_35%)]" />

          {/* Cinematic Animated Zoom */}
          <div className="absolute inset-0 animate-[pulse_12s_ease-in-out_infinite]" />
        </div>

      
    </section>
  );
}