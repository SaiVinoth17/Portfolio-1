"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  // Velocity stretch scaling
  const scaleX = useTransform(velocityX, [-100, 0, 100], [1.2, 1, 1.2]);
  const scaleY = useTransform(velocityY, [-100, 0, 100], [0.8, 1, 0.8]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Strictly enable ONLY for desktop devices with precise pointer and hover capabilities
    const checkEligibility = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const canHover = window.matchMedia("(hover: hover)").matches;
      const isDesktopWidth = window.innerWidth >= 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const eligible = hasFinePointer && canHover && isDesktopWidth && !reducedMotion;
      setIsEnabled(eligible);
      if (!eligible) {
        setIsVisible(false);
      }
    };

    checkEligibility();
    window.addEventListener("resize", checkEligibility);

    return () => {
      window.removeEventListener("resize", checkEligibility);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const vx = e.clientX - lastX;
      const vy = e.clientY - lastY;
      velocityX.set(vx);
      velocityY.set(vy);
      lastX = e.clientX;
      lastY = e.clientY;

      // Check magnetic target
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        "button, a, [data-cursor], [role='button'], .cursor-pointer"
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute("data-cursor");
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (interactiveEl.tagName === "A") {
          setHoverLabel("Link");
        } else if (interactiveEl.tagName === "BUTTON") {
          setHoverLabel("Action");
        } else {
          setHoverLabel("View");
        }

        // Magnetic pull
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 60) {
          rawX.set(centerX + (e.clientX - centerX) * 0.35);
          rawY.set(centerY + (e.clientY - centerY) * 0.35);
          return;
        }
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }

      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled, isVisible, rawX, rawY, velocityX, velocityY]);

  if (!isEnabled || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX,
        scaleY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[45] hidden md:flex items-center justify-center"
    >
      {/* Outer Ring */}
      <motion.div
        animate={{
          width: isHovered ? 44 : 18,
          height: isHovered ? 44 : 18,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-full border border-white/40 backdrop-blur-[2px] flex items-center justify-center overflow-hidden shadow-lg shadow-black/20"
      >
        {hoverLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[8px] font-mono font-bold uppercase tracking-widest text-white px-1 select-none"
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      {!isHovered && (
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      )}
    </motion.div>
  );
}

export default CustomCursor;
