"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Layers, Cpu, Compass, Maximize2 } from "lucide-react";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

export default function ScrollMorphPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO 3D PLAYGROUND</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <Layers size={13} />
          <span>EXPERIMENT 01 // VIRTUAL SCROLL MORPH</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          3D Radial <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Scroll Morph</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          An interactive geometric morphing engine that interpolates 20 responsive 3D card matrices across deterministic scatter, linear rail, 360° cylindrical orbit, and hyperbolic rainbow arch layouts.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[720px] rounded-3xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-xl mb-12">
        <IntroAnimation />
      </div>

      {/* Technical Telemetry & Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Cpu size={14} /> MATHEMATICAL INTERPOLATION
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Trigonometric angle mapping: <code className="text-white">θ = (i / N) * 2π</code> with spring-damped smooth rotation and 3D flip card transforms.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Compass size={14} /> SCROLL RANGE MATRIX
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Virtual scroll domain: <code className="text-white">[0, 3000px]</code> with normalized spring velocity tracking and mobile touch delta clamps.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <Maximize2 size={14} /> PERSPECTIVE & RENDER
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            CSS 3D perspective: <code className="text-white">1000px</code> with GPU-accelerated <code className="text-white">preserve-3d</code> card faces.
          </p>
        </div>
      </div>
    </main>
  );
}
