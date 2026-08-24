"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sliders, Sparkles, Cpu, Eye, Activity } from "lucide-react";
import MoltenMetal from "@/components/ui/MoltenMetal";

export default function MoltenMetalPage() {
  const [speed, setSpeed] = useState(0.35);
  const [glow, setGlow] = useState(1.6);
  const [colorMode, setColorMode] = useState<"molten" | "ember" | "frost">("molten");
  const [grain, setGrain] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO 3D PLAYGROUND</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full">
          <Sliders size={13} />
          <span>EXPERIMENT 04 // OGL CAUSTIC DOMAIN FOLDING</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            OGL Caustic <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Domain Shader</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            WebGL 2.0 fragment shader performing procedural domain-folding raymarching, liquid metal reflections, and mouse disturbance caustics.
          </p>
        </div>

        {/* Shader Parameter HUD */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-zinc-950/80 border border-white/10 text-xs font-mono backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">SPEED:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20 accent-emerald-500 cursor-pointer"
            />
            <span className="text-emerald-400 font-bold tabular-nums">{speed}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">GLOW:</span>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.1"
              value={glow}
              onChange={(e) => setGlow(parseFloat(e.target.value))}
              className="w-16 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 font-bold tabular-nums">{glow}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/5">
            {(["molten", "frost", "ember"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setColorMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  colorMode === mode ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20" : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[680px] rounded-3xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-xl mb-12">
        <MoltenMetal
          color1={colorMode === "frost" ? "#031d28" : colorMode === "ember" ? "#2a0800" : "#022c22"}
          color2={colorMode === "frost" ? "#06b6d4" : colorMode === "ember" ? "#ea580c" : "#10b981"}
          color3={colorMode === "frost" ? "#e0f2fe" : colorMode === "ember" ? "#fef08a" : "#6ee7b7"}
          speed={speed}
          scale={3.8}
          detail={3}
          glow={glow}
          coreSize={0.08}
          swirl={0.8}
          fold={-0.2}
          blackPoint={0.06}
          brightness={1.2}
          colorMode={colorMode}
          grain={grain}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1.0}
          className="w-full h-full"
        />
        <div className="absolute top-4 left-6 z-20 pointer-events-none text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          ● DRAG / MOVE CURSOR TO DISTURB CAUSTIC SURFACE
        </div>
      </div>

      {/* Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Cpu size={14} /> GLSL DOMAIN FOLDING
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Transforms coordinate space iteratively using sign, absolute value, and trigonometric matrices to produce infinite metallic folds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> OGL LIGHTWEIGHT RUNTIME
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Constructed with minimal <code className="text-white">ogl</code> WebGL 2.0 pipeline: less than 12KB bundle with zero garbage collector overhead.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <Activity size={14} /> CURSOR ENERGY TRANSFER
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Pointer velocity coordinates inject exponential vorticity turbulence uniforms into the fragment compute pass.
          </p>
        </div>
      </div>
    </main>
  );
}
