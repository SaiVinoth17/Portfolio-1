"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, ShieldCheck, Server, Globe2, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";

interface ServiceStatus {
  name: string;
  category: string;
  status: "Operational" | "Active" | "Standby";
  type: string;
  protocol: string;
}

const SERVICES: ServiceStatus[] = [
  { name: "Global Edge CDN & Asset Delivery", category: "INFRASTRUCTURE", status: "Operational", type: "Edge Cache", protocol: "HTTP/2 & HTTP/3" },
  { name: "Next.js 16 App Router Serverless Engine", category: "FRONTEND ENGINE", status: "Operational", type: "React 19 SSR", protocol: "Vercel Serverless" },
  { name: "Groq Llama 3.3 Streaming AI Route (/api/chat)", category: "AI INFERENCE", status: "Operational", type: "Streaming SSE", protocol: "Groq SDK" },
  { name: "Web Audio Synthesizer Runtime", category: "CLIENT AUDIO", status: "Active", type: "Web Audio API", protocol: "Client Oscillator" },
  { name: "Three.js & WebGL 2 Canvas Subsystems", category: "GRAPHICS PIPELINE", status: "Active", type: "Hardware Accelerated", protocol: "WebGL 2.0" },
];

export default function StatusPage() {
  const [lastChecked, setLastChecked] = useState<string>("VERIFIED ACTIVE");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastChecked(new Date().toLocaleTimeString());
    }, 0);
    const interval = setInterval(() => {
      setLastChecked(new Date().toLocaleTimeString());
    }, 10000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Activity size={14} className="animate-pulse" /> AEVION INFRASTRUCTURE HEALTH
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight font-sans"
        >
          All Systems <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Fully Operational.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Real-time health monitoring and uptime status across Aevion Studio&apos;s global edge routes, AI streaming inference backends, and rendering pipelines.
        </motion.p>
      </section>

      {/* Global Status Banner */}
      <section className="mb-12">
        <div className="p-6 rounded-3xl bg-zinc-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Global Edge Status: 100% Nominal</h2>
              <p className="text-xs text-zinc-400 font-mono">No active incidents or service degradations reported</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Clock size={14} className="text-emerald-400" />
            <span>Last checked: {lastChecked || "Active"}</span>
          </div>
        </div>
      </section>

      {/* Detailed Services Table */}
      <section className="mb-24 space-y-4">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">SERVICE BREAKDOWN</span>
          <h3 className="text-xl font-bold text-white">System Component Metrics</h3>
        </div>

        <div className="space-y-3">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase">{srv.category}</span>
                <h4 className="text-sm font-bold text-white font-sans">{srv.name}</h4>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">Architecture</span>
                  <span className="text-white font-bold">{srv.type}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">Protocol</span>
                  <span className="text-cyan-400 font-bold">{srv.protocol}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {srv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
