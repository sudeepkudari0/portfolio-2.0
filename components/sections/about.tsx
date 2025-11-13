"use client";

import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-neutral-50"
    >
      <div className="max-w-3xl px-8">
        {/* Header */}
        <h2
          className={`text-4xl md:text-5xl font-bold mb-12 text-neutral-900 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ABOUT ME
        </h2>

        {/* Main Content Card */}
        <div
          className={`space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Name & Title */}
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Sudeep Kudari
            </h3>
            <p className="text-xl md:text-2xl text-neutral-600">
              Full-Stack Engineer
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-1 bg-neutral-900"></div>

          {/* Core Information */}
          <div className="space-y-6 text-lg md:text-xl">
            {/* What I do */}
            <div className="group">
              <p className="text-neutral-500 text-sm font-medium mb-1">
                What I do
              </p>
              <p className="text-neutral-900 leading-relaxed">
                Build end-to-end applications from database to UI
              </p>
            </div>

            {/* How I do it */}
            <div className="group">
              <p className="text-neutral-500 text-sm font-medium mb-1">
                How I do it
              </p>
              <p className="text-neutral-900 leading-relaxed">
                Java, TypeScript, React, PostgreSQL, Node.js
              </p>
            </div>

            {/* Why it matters */}
            <div className="group">
              <p className="text-neutral-500 text-sm font-medium mb-1">
                Why it matters
              </p>
              <p className="text-neutral-900 leading-relaxed">
                Scalable systems that serve 10K+ users reliably
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-16 h-1 bg-neutral-300"></div>

          {/* Current Status */}
          <div className="space-y-4 text-base md:text-lg">
            <div>
              <span className="text-neutral-500">Currently exploring: </span>
              <span className="text-neutral-900 font-medium">
                Kubernetes, Go, GraphQL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Status: </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-neutral-900 font-medium">
                  Open to opportunities
                </span>
              </span>
            </div>
          </div>

          {/* CTA - Resume Link */}
          <div className="pt-4">
            <a
              href="#resume"
              className="inline-flex items-center gap-2 text-neutral-900 hover:gap-3 transition-all duration-300 group"
            >
              <span className="text-lg font-medium">View full resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 mb-4">Connect with me:</p>
            <div className="flex gap-6 items-center flex-wrap">
              <a
                href="https://github.com/sudeepkudari0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span className="text-base group-hover:underline">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sudeep-kudari-1916aa27a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-base group-hover:underline">
                  LinkedIn
                </span>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="text-base group-hover:underline">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
