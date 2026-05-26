"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

const quickLinks = [
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Innovation",
    href: "#innovation",
  },
  {
    name: "Why Choose Us",
    href: "#why-us",
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/40">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:px-6">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/logogreen.png"
                alt="DPS SPR School"
                className="h-16 w-auto"
              />
            </div>

            <p className="mt-6 max-w-md leading-relaxed text-slate-600">
              DPS SPR School is building a premium learning ecosystem focused
              on innovation, creativity, leadership, and holistic development
              for the next generation.
            </p>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:text-white"
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900">
              Quick Links
            </h4>

            <div className="mt-6 flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-slate-600 transition hover:text-emerald-700"
                >
                  {link.name}

                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900">
              Contact Us
            </h4>

            <div className="mt-6 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    Campus Location
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    SPR Road, Gurugram, Haryana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    Call Us
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    admissions@dpsspr.edu.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} DPS SPR School. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="transition hover:text-emerald-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-emerald-700"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}