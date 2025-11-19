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

    // Snapping removed as per user request

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
