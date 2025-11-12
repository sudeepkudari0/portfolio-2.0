"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundAnimation() {
  useEffect(() => {
    // Ensure page starts at top on load for consistent behavior
    window.scrollTo(0, 0);

    // Set initial background
    gsap.set(document.body, {
      background:
        "linear-gradient(180deg, #FFEFEA 0%, #FFF5F0 50%, #FFFFFF 100%)",
    });

    // Wait for DOM to be fully ready and work section to initialize
    const initBackgrounds = () => {
      // Home section
      const homeSection = document.getElementById("home");
      if (homeSection) {
        gsap.to(document.body, {
          background:
            "linear-gradient(180deg, #FFEFEA 0%, #FFF5F0 50%, #FFFFFF 100%)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: homeSection,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        });
      }

      // About section
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        gsap.to(document.body, {
          background: "#FFFFFF",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: aboutSection,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        });
      }

      // Work section - Special handling for pinned section with horizontal scroll
      const workSection = document.getElementById("work");
      const skillsSection = document.getElementById("skills");

      if (workSection) {
        const scrollContent = workSection.querySelector(
          "[class*='will-change-transform']"
        ) as HTMLElement;

        if (scrollContent) {
          const scrollWidth = scrollContent.scrollWidth - window.innerWidth;

          // Transition to dark as we approach work section
          gsap.to(document.body, {
            background: "#0F172A",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: workSection,
              start: "top center",
              end: "top top",
              scrub: 1,
              id: "work-enter",
            },
          });

          // Keep dark throughout the ENTIRE pin duration
          gsap.fromTo(
            document.body,
            {
              background: "#0F172A",
            },
            {
              background: "#0F172A",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: workSection,
                start: "top top",
                end: () => `+=${scrollWidth}`,
                scrub: 1,
                id: "work-stay-dark",
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // Gradual transition from dark to light after work section completes
        if (skillsSection) {
          // First transition: Dark navy to lighter slate
          gsap.to(document.body, {
            background: "#334155",
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: skillsSection,
              start: "top bottom",
              end: "top 70%",
              scrub: 1,
              id: "work-exit-1",
              invalidateOnRefresh: true,
            },
          });

          // Second transition: Lighter slate to white
          gsap.to(document.body, {
            background: "#FFFFFF",
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: skillsSection,
              start: "top 70%",
              end: "top center",
              scrub: 1,
              id: "work-exit-2",
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        gsap.to(document.body, {
          background: "#F8FAFC",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: contactSection,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        });
      }

      // Refresh all ScrollTriggers after setup
      ScrollTrigger.refresh();
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(initBackgrounds, 100);
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        // Only kill background-related triggers (those targeting body)
        const triggerElement = trigger.vars.trigger as HTMLElement | undefined;
        const sectionIds = ["home", "about", "work", "skills", "contact"];
        if (triggerElement?.id && sectionIds.includes(triggerElement.id)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return null;
}
