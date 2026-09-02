"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  User,
  FolderGit2,
  Cpu,
  Compass,
  Sparkles,
  FileText,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  X,
  Layers,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "External";
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Home // The Portal",
      category: "Navigation",
      icon: Home,
      shortcut: "H",
      action: () => router.push("/"),
    },
    {
      id: "about",
      title: "Founders Dossier // Sai Rio & Edison",
      category: "Navigation",
      icon: User,
      shortcut: "A",
      action: () => router.push("/about"),
    },
    {
      id: "services",
      title: "Core Services // 5 Engineering Disciplines",
      category: "Navigation",
      icon: Layers,
      action: () => router.push("/services"),
    },
    {
      id: "capabilities",
      title: "Engineering Capabilities // Architecture Matrix",
      category: "Navigation",
      icon: Cpu,
      action: () => router.push("/capabilities"),
    },
    {
      id: "projects",
      title: "Selected Work // Case Studies Archive",
      category: "Navigation",
      icon: FolderGit2,
      shortcut: "P",
      action: () => router.push("/projects"),
    },
    {
      id: "lab",
      title: "Aevion Lab // WebGL, Shaders & 3D R&D",
      category: "Navigation",
      icon: Sparkles,
      shortcut: "L",
      action: () => router.push("/lab"),
    },
    {
      id: "ai",
      title: "AI Systems // Neural Pipelines & Agents",
      category: "Navigation",
      icon: Sparkles,
      action: () => router.push("/ai"),
    },
    {
      id: "technology",
      title: "Technology Stack // Runtimes & Specs",
      category: "Navigation",
      icon: Cpu,
      shortcut: "T",
      action: () => router.push("/technology"),
    },
    {
      id: "process",
      title: "Engineering Process & SLA",
      category: "Navigation",
      icon: Compass,
      shortcut: "B",
      action: () => router.push("/process"),
    },
    {
      id: "contact-whatsapp",
      title: "Instant WhatsApp Uplink // Direct to Founders",
      category: "Actions",
      icon: Mail,
      shortcut: "W",
      action: () => window.open("https://wa.me/919080517865", "_blank"),
    },
    {
      id: "contact",
      title: "Submit Mission Brief // /contact Form",
      category: "Actions",
      icon: Mail,
      shortcut: "C",
      action: () => router.push("/contact"),
    },
    {
      id: "github",
      title: "Aevion Studio GitHub // Open Source",
      category: "External",
      icon: Github,
      action: () => window.open("https://github.com/aevionstudio", "_blank"),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
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

  // Keyboard navigation within palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-zinc-950 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search size={18} className="text-emerald-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search destination..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-md">
            ESC
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-8 text-xs font-mono text-zinc-500">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isSelected ? "text-black" : "text-emerald-400"} />
                    <span>{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                        isSelected ? "bg-black/20 text-black font-bold" : "bg-zinc-900 text-zinc-500 border border-white/5"
                      }`}
                    >
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <span className={`text-[10px] font-mono ${isSelected ? "text-black" : "text-zinc-500"}`}>
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-zinc-900/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Aevion Studio OS</span>
        </div>
      </div>
    </div>
  );
}
