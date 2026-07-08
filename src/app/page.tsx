import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import Hero    from "@/components/home/Hero";
import Imagine from "@/components/home/Imagine";
import WhyDps from "@/components/home/why-dps/WhyDps";
import StatsFacilities from "@/components/home/StatsFacilities";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Imagine />
        <WhyDps />
        <StatsFacilities />
      </main>
      <Footer />
    </>
  );
}
