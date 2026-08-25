import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins globally in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const MOTION = {
  ease: {
    cinematic: "power3.out",
    smooth: "power2.out",
    expressive: "expo.out",
    technical: "power4.out",
    inOut: "power3.inOut",
  },
  duration: {
    micro: 0.25,
    fast: 0.45,
    standard: 0.75,
    cinematic: 1.1,
    atmospheric: 1.6,
  },
  stagger: {
    tight: 0.05,
    normal: 0.1,
    relaxed: 0.18,
  },
};

/**
 * Checks if the user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Checks if device is desktop with mouse pointer
 */
export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)").matches;
}
