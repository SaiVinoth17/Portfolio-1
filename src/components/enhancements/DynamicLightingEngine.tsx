"use client";

import { useEffect } from "react";

export function DynamicLightingEngine() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId: number;
    let dirty = false;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastVelX = 0;
    let lastVelY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastVelX = e.clientX - targetX;
      lastVelY = e.clientY - targetY;
      targetX = e.clientX;
      targetY = e.clientY;
      dirty = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCSSVars = () => {
      frameId = requestAnimationFrame(updateCSSVars);

      // Skip work when mouse hasn't moved and interpolation has settled
      if (!dirty) {
        const dx = Math.abs(targetX - currentX);
        const dy = Math.abs(targetY - currentY);
        if (dx < 0.1 && dy < 0.1) return;
      }
      dirty = false;

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const root = document.documentElement;
      root.style.setProperty("--mouse-x", `${currentX.toFixed(0)}px`);
      root.style.setProperty("--mouse-y", `${currentY.toFixed(0)}px`);
      root.style.setProperty("--mouse-pct-x", (currentX / window.innerWidth).toFixed(3));
      root.style.setProperty("--mouse-pct-y", (currentY / window.innerHeight).toFixed(3));
      root.style.setProperty("--mouse-vel-x", lastVelX.toFixed(0));
      root.style.setProperty("--mouse-vel-y", lastVelY.toFixed(0));
    };

    frameId = requestAnimationFrame(updateCSSVars);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
