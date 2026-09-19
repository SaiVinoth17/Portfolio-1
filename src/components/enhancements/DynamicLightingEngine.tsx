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

    let isRunning = false;

    const startLoop = () => {
      if (isRunning || (typeof document !== "undefined" && document.hidden)) return;
      isRunning = true;
      frameId = requestAnimationFrame(updateCSSVars);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastVelX = e.clientX - targetX;
      lastVelY = e.clientY - targetY;
      targetX = e.clientX;
      targetY = e.clientY;
      startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCSSVars = () => {
      if (typeof document !== "undefined" && document.hidden) {
        isRunning = false;
        return;
      }

      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);

      const root = document.documentElement;
      root.style.setProperty("--mouse-x", `${currentX.toFixed(0)}px`);
      root.style.setProperty("--mouse-y", `${currentY.toFixed(0)}px`);
      root.style.setProperty("--mouse-pct-x", (currentX / window.innerWidth).toFixed(3));
      root.style.setProperty("--mouse-pct-y", (currentY / window.innerHeight).toFixed(3));
      root.style.setProperty("--mouse-vel-x", lastVelX.toFixed(0));
      root.style.setProperty("--mouse-vel-y", lastVelY.toFixed(0));

      if (dx > 0.5 || dy > 0.5) {
        frameId = requestAnimationFrame(updateCSSVars);
      } else {
        isRunning = false;
      }
    };

    startLoop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
