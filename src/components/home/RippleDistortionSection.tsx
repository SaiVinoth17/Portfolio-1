"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Sparkles,
  Sliders,
  Maximize2,
  RefreshCw,
  Zap,
  Layers,
  ArrowUpRight,
  Eye,
  Activity,
  Palette,
  Droplets
} from "lucide-react";
import Link from "next/link";
import RippleDistortion from "@/components/RippleDistortion";

const PRESET_IMAGES = [
  {
    id: "cyber-city",
    name: "Cybernetic Nexus",
    category: "Futuristic Urban",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    tint: "#10b981",
  },
  {
    id: "abstract-mesh",
    name: "Liquid Topography",
    category: "Dark Matter",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    tint: "#06b6d4",
  },
  {
    id: "quantum-core",
    name: "Quantum Obsidian",
    category: "Deep Tech",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop",
    tint: "#a855f7",
  },
  {
    id: "hyper-speed",
    name: "Hyper-Light Trail",
    category: "Kinetic Energy",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    tint: "#f59e0b",
  },
];

const COLOR_PALETTES = [
  { name: "Emerald Cyber", hex: "#10b981" },
  { name: "Cyan Plasma", hex: "#06b6d4" },
  { name: "Neon Violet", hex: "#a855f7" },
  { name: "Solar Amber", hex: "#f59e0b" },
  { name: "Rose Pulse", hex: "#f43f5e" },
  { name: "Pure White", hex: "#ffffff" },
];

export default function RippleDistortionSection() {
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0]);
  const [brushSize, setBrushSize] = useState(160);
  const [strength, setStrength] = useState(0.25);
  const [swirl, setSwirl] = useState(1.2);
  const [rings, setRings] = useState(4);
  const [spread, setSpread] = useState(5.5);
  const [fade, setFade] = useState(3.0);
  const [dispersion, setDispersion] = useState(0.08);
  const [glint, setGlint] = useState(0.4);
  const [tint, setTint] = useState(PRESET_IMAGES[0].tint);
  const [tintAmount, setTintAmount] = useState(0.18);
  const [grayscale, setGrayscale] = useState(false);
  const [trigger, setTrigger] = useState<"hover" | "click" | "both">("both");
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium");

  const resetDefaults = () => {
    setBrushSize(160);
    setStrength(0.25);
    setSwirl(1.2);
    setRings(4);
    setSpread(5.5);
    setFade(3.0);
    setDispersion(0.08);
    setGlint(0.4);
    setTint(selectedImage.tint);
    setTintAmount(0.18);
    setGrayscale(false);
    setTrigger("both");
    setQuality("medium");
  };

  return (
    <section id="interactive-lab" className="relative bg-[#020205] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden">
      {/* Laser grid & radial backlights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase">
              <Droplets size={13} className="text-emerald-400 animate-pulse" />
              <span>INTERACTIVE SHADER LABORATORY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white">
              FLUID RIPPLE<br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                DISTORTION MATRIX.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-sm font-mono text-zinc-400 leading-relaxed">
              Powered by high-performance GPU WebGL render targets and instanced wave mechanics. Hover or click anywhere on the canvas below to perturb the liquid surface.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Activity size={13} />
                <span>OGL RENDER TARGETS // 120 FPS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Canvas Viewport (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl border border-white/15 bg-zinc-950/80 p-2 sm:p-3 overflow-hidden shadow-2xl backdrop-blur-xl group">
              {/* Telemetry Bar Header */}
              <div className="flex items-center justify-between px-4 py-2.5 mb-2 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold tracking-wider uppercase text-[11px] text-white">
                    LIVE SHADER SURFACE
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                  <span className="hidden sm:inline">TRIGGER: <strong className="text-emerald-400 uppercase">{trigger}</strong></span>
                  <span>•</span>
                  <span>{selectedImage.name}</span>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden cursor-crosshair border border-white/10 bg-black">
                <RippleDistortion
                  src={selectedImage.url}
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
                  quality={quality}
                  className="w-full h-full"
                />

                {/* Ambient UI Overlay on Viewport */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-300">
                    MOVE MOUSE OR CLICK TO DISTORT
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-emerald-400">
                    GLSL WAVE DISPLACEMENT
                  </div>
                </div>
              </div>

              {/* Preset Selector Under Canvas */}
              <div className="pt-3 px-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Select Texture:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((img) => {
                    const isSelected = selectedImage.id === img.id;
                    return (
                      <button
                        key={img.id}
                        onClick={() => {
                          setSelectedImage(img);
                          setTint(img.tint);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-white text-black font-bold shadow-lg shadow-white/10 scale-105"
                            : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: img.tint }}
                        />
                        <span>{img.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Controller Matrix (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#08080f]/90 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-emerald-400" />
                  <span className="text-sm font-mono font-bold tracking-wider text-white uppercase">
                    SHADER PARAMETERS
                  </span>
                </div>

                <button
                  onClick={resetDefaults}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white transition-all"
                  title="Reset to default shader values"
                >
                  <RefreshCw size={12} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Sliders */}
              <div className="space-y-4 text-xs font-mono">
                {/* Strength */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Displacement Strength</span>
                    <span className="text-emerald-400 font-bold">{strength.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.01"
                    value={strength}
                    onChange={(e) => setStrength(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>

                {/* Swirl */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Vorticity / Swirl</span>
                    <span className="text-cyan-400 font-bold">{swirl.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={swirl}
                    onChange={(e) => setSwirl(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>

                {/* Brush Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Brush Radius (px)</span>
                    <span className="text-zinc-200 font-bold">{brushSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="5"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full accent-zinc-300 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>

                {/* Rings */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Concentric Swells (Rings)</span>
                    <span className="text-purple-400 font-bold">{rings}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={rings}
                    onChange={(e) => setRings(parseInt(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>

                {/* Dispersion */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Chromatic Dispersion</span>
                    <span className="text-pink-400 font-bold">{dispersion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={dispersion}
                    onChange={(e) => setDispersion(parseFloat(e.target.value))}
                    className="w-full accent-pink-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>

                {/* Glint Sheen */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span>Specular Glint Sheen</span>
                    <span className="text-amber-400 font-bold">{glint.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={glint}
                    onChange={(e) => setGlint(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Tint Color Selector */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Palette size={13} className="text-zinc-400" />
                    <span>Distortion Tint Color:</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">{tint}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PALETTES.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setTint(c.hex)}
                      className={`w-7 h-7 rounded-lg border transition-all ${
                        tint.toLowerCase() === c.hex.toLowerCase()
                          ? "border-white scale-110 shadow-md ring-2 ring-white/20"
                          : "border-white/20 hover:border-white/60 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Trigger Mode & Grayscale Toggle */}
              <div className="pt-2 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300">Trigger Interaction:</span>
                  <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
                    {(["hover", "click", "both"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setTrigger(mode)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono transition-all ${
                          trigger === mode
                            ? "bg-white text-black font-bold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300">Drain Color (Grayscale):</span>
                  <button
                    onClick={() => setGrayscale(!grayscale)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all ${
                      grayscale
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-white/5 border-white/10 text-zinc-400"
                    }`}
                  >
                    {grayscale ? "ON (Monochrome)" : "OFF (Full Color)"}
                  </button>
                </div>
              </div>

              {/* Link to Full Showcase Sandbox */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  REACT BITS // OGL ENGINE
                </span>
                <Link
                  href="/showcase/ripple-distortion"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold transition-all hover:scale-105"
                >
                  <span>Full Screen Sandbox</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
