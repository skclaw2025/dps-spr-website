"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

import ImagePanel from "./ImagePanel";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import MobileMenu from "./MobileMenu";

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
          transition={{
            duration: 0.55,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Desktop */}
          {isDesktop ? (
            <>
              {/* Header */}
              <div className="flex h-24 items-center justify-between border-b border-neutral-200 px-10">

                <input
                  placeholder="Search..."
                  className="w-80 border-none bg-transparent text-lg outline-none"
                />

                <button
                  onClick={onClose}
                  className="rounded-full border border-neutral-300 p-3 transition hover:bg-[#0F6B50] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Layout */}

              <div className="grid h-[calc(100vh-96px)] grid-cols-12">

                {/* Left Image */}

                <div className="col-span-4">
                  <ImagePanel
                    image={activeMenu.image}
                    title={activeMenu.title}
                  />
                </div>

                {/* Main Menu */}

                <div className="col-span-5 overflow-y-auto px-20">
                  <MainMenu
                    items={menuItems}
                    active={activeMenu.id}
                    onChange={setActiveMenu}
                  />
                </div>

                {/* Sub Menu */}

                <div className="col-span-3 border-l border-neutral-200 px-10">
                  <SubMenu menu={activeMenu} />
                </div>
              </div>
            </>
          ) : (
            /* Mobile */
            <MobileMenu
              menus={menuItems}
              onClose={onClose}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}