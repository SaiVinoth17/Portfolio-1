"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DepthCarousel from "@/components/DepthCarousel";
import { LabExperiment } from "@/lib/data/labExperiments";
import { ArrowRight, Cpu, Sparkles, Sliders, Layers } from "lucide-react";

interface LabDepthShowcaseProps {
  experiments: LabExperiment[];
}

export default function LabDepthShowcase({ experiments }: LabDepthShowcaseProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // Focus on the core 7 experiments for the cinematic 3D depth stack
  const displayExperiments = experiments.slice(0, 7);
  const activeExp = displayExperiments[activeIndex] || displayExperiments[0];

  const carouselItems = displayExperiments.map((exp) => ({
    image: exp.image,
    alt: exp.title,
    title: exp.title,
    slug: exp.slug,
    category: exp.category,
  }));

  return (
    <section className="relative w-full py-12 rounded-3xl bg-zinc-950/70 border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <div className="px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Sparkles size={13} />
            <span>3D Spatial Depth Inspection Rail</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
            CORE R&amp;D EXPERIMENTS CONTINUUM
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            EXP {(activeIndex + 1).toString().padStart(2, "0")} / {displayExperiments.length.toString().padStart(2, "0")}
          </span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-400">DRAG OR USE ARROWS</span>
        </div>
      </div>

      {/* Main Grid: 3D Depth Carousel Stage + Live Telemetry HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-12 items-center">
        {/* Left Column: 3D Depth Carousel Stage */}
        <div className="lg:col-span-7 h-[460px] sm:h-[500px] w-full relative flex items-center justify-center">
          <DepthCarousel
            items={carouselItems}
            cardWidth={290}
            cardHeight={390}
            radius={20}
            depth={220}
            spread={95}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.22}
            blur={6}
            tint="#05060a"
            autoplay={true}
            autoplayDelay={3600}
            loop={true}
            showControls={true}
            showIndicators={true}
            onChange={(idx) => setActiveIndex(idx)}
            onItemClick={(idx, item) => {
              if (item.slug) {
                router.push(`/lab/${item.slug}`);
              }
            }}
            className="w-full h-full"
          />
        </div>

        {/* Right Column: Live Telemetry & Quick Launch Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 font-mono">
          <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                {activeExp.category}
              </span>
              <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                <Cpu size={12} className="text-cyan-400" />
                {activeExp.renderer}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono leading-tight">
                {activeExp.title}
              </h3>
              <p className="text-xs text-purple-300 font-mono">
                {activeExp.subtitle}
              </p>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                {activeExp.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Sliders size={11} className="text-purple-400" /> STATUS
                </span>
                <span className="text-emerald-400 font-semibold">{activeExp.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Layers size={11} className="text-emerald-400" /> MOBILE
                </span>
                <span className="text-zinc-300">{activeExp.mobileSupport}</span>
              </div>
            </div>

            <Link
              href={`/lab/${activeExp.slug}`}
              className="mt-4 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 hover:opacity-95 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-purple-500/25"
            >
              <span>ENTER INTERACTIVE EXPERIMENT</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="px-4 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>AEVION HIGH-THROUGHPUT GRAPHICS MATRIX</span>
            <span className="text-zinc-400">GPU SHADER PASS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
