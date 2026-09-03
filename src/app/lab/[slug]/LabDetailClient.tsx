"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Cpu, Activity, Sparkles, Layers, Sliders } from "lucide-react";
import { LabExperiment } from "@/lib/data/labExperiments";

// Dynamic imports with ssr: false to guarantee clean client-side WebGL hydration
const ThreeMasterShowcase = dynamic(
  () => import("@/components/ui/ThreeMasterShowcase"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const MacBookNeoDemo = dynamic(
  () => import("@/components/ui/mac-book-neo-hero-demo"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const MoltenMetal = dynamic(
  () => import("@/components/ui/MoltenMetal"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const ScrollMorphHero = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const Ballpit = dynamic(
  () => import("@/components/ui/Ballpit"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const DriftWall = dynamic(
  () => import("@/components/ui/DriftWall"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const RippleDistortion = dynamic(
  () => import("@/components/ui/RippleDistortion"),
  { ssr: false, loading: () => <CanvasLoader /> }
);
const ClickSparkLab = dynamic(
  () => import("@/components/ui/ClickSparkLab"),
  { ssr: false, loading: () => <CanvasLoader /> }
);

function CanvasLoader() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
      <span>INITIALIZING SHADER BUFFERS...</span>
    </div>
  );
}

export default function LabDetailClient({ experiment }: { experiment: LabExperiment }) {
  const renderInteractiveCanvas = () => {
    switch (experiment.slug) {
      case "threejs-master":
        return <ThreeMasterShowcase />;
      case "macbook-neo":
        return <MacBookNeoDemo />;
      case "molten-metal":
        return (
          <div className="w-full h-[70vh] relative overflow-hidden bg-black flex items-center justify-center">
            <MoltenMetal />
          </div>
        );
      case "scroll-morph":
        return <ScrollMorphHero />;
      case "ballpit":
        return (
          <div className="w-full h-[70vh] relative overflow-hidden bg-black flex items-center justify-center">
            <Ballpit />
          </div>
        );
      case "drift-wall":
        return (
          <div className="w-full h-[70vh] relative overflow-hidden bg-black flex items-center justify-center">
            <DriftWall />
          </div>
        );
      case "ripple-distortion":
        return (
          <div className="w-full h-[70vh] relative overflow-hidden bg-black flex items-center justify-center">
            <RippleDistortion />
          </div>
        );
      case "click-spark":
        return <ClickSparkLab />;
      default:
        return <CanvasLoader />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Top Header Bar */}
      <header className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> Return to Lab Index
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold font-mono text-white">
              {experiment.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              {experiment.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">{experiment.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs text-zinc-400">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <Activity size={13} className="animate-pulse" /> {experiment.status}
          </span>
          <span>·</span>
          <span>{experiment.renderer}</span>
        </div>
      </header>

      {/* Interactive Experience Canvas Stage */}
      <section aria-label="Interactive Canvas" className="w-full relative border-y border-white/10 bg-zinc-950">
        {renderInteractiveCanvas()}
      </section>

      {/* Technical Specifications & Controls Footer */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-24 space-y-8 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={13} className="text-purple-400" /> INTERACTIVE CONTROLS
            </div>
            <ul className="space-y-1.5 text-zinc-300 text-[11px]">
              {experiment.controls.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400">▸</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={13} className="text-cyan-400" /> PERFORMANCE PROFILE
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              {experiment.performanceProfile}
            </p>
            <div className="text-[10px] text-emerald-400">
              Mobile Support: {experiment.mobileSupport}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={13} className="text-emerald-400" /> ARCHITECTURAL NOTES
            </div>
            <ul className="space-y-1.5 text-zinc-300 text-[11px]">
              {experiment.technicalDetails.map((td, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>{td}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
