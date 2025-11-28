import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Work from "@/components/sections/work";
import ProfessionalWork from "@/components/sections/professional-work";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="bg-[#FFEFEA]">
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <ProfessionalWork />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
