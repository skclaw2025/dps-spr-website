import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import Hero            from "@/components/home/Hero";
import WhyDPS          from "@/components/home/WhyDPS";
import LearningModel   from "@/components/home/LearningModel";
import LearningJourney from "@/components/home/LearningJourney";
import StatsFacilities from "@/components/home/StatsFacilities";
import EarlyYears      from "@/components/home/EarlyYears";
import Admissions      from "@/components/home/Admissions";
import ScrollEllie     from "@/components/mascot/ScrollEllie";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ScrollEllie />
      <main>
        <Hero />
        <WhyDPS />
        <LearningModel />
        <LearningJourney />
        <StatsFacilities />
        <EarlyYears />
        <Admissions />
      </main>
      <Footer />
    </>
  );
}
