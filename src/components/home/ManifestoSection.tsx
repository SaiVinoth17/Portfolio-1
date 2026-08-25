"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Cpu, Zap, Shield, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";

const PRINCIPLES = [
  {
    num: "01",
    title: "Autonomous Intelligence",
    summary:
      "We build beyond simple API wrappers. Our focus is autonomous reasoning, contextual vector retrieval, streaming pipelines, and neural decision engines that compound value.",
    icon: Cpu,
    tag: "AI & REASONING",
  },
  {
    num: "02",
    title: "Kinetic Engineering",
    summary:
      "Fluid 120 FPS motion, GPU shaders, and tactile micro-physics are not decorative afterthoughts. They communicate system state, reduce cognitive load, and turn software into an extension of thought.",
    icon: Zap,
    tag: "120 FPS / WEBGL",
  },
  {
    num: "03",
    title: "Zero-Compromise Scalability",
    summary:
      "Clean TypeScript architecture, strict type boundaries, edge-native cold starts, and distributed database models. We build infrastructure that survives real-world chaos.",
    icon: Terminal,
    tag: "SYSTEMS ARCHITECTURE",
  },
  {
    num: "04",
    title: "Founder-Direct Execution",
    summary:
      "No agency bloat, no account managers, and no handoffs. Sai Rio and Edison personally architect and write the code for every system that bears the Aevion name.",
    icon: Code2,
    tag: "DIRECT CRAFTSMANSHIP",
  },
];

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="relative bg-[#030306] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden">
      {/* Laser grid accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Top Manifesto Title */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles size={12} /> The Aevion Manifesto
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.02] text-white">
            AEVION EXISTS TO TURN<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AMBITIOUS IDEAS INTO REAL TECHNOLOGY.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
            We don&apos;t build generic websites, copy startup trends, or assemble template stacks. We operate as an elite experimental laboratory and software foundry for founders and forward-thinking enterprises.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-black text-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>DISCIPLINE VERIFIED</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Laboratory Quote Block */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-black to-cyan-950/20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              LABORATORY EXPERIMENTATION
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              Pushing the boundaries of what browser engines can do.
            </div>
            <p className="text-sm text-zinc-400 font-mono">
              From WebGL shaders to sub-50ms AI streaming architectures, we test new frontiers before they become industry standards.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/showcase"
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Explore 3D Lab
            </Link>
            <Link
              href="/tech-stack"
              className="px-6 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              Full Stack Specs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
