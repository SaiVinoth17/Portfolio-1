"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

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
  stagger = MOTION.stagger.normal,
  duration = MOTION.duration.standard,
  yOffset = 30,
  delay = 0,
  threshold = "top 85%",
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

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: containerRef.current,
            start: threshold,
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
