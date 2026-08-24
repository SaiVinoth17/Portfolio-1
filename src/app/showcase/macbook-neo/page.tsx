"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Laptop, Cpu, Layers, Sparkles } from "lucide-react";
import MacBookNeoHeroDemo from "@/components/ui/mac-book-neo-hero-demo";

export default function MacBookNeoPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-500 selection:text-black">
      {/* Fullscreen Frame Sequence Stage */}
      <MacBookNeoHeroDemo />

      {/* Bottom Technical Specifications Footer */}
      <section className="bg-zinc-950 border-t border-white/10 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Laptop size={14} />
            <span>HARDWARE ARCHITECTURE SPECIFICATION // MACBOOK NEO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-2">
              <div className="text-zinc-500">FRAME PIPELINE</div>
              <div className="text-xl font-bold text-white">941 High-Res Frames</div>
              <p className="text-zinc-400 font-sans">
                Asynchronously preloaded WebP/JPG sequence cached directly in browser memory with requestAnimationFrame smoothing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-2">
              <div className="text-zinc-500">SCROLL INTERPOLATION</div>
              <div className="text-xl font-bold text-emerald-400">Damped Easing (0.28)</div>
              <p className="text-zinc-400 font-sans">
                Continuous velocity interpolation guarantees buttery frame transitions even during rapid wheel scrubs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-2">
              <div className="text-zinc-500">DYNAMIC STEP MATRIX</div>
              <div className="text-xl font-bold text-cyan-400">4 Architecture Callouts</div>
              <p className="text-zinc-400 font-sans">
                Progressive opacity transitions with real-time horizontal progress tick indicators and dynamic brand color tokens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-2">
              <div className="text-zinc-500">RENDER TARGET</div>
              <div className="text-xl font-bold text-purple-400">Pinned 100vh Viewport</div>
              <p className="text-zinc-400 font-sans">
                Stage remains locked in place while the virtual 600vh scroll container drives the complete timeline progression.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
