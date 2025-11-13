"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundAnimation() {
  useEffect(() => {
    
    window.scrollTo(0, 0);

    
    gsap.set(document.body, {
      background:
        "linear-gradient(180deg, #FFEFEA 0%, #FFF5F0 50%, #FFFFFF 100%)",
    });

    
    const initBackgrounds = () => {
      
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

      
      const workSection = document.getElementById("work");
      const skillsSection = document.getElementById("skills");

      if (workSection) {
        const scrollContent = workSection.querySelector(
          "[class*='will-change-transform']"
        ) as HTMLElement;

        if (scrollContent) {
          const scrollWidth = scrollContent.scrollWidth - window.innerWidth;

          
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

        
        if (skillsSection) {
          
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

      
      ScrollTrigger.refresh();
    };

    
    requestAnimationFrame(() => {
      setTimeout(initBackgrounds, 100);
    });

    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        
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
