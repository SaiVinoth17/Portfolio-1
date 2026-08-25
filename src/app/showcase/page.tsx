"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Play,
  Cpu,
  Layers,
  Activity,
  Sliders,
  Laptop,
  Maximize2,
  Zap,
  Globe,
  Flame,
  Droplets,
} from "lucide-react";
import Link from "next/link";

interface ExperimentCard {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  fps: string;
  href: string;
  accent: string;
  accentBorder: string;
  accentGlow: string;
  icon: React.ReactNode;
  spanClass: string;
}

const EXPERIMENTS: ExperimentCard[] = [
  {
    id: "macbook-neo",
    num: "01",
    title: "MacBook Neo Frame Sequence",
    category: "CINEMATIC HARDWARE PIPELINE",
    description: "941-frame ultra-high-resolution scroll playback engine with asynchronous buffer preloading, velocity smoothing, and dynamic architecture callouts.",
    tech: ["941 Frames", "Canvas RAF", "Async Cache", "Hardware Stages"],
    fps: "120 FPS",
    href: "/showcase/macbook-neo",
    accent: "#10b981",
    accentBorder: "group-hover:border-emerald-500/50",
    accentGlow: "from-emerald-500/15 via-teal-500/5 to-transparent",
    icon: <Laptop className="text-emerald-400" size={24} />,
    spanClass: "lg:col-span-8",
  },
  {
    id: "ripple-distortion",
    num: "02",
    title: "OGL Fluid Ripple Distortion",
    category: "WEBGL 2.0 / REFRACTION SHADER",
    description: "Instanced wave displacement buffer with chromatic dispersion, glint specular highlights, and real-time cursor vorticity perturbation.",
    tech: ["OGL WebGL", "Instanced Mesh", "Dispersion", "Normal Glint"],
    fps: "120 FPS",
    href: "/showcase/ripple-distortion",
    accent: "#06b6d4",
    accentBorder: "group-hover:border-cyan-500/50",
    accentGlow: "from-cyan-500/15 via-teal-500/5 to-transparent",
    icon: <Droplets className="text-cyan-400" size={24} />,
    spanClass: "lg:col-span-4",
  },
  {
    id: "molten-metal",
    num: "03",
    title: "OGL Caustic Domain Shader",
    category: "WEBGL 2.0 / GLSL SHADERS",
    description: "Procedural raymarched domain-folding liquid metal shader with real-time cursor vorticity disturbance and parameter controls.",
    tech: ["WebGL 2.0", "GLSL Raymarching", "OGL Engine", "Caustics"],
    fps: "Native GPU",
    href: "/showcase/molten-metal",
    accent: "#38bdf8",
    accentBorder: "group-hover:border-sky-500/50",
    accentGlow: "from-sky-500/15 via-blue-500/5 to-transparent",
    icon: <Flame className="text-sky-400" size={24} />,
    spanClass: "lg:col-span-4",
  },
  {
    id: "scroll-morph",
    num: "04",
    title: "3D Radial Scroll Morph",
    category: "KINETIC 3D GEOMETRY",
    description: "Interactive geometry engine that interpolates 20 responsive 3D card matrices across scatter, linear rail, 360° orbit, and hyperbolic rainbow arches.",
    tech: ["Framer Motion", "CSS 3D", "Trigonometric Rails", "Virtual Scroll"],
    fps: "60–120 FPS",
    href: "/showcase/scroll-morph",
    accent: "#a855f7",
    accentBorder: "group-hover:border-purple-500/50",
    accentGlow: "from-purple-500/15 via-pink-500/5 to-transparent",
    icon: <Layers className="text-purple-400" size={24} />,
    spanClass: "lg:col-span-4",
  },
  {
    id: "ballpit",
    num: "05",
    title: "Three.js Instanced Physics",
    category: "3D RIGID BODY SIMULATION",
    description: "InstancedMesh collision physics sandbox rendering 250+ spheres with cursor raycast repeller fields and restitution dynamics.",
    tech: ["Three.js", "InstancedMesh", "Spatial Hash", "Cursor Gravity"],
    fps: "120 FPS Target",
    href: "/showcase/ballpit",
    accent: "#3b82f6",
    accentBorder: "group-hover:border-blue-500/50",
    accentGlow: "from-blue-500/15 via-cyan-500/5 to-transparent",
    icon: <Cpu className="text-blue-400" size={24} />,
    spanClass: "lg:col-span-4",
  },
  {
    id: "drift-wall",
    num: "06",
    title: "3D Parallax Drift Matrix",
    category: "INFINITE SPATIAL MATRIX",
    description: "Multi-layered infinite parallax wall with real-time cursor velocity lift, Z-depth displacement, and friction momentum.",
    tech: ["CSS 3D Matrix", "RAF Interpolation", "GPU Compositing", "Kinetic Lift"],
    fps: "Smooth RAF",
    href: "/showcase/drift-wall",
    accent: "#f59e0b",
    accentBorder: "group-hover:border-amber-500/50",
    accentGlow: "from-amber-500/15 via-orange-500/5 to-transparent",
    icon: <Activity className="text-amber-400" size={24} />,
    spanClass: "lg:col-span-12",
  },
];

export default function ShowcaseHubPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono backdrop-blur-md"
        >
          <Sparkles size={14} /> THE PLAYGROUND • INTERACTIVE 3D & SHADER LAB
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight font-sans"
        >
          Creative Motion & <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            WebGL Experiments.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Select an interactive laboratory below. Each experiment runs in an isolated, dedicated sandbox optimized for 120 FPS performance and deep exploration.
        </motion.p>
      </section>

      {/* Bento Grid Selection */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
        {EXPERIMENTS.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.15 }}
            className={`${exp.spanClass} group relative rounded-3xl bg-zinc-950/80 border border-white/10 ${exp.accentBorder} p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-emerald-500/5 hover:-translate-y-1`}
          >
            {/* Ambient Radial Gradient Sheen */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${exp.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            {/* Top Row: Meta Badge & Category */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                  {exp.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 block">
                    EXPERIMENT // {exp.num}
                  </span>
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    {exp.category}
                  </span>
                </div>
              </div>

              <div className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                {exp.fps}
              </div>
            </div>

            {/* Middle: Title & Description */}
            <div className="relative z-10 space-y-3 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                {exp.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                {exp.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/5 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action: Experience This Button */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                HOSTED IN DEDICATED SANDBOX
              </span>

              <Link
                href={exp.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-400 text-black font-bold font-mono text-xs transition-all shadow-md group-hover:shadow-emerald-500/20 group-hover:scale-105"
              >
                <span>EXPERIENCE THIS</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Conversion Banner */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">Need Custom 3D & WebGL Engineering?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Aevion Studio builds production-grade Three.js scenes, GPU compute shaders, and interactive products for world-class brands.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20"
        >
          Start a Project <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
