import Navbar     from "@/components/layout/Navbar";
import Footer     from "@/components/layout/Footer";
import Hero       from "@/components/home/Hero";
// import Imagine from "@/components/home/Imagine";
import StoryTree from "@/components/home/StoryTree";   // Option A
//import StoryBook from "@/components/home/StoryBook"; // Option B
import WhyDps     from "@/components/home/why-dps/WhyDps";
import SectionHub from "@/components/home/section-hub/SectionHub";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StoryTree />
        <WhyDps />
        {/* Sticky menu blocks + the 6 target sections */}
        <SectionHub />
      </main>
      <Footer />
    </>
  );
}