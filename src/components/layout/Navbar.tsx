"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import FloatingMenuButton from "@/components/navigation/FloatingMenuButton";
import SlideMenu from "@/components/navigation/SlideMenu";
import { menuItems } from "@/components/navigation/MenuData";
import { MainMenuItem } from "@/components/navigation/MenuTypes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<MainMenuItem>(menuItems[0]);

  return (
    <>
      {/* =======================
          TOP NAVBAR
      ======================== */}

      <header className="absolute left-0 top-0 z-40 w-full">
        <div className="mx-auto flex h-28 max-w-[1700px] items-center justify-between px-6 lg:px-12">

          {/* Logo */}

          <Link href="/">
            <Image
              src="/images/logo/logo1.png"
              alt="Delhi Public School"
              width={260}
              height={80}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Right Icons */}

          <div className="hidden lg:flex items-start gap-10 pr-24">

            <NavIcon
              href="/admissions"
              title="Apply"
              icon={<AcademicCapIcon className="h-7 w-7" />}
            />

            <NavIcon
              href="/visit"
              title="Visit"
              icon={<MapPinIcon className="h-7 w-7" />}
            />

            <NavIcon
              href="/careers"
              title="Career"
              icon={<BriefcaseIcon className="h-7 w-7" />}
            />

          </div>

        </div>
      </header>

      {/* =======================
          FLOATING MENU BUTTON
      ======================== */}

      <FloatingMenuButton
        open={menuOpen}
        onClick={() => setMenuOpen(true)}
      />

      {/* =======================
          SLIDE MENU
      ======================== */}

      <SlideMenu
        open={menuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

interface NavIconProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

function NavIcon({
  href,
  title,
  icon,
}: NavIconProps) {
  return (
    <Link href={href} className="group">
  <div
    className="
      flex
      h-14
      w-14
      items-center
      overflow-hidden
      rounded-full
      border-2
      border-[#0F6B50]
      bg-white
      shadow-lg
      transition-all
      duration-500
      ease-out
      group-hover:w-40
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
      <div className="text-[#0F6B50] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
    </div>

    {/* Text */}
    <span
      className="
        pr-5
        whitespace-nowrap
        text-sm
        font-semibold
        text-[#0F6B50]
        opacity-0
        -translate-x-2
        transition-all
        duration-300
        group-hover:translate-x-0
        group-hover:opacity-100
      "
    >
      {title}
    </span>
  </div>
</Link>
  );
}