"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProfessionalProject {
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  src: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function ProfessionalWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects: ProfessionalProject[] = [
    {
      title: "OpenAccess",
      tagline: "Clarity. Care. Connection.",
      description:
        "A mental health platform connecting patients with licensed therapists through secure video, voice, or messaging. Features free assessments and flexible therapy sessions powered by trusted professionals.",
      category: "Healthcare Platform",
      tags: ["Mental Health", "Telehealth", "NextAuth", "Video Sessions"],
      liveUrl: "https://openaccess.thinkroman.com",
      src: "/images/client/openaccess.png",
      stats: [
        { label: "Licensed Therapists", value: "50+" },
        { label: "Session Modes", value: "3" },
      ],
    },
    {
      title: "TrPharma Sales Portal",
      tagline: "Accelerate pharmaceutical sales with intelligent automation",
      description:
        "Enterprise CRM designed for pharmaceutical sales teams. Features lead discovery with Google Places API, activity tracking, inventory management, role-based access control, AI-powered insights, invoice generation, and WhatsApp integration.",
      category: "Enterprise CRM",
      tags: ["CRM", "AI", "Places API", "WhatsApp", "Inventory"],
      liveUrl: "https://sales.thinkroman.com",
      src: "/images/client/sales.png",
      stats: [
        { label: "Lead Sources", value: "AI + Places API" },
        { label: "Core Features", value: "10+" },
      ],
    },
    {
      title: "TrMobile CARE",
      tagline: "Healthcare at your doorstep",
      description:
        "Instant online medical consultation platform covering all healthcare departments. Features volunteer health providers who visit patients for in-person sessions, combined with fast online video appointments across multiple specialties.",
      category: "Telehealth Platform",
      tags: ["Instant Appointments", "Multi-Specialty", "Video Consultation"],
      liveUrl: "https://mobile.thinkroman.com/",
      src: "/images/client/mobilecare.png",
      stats: [
        { label: "Departments", value: "All Medical" },
        { label: "Appointment Type", value: "Instant" },
      ],
    },
    {
      title: "Tr 2nd Opinion",
      tagline: "Expert medical guidance when it matters most",
      description:
        "Connect with India's top medical specialists for trusted second opinions on diagnoses and treatment plans. Features secure record uploads, verified specialists, and consultations via video, WhatsApp, or messaging within 48 hours.",
      category: "Medical Consultation",
      tags: ["Specialists", "Second Opinion", "HIPAA Compliant", "Secure"],
      liveUrl: "https://2nd.thinkroman.com/",
      src: "/images/client/2nd.png",
      stats: [
        { label: "Response Time", value: "< 48hrs" },
        { label: "Security", value: "HIPAA" },
      ],
    },
    {
      title: "TrConsulting",
      tagline: "Medical research and consulting excellence",
      description:
        "Specialized consulting services offering medical writing, statistical analysis, grant preparation, manuscript writing, and bioinformatics support. Built with Sanity CMS and Next.js for global healthcare research clients.",
      category: "Consulting Services",
      tags: ["Medical Writing", "Research", "Sanity CMS", "BioInformatics"],
      liveUrl: "https://consulting.thinkroman.com/",
      src: "/images/client/consulting.png",
    },
    {
      title: "IPA Pharmacist Fellowship",
      tagline: "Advanced training in infectious diseases",
      description:
        "Educational portal for the Indian Pharmaceutical Association's ID Pharmacist Fellowship program. Provides learning resources, medicine lookup tools, and health magazine content for pharmacists specializing in infectious diseases.",
      category: "Education Platform",
      tags: ["Education", "Pharmacy", "Fellowship", "IPA"],
      liveUrl: "https://ipa.avenidapro.com/",
      src: "/images/client/ipa.png",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !cardsWrapperRef.current) return;

    const section = sectionRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".prof-project-card");

    // Calculate card width (responsive)
    const getCardWidth = () => {
      if (window.innerWidth < 768) return 320; // mobile
      if (window.innerWidth < 1024) return 400; // tablet
      return 500; // desktop
    };

    const cardWidth = getCardWidth();
    const totalProjects = projects.length;
    const totalWidth = cardWidth * (totalProjects - 1);

    // Calculate initial offset to center first card
    const viewportCenter = window.innerWidth / 2;
    const cardCenter = cardWidth / 2;
    const initialOffset = viewportCenter - cardCenter;

    // Set initial position to center first card
    gsap.set(cardsWrapper, { x: initialOffset });

    // Create the main scroll trigger for horizontal movement
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth * 2.5}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentCardIndex = Math.round(progress * (totalProjects - 1));
        setCurrentIndex(currentCardIndex);

        // Move cards horizontally from centered position
        const xOffset = initialOffset - progress * totalWidth;
        gsap.to(cardsWrapper, {
          x: xOffset,
          duration: 0.1,
          ease: "none",
        });

        // Scale cards based on center proximity
        cards.forEach((card, index) => {
          const distanceFromCenter = Math.abs(index - progress * (totalProjects - 1));
          const scale = gsap.utils.interpolate(1, 0.85, Math.min(distanceFromCenter, 1));
          const opacity = gsap.utils.interpolate(1, 0.5, Math.min(distanceFromCenter, 1));
          
          gsap.to(card, {
            scale: scale,
            opacity: opacity,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      },
    });

    // Initial fade in for section
    gsap.from(".prof-section-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
    });

    // Set initial scale for first card
    gsap.set(cards[0], { scale: 1, opacity: 1 });
    cards.forEach((card, index) => {
      if (index !== 0) {
        gsap.set(card, { scale: 0.85, opacity: 0.5 });
      }
    });

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      id="professional-work"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Section Header */}
      <div className="prof-section-header absolute top-8 left-0 right-0 z-30 px-6 md:px-12 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-full text-xs md:text-sm font-semibold text-slate-700 mb-3">
            💼 Professional Work
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
            Client Projects
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl">
            Building scalable healthcare and business platforms for industry clients
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <span>Scroll to explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="flex gap-2 justify-center">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-blue-600"
                  : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-start overflow-hidden pt-32"
      >
        <div
          ref={cardsWrapperRef}
          className="flex items-center"
          style={{
            width: "max-content",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="prof-project-card px-3"
              style={{
                width: "500px",
                maxWidth: "90vw",
              }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-blue-300">
                  {/* Image Container */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="absolute text-slate-400 font-mono text-xs">
                        {project.title}
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 italic mb-3">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Stats */}
                    {project.stats && (
                      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                        {project.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xl font-bold text-black">
                              {stat.value}
                            </div>
                            <div className="text-xs text-slate-500">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-black group-hover:text-blue-600 transition-colors">
                      <span>View Project</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}