"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicPreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-mono select-none"
        >
          <div className="flex flex-col items-center max-w-sm w-full">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold tracking-[0.3em] uppercase text-gray-300 mb-8"
            >
              Aevion Studio • OS v2.0
            </motion.h2>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden mb-4 border border-white/10">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 h-full rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>

            {/* Metrics */}
            <div className="w-full flex justify-between text-[11px] text-gray-400 tracking-wider">
              <span>INITIALIZING GPU PIPELINE</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
