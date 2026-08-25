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
    // Welcome achievement after 4s, auto-dismiss in 6s
    const timer = setTimeout(() => {
      setAchievement({
        id: "welcome",
        title: "Aevion Studio OS",
        description: "Kinetic motion & intelligence layer active.",
      });
    }, 4000);

    const dismissTimer = setTimeout(() => {
      setAchievement(null);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 sm:top-24 right-4 left-4 sm:left-auto sm:right-6 z-40 bg-zinc-950/95 border border-emerald-500/30 text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm font-sans backdrop-blur-xl"
        >
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 shrink-0">
            <Trophy size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              System Telemetry
            </div>
            <h4 className="text-xs font-bold text-white leading-tight truncate">{achievement.title}</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug truncate">{achievement.description}</p>
          </div>
          <button
            onClick={() => setAchievement(null)}
            className="text-zinc-500 hover:text-white p-1 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AchievementSystem;
