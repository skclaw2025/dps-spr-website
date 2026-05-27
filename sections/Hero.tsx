"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
const [isPlaying, setIsPlaying] = useState(true);

const [videoLoaded, setVideoLoaded] = useState(true);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
  const interval = setInterval(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
     {/* Background Media */}
<div className="absolute inset-0 overflow-hidden">
  {/* Initial Fallback Image */}
  {!videoLoaded && (
    <img
      src="/images/schoolfront.webp"
      alt="DPS SPR School"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )}

  {/* Video */}
  <video
  ref={videoRef}
  autoPlay
  muted
 loop
  playsInline
  preload="auto"
  poster="/images/schoolfront.webp"
  className={`absolute inset-0 h-full w-full scale-125 md:scale-105 object-cover transition-opacity duration-700 ${
    videoLoaded ? "opacity-100" : "opacity-0"
  }`}
  style={{
    objectPosition: "center center",
    filter: "brightness(1.05) contrast(1.05) saturate(1.08)",
  }}
  onCanPlay={() => setVideoLoaded(true)}
  onError={() => setVideoLoaded(false)}
>
  <source src="/school-video.mp4" type="video/mp4" />
</video>

  {/* Premium Overlay */}
  <div className="absolute inset-0 bg-black/20" />

  {/* Cinematic Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />

  {/* Soft Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
</div>
    </section>
  );
}