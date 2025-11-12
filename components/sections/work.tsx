"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Project One",
      description: "A revolutionary web application",
      tags: ["React", "Next.js", "TypeScript"],
    },
    {
      title: "Project Two",
      description: "An innovative mobile experience",
      tags: ["React Native", "Node.js", "MongoDB"],
    },
    {
      title: "Project Three",
      description: "A cutting-edge SaaS platform",
      tags: ["Vue.js", "Python", "PostgreSQL"],
    },
    {
      title: "Project Four",
      description: "Automation and infrastructure tooling",
      tags: ["Go", "Docker", "Kubernetes"],
    },
    {
      title: "Project Five",
      description: "Real-time collaboration features",
      tags: ["WebSockets", "Redis", "Postgres"],
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    if (!container || !scrollContent) return;

    // Calculate scroll distance
    const scrollWidth = scrollContent.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(scrollContent, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true, // Pins the section
        scrub: 1, // Smooth scrubbing
        end: () => `+=${scrollWidth}`, // Scroll distance
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="h-screen overflow-hidden flex flex-col"
    >
      <div className="max-w-6xl px-8 mx-auto pt-24 pb-10">
        <h2 className="text-5xl md:text-7xl font-bold">Featured Work</h2>
      </div>
      <div className="flex-1 flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex gap-6 px-8 will-change-transform">
          {projects.map((project, index) => (
            <div
              key={index}
              className="shrink-0 w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-xl border border-border rounded-2xl p-6 hover:bg-accent transition-colors cursor-pointer bg-card/50"
            >
              <div className="aspect-video bg-muted rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
