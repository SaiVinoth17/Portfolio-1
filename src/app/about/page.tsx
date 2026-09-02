"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, Cpu, Zap, Layers, Clock, Terminal, Github, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

const FOUNDERS_INFO = [
  {
    id: "sai-vinoth",
    name: "Sai Vinoth",
    role: "Co-Founder",
    title: "Full Stack Developer & AI/ML Engineer",
    bio: "Focusing on full-stack cloud architectures, autonomous AI systems, streaming inference pipelines, and scalable platforms. Dedicated to building software with mathematical precision and zero friction.",
    specialties: ["Full-Stack Engineering", "AI/ML Systems", "Autonomous Agents", "Next.js Systems", "Vector RAG"],
    github: "https://github.com/SaiVinoth17",
    accent: "#34d399",
  },
  {
    id: "edison",
    name: "Edison",
    role: "Co-Founder",
    title: "Front End Developer",
    bio: "Focusing on high-performance front-end engineering, interactive 3D WebGL graphics, custom shaders, and butter-smooth client interactions. Dedicated to squeezing maximum performance out of every render frame.",
    specialties: ["Front End Development", "Three.js & WebGL", "UI/UX Engineering", "Kinetic Motion & GSAP", "React 19"],
    github: "https://github.com/edisonedi84431-art",
    accent: "#38bdf8",
  },
];

const ERAS = [
  {
    period: "ERA 03",
    year: "2024 – NOW",
    role: "Founding Aevion Studio",
    org: "Aevion Studio Core",
    focus: "Autonomous AI & High-Throughput Web Systems",
    summary:
      "Sai Vinoth and Edison united to create Aevion Studio, bridging strict full-stack engineering and fluid creative motion. Architecting high-throughput Groq LLM pipelines, serverless Next.js 16 platforms, and custom SaaS products.",
    stack: ["Next.js 16", "React 19", "Groq Llama", "TypeScript", "Three.js", "GSAP"],
    icon: Cpu,
    color: "#34d399",
  },
  {
    period: "ERA 02",
    year: "2023 – 2024",
    role: "Production SaaS & Scaled Infrastructure",
    org: "AI & Modern Web Platforms",
    focus: "Full-Stack SaaS & Context RAG Architectures",
    summary:
      "Engineered end-to-end full-stack architectures, vector retriever knowledge bases, and API backends. Focused on strict TypeScript and concurrent React rendering mechanics.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase", "Node.js", "GSAP 3"],
    icon: Code2,
    color: "#38bdf8",
  },
  {
    period: "ERA 01",
    year: "2022 – 2023",
    role: "Creative Frontend & UI Systems",
    org: "Startups & Experimental Labs",
    focus: "Motion-First Web Interfaces",
    summary:
      "Architected pixel-perfect interfaces, WebGL shaders, and GSAP animation systems. Pioneered GPU-accelerated scroll experiences and low-latency interaction models.",
    stack: ["React", "GSAP", "Three.js", "Figma", "WebGL"],
    icon: Layers,
    color: "#a78bfa",
  },
];

const PRINCIPLES = [
  {
    title: "Engineering Clarity",
    body: "Every abstraction must earn its place. Complexity is a liability; simplicity is the architecture.",
  },
  {
    title: "Motion as Signal",
    body: "Animation communicates state. Every transition should carry meaning, not just visual beauty.",
  },
  {
    title: "Zero Shortcuts",
    body: "Type safety, accessibility, and performance are non-negotiable defaults, not optional polish.",
  },
  {
    title: "Two Builders. One Vision.",
    body: "Direct craftsmanship by Sai Vinoth and Edison. No account managers, no layers, no diluted execution.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen text-white selection:bg-emerald-500 selection:text-black bg-[#030306]"
    >
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <motion.div style={{ y: y1, opacity: opacity1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono"
          >
            <Sparkles size={12} /> THE PEOPLE BEHIND AEVION
          </motion.div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Engineering at the</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              edge of the possible.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Founded by <strong className="text-white">Sai Rio</strong> and <strong className="text-white">Edison</strong>. Two builders united by a single vision: technology without limits.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-xs uppercase font-mono text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]"
            >
              Work With Us <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-xs uppercase font-mono text-white border border-white/15 hover:border-emerald-500/40 transition-colors"
            >
              View Work <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Equal Co-Founders Grid */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 mb-3 uppercase">
          LEADERSHIP ARCHITECTURE
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-10">
          The Two Founders
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FOUNDERS_INFO.map((founder) => (
            <div
              key={founder.id}
              className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08080f] hover:border-white/20 transition-all space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold uppercase"
                    style={{
                      background: `${founder.accent}15`,
                      color: founder.accent,
                      border: `1px solid ${founder.accent}30`,
                    }}
                  >
                    {founder.role}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mt-2">{founder.name}</h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1">{founder.title}</div>
                </div>

                {founder.github && (
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>

              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {founder.bio}
              </p>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Specialties &amp; Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {founder.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eras Continuum */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 mb-3 uppercase">
            CHRONOLOGY
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Three eras.<br />One trajectory.
          </h2>
        </div>

        <div className="grid gap-6">
          {ERAS.map((era) => {
            const Icon = era.icon;
            return (
              <div
                key={era.period}
                className="p-8 rounded-3xl border border-white/10 bg-[#08080f] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border"
                      style={{ borderColor: `${era.color}30`, background: `${era.color}10` }}
                    >
                      <Icon size={18} style={{ color: era.color }} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold" style={{ color: era.color }}>
                        {era.period}
                      </div>
                      <div className="text-xs font-mono text-zinc-500">{era.year}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400">
                    {era.focus}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{era.role}</h3>
                <p className="text-xs font-mono text-zinc-500">{era.org}</p>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{era.summary}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {era.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 mb-3 uppercase">
            ENGINEERING PRINCIPLES
          </div>
          <h2 className="text-4xl font-extrabold text-white">What we believe in.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-all"
            >
              <div className="text-2xl font-black text-emerald-500/40 font-mono mb-4">0{i + 1}</div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="p-16 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 to-cyan-950/20 relative overflow-hidden">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to build something remarkable?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-sm">
            Whether it&apos;s an AI product, a high-performance web platform, or a creative experience — let&apos;s architect it together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-xs font-mono uppercase tracking-wider bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]"
          >
            Start a Conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
