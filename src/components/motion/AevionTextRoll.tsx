"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { isReducedMotion } from "@/lib/motion/motionTokens";

interface AevionTextRollProps {
  children: string;
  className?: string;
  active?: boolean;
}

/**
 * AevionTextRoll: Dual-layer kinetic ticker roll.
 * On parent hover (or component hover), the top text rolls up (-100%)
 * while a duplicate text rolls in from below (0%), creating an ultra-premium
 * editorial studio micro-interaction.
 */
export function AevionTextRoll({
  children,
  className = "",
}: AevionTextRollProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onMouseEnter = contextSafe(() => {
    if (isReducedMotion()) return;
    gsap.killTweensOf([topTextRef.current, bottomTextRef.current]);
    gsap.to(topTextRef.current, {
      yPercent: -100,
      duration: 0.38,
      ease: "power3.out",
    });
    gsap.to(bottomTextRef.current, {
      yPercent: -100,
      duration: 0.38,
      ease: "power3.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    if (isReducedMotion()) return;
    gsap.killTweensOf([topTextRef.current, bottomTextRef.current]);
    gsap.to(topTextRef.current, {
      yPercent: 0,
      duration: 0.32,
      ease: "power3.out",
    });
    gsap.to(bottomTextRef.current, {
      yPercent: 0,
      duration: 0.32,
      ease: "power3.out",
    });
  });

  return (
    <span
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex flex-col overflow-hidden leading-tight select-none ${className}`}
      style={{ verticalAlign: "baseline" }}
    >
      <span ref={topTextRef} className="inline-block will-change-transform">
        {children}
      </span>
      <span
        ref={bottomTextRef}
        aria-hidden="true"
        className="absolute top-full left-0 inline-block will-change-transform"
      >
        {children}
      </span>
    </span>
  );
}

export default AevionTextRoll;
