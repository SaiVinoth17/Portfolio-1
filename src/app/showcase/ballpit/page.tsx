"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Sliders, RefreshCw, Zap, ShieldCheck } from "lucide-react";
import Ballpit from "@/components/ui/Ballpit";

export default function BallpitPage() {
  const [count, setCount] = useState(250);
  const [gravity, setGravity] = useState(0.45);
  const [friction, setFriction] = useState(0.88);
  const [wallBounce, setWallBounce] = useState(0.95);
  const [remountKey, setRemountKey] = useState(0);

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

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <Cpu size={13} />
          <span>EXPERIMENT 03 // THREE.JS INSTANCED PHYSICS</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Three.js <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Instanced Ballpit</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Real-time rigid body collision simulator with 250+ instanced 3D spheres, cursor kinetic gravity fields, and restitution bounce physics.
          </p>
        </div>

        {/* Physics Parameter Controls */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-zinc-950/80 border border-white/10 text-xs font-mono backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">SPHERES:</span>
            <input
              type="range"
              min="50"
              max="400"
              step="25"
              value={count}
              onChange={(e) => {
                setCount(parseInt(e.target.value));
                setRemountKey((k) => k + 1);
              }}
              className="w-20 accent-emerald-500 cursor-pointer"
            />
            <span className="text-emerald-400 font-bold tabular-nums">{count}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">GRAVITY:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-16 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 font-bold tabular-nums">{gravity}</span>
          </div>

          <button
            onClick={() => setRemountKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 border border-white/10 text-[11px] font-bold text-zinc-300 hover:text-white hover:border-emerald-500/40 transition-all cursor-pointer"
          >
            <RefreshCw size={12} />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[680px] rounded-3xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-xl mb-12">
        <Ballpit
          key={remountKey}
          count={count}
          gravity={gravity}
          friction={friction}
          wallBounce={wallBounce}
          followCursor={true}
          colors={[0x10b981, 0x14b8a6, 0x06b6d4, 0x3b82f6]}
        />
        <div className="absolute top-4 left-6 z-20 pointer-events-none text-[11px] font-mono text-zinc-500 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          ● MOVE CURSOR TO REPULSE SPHERES
        </div>
      </div>

      {/* Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Cpu size={14} /> INSTANCEDMESH RENDERING
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Single draw-call architecture using <code className="text-white">THREE.InstancedMesh</code> to draw hundreds of physical spheres in a single GPU pass.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Zap size={14} /> REPELLER FORCE VECTOR
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Pointer raycaster projects cursor coordinates into 3D world space to apply inverse-square impulse forces on neighboring spheres.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} /> BOUNDING CONSTRAINTS
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            3D bounding AABB frustum collisions with velocity damping and customizable wall restitution coefficients.
          </p>
        </div>
      </div>
    </main>
  );
}
