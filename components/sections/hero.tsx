"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;

    if (!hero || !content) return;

    // Set initial state immediately to prevent zoom effect
    gsap.set(content, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      transformPerspective: 1000,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const tiltX = y * 15;
      const tiltY = x * -15;

      const moveX = x * 20;
      const moveY = y * 20;

      gsap.to(content, {
        duration: 0.5,
        rotateX: tiltX,
        rotateY: tiltY,
        x: moveX,
        y: moveY,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(content, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        ease: "power2.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center text-black"
      style={{ perspective: "3000px" }}
    >
      <div
        ref={contentRef}
        className="max-w-4xl px-8 text-center"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Badge */}
        <div
          className="mb-6 text-sm md:text-base text-green-500 font-medium"
          style={{ transform: "translateZ(40px)" }}
        >
          Available for work
        </div>

        {/* Main Heading */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
          style={{ transform: "translateZ(60px)" }}
        >
          <span className="italic font-serif text-zinc-800">
            A software developer
          </span>
          <br />
          <span className="">building real, reliable apps</span>
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg lg:text-xl text-zinc-700 mb-10 max-w-3xl mx-auto leading-relaxed"
          style={{ transform: "translateZ(40px)" }}
        >
          I design and build applications from the ground up — from backend
          logic to clean, usable interfaces.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex gap-4 flex-wrap justify-center"
          style={{ transform: "translateZ(80px)" }}
        >
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