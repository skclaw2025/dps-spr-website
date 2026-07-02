"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const PHONE   = "919999999999"; // Replace with actual WhatsApp number (no + or spaces)
const MESSAGE = encodeURIComponent(
  "Hello! I'm interested in admissions at DPS SPR Gurugram (Founding Batch 2027). Please share more details."
);
const WA_URL  = `https://wa.me/${PHONE}?text=${MESSAGE}`;

const QUICK_LINKS = [
  { label: "Admission Enquiry",  msg: "I'd like to enquire about admissions at DPS SPR Gurugram for the Founding Batch 2027."      },
  { label: "Schedule a Visit",   msg: "I'd like to schedule a school visit at DPS SPR Gurugram."                                    },
  { label: "Fee Information",    msg: "Could you please share fee details for DPS SPR Gurugram?"                                    },
  { label: "Scholarship Query",  msg: "I'd like to know more about scholarships available at DPS SPR Gurugram."                     },
];

export default function WhatsAppButton() {
  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(false);

  // Show button after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const openChat = (msg?: string) => {
    const url = msg
      ? `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
      : WA_URL;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-start gap-3">

      {/* Quick links panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 8px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
              width: "min(280px, calc(100vw - 40px))",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3.5 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
              {/* WhatsApp icon */}
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.285 7.043L.787 23.41l4.473-1.473A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.388l-.36-.214-3.733 1.228 1.25-3.624-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.431 0 9.818 4.388 9.818 9.818 0 5.43-4.387 9.818-9.818 9.818z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Quick Contact</p>
                <p className="text-white/75 text-[11px]">DPS SPR Admissions · Typically replies in minutes</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0">
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Chat preview bubble */}
            <div className="px-4 py-3" style={{ background: "#ECE5DD" }}>
              <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 inline-block max-w-[90%]"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                <p className="text-[12px] text-gray-700 leading-relaxed">
                  👋 Hi! Interested in admissions at{" "}
                  <span className="font-semibold text-[#006C33]">DPS SPR Gurugram</span>?
                  <br />Choose a topic below to start chatting!
                </p>
                <p className="text-[10px] text-gray-400 mt-1 text-right">DPS SPR · ✓✓</p>
              </div>
            </div>

            {/* Quick link buttons */}
            <div className="px-3 pb-3 pt-2 flex flex-col gap-1.5" style={{ background: "#ECE5DD" }}>
              {QUICK_LINKS.map((q) => (
                <button key={q.label} onClick={() => openChat(q.msg)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white text-sm font-medium text-[#006C33] border border-[#006C33]/15 hover:bg-[#E8F5EE] hover:border-[#006C33]/40 transition-all duration-200 active:scale-98"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
                  {q.label} →
                </button>
              ))}
              {/* Direct open */}
              <button onClick={() => openChat()}
                className="w-full text-center px-3.5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-98 mt-0.5"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 2px 8px rgba(37,211,102,0.35)" }}>
                Open WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 rounded-full text-white font-bold text-sm pr-4 pl-3 py-3 transition-all"
        style={{
          background: open
            ? "linear-gradient(135deg,#128C7E,#075E54)"
            : "linear-gradient(135deg,#25D366,#128C7E)",
          boxShadow: open
            ? "0 4px 20px rgba(18,140,126,0.45)"
            : "0 4px 24px rgba(37,211,102,0.50)",
        }}
        aria-label="Quick Contact via WhatsApp"
      >
        {/* Animated icon */}
        <motion.div
          animate={{ rotate: open ? 0 : [0, -8, 8, -8, 0] }}
          transition={{ duration: 0.5, repeat: open ? 0 : Infinity, repeatDelay: 4 }}
        >
          {open ? (
            <X size={20} />
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.285 7.043L.787 23.41l4.473-1.473A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.388l-.36-.214-3.733 1.228 1.25-3.624-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.431 0 9.818 4.388 9.818 9.818 0 5.43-4.387 9.818-9.818 9.818z"/>
            </svg>
          )}
        </motion.div>
        <span>{open ? "Close" : "Quick Contact"}</span>

        {/* Pulse ring when closed */}
        {!open && (
          <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{ inset: 0, border: "2px solid rgba(37,211,102,0.6)" }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
