"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Terminal,
  Activity,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Home,
  User,
  FolderGit2,
  Cpu,
  Compass,
  FileText,
  BookOpen,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { audioEngine } from "./AudioEngine";

interface CommandPaletteProps {
  onOpenTerminal: () => void;
  onOpenMetrics: () => void;
}

export function CommandPalette({ onOpenTerminal, onOpenMetrics }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    audioEngine.setEnabled(nextState);
    if (nextState) audioEngine.playClick();
  };

  const actions = [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Return to signature GSAP 3D ScrollTrigger portal",
      icon: <Home className="text-emerald-400" size={18} />,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "nav-about",
      title: "About & Career Continuum",
      subtitle: "3D spatial time continuum & founder milestones",
      icon: <User className="text-cyan-400" size={18} />,
      action: () => {
        router.push("/about");
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "Case Studies & Archive",
      subtitle: "3D digital matrix & technical specifications",
      icon: <FolderGit2 className="text-emerald-400" size={18} />,
      action: () => {
        router.push("/projects");
        setIsOpen(false);
      },
    },
    {
      id: "nav-stack",
      title: "Tech Stack & Machine Inspector",
      subtitle: "3D technological machine & subsystem architecture",
      icon: <Cpu className="text-teal-400" size={18} />,
      action: () => {
        router.push("/tech-stack");
        setIsOpen(false);
      },
    },
    {
      id: "nav-process",
      title: "Engineering Process & Blueprint",
      subtitle: "6-stage software construction simulator",
      icon: <Compass className="text-blue-400" size={18} />,
      action: () => {
        router.push("/process");
        setIsOpen(false);
      },
    },
    {
      id: "nav-showcase",
      title: "3D & WebGL Laboratory",
      subtitle: "Interactive physics ballpit & caustic shader sandbox",
      icon: <Sparkles className="text-purple-400" size={18} />,
      action: () => {
        router.push("/showcase");
        setIsOpen(false);
      },
    },
    {
      id: "nav-resume",
      title: "Technical Dossier (Resume)",
      subtitle: "Printable ATS verified technical competence matrix",
      icon: <FileText className="text-emerald-400" size={18} />,
      action: () => {
        router.push("/resume");
        setIsOpen(false);
      },
    },
    {
      id: "nav-blog",
      title: "Research & Technical Chronicle",
      subtitle: "In-depth engineering writeups & architecture logs",
      icon: <BookOpen className="text-cyan-400" size={18} />,
      action: () => {
        router.push("/blog");
        setIsOpen(false);
      },
    },
    {
      id: "nav-contact",
      title: "Start a Project (Product Configurator)",
      subtitle: "Interactive project scope estimator & transmission",
      icon: <Mail className="text-emerald-400" size={18} />,
      action: () => {
        router.push("/contact");
        setIsOpen(false);
      },
    },
    // Developer Actions
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
      title: "View Studio System Metrics (SIMULATED)",
      subtitle: "Inspect edge latency, memory & v-sync diagnostics",
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
      icon: soundEnabled ? <Volume2 className="text-purple-400" size={18} /> : <VolumeX className="text-zinc-500" size={18} />,
      action: () => {
        toggleSound();
      },
    },
    // External Links
    {
      id: "github",
      title: "Open Aevion Studio GitHub",
      subtitle: "Explore open-source repositories & codebases",
      icon: <Github className="text-zinc-300" size={18} />,
      action: () => {
        window.open("https://github.com/aevionstudio", "_blank");
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="w-full max-w-xl bg-zinc-950/95 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Input Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <Search size={18} className="text-zinc-400" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search studio destination..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none font-mono"
              />
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-lg text-[10px] text-zinc-400 font-mono">
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
                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-900/80 transition-colors text-left group cursor-pointer"
                  >
                    <div className="p-2 bg-black/40 border border-zinc-800 rounded-xl group-hover:border-zinc-700 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{item.subtitle}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found for &ldquo;{search}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-black/40 border-t border-zinc-800/80 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-emerald-400" /> Aevion Studio OS
              </span>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
