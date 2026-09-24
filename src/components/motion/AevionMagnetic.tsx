"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { isDesktopPointer, isReducedMotion } from "@/lib/motion/motionTokens";

interface AevionMagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default: 0.3)
  className?: string;
}

export function AevionMagnetic({
  children,
  strength = 0.35,
  className = "",
}: AevionMagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el || !isDesktopPointer() || isReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    let cachedRect: DOMRect | null = null;

    const handleMouseEnter = () => {
      cachedRect = el.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) {
        cachedRect = el.getBoundingClientRect();
      }
      const centerX = cachedRect.left + cachedRect.width / 2;
      const centerY = cachedRect.top + cachedRect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      xTo(dx);
      yTo(dy);
    };

    const handleMouseLeave = () => {
      cachedRect = null;
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

export default AevionMagnetic;
