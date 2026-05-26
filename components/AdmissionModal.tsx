"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdmissionModal({
  open,
  onClose,
}: Props) {

  const [loading, setLoading] = useState(false);

const currentYear = new Date().getFullYear();

const nextAdmissionYear = currentYear + 1;

//const currentSession = `${currentYear}-${(
//  currentYear + 1
//)
//  .toString()
//  .slice(-2)}`;

const nextSession = `${nextAdmissionYear}-${(
  nextAdmissionYear + 1
)
  .toString()
  .slice(-2)}`;

  const [formData, setFormData] = useState({
    session: nextSession,
    student_name: "",
    class_looking_for: "",
    dob: "",
    age: "",
    address: "",
    father_name: "",
    mother_name: "",
    father_phone: "",
    mother_phone: "",
    father_email: "",
    mother_email: "",
    remarks: "",
  });

  // Get CBSE Cutoff Date
  const getCutoffDate = (session: string) => {

    const startYear = parseInt(
      session.split("-")[0]
    );

    return new Date(
      `${startYear}-03-31`
    );
  };

  // Calculate Age
  const calculateAge = (
    dob: string,
    session: string
  ) => {

    const birthDate = new Date(dob);

    const referenceDate =
      getCutoffDate(session);

    let years =
      referenceDate.getFullYear() -
      birthDate.getFullYear();

    let months =
      referenceDate.getMonth() -
      birthDate.getMonth();

    let days =
      referenceDate.getDate() -
      birthDate.getDate();

    if (days < 0) {

      months--;

      const previousMonth = new Date(
        referenceDate.getFullYear(),
        referenceDate.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {

      years--;

      months += 12;
    }

    return {
      years,
      months,
      days,
      display: `${years} Years ${months} Months ${days} Days`,
    };
  };

  // Recommended Class
  const getRecommendedClass = () => {

    const ageText = formData.age;

    if (!ageText) return "";

    const years = parseInt(ageText);

    if (years < 3) return "Too Young";

    if (years === 3) return "Nursery";

    if (years === 4) return "KG";

    if (years === 5) return "Prep";

    if (years >= 6 && years < 7)
      return "Class 1";

    if (years >= 7 && years < 8)
      return "Class 2";

    if (years >= 8 && years < 9)
      return "Class 3";

    if (years >= 9 && years < 10)
      return "Class 4";

    if (years >= 10 && years < 11)
      return "Class 5";

    return "Higher Class";
  };

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value,
    };

    // Recalculate Age
    if (
      (name === "dob" || name === "session") &&
      updatedData.dob &&
      updatedData.session
    ) {

      const ageData = calculateAge(
        updatedData.dob,
        updatedData.session
      );

      updatedData.age = ageData.display;
    }

    setFormData(updatedData);
  };

  // Submit Form
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/admission-enquiry",
        formData
      );

      toast.success(
        "Admission enquiry submitted successfully"
      );

      setFormData({
        session: "",
        student_name: "",
        class_looking_for: "",
        dob: "",
        age: "",
        address: "",
        father_name: "",
        mother_name: "",
        father_phone: "",
        mother_phone: "",
        father_email: "",
        mother_email: "",
        remarks: "",
      });

      onClose();

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
        >

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
            hide-scrollbar
            bg-white/95
            backdrop-blur-2xl
            rounded-[40px]
            max-w-5xl
            w-full
            max-h-[92vh]
            overflow-y-auto
            overflow-x-hidden
            p-6 md:p-10
            shadow-[0_20px_80px_rgba(0,0,0,0.25)]
            border border-white/20
            scroll-smooth
            "
          >

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="uppercase tracking-[4px] text-green-700 text-sm font-medium">
                  Admissions Open
                </p>

                <h2 className="text-3xl md:text-5xl font-bold mt-3 text-slate-900 leading-tight">
                  Admission Enquiry
                </h2>

              </div>

              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-2xl flex items-center justify-center transition"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6 mt-10"
            >

              {/* Session */}
              <select
                name="session"
                required
                value={formData.session}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              >

                <option value="">
                  Select Session
                </option>
               
              {/* <option value={//currentSession}>
                  {//currentSession}
                </option> */}

                <option value={nextSession}>
                  {nextSession}
                </option>

              </select>

              {/* Student Name */}
              <input
                type="text"
                name="student_name"
                required
                value={formData.student_name}
                onChange={handleChange}
                placeholder="Student Name"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Class */}
              <select
                name="class_looking_for"
                required
                value={formData.class_looking_for}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              >

                <option value="">
                  Select Class
                </option>

                <option>Nursery</option>
                <option>KG</option>
                <option>Prep</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
                <option>Class 4</option>
                <option>Class 5</option>
                <option>Class 6</option>
                <option>Class 7</option>

              </select>

              {/* DOB */}
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

             {/* Age */}
<div className="md:col-span-2">

  <div className="
    w-full
    border
    border-slate-200
    bg-gradient-to-r
    from-slate-50
    to-green-50
    rounded-3xl
    px-6
    py-5
  ">

    <p className="text-xl md:text-xl font-bold text-slate-900">
      {formData.age || "Age will auto calculate"}
    </p>

    <p className="text-sm text-slate-500 mt-2">
      Calculated according to CBSE cutoff date
    </p>

  </div>

</div>

              {/* Recommendation */}
              {formData.age && (

                <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-3xl p-6">

                  <p className="text-blue-900 font-semibold text-lg">
                    Recommended Admission:{" "}
                    {getRecommendedClass()}
                  </p>

                  <p className="text-slate-600 mt-3 leading-7 text-sm">

                    Age is calculated according to CBSE guidelines as on{" "}

                    <span className="font-semibold">

                      {formData.session &&
                        getCutoffDate(
                          formData.session
                        ).toLocaleDateString()}

                    </span>

                    . Parents may still select another class and explain details in remarks.

                  </p>

                </div>

              )}

              {/* Father Name */}
              <input
                type="text"
                name="father_name"
                required
                value={formData.father_name}
                onChange={handleChange}
                placeholder="Father Name"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Mother Name */}
              <input
                type="text"
                name="mother_name"
                required
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="Mother Name"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Father Phone */}
              <input
                type="text"
                name="father_phone"
                required
                value={formData.father_phone}
                onChange={handleChange}
                placeholder="Father Phone Number"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Mother Phone */}
              <input
                type="text"
                name="mother_phone"
                value={formData.mother_phone}
                onChange={handleChange}
                placeholder="Mother Phone Number"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Father Email */}
              <input
                type="email"
                name="father_email"
                value={formData.father_email}
                onChange={handleChange}
                placeholder="Father Email"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Mother Email */}
              <input
                type="email"
                name="mother_email"
                value={formData.mother_email}
                onChange={handleChange}
                placeholder="Mother Email"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4"
              />

              {/* Address */}
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                rows={4}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 md:col-span-2"
              />

              {/* Remarks */}
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Remarks (If Any)"
                rows={4}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 md:col-span-2"
              />

              {/* Submit */}
              <button
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white rounded-2xl py-5 text-lg font-semibold transition-all duration-300 md:col-span-2"
              >

                {loading
                  ? "Submitting Enquiry..."
                  : "Submit Admission Enquiry"}

              </button>

            </form>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}