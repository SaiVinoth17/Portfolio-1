"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

interface AevionRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: string; // ScrollTrigger start e.g. "top 85%"
  className?: string;
  once?: boolean;
}

export function AevionReveal({
  children,
  direction = "up",
  distance = 35,
  duration = MOTION.duration.standard,
  delay = 0,
  threshold = "top 88%",
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

      let xOffset = 0;
      let yOffset = 0;

      if (direction === "up") yOffset = distance;
      else if (direction === "down") yOffset = -distance;
      else if (direction === "left") xOffset = distance;
      else if (direction === "right") xOffset = -distance;

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
          duration,
          delay,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: containerRef.current,
            start: threshold,
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
