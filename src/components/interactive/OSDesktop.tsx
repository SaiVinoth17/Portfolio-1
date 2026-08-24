"use client";

import React, { useState } from "react";
import { Terminal, Activity, Cpu, Sparkles, Folder, Maximize2, X, Play, RefreshCw } from "lucide-react";

export default function OSDesktop() {
  const [activeTab, setActiveTab] = useState<"terminal" | "monitor" | "ai">("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "AEVION OS v2.4.0 (x86_64-edge-linux)",
    "Kernel loaded. Memory subsystems nominal.",
    "Type 'help', 'status', 'ai', 'clear', or 'bench'.",
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    let resp = `bash: ${cmd}: command not found. Type 'help' for commands.`;

    if (cmd === "help") resp = "Available binaries: status, ai, bench, metrics, clear, reboot";
    if (cmd === "status") resp = "System Status: 100% HEALTHY • 0 dropped frames • Sub-50ms AI Latency";
    if (cmd === "ai") resp = "Groq Llama 3.3 Engine: Online • SSE Stream connected";
    if (cmd === "bench") resp = "Running Core Web Vitals Benchmark... Lighthouse: 98/100 • TTFB: 42ms";
    if (cmd === "metrics") resp = "CPU: 12% • Memory: 142MB / 512MB • V-Sync: 60 FPS";

    if (cmd === "clear") {
      setTerminalLogs(["AEVION OS v2.4.0 Terminal"]);
    } else {
      setTerminalLogs((prev) => [...prev, `$ ${terminalInput}`, resp]);
    }
    setTerminalInput("");
  };

  return (
    <div className="rounded-3xl bg-zinc-950 border border-emerald-500/30 overflow-hidden shadow-2xl space-y-4 p-6">
      {/* Desktop Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs font-mono text-emerald-400 font-bold ml-2">AEVION_OS // INTERACTIVE DESKTOP</span>
        </div>

        {/* Window Tabs */}
        <div className="flex gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeTab === "terminal" ? "bg-emerald-500 text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab("monitor")}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeTab === "monitor" ? "bg-emerald-500 text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            System Monitor
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeTab === "ai" ? "bg-emerald-500 text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            AI Engine
          </button>
        </div>
      </div>

      {/* Window Body */}
      {activeTab === "terminal" && (
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-black/90 rounded-2xl border border-white/10 p-4 h-48 overflow-y-auto space-y-1.5">
            {terminalLogs.map((l, i) => (
              <div key={i} className={l.startsWith("$") ? "text-emerald-400 font-bold" : "text-zinc-300"}>
                {l}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex gap-2">
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type 'help', 'status', or 'bench'..."
              className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 cursor-pointer"
            >
              Exec
            </button>
          </form>
        </div>
      )}

      {activeTab === "monitor" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
            <span className="text-zinc-500 block">CPU USAGE</span>
            <span className="text-2xl font-bold text-emerald-400">14.2%</span>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[14%]" />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
            <span className="text-zinc-500 block">EDGE MEMORY</span>
            <span className="text-2xl font-bold text-cyan-400">128 MB</span>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-[25%]" />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
            <span className="text-zinc-500 block">FRAME TARGET</span>
            <span className="text-2xl font-bold text-white">60 FPS</span>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[100%]" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="font-bold">GROQ LLAMA 3.3 70B INFERENCE ROUTE</span>
            <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
              ONLINE
            </span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Streaming endpoint active at /api/chat. Handles server-sent token chunking, automatic context truncation, and multi-turn session persistence.
          </p>
        </div>
      )}
    </div>
  );
}
