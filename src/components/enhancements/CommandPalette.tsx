"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Terminal, Activity, Volume2, VolumeX, Sparkles, Layers, Cpu } from "lucide-react";
import { audioEngine } from "./AudioEngine";

interface CommandPaletteProps {
  onOpenTerminal: () => void;
  onOpenMetrics: () => void;
}

export function CommandPalette({ onOpenTerminal, onOpenMetrics }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    audioEngine.setEnabled(nextState);
    if (nextState) audioEngine.playClick();
  };

  const actions = [
    {
      id: "terminal",
      title: "Open Developer Terminal",
      subtitle: "Run CLI diagnostics & architecture tools",
      icon: <Terminal className="text-emerald-400" size={18} />,
      action: () => {
        onOpenTerminal();
        setIsOpen(false);
      },
    },
    {
      id: "metrics",
      title: "View Studio Live Metrics",
      subtitle: "Inspect GPU nodes, edge latency & 99.99% uptime",
      icon: <Activity className="text-blue-400" size={18} />,
      action: () => {
        onOpenMetrics();
        setIsOpen(false);
      },
    },
    {
      id: "sound",
      title: soundEnabled ? "Mute Web Audio Synth" : "Enable Web Audio Synth",
      subtitle: "Synthesized UI sound effects via Web Audio API",
      icon: soundEnabled ? <Volume2 className="text-purple-400" size={18} /> : <VolumeX className="text-gray-400" size={18} />,
      action: () => {
        toggleSound();
      },
    },
    {
      id: "scroll-top",
      title: "Scroll to Hero Section",
      subtitle: "Jump to 3D Smooth Scroll Hero",
      icon: <Layers className="text-yellow-400" size={18} />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="w-full max-w-xl bg-gray-950/95 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Input Header */}
            <div className="p-4 border-b border-gray-800 flex items-center gap-3">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search studio actions..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 px-2 py-1 rounded-lg text-[10px] text-gray-400 font-mono">
                <Command size={10} /> K
              </div>
            </div>

            {/* Options List */}
            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {filteredActions.length > 0 ? (
                filteredActions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (soundEnabled) audioEngine.playClick();
                      item.action();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-900/80 transition-colors text-left group cursor-pointer"
                  >
                    <div className="p-2 bg-black/40 border border-gray-800 rounded-xl group-hover:border-gray-700 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400">{item.subtitle}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-gray-500">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-black/40 border-t border-gray-800/80 flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-emerald-400" /> Aevion Studio OS v2.0
              </span>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
