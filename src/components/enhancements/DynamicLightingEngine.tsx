"use client";

import { useEffect } from "react";

export function DynamicLightingEngine() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastX = 0;
    let lastY = 0;
    let frameId: number;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCSSVars = () => {
      // Smooth interpolation for CSS variables
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const velX = targetX - lastX;
      const velY = targetY - lastY;
      lastX = targetX;
      lastY = targetY;

      const pctX = (currentX / window.innerWidth).toFixed(3);
      const pctY = (currentY / window.innerHeight).toFixed(3);

      const root = document.documentElement;
      root.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
      root.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);
      root.style.setProperty("--mouse-pct-x", pctX);
      root.style.setProperty("--mouse-pct-y", pctY);
      root.style.setProperty("--mouse-vel-x", `${velX.toFixed(1)}`);
      root.style.setProperty("--mouse-vel-y", `${velY.toFixed(1)}`);

      frameId = requestAnimationFrame(updateCSSVars);
    };

    frameId = requestAnimationFrame(updateCSSVars);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
