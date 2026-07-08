"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ArrowRight, Phone, Mail } from "lucide-react";

const STEPS = [
  { n: 1, title: "Register Interest",  desc: "Fill the enquiry form below or call us directly. Our team responds within 24 hours.",               icon: "📋" },
  { n: 2, title: "Application Form",   desc: "Complete the formal application with your child's details and required documents.",                   icon: "📝" },
  { n: 3, title: "Interaction",        desc: "A warm, informal interaction session for parents and your child — no pressure, just a conversation.", icon: "🤝" },
  { n: 4, title: "Offer Letter",       desc: "Receive your official admission offer from DPS SPR for the Founding Batch 2027.",                     icon: "🎉" },
  { n: 5, title: "Enrolment",          desc: "Complete fee payment and officially join the Founding Batch — your child's story begins here.",       icon: "🏫" },
];

const CLASSES = [
  "Pre-Nursery", "Nursery", "Prep (KG)", "Class I", "Class II",
  "Class III", "Class IV", "Class V", "Class VI", "Class VII",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Admissions() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    parentName: "", childName: "", email: "",
    phone: "", cls: "Nursery", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName:  form.parentName,
          childName:   form.childName,
          email:       form.email,
          phone:       form.phone,
          targetClass: form.cls,
          message:     form.message,
          source:      "DPS SPR Website — Home Page",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      if (data.success) setActiveStep(4);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="admissions"
      className="section"
      style={{ background: "linear-gradient(180deg,#F9FAFB 0%,#ffffff 100%)" }}
    >
      <div className="wrap">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-4"
          >
            <span className="pill-gold">Admissions Open · Founding Batch 2027</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="t-h1 text-ink"
          >
            Join the{" "}
            <span style={{
              background: "linear-gradient(135deg,#004F24,#006C33)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Founding Batch.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="t-body text-gray-500 mt-4"
          >
            Limited seats. Nursery to Class 7. The children who join in 2027
            will be part of DPS SPR&apos;s founding story — forever.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* ── LEFT — 5-step tracker ── */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="t-label text-gray-400 mb-7"
            >
              How admissions work
            </motion.p>

            <div className="flex flex-col gap-0">
              {STEPS.map((s, i) => {
                const done    = i < activeStep;
                const current = i === activeStep;
                return (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.09 + 0.2, duration: 0.6 }}
                    className="relative flex gap-5 pb-8 last:pb-0 cursor-pointer group"
                    onClick={() => setActiveStep(i)}
                  >
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div className="absolute left-[18px] top-10 bottom-0 w-px"
                        style={{
                          background: i < activeStep
                            ? "linear-gradient(180deg,#006C33,#006C33)"
                            : "linear-gradient(180deg,#E5E7EB,transparent)",
                        }}
                      />
                    )}

                    {/* Circle */}
                    <motion.div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10 font-bold text-sm transition-all duration-400"
                      animate={{
                        background: done ? "#006C33" : current ? "#FFD700" : "#F3F4F6",
                        color: done ? "#ffffff" : current ? "#111827" : "#9CA3AF",
                        scale: current ? 1.12 : 1,
                      }}
                    >
                      {done ? <CheckCircle size={16} /> : s.icon}
                    </motion.div>

                    {/* Content */}
                    <div
                      className="pt-1.5 transition-opacity duration-300"
                      style={{ opacity: done || current ? 1 : 0.45 }}
                    >
                      <p className={`font-bold text-sm transition-colors duration-300 ${current ? "text-ink" : done ? "text-green" : "text-gray-500"}`}
                        style={{ color: current ? "#111827" : done ? "#006C33" : undefined }}>
                        {s.title}
                      </p>

                      <AnimatePresence>
                        {current && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 text-sm mt-1.5 leading-relaxed overflow-hidden max-w-sm"
                          >
                            {s.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-line hover:border-green text-sm text-gray-600 hover:text-green transition-all duration-200 group">
                <Phone size={15} className="text-green group-hover:scale-110 transition-transform" />
                +91 XXXXX XXXXX
              </a>
              <a href="mailto:admissions@dpsspr.com"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-line hover:border-green text-sm text-gray-600 hover:text-green transition-all duration-200 group">
                <Mail size={15} className="text-green group-hover:scale-110 transition-transform" />
                admissions@dpsspr.com
              </a>
            </motion.div>

            {/* Scholarship note */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              className="mt-5 flex items-start gap-3 bg-gold/10 border border-gold/30 rounded-2xl p-4"
            >
              <span className="text-xl flex-shrink-0">🏆</span>
              <div>
                <p className="font-bold text-ink text-sm mb-0.5">Scholarships Available</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Special scholarships for State & National level players,
                  academic toppers, and outstanding co-curricular achievers.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <div
              className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.06)" }}
            >
              {/* Green top strip */}
              <div className="h-1.5 bg-[#006C33]" />

              <div className="p-7 sm:p-9">
                {/* Success state */}
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <h3 className="t-h3 text-ink mb-2">Thank you! 🎉</h3>
                      <p className="text-gray-400 t-sm max-w-xs mx-auto">
                        Our admissions team will contact you within 24 hours.
                        Welcome to the DPS SPR family!
                      </p>
                      <button
                        onClick={() => { setStatus("idle"); setForm({ parentName:"", childName:"", email:"", phone:"", cls:"Nursery", message:"" }); setActiveStep(0); }}
                        className="mt-6 text-sm text-green font-semibold hover:underline"
                      >
                        Submit another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h3 className="t-h3 text-ink mb-1">Register Your Interest</h3>
                      <p className="text-gray-400 t-sm mb-7">
                        Founding Batch · April 2027 · We reply within 24 hours
                      </p>

                      <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="field-label">Parent Name *</label>
                            <input required className="field" placeholder="Your full name"
                              value={form.parentName} onChange={(e) => set("parentName", e.target.value)} />
                          </div>
                          <div>
                            <label className="field-label">Child's Name *</label>
                            <input required className="field" placeholder="Child's name"
                              value={form.childName} onChange={(e) => set("childName", e.target.value)} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="field-label">Email *</label>
                            <input required type="email" className="field" placeholder="your@email.com"
                              value={form.email} onChange={(e) => set("email", e.target.value)} />
                          </div>
                          <div>
                            <label className="field-label">Phone *</label>
                            <input required type="tel" className="field" placeholder="+91 XXXXX XXXXX"
                              value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <label className="field-label">Class Applying For</label>
                          <select className="field" value={form.cls} onChange={(e) => set("cls", e.target.value)}>
                            {CLASSES.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="field-label">Message / Questions</label>
                          <textarea rows={3} className="field resize-none"
                            placeholder="Any questions, special requirements, or things you'd like us to know..."
                            value={form.message} onChange={(e) => set("message", e.target.value)} />
                        </div>

                        {status === "error" && (
                          <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl">
                            Something went wrong. Please call +91 XXXXX XXXXX directly.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="btn-green w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "loading" ? (
                            <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                          ) : (
                            <>Submit Enquiry <ArrowRight size={15} /></>
                          )}
                        </button>

                        <p className="text-center text-xs text-gray-400">
                          All information is kept confidential. No spam, ever.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
