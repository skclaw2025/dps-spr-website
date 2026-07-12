"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/24/outline";

import ImagePanel from "./ImagePanel";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import MobileMenu from "./MobileMenu";
import MenuSearch from "./MenuSearch";

import { menuItems } from "./MenuData";
import { MainMenuItem } from "./MenuTypes";

interface SlideMenuProps {
  open: boolean;
  activeMenu: MainMenuItem;
  setActiveMenu: (item: MainMenuItem) => void;
  onClose: () => void;
}

export default function SlideMenu({
  open,
  activeMenu,
  setActiveMenu,
  onClose,
}: SlideMenuProps) {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ESC closes menu */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[#FCFBF8]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {isDesktop ? (
            <div className="flex h-[100svh] flex-col">
              {/* Header (search removed — now lives on top of the menu) */}
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-neutral-200 px-10">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F6B50]">Menu</p>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 transition hover:bg-[#0F6B50] hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Layout fills the remaining height; each column scrolls on its own */}
              <div className="grid min-h-0 flex-1 grid-cols-12">
                {/* Left image */}
                <div className="col-span-4 h-full">
                  <ImagePanel image={activeMenu.image} title={activeMenu.title} />
                </div>

                {/* Menu column: search pinned on top, list scrolls */}
                <div className="col-span-5 flex h-full min-h-0 flex-col px-12 pb-6 pt-8 xl:px-16">
                  <MenuSearch onNavigate={onClose} />
                  <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2">
                    <MainMenu items={menuItems} active={activeMenu.id} onChange={setActiveMenu} />
                  </div>
                </div>

                {/* Sub menu: scrolls if tall */}
                <div className="col-span-3 h-full min-h-0 overflow-y-auto border-l border-neutral-200 px-8 py-8">
                  <SubMenu menu={activeMenu} />
                </div>
              </div>
            </div>
          ) : (
            <MobileMenu menus={menuItems} onClose={onClose} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}