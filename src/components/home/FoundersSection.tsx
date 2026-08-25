"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Cpu, Layers, Sparkles, Network, Code2, Terminal, Activity } from "lucide-react";
import Link from "next/link";

interface FounderData {
  id: string;
  name: string;
  role: string;
  title: string;
  tagline: string;
  focus: string[];
  philosophy: string;
  specialties: string[];
  github?: string;
  accentColor: string;
  gradient: string;
  nodeIndex: string;
}

const FOUNDERS: FounderData[] = [
  {
    id: "sai-rio",
    name: "SAI RIO",
    role: "FOUNDER",
    title: "Product • Engineering • AI • Systems • Vision",
    tagline: "Architecting autonomous intelligence and high-velocity systems.",
    focus: [
      "Product Strategy",
      "AI Systems Architecture",
      "Next.js 16 Frameworks",
      "Vector & RAG Pipelines",
      "Foundational Vision",
    ],
    philosophy:
      "Software should be an extension of human will. We eliminate unnecessary friction until only raw performance, intelligence, and clarity remain.",
    specialties: ["Autonomous Agents", "Groq / LLM Streaming", "Distributed Architecture", "System Design"],
    github: "https://github.com/aevionstudio",
    accentColor: "#34d399",
    gradient: "from-emerald-400 to-teal-500",
    nodeIndex: "NODE_01 // ALPHA",
  },
  {
    id: "edison",
    name: "EDISON",
    role: "FOUNDER",
    title: "Development • Technology • Engineering • Building",
    tagline: "Engineering resilient infrastructure and high-throughput software.",
    focus: [
      "Core Software Development",
      "Advanced Web Technologies",
      "High-Throughput Engineering",
      "Interactive Graphics",
      "Production Building",
    ],
    philosophy:
      "True craftsmanship lies in the invisible layers. When every byte is optimized and every transition is calculated, software becomes unforgettable.",
    specialties: ["Full-Stack Engineering", "WebGL Shaders", "High-Concurrency State", "Edge Optimization"],
    github: "https://github.com/edisonedi84431-art",
    accentColor: "#22d3ee",
    gradient: "from-cyan-400 to-blue-500",
    nodeIndex: "NODE_02 // BETA",
  },
];

export default function FoundersSection() {
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);

  return (
    <section id="founders" className="relative bg-[#06060a] text-white py-28 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400">
              <Network size={13} />
              <span>CO-FOUNDERS ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white">
              THE PEOPLE<br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                BEHIND AEVION.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-zinc-400 leading-relaxed">
              Two equal co-founders with a shared conviction. Blending foundational product vision, deep engineering discipline, and cutting-edge artificial intelligence.
            </p>
            <div className="mt-3 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <Activity size={12} className="animate-pulse" />
              <span>&ldquo;Two builders. One vision. Technology without limits.&rdquo;</span>
            </div>
          </div>
        </div>

        {/* Central Convergence Circuit visualization */}
        <div className="relative py-4 hidden md:block">
          <div className="h-px w-full bg-gradient-to-r from-emerald-500/30 via-white/40 to-cyan-500/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#06060a] border border-white/20 text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AEVION DUAL-NEXUS CORE</span>
          </div>
        </div>

        {/* Equal Founders Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FOUNDERS.map((founder, idx) => {
            const isHovered = hoveredFounder === founder.id;

            return (
              <motion.div
                key={founder.id}
                onMouseEnter={() => setHoveredFounder(founder.id)}
                onMouseLeave={() => setHoveredFounder(null)}
                className="relative rounded-3xl border transition-all duration-500 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group"
                style={{
                  borderColor: isHovered ? founder.accentColor : "rgba(255, 255, 255, 0.1)",
                  background: isHovered
                    ? `radial-gradient(ellipse at top left, ${founder.accentColor}10 0%, #090910 80%)`
                    : "#08080e",
                  boxShadow: isHovered ? `0 20px 60px -15px ${founder.accentColor}25` : "none",
                }}
              >
                {/* Accent top-corner line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${founder.accentColor}, transparent)`,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />

                <div className="space-y-6">
                  {/* Card Header Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-zinc-500 font-bold mb-1">
                        {founder.nodeIndex}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                        {founder.name}
                      </h3>
                      <div
                        className="inline-block mt-1 text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md"
                        style={{
                          background: `${founder.accentColor}18`,
                          color: founder.accentColor,
                          border: `1px solid ${founder.accentColor}30`,
                        }}
                      >
                        {founder.role}
                      </div>
                    </div>

                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono"
                        title={`${founder.name} GitHub Profile`}
                      >
                        <Github size={16} />
                        <span className="hidden sm:inline">GitHub</span>
                        <ArrowUpRight size={13} className="text-zinc-500" />
                      </a>
                    )}
                  </div>

                  {/* Core Title / Focus Domain */}
                  <div className="pt-2 border-t border-white/5">
                    <div className="text-xs font-mono text-zinc-400 font-medium">
                      FOCUS DOMAIN:
                    </div>
                    <div className="text-sm font-semibold text-zinc-200 mt-1 font-mono">
                      {founder.title}
                    </div>
                  </div>

                  {/* Short Philosophy Quote */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                      <Sparkles size={11} style={{ color: founder.accentColor }} />
                      <span>Philosophy</span>
                    </div>
                    <blockquote className="text-sm text-zinc-300 italic leading-relaxed">
                      &ldquo;{founder.philosophy}&rdquo;
                    </blockquote>
                  </div>

                  {/* Focus Areas Pills */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Discipline &amp; Leadership
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {founder.focus.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Specialties Footer */}
                <div className="pt-6 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {founder.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md text-zinc-400 bg-white/[0.02]"
                      >
                        • {spec}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono" style={{ color: founder.accentColor }}>
                    ACTIVE BUILDER →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mutual Collaboration Banner */}
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              UNIFIED STUDIO MANIFESTO
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              Every project is personally architected and engineered by Sai Rio and Edison.
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Zero outsourced middlemen. Zero generic templates. Direct builder-to-builder collaboration.
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Start A Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
