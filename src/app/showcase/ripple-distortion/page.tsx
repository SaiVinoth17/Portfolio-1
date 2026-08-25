"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sliders, Sparkles, Cpu, Eye, Activity, Droplets, RefreshCw, Palette } from "lucide-react";
import RippleDistortion from "@/components/ui/RippleDistortion";

const PRESET_TEXTURES = [
  {
    id: "cyber",
    name: "Cyber City",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    tint: "#10b981",
  },
  {
    id: "liquid",
    name: "Liquid Texture",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    tint: "#06b6d4",
  },
  {
    id: "obsidian",
    name: "Obsidian Core",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop",
    tint: "#a855f7",
  },
  {
    id: "nebula",
    name: "Cosmic Nebula",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    tint: "#f59e0b",
  },
];

export default function RippleDistortionPage() {
  const [activeTexture, setActiveTexture] = useState(PRESET_TEXTURES[0]);
  const [brushSize, setBrushSize] = useState(160);
  const [strength, setStrength] = useState(0.25);
  const [swirl, setSwirl] = useState(1.2);
  const [rings, setRings] = useState(4);
  const [spread, setSpread] = useState(5.0);
  const [fade, setFade] = useState(3.0);
  const [dispersion, setDispersion] = useState(0.1);
  const [glint, setGlint] = useState(0.35);
  const [tint, setTint] = useState(PRESET_TEXTURES[0].tint);
  const [tintAmount, setTintAmount] = useState(0.18);
  const [grayscale, setGrayscale] = useState(false);
  const [trigger, setTrigger] = useState<"hover" | "click" | "both">("both");

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
          <Droplets size={13} />
          <span>EXPERIMENT 06 // OGL RIPPLE DISTORTION SHADER</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Fluid Ripple <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Distortion</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Multi-wave WebGL displacement buffer simulated with instanced geometries, chromatic dispersion, and normal-mapped glint specular shading.
          </p>
        </div>

        {/* Quick Texture Selector */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-zinc-950/80 border border-white/10 text-xs font-mono backdrop-blur-xl">
          {PRESET_TEXTURES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTexture(t);
                setTint(t.tint);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTexture.id === t.id
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[620px] rounded-3xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-xl mb-12">
        <RippleDistortion
          src={activeTexture.url}
          brushSize={brushSize}
          strength={strength}
          swirl={swirl}
          rings={rings}
          spread={spread}
          fade={fade}
          dispersion={dispersion}
          glint={glint}
          tint={tint}
          tintAmount={tintAmount}
          grayscale={grayscale}
          trigger={trigger}
          quality="medium"
          className="w-full h-full"
        />

        <div className="absolute top-4 left-6 z-20 pointer-events-none text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>HOVER OR CLICK ON CANVAS TO GENERATE INTERFERENCE WAVES</span>
        </div>

        {/* Floating Quick Sliders HUD */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-4 bg-black/75 border border-white/15 backdrop-blur-xl p-3.5 rounded-2xl text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">STRENGTH:</span>
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.02"
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="w-20 accent-emerald-400 cursor-pointer"
            />
            <span className="text-emerald-400 font-bold">{strength.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">SWIRL:</span>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={swirl}
              onChange={(e) => setSwirl(parseFloat(e.target.value))}
              className="w-16 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 font-bold">{swirl.toFixed(1)}</span>
          </div>

          <button
            onClick={() => setGrayscale(!grayscale)}
            className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold border transition-all ${
              grayscale
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                : "border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            {grayscale ? "MONO" : "COLOR"}
          </button>
        </div>
      </div>

      {/* Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Droplets size={14} /> INSTANCED WAVE GEOMETRY
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            GPU instances up to 100 concurrent wave displacement fields simultaneously rendered into a low-overhead offscreen texture target.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Cpu size={14} /> CHROMATIC REFRACTION
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Per-pixel shader split samples red and blue color channels across the disturbance gradient vectors for optical dispersion.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <Activity size={14} /> SPECULAR SHEEN &amp; GLINT
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Calculates dynamic normal vectors on the displacement slope to reflect virtual lighting sources along wave ridges.
          </p>
        </div>
      </div>
    </main>
  );
}
