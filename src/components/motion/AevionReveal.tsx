"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AevionRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: string; // ScrollTrigger start e.g. "top 88%"
  className?: string;
  once?: boolean;
}

export function AevionReveal({
  children,
  direction = "up",
  distance,
  duration,
  delay = 0,
  threshold,
  className = "",
  once = true,
}: AevionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (isReducedMotion()) {
        gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

      const isMobile = isMobileDevice();
      const effectiveThreshold = threshold ?? (isMobile ? "top 92%" : "top 88%");
      const animDuration = duration ?? (isMobile ? 0.44 : 0.54);
      const effectiveDistance = distance ?? (isMobile ? 14 : 20);

      let xOffset = 0;
      let yOffset = 0;

      if (direction === "up") yOffset = effectiveDistance;
      else if (direction === "down") yOffset = -effectiveDistance;
      else if (direction === "left") xOffset = effectiveDistance;
      else if (direction === "right") xOffset = -effectiveDistance;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: xOffset,
          y: yOffset,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: animDuration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: effectiveThreshold,
            once,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [direction, distance, duration, delay, threshold, once] }
  );

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

export default AevionReveal;
