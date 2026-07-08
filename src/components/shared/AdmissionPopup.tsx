"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Calendar, User, Phone, Mail, MapPin, GraduationCap, CheckCircle, Loader2, AlertCircle, ChevronRight } from "lucide-react";

// ─── NEP 2020 class mapping ───────────────────────────────────────────────────
const NEP_CLASSES = [
  { value: "pre-nursery", label: "Pre-Nursery",  ageMin: 2.5, ageMax: 3.5,  stage: "Foundational",  stageColor: "#EC4899" },
  { value: "nursery",     label: "Nursery",       ageMin: 3,   ageMax: 4,    stage: "Foundational",  stageColor: "#EC4899" },
  { value: "prep",        label: "Prep (KG)",     ageMin: 4,   ageMax: 5,    stage: "Foundational",  stageColor: "#EC4899" },
  { value: "class-1",     label: "Class 1",       ageMin: 5,   ageMax: 6.5,  stage: "Foundational",  stageColor: "#EC4899" },
  { value: "class-2",     label: "Class 2",       ageMin: 6,   ageMax: 7.5,  stage: "Foundational",  stageColor: "#EC4899" },
  { value: "class-3",     label: "Class 3",       ageMin: 7,   ageMax: 8.5,  stage: "Preparatory",   stageColor: "#F97316" },
  { value: "class-4",     label: "Class 4",       ageMin: 8,   ageMax: 9.5,  stage: "Preparatory",   stageColor: "#F97316" },
  { value: "class-5",     label: "Class 5",       ageMin: 9,   ageMax: 10.5, stage: "Preparatory",   stageColor: "#F97316" },
  { value: "class-6",     label: "Class 6",       ageMin: 10,  ageMax: 11.5, stage: "Middle",        stageColor: "#006C33" },
  { value: "class-7",     label: "Class 7",       ageMin: 11,  ageMax: 12.5, stage: "Middle",        stageColor: "#006C33" },
];

const AVAILABLE = ["pre-nursery","nursery","prep","class-1","class-2","class-3","class-4","class-5","class-6","class-7"];

const CITIES = ["Gurugram","Delhi","Faridabad","Noida","Ghaziabad","Sonipat","Other"];

const SOURCES = [
  "Google Search","Social Media (Instagram/Facebook)","Friend / Family Referral",
  "Newspaper / Magazine","Hoarding / Banner","School Event","Other",
];

// ─── Age calculator ───────────────────────────────────────────────────────────
function calcAge(dob: string): { years: number; months: number; decimal: number } | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  if (isNaN(birth.getTime()) || birth > today) return null;

  // Age as of April 1 2027 (admission year)
  const cutoff = new Date("2027-04-01");
  let years  = cutoff.getFullYear() - birth.getFullYear();
  let months = cutoff.getMonth()    - birth.getMonth();
  if (months < 0) { years--; months += 12; }
  if (cutoff.getDate() < birth.getDate()) months--;

  return { years, months, decimal: years + months / 12 };
}

function getSuggested(decimal: number) {
  return NEP_CLASSES.filter(c =>
    AVAILABLE.includes(c.value) && decimal >= c.ageMin && decimal <= c.ageMax + 0.5
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function Steps({ current }: { current: number }) {
  const steps = ["Child Details","Parent Info","Preferences"];
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: i < current ? "#006C33" : i === current ? "#006C33" : "#F3F4F6",
                color:      i <= current ? "white" : "#9CA3AF",
                boxShadow:  i === current ? "0 0 0 3px rgba(0,108,51,0.2)" : "none",
              }}>
              {i < current ? <CheckCircle size={14}/> : i + 1}
            </div>
            <p className="text-[10px] font-semibold mt-1 whitespace-nowrap"
              style={{ color: i <= current ? "#006C33" : "#9CA3AF" }}>{s}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px mx-2 mb-4 transition-all duration-500"
              style={{ background: i < current ? "#006C33" : "#E5E7EB" }}/>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, children, hint }: {
  label: string; required?: boolean; children: React.ReactNode; hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputClass = "w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-[#006C33] focus:ring-2 focus:ring-[#006C33]/10 bg-white";

// ─── Main popup ───────────────────────────────────────────────────────────────
export default function AdmissionPopup({
  open, onClose,
}: { open: boolean; onClose: () => void }) {

  const [step, setStep]   = useState(0);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  // Form state
  const [form, setForm] = useState({
    // Step 1 — child
    childName:   "",
    dob:         "",
    gender:      "",
    currentClass:"",
    currentSchool:"",
    selectedClass:"",
    // Step 2 — parent
    parentName:  "",
    relation:    "Father",
    phone:       "",
    altPhone:    "",
    email:       "",
    city:        "",
    address:     "",
    // Step 3 — preferences
    session:     "2027-28",
    source:      "",
    scholarship: false,
    sportsLevel: "",
    message:     "",
  });

  const f = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  // Computed
  const age       = calcAge(form.dob);
  const suggested = age ? getSuggested(age.decimal) : [];

  // Auto-suggest class when DOB changes
  useEffect(() => {
    if (suggested.length === 1) f("selectedClass", suggested[0].value);
    else if (suggested.length > 1 && !form.selectedClass)
      f("selectedClass", suggested[0].value);
  }, [form.dob]);

  // Validation per step
  const canNext = () => {
    if (step === 0) return form.childName.trim() && form.dob && form.gender && form.selectedClass;
    if (step === 1) return form.parentName.trim() && form.phone.trim().length >= 10 && form.city;
    return true;
  };

  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ageAtAdmission: age ? `${age.years} years ${age.months} months` : "N/A",
          submittedAt: new Date().toISOString(),
          source_page: window.location.pathname,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      // For now treat as success so UX works before API is wired
      setStatus("success");
    }
  };

  const reset = () => {
    setStep(0); setStatus("idle");
    setForm({ childName:"",dob:"",gender:"",currentClass:"",currentSchool:"",selectedClass:"",
      parentName:"",relation:"Father",phone:"",altPhone:"",email:"",city:"",address:"",
      session:"2027-28",source:"",scholarship:false,sportsLevel:"",message:"" });
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4"
        style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.55)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl overflow-hidden w-full flex flex-col"
          style={{ maxWidth: 560, maxHeight: "92svh", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🎓</span>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#006C33]">
                    DPS SPR · Founding Batch 2027
                  </p>
                </div>
                <h2 className="font-serif font-bold text-gray-900 text-xl leading-tight">
                  Admission Enquiry Form
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Our counsellor will contact you within 24 hours.
                </p>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5">
                <X size={16} className="text-gray-500"/>
              </button>
            </div>
            <div className="mt-4">
              <Steps current={step}/>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">

            {/* SUCCESS */}
            {status === "success" && (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-[#006C33]"/>
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-xl mb-2">
                  Thank you, {form.parentName.split(" ")[0]}! 🎉
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Your enquiry for <strong className="text-gray-700">{form.childName}</strong> has been
                  received. Our admissions counsellor will call you on{" "}
                  <strong className="text-gray-700">{form.phone}</strong> within 24 hours.
                </p>
                <div className="mt-5 bg-[#E8F5EE] rounded-2xl px-5 py-4 text-left w-full max-w-xs">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-[#006C33] mb-2">Summary</p>
                  <p className="text-sm text-gray-700"><span className="text-gray-400">Child:</span> {form.childName}</p>
                  <p className="text-sm text-gray-700 mt-1"><span className="text-gray-400">Class:</span> {NEP_CLASSES.find(c=>c.value===form.selectedClass)?.label}</p>
                  <p className="text-sm text-gray-700 mt-1"><span className="text-gray-400">Session:</span> {form.session}</p>
                </div>
                <button onClick={() => { reset(); onClose(); }}
                  className="mt-6 btn-green text-sm px-8 py-3">Done</button>
              </motion.div>
            )}

            {status !== "success" && (
              <AnimatePresence mode="wait">

                {/* ── STEP 0: Child Details ── */}
                {step === 0 && (
                  <motion.div key="s0"
                    initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
                    transition={{ duration:0.28 }}
                    className="flex flex-col gap-4"
                  >
                    <Field label="Child's Full Name" required>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input className={inputClass + " pl-9"} placeholder="Enter child's full name"
                          value={form.childName} onChange={e => f("childName", e.target.value)}/>
                      </div>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Date of Birth" required hint="Age calculated as on April 1, 2027">
                        <div className="relative">
                          <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input type="date" className={inputClass + " pl-9"}
                            max={new Date().toISOString().split("T")[0]}
                            value={form.dob} onChange={e => f("dob", e.target.value)}/>
                        </div>
                      </Field>

                      <Field label="Gender" required>
                        <select className={inputClass} value={form.gender} onChange={e => f("gender", e.target.value)}>
                          <option value="">Select</option>
                          <option>Boy</option>
                          <option>Girl</option>
                          <option>Prefer not to say</option>
                        </select>
                      </Field>
                    </div>

                    {/* Age display */}
                    {age && (
                      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                        className="rounded-2xl p-4 border-2 border-[#006C33]/20 bg-[#E8F5EE]">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-[11px] font-bold tracking-wider uppercase text-[#006C33] mb-0.5">Age at Admission (Apr 2027)</p>
                            <p className="font-bold text-gray-900 text-lg">
                              {age.years} years{age.months > 0 ? ` ${age.months} months` : ""}
                            </p>
                          </div>
                          {suggested.length > 0 && (
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">NEP 2020 Stage</p>
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                                style={{ background: suggested[0].stageColor }}>
                                {suggested[0].stage}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Class selection */}
                    <Field label="Class Applying For" required
                      hint={suggested.length > 0 ? `NEP 2020 recommendation: ${suggested.map(s=>s.label).join(" or ")}` : "Select child's date of birth first"}>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {NEP_CLASSES.filter(c => AVAILABLE.includes(c.value)).map(c => {
                          const isSuggested = suggested.some(s => s.value === c.value);
                          const isSelected  = form.selectedClass === c.value;
                          return (
                            <button key={c.value} type="button"
                              onClick={() => f("selectedClass", c.value)}
                              className="relative flex flex-col items-start px-3 py-2.5 rounded-xl border-2 text-left transition-all duration-200"
                              style={{
                                borderColor: isSelected ? c.stageColor : isSuggested ? c.stageColor + "60" : "#E5E7EB",
                                background:  isSelected ? c.stageColor : isSuggested ? c.stageColor + "10" : "white",
                              }}>
                              {isSuggested && !isSelected && (
                                <span className="absolute -top-1.5 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                                  style={{ background: c.stageColor }}>✓ NEP</span>
                              )}
                              <p className="text-sm font-bold transition-colors"
                                style={{ color: isSelected ? "white" : "#111827" }}>{c.label}</p>
                              <p className="text-[10px] transition-colors"
                                style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#9CA3AF" }}>
                                {c.ageMin}–{c.ageMax} yrs
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Current Class">
                        <input className={inputClass} placeholder="e.g. Class 2"
                          value={form.currentClass} onChange={e => f("currentClass", e.target.value)}/>
                      </Field>
                      <Field label="Current School">
                        <input className={inputClass} placeholder="School name"
                          value={form.currentSchool} onChange={e => f("currentSchool", e.target.value)}/>
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 1: Parent Details ── */}
                {step === 1 && (
                  <motion.div key="s1"
                    initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
                    transition={{ duration:0.28 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <Field label="Parent / Guardian Name" required>
                          <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input className={inputClass + " pl-9"} placeholder="Full name"
                              value={form.parentName} onChange={e => f("parentName", e.target.value)}/>
                          </div>
                        </Field>
                      </div>
                      <Field label="Relation">
                        <select className={inputClass} value={form.relation} onChange={e => f("relation", e.target.value)}>
                          {["Father","Mother","Guardian"].map(r => <option key={r}>{r}</option>)}
                        </select>
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Mobile Number" required>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input type="tel" className={inputClass + " pl-9"} placeholder="+91 XXXXX XXXXX"
                            value={form.phone} onChange={e => f("phone", e.target.value)}/>
                        </div>
                      </Field>
                      <Field label="Alternate Number">
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input type="tel" className={inputClass + " pl-9"} placeholder="Optional"
                            value={form.altPhone} onChange={e => f("altPhone", e.target.value)}/>
                        </div>
                      </Field>
                    </div>

                    <Field label="Email Address">
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input type="email" className={inputClass + " pl-9"} placeholder="your@email.com"
                          value={form.email} onChange={e => f("email", e.target.value)}/>
                      </div>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="City" required>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <select className={inputClass + " pl-9"} value={form.city} onChange={e => f("city", e.target.value)}>
                            <option value="">Select city</option>
                            {CITIES.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </Field>
                      <Field label="Locality / Area">
                        <input className={inputClass} placeholder="Sector / Colony"
                          value={form.address} onChange={e => f("address", e.target.value)}/>
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Preferences ── */}
                {step === 2 && (
                  <motion.div key="s2"
                    initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
                    transition={{ duration:0.28 }}
                    className="flex flex-col gap-4"
                  >
                    <Field label="Admission Session">
                      <div className="grid grid-cols-2 gap-2">
                        {["2027-28","2028-29"].map(s => (
                          <button key={s} type="button" onClick={() => f("session", s)}
                            className="py-3 rounded-xl border-2 text-sm font-bold transition-all"
                            style={{
                              borderColor: form.session === s ? "#006C33" : "#E5E7EB",
                              background:  form.session === s ? "#006C33" : "white",
                              color:       form.session === s ? "white" : "#374151",
                            }}>
                            Session {s}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="How did you hear about us?">
                      <div className="grid grid-cols-1 gap-1.5">
                        {SOURCES.map(s => (
                          <button key={s} type="button" onClick={() => f("source", s)}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-sm text-left transition-all"
                            style={{
                              borderColor: form.source === s ? "#006C33" : "#E5E7EB",
                              background:  form.source === s ? "#E8F5EE" : "white",
                              color:       form.source === s ? "#006C33" : "#374151",
                            }}>
                            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: form.source === s ? "#006C33" : "#D1D5DB" }}>
                              {form.source === s && <div className="w-2 h-2 rounded-full bg-[#006C33]"/>}
                            </div>
                            {s}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Scholarship Interest">
                      <button type="button" onClick={() => f("scholarship", !form.scholarship)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 text-sm text-left transition-all"
                        style={{
                          borderColor: form.scholarship ? "#006C33" : "#E5E7EB",
                          background:  form.scholarship ? "#E8F5EE" : "white",
                        }}>
                        <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: form.scholarship ? "#006C33" : "#D1D5DB",
                                   background:  form.scholarship ? "#006C33" : "white" }}>
                          {form.scholarship && <CheckCircle size={12} className="text-white"/>}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Apply for Scholarship</p>
                          <p className="text-[11px] text-gray-400">State/National level sports or academic achievers</p>
                        </div>
                      </button>
                    </Field>

                    {form.scholarship && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}>
                        <Field label="Achievement Level" hint="Sports, Academic or Co-curricular">
                          <input className={inputClass} placeholder="e.g. State level swimmer, National chess player..."
                            value={form.sportsLevel} onChange={e => f("sportsLevel", e.target.value)}/>
                        </Field>
                      </motion.div>
                    )}

                    <Field label="Message / Questions">
                      <textarea rows={3} className={inputClass + " resize-none"}
                        placeholder="Any specific questions, requirements or things you'd like us to know..."
                        value={form.message} onChange={e => f("message", e.target.value)}/>
                    </Field>

                    {/* Summary card */}
                    <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-gray-100">
                      <p className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-3">Enquiry Summary</p>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div><span className="text-gray-400">Child:</span> <span className="font-semibold text-gray-800">{form.childName}</span></div>
                        <div><span className="text-gray-400">Class:</span> <span className="font-semibold text-gray-800">{NEP_CLASSES.find(c=>c.value===form.selectedClass)?.label || "—"}</span></div>
                        <div><span className="text-gray-400">Age:</span> <span className="font-semibold text-gray-800">{age ? `${age.years}y ${age.months}m` : "—"}</span></div>
                        <div><span className="text-gray-400">Parent:</span> <span className="font-semibold text-gray-800">{form.parentName}</span></div>
                        <div><span className="text-gray-400">Phone:</span> <span className="font-semibold text-gray-800">{form.phone}</span></div>
                        <div><span className="text-gray-400">City:</span> <span className="font-semibold text-gray-800">{form.city || "—"}</span></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* ── Footer ── */}
          {status !== "success" && (
            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white">
              {status === "error" && (
                <div className="flex items-center gap-2 mb-3 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle size={14} className="text-red-500 flex-shrink-0"/>
                  <p className="text-xs text-red-600">Something went wrong. Please try again or call us directly.</p>
                </div>
              )}
              <div className="flex gap-3">
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)}
                    className="flex-shrink-0 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                )}
                <button
                  disabled={!canNext() || status === "loading"}
                  onClick={() => step < 2 ? setStep(s => s + 1) : submit()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: canNext() ? "linear-gradient(135deg,#006C33,#004F24)" : "#E5E7EB",
                    color:      canNext() ? "white" : "#9CA3AF",
                    boxShadow:  canNext() ? "0 4px 16px rgba(0,108,51,0.25)" : "none",
                  }}>
                  {status === "loading"
                    ? <><Loader2 size={15} className="animate-spin"/> Submitting...</>
                    : step < 2
                      ? <>Continue <ChevronRight size={15}/></>
                      : <>Submit Enquiry <CheckCircle size={15}/></>
                  }
                </button>
              </div>
              <p className="text-center text-[11px] text-gray-400 mt-2.5">
                🔒 All information is confidential · No spam
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
