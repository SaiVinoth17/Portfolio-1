"use client";

import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ArrowLeft,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Terminal,
  Compass,
  Volume2,
  Globe,
  Radio,
} from "lucide-react";
import Link from "next/link";
import GeoTerrainEngine from "@/components/interactive/GeoTerrainEngine";
import OSDesktop from "@/components/interactive/OSDesktop";

const PROJECT_DATA: Record<
  string,
  {
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
> = {
  "nilgiris-explorers": {
    title: "Nilgiris Explorers",
    subtitle: "Premium Tourism & Experience Discovery Platform",
    category: "Web Application • Travel Engine",
    overview:
      "Nilgiris Explorers is a high-performance travel and experience booking platform designed for Ooty and the Nilgiris district. It combines interactive map exploration, destination guides, and seamless booking workflows.",
    problem:
      "Travelers visiting Ooty faced fragmented, outdated travel websites with poor mobile responsiveness and slow page loading speeds.",
    solution:
      "Engineered a Next.js 16 App Router application featuring sub-second page transitions, dynamic maps, mobile-first responsive layouts, and structured SEO schema for local tourism.",
    architecture: [
      "Next.js 16 App Router Server Components",
      "React 19 & TypeScript Safety",
      "Tailwind CSS v4 Utility Styling",
      "JSON-LD Local Business Schema",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Vercel Edge"],
    challenges:
      "Optimizing high-resolution destination photographs without incurring Layout Thrashing or poor Largest Contentful Paint (LCP) on mobile networks.",
    lessons:
      "Utilizing Next.js image optimization along with WebP format reduced payload size by 68% while maintaining crisp image clarity.",
    metrics: "Lighthouse 98 Performance • 100% Mobile Responsive • Sub-second LCP",
    link: "https://nilgirisexplorers.com",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    specialType: "travel",
  },
  "ooty-mistwings": {
    title: "Ooty Mistwings",
    subtitle: "Cinematic Destination & Visual Storytelling Platform",
    category: "Creative Web Engineering • Destination Discovery",
    overview:
      "An immersive digital platform presenting the beauty of Ooty and the Nilgiris through cinematic UI, responsive visual storytelling, and fluid scroll interactions.",
    problem:
      "Traditional travel blogs lacked visual immersion, resulting in low engagement times for prospective travelers.",
    solution:
      "Engineered a cinematic storytelling layout with GPU-accelerated motion, parallax scroll dynamics, and responsive image optimizations.",
    architecture: [
      "GSAP 3 ScrollTrigger Timeline Orchestration",
      "Lenis Smooth Momentum Scrolling",
      "Strict TypeScript Compilation",
      "Responsive Fluid Image Stacking",
    ],
    techStack: ["GSAP 3", "Lenis", "React 19", "Tailwind CSS", "Framer Motion"],
    challenges:
      "Synchronizing multiple ScrollTrigger scrub timelines without creating micro-stutters or frame drops on low-power devices.",
    lessons:
      "Using transform-only and opacity properties enabled 120 FPS rendering without triggering expensive browser repaint loops.",
    metrics: "120 FPS Motion Rendering • Zero Layout Shift (CLS: 0)",
    link: "https://ootymistwings.com",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    specialType: "motion",
  },
  "gaming-kingdom": {
    title: "Gaming Kingdom",
    subtitle: "High-Performance Interactive Gaming Community Hub",
    category: "Frontend Architecture • Community Hub",
    overview:
      "A fast, visually engaging web platform designed to showcase modern frontend engineering, high responsiveness, and interactive UI components for gaming enthusiasts.",
    problem:
      "Gaming community hubs frequently suffer from heavy bundle sizes, slow re-renders, and poor mobile responsiveness.",
    solution:
      "Designed a lightweight, modular component architecture with instant state updates, dynamic filtering, and dark glassmorphic styling.",
    architecture: [
      "Modular Component Architecture",
      "Optimized React State Pipelines",
      "High-Performance CSS Grid System",
      "Web Audio Interaction Feedback",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Web Audio API"],
    challenges:
      "Balancing rich cyberpunk aesthetics with lightweight bundle delivery and instant client-side filtering responsiveness.",
    lessons:
      "Decoupling complex UI state from heavy renders kept input response latency consistently under 50 milliseconds.",
    metrics: "60 FPS Interactive Feedback • Sub-50ms Response Latency",
    link: "https://aevion.studio",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    specialType: "gaming",
  },
  "aevion-studio-os": {
    title: "Aevion Studio Motion OS v2.0",
    subtitle: "Awwwards-Grade Interactive Web Operating System",
    category: "Flagship Portfolio • AI & Motion Engine",
    overview:
      "The flagship digital experience for Aevion Studio — engineered with streaming AI conversation, hardware-accelerated 3D scroll physics, sound synthesis, and real-time telemetry.",
    problem:
      "Standard agency portfolios felt static, repetitive, and failed to demonstrate true full-stack engineering and creative graphics capabilities.",
    solution:
      "Transformed the website into a living motion operating system with real-time telemetry, Web Audio API sound synthesis, and interactive CLI terminal.",
    architecture: [
      "Next.js 16 App Router Architecture",
      "Groq Llama 3.3 Low-Latency AI Route",
      "Web Audio API Sound Engine",
      "GSAP 3 & Framer Motion Pipelines",
    ],
    techStack: ["Next.js 16", "Groq SDK", "React 19", "Three.js", "GSAP 3", "Tailwind v4"],
    challenges:
      "Building a multimodal assistant with streaming token responses, memory management, and error fallbacks without blocking the UI thread.",
    lessons:
      "Streaming tokens via Server-Sent Events (SSE) while rendering markdown live provided an instantaneous, premium user feel.",
    metrics: "Awwwards-Grade Creative Experience • 100% Type Safe",
    link: "https://aevion.studio",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    specialType: "ai-os",
  },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = PROJECT_DATA[id] || PROJECT_DATA["nilgiris-explorers"];

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

          <p className="text-lg text-zinc-400 max-w-3xl font-mono text-sm">{project.subtitle}</p>
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
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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

        {project.specialType === "motion" && (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Zap size={16} /> 120 FPS MOTION ENGINE SPECS
              </div>
              <span className="text-xs font-mono text-zinc-400">GSAP 3 + Lenis Momentum</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">FRAME RATE</span>
                <p className="text-emerald-400 font-bold text-sm">Target 120 FPS V-Sync</p>
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

        {project.specialType === "ai-os" && <OSDesktop />}
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
              <ShieldCheck className="text-emerald-400" size={20} /> Engineering Challenges & Takeaways
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
              <Zap className="text-emerald-400" size={18} /> Performance Score
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
