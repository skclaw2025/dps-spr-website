"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import WhatsappButton from "@/components/WhatsappButton";
import AdmissionModal from "@/components/AdmissionModal";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Innovation from "@/sections/Innovation";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {

  const [open, setOpen] = useState(false);

  // Listen for navbar button click
  useEffect(() => {

    const handleOpen = () => {
      setOpen(true);
    };

    window.addEventListener(
      "openAdmission",
      handleOpen
    );

    return () =>
      window.removeEventListener(
        "openAdmission",
        handleOpen
      );

  }, []);

  return (
    <>

      <Navbar />

      <Hero />

      <About />

      <Innovation />

      <WhyChooseUs />

      <Footer />

      <WhatsappButton />

      <AdmissionModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}