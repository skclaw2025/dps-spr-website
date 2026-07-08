"use client";

import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface FloatingMenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function FloatingMenuButton({
  open,
  onClick,
}: FloatingMenuButtonProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
  onClick={onClick}
  className={`fixed top-8 right-8 z-[9999] transition-all duration-300 ${
    open ? "opacity-0 pointer-events-none" : "opacity-100"
  }`}
>
  <div
    className="
      group
      flex
      h-14
      w-14
      items-center
      overflow-hidden
      rounded-full
      bg-[#0F6B50]
      shadow-lg
      transition-all
      duration-500
      ease-out
      hover:w-40
    "
  >
    {/* Fixed Circle */}
    <div
      className="
        flex
        h-14
        w-14
        min-w-[56px]
        items-center
        justify-center
      "
    >
      <Bars3Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
    </div>

    {/* Text */}
    <span
      className="
        pr-5
        whitespace-nowrap
        text-sm
        font-semibold
        uppercase
        tracking-[0.2em]
        text-white
        opacity-0
        -translate-x-2
        transition-all
        duration-300
        group-hover:translate-x-0
        group-hover:opacity-100
      "
    >
      MENU
    </span>
  </div>
</button>
  );
}