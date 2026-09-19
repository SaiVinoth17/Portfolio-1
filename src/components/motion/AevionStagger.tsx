"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AevionStaggerProps {
  children: React.ReactNode;
  selector?: string; // CSS selector for children to animate (defaults to direct children)
  stagger?: number;
  duration?: number;
  yOffset?: number;
  delay?: number;
  threshold?: string;
  className?: string;
}

export function AevionStagger({
  children,
  selector = "> *",
  stagger,
  duration,
  yOffset,
  delay = 0,
  threshold,
  className = "",
}: AevionStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (isReducedMotion()) {
        gsap.set(containerRef.current.querySelectorAll(selector), { opacity: 1, y: 0 });
        return;
      }

      const targets = containerRef.current.querySelectorAll(selector);
      if (!targets.length) return;

      const isMobile = isMobileDevice();
      const effectiveThreshold = threshold ?? (isMobile ? "top 92%" : "top 88%");
      const animDuration = duration ?? (isMobile ? 0.42 : 0.52);
      const animStagger = stagger ?? (isMobile ? 0.03 : 0.05);
      const animY = yOffset ?? (isMobile ? 12 : 16);

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: animY,
        },
        {
          opacity: 1,
          y: 0,
          duration: animDuration,
          delay,
          stagger: animStagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: effectiveThreshold,
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [selector, stagger, duration, yOffset, delay, threshold] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default AevionStagger;
