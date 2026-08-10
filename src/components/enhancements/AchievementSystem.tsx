"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
}

export function AchievementSystem() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // Welcome achievement after 3s
    const timer = setTimeout(() => {
      setAchievement({
        id: "welcome",
        title: "Aevion OS Explorer",
        description: "Welcome to Aevion Studio Motion Operating System v2.0",
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[99999] bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border border-yellow-500/40 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-sm font-sans"
        >
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 shrink-0">
            <Trophy size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-yellow-400">
              Achievement Unlocked
            </div>
            <h4 className="text-xs font-bold text-white leading-tight">{achievement.title}</h4>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{achievement.description}</p>
          </div>
          <button
            onClick={() => setAchievement(null)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
