"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

interface AevionTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: string;
  splitBy?: "words" | "lines";
}

export function AevionTextReveal({
  text,
  as: Component = "h2",
  className = "",
  delay = 0,
  duration = MOTION.duration.cinematic,
  stagger = MOTION.stagger.normal,
  threshold = "top 85%",
  splitBy = "words",
}: AevionTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (isReducedMotion()) {
        gsap.set(containerRef.current.querySelectorAll(".aevion-text-token"), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tokens = containerRef.current.querySelectorAll(".aevion-text-token");

      gsap.fromTo(
        tokens,
        {
          y: "115%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
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
    { scope: containerRef, dependencies: [text, delay, duration, stagger, threshold] }
  );

  const tokens = splitBy === "words" ? text.split(" ") : text.split("\n");

  return (
    // @ts-expect-error - Dynamic component ref typing
    <Component ref={containerRef} className={`${className} inline-flex flex-wrap gap-x-[0.25em]`}>
      {tokens.map((token, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span className="aevion-text-token inline-block will-change-transform">
            {token}
            {idx < tokens.length - 1 && splitBy === "words" ? "" : ""}
          </span>
        </span>
      ))}
    </Component>
  );
}

export default AevionTextReveal;
