"use client";

import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-black  bg-[linear-gradient(180deg,#FFEFEA_0%,#FFF5F0_50%,#FFFFFF_100%)] "
    >
      <div className="max-w-4xl px-8 text-center">
        {/* Availability badge */}
        <div className="mb-6 text-sm md:text-base text-green-500 font-medium">
          Available for work
        </div>

        {/* Main headline with mixed typography */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          <span className="italic font-serif text-zinc-800">
            A software developer
          </span>
          <br />
          <span className="">building real, reliable apps</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-zinc-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          I design and build applications from the ground up — from backend
          logic to clean, usable interfaces.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => scrollToSection("work")}
            className="group flex items-center gap-2 px-8 py-4 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-all shadow-lg hover:shadow-xl"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="px-8 py-4 border-2 border-zinc-400 text-zinc-800 rounded-full font-medium hover:border-zinc-800 hover:bg-zinc-800/10 transition-all"
          >
            About Me
          </button>
        </div>
      </div>
    </section>
  );
}
