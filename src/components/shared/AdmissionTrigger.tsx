"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X } from "lucide-react";
import AdmissionPopup from "./AdmissionPopup";

export default function AdmissionTrigger() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show after 5 seconds, show banner nudge after 12s
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    const t2 = setTimeout(() => setBannerOpen(true), 14000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Popup */}
      <AdmissionPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* Floating nudge banner — appears after 14s */}
      <AnimatePresence>
        {bannerOpen && !popupOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-[80] flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.16)", maxWidth: 280 }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
              <GraduationCap size={18} className="text-[#006C33]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 leading-tight">Founding Batch 2027</p>
              <button onClick={() => { setPopupOpen(true); setBannerOpen(false); }}
                className="text-[11px] text-[#006C33] font-semibold hover:underline">
                Register interest →
              </button>
            </div>
            <button onClick={() => setBannerOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB trigger button — right side */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setPopupOpen(true); setBannerOpen(false); }}
            className="fixed bottom-6 right-5 z-[80] flex items-center gap-2.5 px-4 py-3 rounded-full text-white text-sm font-bold transition-all"
            style={{
              background: "linear-gradient(135deg,#006C33,#004F24)",
              boxShadow: "0 4px 20px rgba(0,108,51,0.35)",
            }}
            aria-label="Apply for Admission"
          >
            <GraduationCap size={17} />
            <span className="hidden sm:inline">Apply Now</span>
            <span className="sm:hidden">Apply</span>

            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#006C33]"
              animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
