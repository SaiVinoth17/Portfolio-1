"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  duration,
  stagger,
  threshold,
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

      const isMobile = isMobileDevice();
      const effectiveThreshold = threshold ?? (isMobile ? "top 92%" : "top 88%");
      const animDuration = duration ?? (isMobile ? 0.52 : 0.62);
      const animStagger = stagger ?? (isMobile ? 0.02 : 0.03);

      const tokens = containerRef.current.querySelectorAll(".aevion-text-token");

      gsap.fromTo(
        tokens,
        {
          yPercent: 105,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
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
    { scope: containerRef, dependencies: [text, delay, duration, stagger, threshold] }
  );

  const tokens = splitBy === "words" ? text.split(/\s+/).filter(Boolean) : text.split("\n");

  return (
    // @ts-expect-error - Dynamic component ref typing
    <Component ref={containerRef} className={className}>
      {tokens.map((token, idx) => (
        <React.Fragment key={idx}>
          <span className="inline-block whitespace-nowrap overflow-hidden align-baseline py-[0.06em] -my-[0.06em]">
            <span className="aevion-text-token inline-block will-change-transform">
              {token}
            </span>
          </span>
          {idx < tokens.length - 1 && " "}
        </React.Fragment>
      ))}
    </Component>
  );
}

export default AevionTextReveal;
