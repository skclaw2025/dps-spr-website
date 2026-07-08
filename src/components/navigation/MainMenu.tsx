"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { MainMenuItem } from "./MenuTypes";

interface MainMenuProps {
  items: MainMenuItem[];
  active: string;
  onChange: (item: MainMenuItem) => void;
}

export default function MainMenu({
  items,
  active,
  onChange,
}: MainMenuProps) {
  return (
    <nav className="flex h-full items-center">

      <div className="w-full">

        {items.map((item, index) => {
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              onMouseEnter={() => onChange(item)}
              onClick={() => onChange(item)}
              className="group relative flex w-full items-center py-5 text-left"
            >
              {/* Active Line */}

              <span
                className={clsx(
                  "absolute left-0 h-12 rounded-full bg-[#0F6B50] transition-all duration-300",
                  isActive ? "w-1" : "w-0"
                )}
              />

              {/* Text */}

              <span
                 className={clsx(
    "pl-8 text-4xl xl:text-5xl font-black tracking-tight transition-all duration-300",
    isActive
      ? "text-[#0F6B50]"
      : "text-neutral-900 group-hover:text-[#0F6B50]"
  )}
              >
                {item.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}