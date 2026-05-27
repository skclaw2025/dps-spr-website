"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const menuItems = [
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Innovation",
    href: "#innovation",
  },
  {
    name: "Why Us",
    href: "#why-us",
  },
  {
    name: "Contact",
    href: "#footer",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full px-4 pt-5 md:px-6 md:pt-5">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-2 md:px-8 md:py-3 transition-all duration-500 ${
            scrolled
              ? "border-white/60 bg-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Left Space for Mobile */}
          <div className="w-11 lg:hidden" />

          {/* Logo */}
          <a
            href="#"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 lg:static lg:translate-x-0"
          >
            <img
              src={scrolled ? "/logogreen.png" : "/logowhite.png"}
              alt="DPS SPR School"
              className="h-12 w-auto transition-all duration-500 md:h-14"
            />
          </a>

          {/* Desktop Menu */}
          {scrolled && (
            <div className="hidden items-center gap-10 lg:flex">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative text-sm font-medium tracking-wide text-slate-700 transition duration-300 hover:text-emerald-700"
                >
                  {item.name}

                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-emerald-700 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden lg:flex">
              <button
                onClick={() => {
                  const event = new CustomEvent("openAdmission");
                  window.dispatchEvent(event);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
                    : "bg-white text-slate-900 hover:bg-white/90"
                }`}
              >
                Admissions Open

                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            {scrolled && (
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-all duration-300 lg:hidden"
              >
                {mobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      {scrolled && (
        <motion.div
          initial={false}
          animate={{
            opacity: mobileMenu ? 1 : 0,
            y: mobileMenu ? 0 : -20,
            pointerEvents: mobileMenu ? "auto" : "none",
          }}
          transition={{ duration: 0.25 }}
          className="fixed left-4 right-4 top-24 z-40 rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-5">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-5 py-4 text-sm font-medium text-slate-800 transition hover:bg-emerald-100"
              >
                {item.name}

                <ArrowUpRight className="h-4 w-4 text-emerald-700" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}