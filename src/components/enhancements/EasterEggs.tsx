"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function EasterEggs() {
  const [triggered, setTriggered] = useState(false);

  // Console message on startup
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "%c AEVION STUDIO — Operating System Active %c https://aevion.studio ",
        "background: #111; color: #00ffaa; font-weight: bold; font-size: 14px; padding: 6px 12px; border-radius: 4px;",
        "background: #222; color: #aaa; font-size: 12px; padding: 6px 12px; border-radius: 4px;"
      );
    }
  }, []);

  // Konami Code detector
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = konamiSequence[keyIndex].length === 1 ? konamiSequence[keyIndex].toLowerCase() : konamiSequence[keyIndex];

      if (key === expectedKey) {
        keyIndex++;
        if (keyIndex === konamiSequence.length) {
          setTriggered(true);
          keyIndex = 0;
          setTimeout(() => setTriggered(false), 5000);
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 pointer-events-none z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-gradient-to-r from-purple-900/90 via-black to-blue-900/90 border border-purple-500/50 p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              🎮 Secret Developer Mode Unlocked!
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              You found the Konami Code Easter Egg. Aevion Studio is built for high-performance creative engineering.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
