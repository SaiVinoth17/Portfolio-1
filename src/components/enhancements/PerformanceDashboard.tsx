"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Gauge, Zap, X } from "lucide-react";

export function PerformanceDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState<string | null>(null);
  const [scrollVel, setScrollVel] = useState(0);

  // Keyboard shortcut Ctrl + Shift + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // FPS & Memory loop
  useEffect(() => {
    if (!isOpen) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;

        // Memory estimation if available
        if ("memory" in performance) {
          const mem = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
          setMemory(`${Math.round(mem.usedJSHeapSize / 1048576)} MB`);
        }
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);

    // Scroll velocity listener
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastScrollTime;
      if (dt > 0) {
        const vel = Math.abs((currentScrollY - lastScrollY) / dt) * 100;
        setScrollVel(Math.round(vel));
      }
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-[99999] bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs p-4 rounded-2xl shadow-2xl w-72 font-mono"
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <Activity size={14} />
              <span>Aevion Dev HUD</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-400" /> Frame Rate
              </span>
              <span className="font-bold text-white">{fps} FPS</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Cpu size={12} className="text-blue-400" /> Memory Heap
              </span>
              <span className="font-bold text-white">{memory || "N/A"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Gauge size={12} className="text-purple-400" /> Scroll Velocity
              </span>
              <span className="font-bold text-white">{scrollVel} px/s</span>
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] text-gray-400 flex justify-between">
              <span>Hardware Acceleration</span>
              <span className="text-emerald-400 font-semibold">Active (GPU)</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
