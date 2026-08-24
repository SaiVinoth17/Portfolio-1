"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Sliders, RefreshCw, Cpu, Layers } from "lucide-react";
import DriftWall from "@/components/ui/DriftWall";

export default function DriftWallPage() {
  const [speed, setSpeed] = useState(42);
  const [tilt, setTilt] = useState(16);
  const [turn, setTurn] = useState(-14);
  const [direction, setDirection] = useState<"up" | "down">("up");

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO 3D PLAYGROUND</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full">
          <Activity size={13} />
          <span>EXPERIMENT 02 // 3D PARALLAX DRIFT MATRIX</span>
        </div>
      </div>

      {/* Header & Interactive HUD Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            3D Parallax <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Drift Matrix</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Multi-layered infinite parallax wall with real-time cursor velocity lift, depth displacement, and momentum friction physics.
          </p>
        </div>

        {/* Real-Time Parameter Bar */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-zinc-950/80 border border-white/10 text-xs font-mono backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">SPEED:</span>
            <input
              type="range"
              min="10"
              max="90"
              step="2"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 font-bold tabular-nums">{speed}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">TILT:</span>
            <input
              type="range"
              min="0"
              max="35"
              step="1"
              value={tilt}
              onChange={(e) => setTilt(parseFloat(e.target.value))}
              className="w-16 accent-emerald-400 cursor-pointer"
            />
            <span className="text-emerald-400 font-bold tabular-nums">{tilt}°</span>
          </div>

          <button
            onClick={() => setDirection(direction === "up" ? "down" : "up")}
            className="px-3 py-1 rounded-xl bg-zinc-900 border border-white/10 text-[11px] font-bold text-white hover:border-cyan-500/40 transition-colors uppercase"
          >
            DIR: {direction}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[680px] rounded-3xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-xl mb-12">
        <DriftWall
          columns={6}
          tileWidth={230}
          tileHeight={145}
          gap={20}
          tilt={tilt}
          turn={turn}
          perspective={1200}
          depth={130}
          speed={speed}
          direction={direction}
          variance={0.45}
          parallax={0.65}
          lift={70}
          fade={0.6}
          dim={0.6}
          overlayColor="#020806"
        />
      </div>

      {/* Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Activity size={14} /> KINETIC LIFT ALGORITHM
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Hovered tiles calculate inverse distance vectors to translate Z-axis depth by <code className="text-white">70px</code> with cubic-bezier easing.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Cpu size={14} /> CSS 3D HARDWARE PIPELINE
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            6 staggered column matrices rendered on isolated GPU composition layers with infinite seamless wrap arithmetic.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <Layers size={14} /> FRAME STABILITY
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Maintains stable 120 FPS render loops with zero memory allocation inside the requestAnimationFrame step.
          </p>
        </div>
      </div>
    </main>
  );
}
