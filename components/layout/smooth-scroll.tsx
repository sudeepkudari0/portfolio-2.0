"use client";

import { useEffect, createContext, useContext, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  getLenis: () => Lenis | null;
}

const LenisContext = createContext<LenisContextType | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context?.getLenis() || null;
};

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      infinite: false,
    });

    lenisRef.current = lenisInstance;

    lenisInstance.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 2000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const setupSnapping = () => {
      const sections = gsap.utils.toArray<HTMLElement>("section[id]");

      if (sections.length === 0) return;

      ScrollTrigger.create({
        snap: {
          snapTo: () => {
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const maxScroll =
              document.documentElement.scrollHeight - viewportHeight;

            let mostVisibleSection = sections[0];
            let maxVisibleArea = 0;

            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();

              const visibleTop = Math.max(0, rect.top);
              const visibleBottom = Math.min(viewportHeight, rect.bottom);
              const visibleHeight = Math.max(0, visibleBottom - visibleTop);

              if (visibleHeight > maxVisibleArea) {
                maxVisibleArea = visibleHeight;
                mostVisibleSection = section;
              }
            });

            const sectionRect = mostVisibleSection.getBoundingClientRect();
            const sectionTop = scrollY + sectionRect.top;
            const sectionHeight = sectionRect.height;

            const targetScroll =
              sectionTop + sectionHeight / 2 - viewportHeight / 2;

            const clampedScroll = Math.max(
              0,
              Math.min(maxScroll, targetScroll)
            );
            return clampedScroll / maxScroll;
          },
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.inOut",
          delay: 0.05,
        },
      });
    };

    setTimeout(setupSnapping, 200);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const getLenis = () => lenisRef.current;

  return (
    <LenisContext.Provider value={{ getLenis }}>
      {children}
    </LenisContext.Provider>
  );
}

export default function SmoothScroll() {
  return null;
}
