"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MainMenuItem } from "./MenuTypes";

interface Props {
  menu: MainMenuItem;
}

export default function SubMenu({ menu }: Props) {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={menu.id}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full"
        >
          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-2xl font-bold text-[#0F6B50]"
          >
            {menu.title}
          </motion.h3>

          {/* Links */}
          <div className="space-y-1">
            {menu.submenu.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center justify-between rounded-lg px-4 py-4 transition-all duration-300 hover:bg-[#F5F5F5]"
                >
                  <span className="text-lg text-neutral-700 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#0F6B50]">
                    {item.title}
                  </span>
                  <ChevronRightIcon className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-[#0F6B50]" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-12 space-y-4"
          >
            <Link
              href="/apply"
              className="block rounded-full bg-[#0F6B50] py-3 text-center font-semibold text-white transition hover:scale-[1.03]"
            >
              Apply Now
            </Link>
            <Link
              href="/visit"
              className="block rounded-full border border-[#0F6B50] py-3 text-center font-semibold text-[#0F6B50] transition hover:bg-[#0F6B50] hover:text-white"
            >
              Book a Visit
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}