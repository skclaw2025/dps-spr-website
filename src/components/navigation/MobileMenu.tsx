"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { MainMenuItem } from "./MenuTypes";
import MenuSearch from "./MenuSearch";

interface MobileMenuProps {
  menus: MainMenuItem[];
  onClose: () => void;
}

export default function MobileMenu({ menus, onClose }: MobileMenuProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex h-[100svh] flex-col bg-[#FCFBF8]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-5">
        <h2 className="text-lg font-bold uppercase tracking-[0.25em] text-[#0F6B50]">Menu</h2>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 transition hover:bg-[#0F6B50] hover:text-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Search — on top of the menu items */}
      <div className="border-b border-neutral-200 bg-white px-5 py-4">
        <MenuSearch onNavigate={onClose} />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {menus.map((menu) => {
          const opened = openItem === menu.id;
          return (
            <div key={menu.id} className="border-b border-neutral-200">
              <button
                onClick={() => toggleMenu(menu.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-xl font-semibold">{menu.title}</span>
                {opened ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </button>

              <AnimatePresence initial={false}>
                {opened && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    {menu.submenu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className="block bg-white px-10 py-3 text-neutral-700 transition hover:bg-neutral-100"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom buttons */}
      <div className="space-y-3 border-t border-neutral-200 p-6">
        <Link href="/apply" onClick={onClose} className="block rounded-full bg-[#0F6B50] py-3 text-center font-semibold text-white">
          Apply Now
        </Link>
        <Link href="/visit" onClick={onClose} className="block rounded-full border border-[#0F6B50] py-3 text-center font-semibold text-[#0F6B50]">
          Book a Visit
        </Link>
        <Link href="/careers" onClick={onClose} className="block rounded-full border border-neutral-300 py-3 text-center font-semibold">
          Careers
        </Link>
      </div>
    </div>
  );
}