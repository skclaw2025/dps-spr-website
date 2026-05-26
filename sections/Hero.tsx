"use client";

import { useEffect, useState } from "react";

export default function Hero() {

  const [isMobile, setIsMobile] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );

  }, []);

  return (

    <section className="
      relative
      h-screen
      w-full
      overflow-hidden
      bg-black
    ">

      {/* Blur Loader */}
      <div className={`
        absolute
        inset-0
        transition-opacity
        duration-1000
        ${loaded
          ? "opacity-0"
          : "opacity-100"}
      `}>

        <div className="
          w-full
          h-full
          bg-gradient-to-br
          from-slate-900
          via-black
          to-green-950
          blur-xl
          scale-110
        "></div>

      </div>

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"

        onLoadedData={() =>
          setLoaded(true)
        }

        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-[1.02]
          will-change-transform
          [transform:translateZ(0)]
          backface-hidden
        "
      >

        {/* Mobile Optimized Video */}
        {isMobile ? (

          <>
            <source
              src="/school-mobile.webm"
              type="video/webm"
            />

            <source
              src="/school-mobile.mp4"
              type="video/mp4"
            />
          </>

        ) : (

          <>
            <source
              src="/school-video.webm"
              type="video/webm"
            />

            <source
              src="/school-video.mp4"
              type="video/mp4"
            />
          </>

        )}

      </video>

      {/* Dark Overlay */}
      <div className="
        absolute
        inset-0
        bg-black/40
        z-10
      "></div>

      {/* Cinematic Gradient */}
      <div className="
        absolute
        inset-0
        z-10
        bg-gradient-to-r
        from-black/70
        via-black/30
        to-black/10
      "></div>

      {/* Bottom Fade */}
      <div className="
        absolute
        bottom-0
        left-0
        w-full
        h-64
        z-10
        bg-gradient-to-t
        from-black
        to-transparent
      "></div>

      {/* Green Glow */}
      <div className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[400px]
        h-[400px]
        bg-green-500/20
        blur-[150px]
        rounded-full
        z-10
      "></div>

      {/* Blue Glow */}
      <div className="
        absolute
        bottom-[-180px]
        right-[-120px]
        w-[500px]
        h-[500px]
        bg-blue-500/20
        blur-[180px]
        rounded-full
        z-10
      "></div>

      {/* Premium Noise Texture */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        z-10
        mix-blend-soft-light
        bg-[url('/noise.png')]
      "></div>

    </section>
  );
}