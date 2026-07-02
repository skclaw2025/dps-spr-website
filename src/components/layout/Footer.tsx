import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const COLS = [
  {
    h: "School",
    items: [
      { l: "DPS Society",      href: "/dps-society"     },
      { l: "Vision & Mission", href: "/vision"          },
      { l: "Core Values",      href: "/core-values"     },
      { l: "Leadership",       href: "/leadership"      },
    ],
  },
  {
    h: "Academics",
    items: [
      { l: "Learning Model",   href: "/learning-model"  },
      { l: "Future-Ready",     href: "/future-ready"    },
      { l: "Early Years",      href: "/kindergarten"    },
      { l: "Primary School",   href: "/primary"         },
      { l: "Middle School",    href: "/middle"          },
    ],
  },
  {
    h: "Campus",
    items: [
      { l: "Sports Complex",   href: "/sports"          },
      { l: "Labs & Innovation",href: "/campus#labs"     },
      { l: "Library",          href: "/campus#library"  },
      { l: "Green Campus",     href: "/campus#green"    },
    ],
  },
  {
    h: "Admissions",
    items: [
      { l: "Apply 2027",       href: "/admissions"               },
      { l: "Scholarships",     href: "/admissions#scholarships"  },
      { l: "FAQs",             href: "/admissions#faq"           },
      { l: "Beyond Classroom", href: "/beyond-classroom"         },
      { l: "Wellbeing",        href: "/wellbeing"                },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A1810" }} className="text-white">

      {/* Top gradient rule */}
      <div className="h-[3px]"
        style={{ background: "linear-gradient(90deg, #006C33, #FFD700, #006C33)" }} />

      {/* Main footer body */}
      <div className="wrap py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-4">
            {/* Logo — light version on dark footer */}
            <div className="mb-6">
              <Image
                src="/images/logo/logolight.png"
                alt="Delhi Public School SPR"
                width={280}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Under the aegis of the DPS Society, New Delhi — since 1949.
              Innovation with Values, opening April 2027 at Southern Peripheral Road, Gurugram.
            </p>

            {/* Founding badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/30 mb-8"
              style={{ background: "rgba(255,215,0,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />
              <span className="text-[#FFD700] text-[11px] font-bold tracking-wider uppercase">
                Founding Batch — April 2027
              </span>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,215,0,0.12)" }}>
                  <Phone size={13} className="text-[#FFD700]" />
                </div>
                +91 XXXXX XXXXX
              </a>
              <a href="mailto:admissions@dpsspr.com"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,215,0,0.12)" }}>
                  <Mail size={13} className="text-[#FFD700]" />
                </div>
                admissions@dpsspr.com
              </a>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,215,0,0.12)" }}>
                  <MapPin size={13} className="text-[#FFD700]" />
                </div>
                Southern Peripheral Road,<br />Sector 41, Gurugram, Haryana
              </div>
            </div>
          </div>

          {/* ── Link columns ── */}
          {COLS.map((col) => (
            <div key={col.h} className="lg:col-span-2">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/25 mb-5">
                {col.h}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group">
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {it.l}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Bottom bar */}
      <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/20 text-center sm:text-left">
          © {new Date().getFullYear()} Delhi Public School, Southern Peripheral Road, Gurugram.
          All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/admissions"
            className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#FFD700] transition-colors"
            style={{ color: "rgba(255,215,0,0.5)" }}>
            Apply for Founding Batch 2027
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
