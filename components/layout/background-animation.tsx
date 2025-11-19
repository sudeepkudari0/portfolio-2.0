"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundAnimation() {
  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0);

    // Set the global background gradient immediately and permanently
    gsap.set(document.body, {
      background:
        "linear-gradient(180deg, #FFEFEA 0%, #FFF5F0 50%, #FFFFFF 100%)",
      backgroundAttachment: "fixed",
    });

    // No scroll triggers needed for background anymore as it's consistent
    
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return null;
}
