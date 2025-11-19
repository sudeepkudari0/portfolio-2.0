"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  src: string;
  type: "image" | "video";
}

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: Project[] = [
    {
      title: "An AI IDE Core",
      description:
        "Google Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.",
      tags: ["AI", "Editor", "Productivity"],
      src: "/project1.png",
      type: "image",
    },
    {
      title: "Higher-level Abstractions",
      description:
        "Build complex systems with simple, high-level instructions. The engine handles the implementation details while you focus on the architecture.",
      tags: ["System Design", "Architecture"],
      src: "/project2.mp4",
      type: "video",
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time. See cursors, edits, and run tests simultaneously in a shared environment.",
      tags: ["Collaboration", "Real-time"],
      src: "/project3.png",
      type: "image",
    },
    {
      title: "Seamless Deployment",
      description:
        "Deploy your applications with a single click. Integrated CI/CD pipelines ensure your code is always production-ready.",
      tags: ["DevOps", "Deployment"],
      src: "/project4.png",
      type: "image",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".work-text-section");

      sections.forEach((section: any, index) => {
        const heading = section.querySelector(".project-heading");
        const content = section.querySelector(".project-content");

        // Heading animation - starts earlier and fades in slowly
        gsap.fromTo(
          heading,
          { 
            opacity: 0,
            y: 60
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 100%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );

        // Content animation - triggers when heading reaches 65% height
        gsap.fromTo(
          content,
          { 
            opacity: 0,
            y: 40
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 50%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );

        // Change active media based on scroll position
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="relative">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Scrolling Text */}
        <div className="w-full md:w-1/2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="work-text-section h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24"
            >
              <h3 className="project-heading text-3xl md:text-5xl font-bold mb-6 text-black will-change-transform">
                {project.title}
              </h3>
              <div className="project-content will-change-transform">
                <p className="text-lg md:text-xl text-black leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-slate-800/50 border border-black rounded-full text-sm text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Media */}
        <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden">
          {/* Media Container */}
          <div className="relative w-[80%] aspect-video bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl transition-all duration-500">
            {/* Render all media with opacity transitions */}
            {projects.map((project, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {project.type === "video" ? (
                  <video
                    src={project.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <img 
                      src={project.src} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.style.backgroundColor = '#1e293b';
                      }}
                    />
                    <span className="absolute text-slate-600 font-mono text-xs p-4 border border-slate-700 rounded bg-slate-900/80">
                      {project.src}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Window Controls */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900/90 border-b border-slate-800 flex items-center px-4 gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              <div className="ml-4 text-xs text-slate-500 font-mono">
                {projects[activeIndex]?.title.toLowerCase().replace(/\s+/g, "-")}.tsx
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}