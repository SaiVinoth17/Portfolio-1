"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Cpu, Zap, Globe, Shield, Terminal, Database, ArrowUpRight, Activity } from "lucide-react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

const LAB_MODULES = [
  {
    id: "ai-systems",
    icon: Cpu,
    title: "Autonomous AI Pipelines",
    category: "INTELLIGENCE",
    summary:
      "Contextual RAG vectors, sub-100ms streaming LLM pipelines, autonomous multi-step reasoning agents, and semantic classification.",
    metrics: "< 50ms Streaming Latency",
    color: "#34d399",
  },
  {
    id: "gpu-shaders",
    icon: Zap,
    title: "GPU WebGL Shaders",
    category: "GRAPHICS",
    summary:
      "Bespoke Three.js & OGL vertex/fragment shaders, procedural particles, glass refractions, and liquid physics rendering seamlessly at native refresh rates.",
    metrics: "120 FPS Framerate Lock",
    color: "#38bdf8",
  },
  {
    id: "edge-infra",
    icon: Globe,
    title: "Global Edge Infrastructure",
    category: "DISTRIBUTED",
    summary:
      "Serverless edge runtimes, geo-distributed data caching, instant cold starts, and asset pipeline optimization across global CDNs.",
    metrics: "< 24ms Cold Start",
    color: "#f59e0b",
  },
  {
    id: "realtime-sync",
    icon: Database,
    title: "Real-Time WebSocket Sync",
    category: "NETWORKING",
    summary:
      "Bi-directional multiplayer state synchronization, collaborative canvas sessions, and pub/sub message brokering with zero dropped packets.",
    metrics: "< 15ms Socket Roundtrip",
    color: "#a78bfa",
  },
  {
    id: "type-safety",
    icon: Terminal,
    title: "Strict TypeScript Architecture",
    category: "COMPILER",
    summary:
      "Zero-compromise static typing, comprehensive schema validation with Zod, modular monorepos, and clean domain-driven separation of concerns.",
    metrics: "100% Strict Type Coverage",
    color: "#fb7185",
  },
  {
    id: "cryptographic-sec",
    icon: Shield,
    title: "Hardened Security Models",
    category: "PROTECTION",
    summary:
      "Granular Row Level Security (RLS), cryptographically signed payloads, rate limiting, and zero-trust perimeter defense.",
    metrics: "Enterprise Security Tier",
    color: "#2dd4bf",
  },
];

export default function CapabilitiesSection() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      // Header
      gsap.fromTo(
        ".cap-header-elem",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".cap-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cards Grid
      gsap.fromTo(
        ".capability-card",
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#040407] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Header */}
        <div className="cap-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="cap-header-elem inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
              <Activity size={13} />
              <span>EXPERIMENTAL LAB &amp; CAPABILITIES</span>
            </div>
            <h2 className="cap-header-elem text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white">
              DEEP SYSTEMS
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                ENGINEERING MATRIX.
              </span>
            </h2>
          </div>

          <div className="cap-header-elem max-w-md">
            <p className="text-sm font-mono text-zinc-400 leading-relaxed">
              We operate at the convergence of heavy backend distributed logic and high-fidelity
              creative frontend execution.
            </p>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isHovered = hoveredModule === mod.id;

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHoveredModule(mod.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className="capability-card p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group"
                style={{
                  borderColor: isHovered ? mod.color : "rgba(255, 255, 255, 0.08)",
                  background: isHovered
                    ? `radial-gradient(circle at top left, ${mod.color}08, #07070d 80%)`
                    : "#06060c",
                  boxShadow: isHovered ? `0 15px 40px -15px ${mod.color}20` : "none",
                }}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div
                      className="p-3 rounded-2xl border"
                      style={{
                        borderColor: `${mod.color}30`,
                        background: `${mod.color}10`,
                      }}
                    >
                      <Icon size={20} style={{ color: mod.color }} />
                    </div>

                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      {mod.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-zinc-100">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {mod.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold" style={{ color: mod.color }}>
                    {mod.metrics}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
