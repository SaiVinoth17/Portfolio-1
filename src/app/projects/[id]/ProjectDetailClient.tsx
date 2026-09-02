"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowLeft,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Radio,
} from "lucide-react";
import Link from "next/link";
import GeoTerrainEngine from "@/components/interactive/GeoTerrainEngine";
import OSDesktop from "@/components/interactive/OSDesktop";

export interface ProjectDetailData {
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  challenges: string;
  lessons: string;
  metrics: string;
  link: string;
  github: string;
  image: string;
  specialType: "travel" | "motion" | "gaming" | "ai-os";
}

export default function ProjectDetailClient({ project }: { project: ProjectDetailData }) {
  return (
    <main className="min-h-screen bg-transparent relative z-10 text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft size={14} /> BACK TO ARCHIVE
        </Link>
      </div>

      {/* Hero Header */}
      <section className="space-y-6 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">ENGINEERING SPECIFICATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight font-sans">
            {project.title}
          </h1>

          <p className="text-zinc-400 max-w-3xl font-mono text-sm">{project.subtitle}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold text-xs rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            Launch Live Demo <ExternalLink size={14} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-2xl hover:border-emerald-500/40 transition-all"
          >
            <Github size={14} /> View Source Code
          </a>
        </div>
      </section>

      {/* Cinematic Banner */}
      <section className="mb-16 rounded-3xl overflow-hidden border border-white/10 relative h-[380px] sm:h-[480px] shadow-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-emerald-400 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-400 animate-pulse" />
            <span>PRODUCTION DEPLOYMENT ACTIVE</span>
          </div>
          <span className="text-white font-bold">{project.metrics}</span>
        </div>
      </section>

      {/* Domain-Specific Interactive Storytelling Hub */}
      <section className="mb-16">
        {project.specialType === "travel" && <GeoTerrainEngine />}
        {project.specialType === "ai-os" && <OSDesktop />}

        {project.specialType === "motion" && (
          <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Zap size={16} /> GPU COMPOSITED MOTION SPECS
              </div>
              <span className="text-xs font-mono text-zinc-400">GSAP 3 + Lenis Momentum</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">FRAME RATE</span>
                <p className="text-emerald-400 font-bold text-sm">Native Refresh Rate (V-Sync)</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">LAYOUT SHIFT (CLS)</span>
                <p className="text-white font-bold text-sm">0.000 (Perfect Zero)</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">ACCELERATION</span>
                <p className="text-cyan-400 font-bold text-sm">GPU Layer Compositing</p>
              </div>
            </div>
          </div>
        )}

        {project.specialType === "gaming" && (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Radio size={16} /> CYBERPUNK HUD TELEMETRY
              </div>
              <span className="text-xs font-mono text-zinc-400">Web Audio API Synth</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">AUDIO ENGINE</span>
                <p className="text-emerald-400 font-bold text-sm">Harmonic Sound FX Synth</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">INPUT LATENCY</span>
                <p className="text-cyan-400 font-bold text-sm">&lt;35ms Instant Filter</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">GLASSMORPHISM</span>
                <p className="text-white font-bold text-sm">Custom Backdrop Shader</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Grid: Deep Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Architecture & Problem/Solution */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-emerald-400" size={20} /> Architectural Overview
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm">{project.overview}</p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold">CORE DELIVERABLES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((item, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={20} /> Engineering Challenges &amp; Takeaways
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold">CHALLENGE:</span>
                <p className="text-zinc-300 leading-relaxed">{project.challenges}</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold">ENGINEERED SOLUTION:</span>
                <p className="text-zinc-300 leading-relaxed">{project.lessons}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Tech Stack & Score */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-emerald-400" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="text-emerald-400" size={18} /> Performance Profile
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold">
              {project.metrics}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
