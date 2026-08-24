"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Design"];

const TECH = [
  { name: "Next.js", cat: "Frontend", version: "16.x", level: 98, icon: "▲", color: "#22d3ee" },
  { name: "React", cat: "Frontend", version: "19.x", level: 98, icon: "⚛", color: "#22d3ee" },
  { name: "TypeScript", cat: "Frontend", version: "5.x", level: 96, icon: "TS", color: "#22d3ee" },
  { name: "Three.js", cat: "Frontend", version: "0.168", level: 90, icon: "▣", color: "#06b6d4" },
  { name: "GSAP", cat: "Frontend", version: "3.x", level: 94, icon: "◈", color: "#06b6d4" },
  { name: "Framer Motion", cat: "Frontend", version: "11.x", level: 95, icon: "◇", color: "#06b6d4" },
  { name: "Tailwind CSS", cat: "Frontend", version: "4.x", level: 96, icon: "✦", color: "#0ea5e9" },
  { name: "Node.js", cat: "Backend", version: "22.x", level: 92, icon: "⬡", color: "#22d3ee" },
  { name: "PostgreSQL", cat: "Backend", version: "16.x", level: 90, icon: "◉", color: "#0ea5e9" },
  { name: "Supabase", cat: "Backend", version: "2.x", level: 94, icon: "⊛", color: "#0ea5e9" },
  { name: "Prisma", cat: "Backend", version: "5.x", level: 88, icon: "◈", color: "#22d3ee" },
  { name: "Groq / Llama", cat: "AI/ML", version: "3.3", level: 92, icon: "⌁", color: "#22d3ee" },
  { name: "LangChain", cat: "AI/ML", version: "0.3", level: 85, icon: "⛓", color: "#0ea5e9" },
  { name: "OpenAI SDK", cat: "AI/ML", version: "4.x", level: 90, icon: "◯", color: "#06b6d4" },
  { name: "Vercel", cat: "DevOps", version: "Latest", level: 96, icon: "△", color: "#22d3ee" },
  { name: "Docker", cat: "DevOps", version: "25.x", level: 82, icon: "⬡", color: "#0ea5e9" },
  { name: "Figma", cat: "Design", version: "Latest", level: 88, icon: "◈", color: "#22d3ee" },
];

function CircuitTrace({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute h-px opacity-0"
      style={{ background: "linear-gradient(90deg, transparent, #22d3ee60, transparent)" }}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.5, ease: "easeInOut" }}
    />
  );
}

function PingDot({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div className="relative w-2 h-2">
      <div className="absolute inset-0 rounded-full" style={{ background: color }} />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

function TechCard({ tech, index }: { tech: typeof TECH[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl border transition-all duration-300 group"
      style={{
        borderColor: hovered ? `${tech.color}40` : "#22d3ee12",
        background: hovered ? `${tech.color}08` : "transparent",
      }}
    >
      {/* Ping dot top-right */}
      <div className="absolute top-3 right-3">
        <PingDot color={tech.color} delay={index * 0.2} />
      </div>

      {/* Icon */}
      <div
        className="text-sm font-mono font-bold mb-3 w-8 h-8 flex items-center justify-center rounded-lg"
        style={{ color: tech.color, background: `${tech.color}15`, border: `1px solid ${tech.color}25` }}
      >
        {tech.icon}
      </div>

      <h3 className="text-sm font-bold text-white mb-0.5">{tech.name}</h3>
      <div className="text-[10px] font-mono text-zinc-600 mb-4">v{tech.version}</div>

      {/* Proficiency trace bar */}
      <div className="h-0.5 w-full rounded-full mb-1" style={{ background: "#22d3ee15" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})` }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${tech.level}%` } : {}}
          transition={{ delay: index * 0.04 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="text-[10px] font-mono text-right" style={{ color: `${tech.color}80` }}>{tech.level}%</div>
    </motion.div>
  );
}

export default function TechStackPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? TECH : TECH.filter((t) => t.cat === activeCategory);

  return (
    <main
      className="min-h-screen text-white selection:bg-cyan-500 selection:text-black"
      style={{ background: "#060b18" }}
    >
      {/* Blueprint grid */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Diagonal blueprint lines */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(45deg, rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(-45deg, rgba(34,211,238,0.8) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-8"
          >
            <Sparkles size={12} /> BLUEPRINT · {TECH.length} TECHNOLOGIES LOADED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            <span className="text-white">The Technology</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Stack.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-zinc-500 font-mono text-sm max-w-lg mx-auto"
          >
            Every tool chosen for a reason. Every version tracked. Every proficiency measured.
          </motion.p>
        </section>

        {/* Category filter */}
        <section className="mb-12 flex justify-center">
          <div
            className="flex items-center gap-2 p-1.5 rounded-2xl flex-wrap justify-center"
            style={{ background: "#22d3ee08", border: "1px solid #22d3ee15" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all"
                style={{
                  background: activeCategory === cat ? "linear-gradient(135deg, #22d3ee, #0ea5e9)" : "transparent",
                  color: activeCategory === cat ? "#000" : "#6b7280",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-24"
          >
            {filtered.map((t, i) => <TechCard key={t.name} tech={t} index={i} />)}
          </motion.section>
        </AnimatePresence>

        {/* CTA */}
        <section className="text-center">
          <p className="text-zinc-600 font-mono text-xs mb-6">BUILT WITH THIS STACK · READY TO BUILD WITH YOU</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-sm"
            style={{ background: "linear-gradient(135deg, #22d3ee, #0ea5e9)", boxShadow: "0 0 40px #22d3ee30" }}
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
