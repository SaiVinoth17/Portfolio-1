"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, Cpu, Zap, Award, Layers, Compass, Clock, Terminal } from "lucide-react";
import Link from "next/link";

const CAREER = [
  {
    period: "ERA 03", year: "2024 – NOW",
    role: "Founder & Lead Software Architect", org: "Aevion Studio",
    focus: "Streaming AI Pipelines & Next.js 16 Systems",
    summary: "Founded Aevion Studio to bridge strict full-stack engineering and fluid creative motion. Architecting high-throughput Groq LLM pipelines, serverless Next.js 16 platforms, and custom SaaS products.",
    stack: ["Next.js 16", "React 19", "Groq Llama", "TypeScript", "Three.js", "GSAP"],
    icon: Cpu, color: "#fbbf24",
  },
  {
    period: "ERA 02", year: "2023 – 2024",
    role: "Senior Product & Full-Stack Engineer", org: "AI & Modern Web Platforms",
    focus: "Full-Stack SaaS & Context RAG Architectures",
    summary: "Engineered end-to-end full-stack architectures, vector retriever knowledge bases, and API backends. Focused on strict TypeScript and concurrent React 19 rendering mechanics.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase", "Node.js", "GSAP 3"],
    icon: Code2, color: "#fb923c",
  },
  {
    period: "ERA 01", year: "2022 – 2023",
    role: "Creative Frontend & UI Architect", org: "Startups & Creative Agencies",
    focus: "Motion-First Web Interfaces",
    summary: "Architected pixel-perfect interfaces, WebGL shaders, and GSAP animation systems for creative agencies and fast-growth startups. Pioneered GPU-accelerated scroll experiences.",
    stack: ["React", "GSAP", "Three.js", "Figma", "Framer", "WebGL"],
    icon: Layers, color: "#a78bfa",
  },
];

const STATS = [
  { label: "Years Engineering", value: "3+", icon: Clock },
  { label: "AI Pipelines Built", value: "12+", icon: Cpu },
  { label: "Products Shipped", value: "20+", icon: Zap },
  { label: "Technologies", value: "40+", icon: Terminal },
];

const PRINCIPLES = [
  { title: "Engineering Clarity", body: "Every abstraction must earn its place. Complexity is a liability; simplicity is the architecture." },
  { title: "Motion as Signal", body: "Animation communicates state. Every transition should carry meaning, not just beauty." },
  { title: "Zero Shortcuts", body: "Type safety, accessibility, and performance are non-negotiable defaults, not optional polish." },
  { title: "Ship, Learn, Iterate", body: "Perfect is the enemy of shipped. Rapid, disciplined iteration beats long planning cycles." },
];

function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function OrbitRing({ radius, duration, children }: { radius: number; duration: number; children?: React.ReactNode }) {
  return (
    <motion.div
      className="absolute rounded-full border border-amber-500/20"
      style={{ width: radius * 2, height: radius * 2, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

function EraCard({ era, index }: { era: typeof CAREER[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = era.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div
        className="relative rounded-3xl border p-8 overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:border-amber-500/30"
        style={{ borderColor: `${era.color}20`, background: `radial-gradient(ellipse at top left, ${era.color}06 0%, transparent 60%), #0a0a1480` }}
      >
        {/* Glow top-left */}
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `${era.color}15` }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl border" style={{ borderColor: `${era.color}30`, background: `${era.color}10` }}>
                <Icon size={20} style={{ color: era.color }} />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold tracking-widest" style={{ color: `${era.color}` }}>{era.period}</div>
                <div className="text-xs font-mono text-zinc-500">{era.year}</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full border" style={{ borderColor: `${era.color}25`, color: era.color, background: `${era.color}10` }}>
              {era.focus}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{era.role}</h3>
          <p className="text-xs font-mono text-zinc-500 mb-4">{era.org}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">{era.summary}</p>

          <div className="flex flex-wrap gap-2">
            {era.stack.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/8 text-zinc-400 bg-white/3">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen text-white selection:bg-amber-500 selection:text-black"
      style={{ background: "linear-gradient(180deg, #050508 0%, #0a0a14 30%, #0d0b1a 70%, #080810 100%)" }}
    >
      <StarField />

      {/* Orbit rings (decorative) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 700, height: 700 }}>
        <OrbitRing radius={200} duration={30} />
        <OrbitRing radius={300} duration={50} />
        <OrbitRing radius={380} duration={70} />
      </div>

      {/* Hero */}
      <section className="relative pt-36 pb-32 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <motion.div style={{ y: y1, opacity: opacity1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono"
          >
            <Sparkles size={12} /> FOUNDER // AEVION STUDIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none"
          >
            <span className="text-white">Engineering at the</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              edge of the possible.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Full-stack architect, AI systems engineer, and creative technologist. Building software that doesn't just work — it resonates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}
            >
              Work With Me <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white border border-white/15 hover:border-amber-500/40 transition-colors"
            >
              View Work <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Row */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-3xl text-center border border-amber-500/10 bg-amber-500/5"
              >
                <Icon className="mx-auto mb-3 text-amber-400" size={22} />
                <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-xs font-mono text-zinc-500 mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-amber-500 mb-3">CAREER CONTINUUM</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Three eras.<br />One trajectory.</h2>
        </div>
        <div className="grid gap-6">
          {CAREER.map((era, i) => <EraCard key={era.period} era={era} index={i} />)}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-28">
        <div className="mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-amber-500 mb-3">ENGINEERING PRINCIPLES</div>
          <h2 className="text-4xl font-extrabold text-white">What I believe in.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-3xl border border-white/8 bg-white/3 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all group"
            >
              <div className="text-3xl font-black text-amber-500/30 font-mono mb-4 group-hover:text-amber-500/50 transition-colors">0{i + 1}</div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="p-16 rounded-3xl border border-amber-500/15 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #fbbf2408, transparent)" }}>
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to build something remarkable?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-sm">Whether it's an AI product, a high-performance web platform, or a creative experience — let's architect it together.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", boxShadow: "0 0 40px #fbbf2440" }}
          >
            Start a Conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
