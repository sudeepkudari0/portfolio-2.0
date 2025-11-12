import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Work from "@/components/sections/work";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import BackgroundAnimation from "@/components/layout/background-animation";

export default function Home() {
  return (
    <div className="">
      <BackgroundAnimation />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
