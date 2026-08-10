"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperTerminal({ isOpen, onClose }: DeveloperTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "aevion status",
      output: "✔ AEVION OS v2.0 ACTIVE — 100% System Integrity. GPU Turbopack Enabled.",
    },
  ]);

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    let out = "";

    switch (cmd) {
      case "help":
        out = "Available commands: status, stack, metrics, clear, exit";
        break;
      case "status":
        out = "All Systems Operational. Latency: 12ms | FPS: 120 | Node: Vercel Edge Serverless";
        break;
      case "stack":
        out = "Next.js 16.1 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP 3, Lenis";
        break;
      case "metrics":
        out = "Uptime: 99.99% | Bandwidth: 1.4 TB/mo | Active Edge Nodes: 32 Global Locations";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        setInput("");
        return;
      default:
        out = `Command not recognized: "${cmd}". Type "help" for available commands.`;
    }

    setHistory((prev) => [...prev, { command: input, output: out }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-gray-950 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[420px]"
          >
            {/* Header Bar */}
            <div className="p-3.5 bg-black/60 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <TerminalIcon size={16} />
                <span>aevion-developer-cli v2.0</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Output Log */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed text-gray-300">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span>aevion@studio:~$</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <div className="text-gray-400 pl-4 border-l border-emerald-500/20">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Prompt */}
            <div className="p-3 bg-black/40 border-t border-gray-800 flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-bold">aevion@studio:~$</span>
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommand()}
                placeholder="Type command (e.g. 'help', 'stack', 'metrics')..."
                className="flex-1 bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none"
              />
              <CornerDownLeft size={14} className="text-gray-500" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
