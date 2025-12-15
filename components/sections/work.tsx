"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AutoCarousel from "../ui/auto-carousel";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  src: string;
  images?: string[]; // Array of images for carousel
  type: "image" | "video";
  liveUrl?: string;
  githubUrl?: string;
}

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: Project[] = [
    {
      title: "Outpost AI",
      description:
        "An open-source AI SaaS platform for social media management. Connect Instagram, LinkedIn, Facebook, X, Threads, Reddit, TikTok, and YouTube to one dashboard. Generate AI-powered content with OpenAI or Gemini, schedule posts for optimal times, and manage multiple brands effortlessly. Built with Next.js 15, Prisma, and NextAuth.",
      tags: ["AI", "SaaS", "Social Media", "Open Source"],
      src: "/outpost.png",
      images: [
        "/images/own/outpost1.png",
        "/images/own/outpost2.png",
        "/images/own/outpost3.png",
      ],
      type: "image",
      liveUrl: "https://outpost.sudeepkudari.online",
      githubUrl: "https://github.com/sudeepkudari0/outpost",
    },
    {
      title: "Forms Factory",
      description:
        "A powerful form builder platform that enables users to create custom forms and collect submissions seamlessly. Similar to Google Forms but with enhanced customization options. Built to handle form creation, real-time validation, and submission management with an intuitive drag-and-drop interface.",
      tags: ["Forms", "Full Stack", "SaaS"],
      src: "/forms-factory.png",
      images: [
        "/images/own/forms1.png",
        "/images/own/forms2.png",
        "/images/own/forms3.png",
      ],
      type: "image",
      liveUrl: "https://forms.sudeepkudari.online/",
      githubUrl: "https://github.com/sudeepkudari0/forms-factory",
    },
    {
      title: "ChatGPT Clone",
      description:
        "An advanced AI chatbot powered by Google Gemini 2.0/2.5 with unique features beyond traditional chat. Includes an Explore section using Google Places API to discover restaurants, places, and local attractions based on your current location. Features real-time streaming, multi-format file support (images, PDFs, YouTube), Google Search grounding, and persistent chat history.",
      tags: ["AI", "Chatbot", "Google Gemini", "Location Services"],
      src: "/chatgpt-clone.png",
      images: ["/images/own/chat1.png", "/images/own/chat2.png"],
      type: "image",
      liveUrl: "https://chatbot.sudeepkudari.online/",
      githubUrl: "https://github.com/sudeepkudari0/chatgpt-clone.git",
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
            y: 60,
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
            y: 40,
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
    <section ref={containerRef} id="work" className="relative py-20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-12">
        <div className="inline-block px-4 py-2 bg-green-100 border border-green-300 rounded-full text-sm font-semibold text-green-700 mb-4">
          🌟 Open Source
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Featured Projects
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
          Open-source AI-powered applications built with modern tech stacks and
          best practices.
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Side: Scrolling Text */}
        <div className="w-full md:w-1/2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="work-text-section md:h-screen flex flex-col md:justify-center px-8 md:px-16 lg:px-24 py-8 md:py-0"
            >
              {/* Text Content */}
              <div>
                <h3 className="project-heading text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-black will-change-transform">
                  {project.title}
                </h3>
                <div className="project-content will-change-transform">
                  <p className="text-base md:text-xl text-black leading-relaxed mb-4 md:mb-8 line-clamp-4 md:line-clamp-none">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-800/50 border border-black rounded-full text-xs md:text-sm text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base"
                      >
                        <span>View Project</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="md:w-4 md:h-4"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="md:w-4 md:h-4"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Image Carousel */}
              <div className="md:hidden mt-6 w-full">
                <div className="relative w-full aspect-video bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                  {project.type === "video" ? (
                    <video
                      src={project.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : project.images && project.images.length > 0 ? (
                    <AutoCarousel
                      images={project.images}
                      interval={3000}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.style.backgroundColor =
                            "#1e293b";
                        }}
                      />
                    </div>
                  )}

                  {/* Window Controls */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/90 border-b border-slate-800 flex items-center px-3 gap-1.5 z-20">
                    <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    <div className="ml-2 text-[10px] text-slate-500 font-mono truncate">
                      {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Media (Desktop only) */}
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
                ) : project.images && project.images.length > 0 ? (
                  <AutoCarousel
                    images={project.images}
                    interval={3000}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.backgroundColor =
                          "#1e293b";
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
                {projects[activeIndex]?.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
                .tsx
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
