"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "nilgiris",
    num: "001",
    title: "Nilgiris Explorers",
    type: "Travel & Discovery Platform",
    year: "2024",
    stack: ["Next.js 16", "Supabase", "Framer Motion", "MapboxGL"],
    desc: "Immersive travel discovery platform for the Nilgiri Hills with real-time trail mapping, AI-curated itineraries, and dynamic terrain visualization.",
    status: "SHIPPED",
    color: "#f59e0b",
    accent: "#fbbf24",
    tags: ["AI", "Maps", "Discovery"],
    link: "/projects/nilgiris-explorers",
  },
  {
    id: "mistwings",
    num: "002",
    title: "Ooty Mistwings",
    type: "Premium Hospitality Experience",
    year: "2024",
    stack: ["Next.js", "GSAP", "Three.js", "Stripe"],
    desc: "Luxury booking experience with cinematic WebGL room previews, smooth scroll storytelling, and integrated payment flows for a Nilgiri resort.",
    status: "SHIPPED",
    color: "#a78bfa",
    accent: "#c4b5fd",
    tags: ["3D", "Booking", "Luxury"],
    link: "/projects/ooty-mistwings",
  },
  {
    id: "gaming-kingdom",
    num: "003",
    title: "Gaming Kingdom",
    type: "Interactive Gaming Portal",
    year: "2023",
    stack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    desc: "Real-time multiplayer gaming hub with live leaderboards, social features, and a custom game engine built on WebSockets.",
    status: "SHIPPED",
    color: "#34d399",
    accent: "#6ee7b7",
    tags: ["Real-Time", "Gaming", "Social"],
    link: "/projects/gaming-kingdom",
  },
  {
    id: "aevion-os",
    num: "004",
    title: "Aevion Studio OS",
    type: "Motion Operating System",
    year: "2024",
    stack: ["Next.js 16", "Three.js", "GSAP", "Framer Motion"],
    desc: "The Aevion brand experience itself — a motion-first portfolio OS with WebGL experiments, command palette, and a 941-frame scroll sequence.",
    status: "LIVE",
    color: "#f43f5e",
    accent: "#fb7185",
    tags: ["WebGL", "GSAP", "Brand"],
    link: "/",
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1 : 1 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Film negative frame */}
      <motion.div
        animate={{ scale: hovered ? 1.01 : 1, rotate: hovered ? (index % 2 === 0 ? -0.5 : 0.5) : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #18140e 0%, #0f0c08 100%)`,
          border: `1px solid ${project.color}25`,
          boxShadow: hovered ? `0 30px 80px -20px ${project.color}30, 0 0 0 1px ${project.color}15` : "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Film strip holes top */}
        <div className="flex justify-around px-4 py-2 border-b" style={{ borderColor: `${project.color}15` }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-sm" style={{ background: "#0a0805", border: `1px solid ${project.color}20` }} />
          ))}
        </div>

        <div className="p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: project.color }}>
                FRAME {project.num} · {project.year}
              </div>
              <div
                className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full"
                style={{ background: `${project.color}15`, color: project.accent, border: `1px solid ${project.color}25` }}
              >
                {project.status}
              </div>
            </div>
            <Link
              href={project.link}
              className="p-2.5 rounded-xl transition-all hover:scale-110"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
            >
              <ExternalLink size={16} style={{ color: project.color }} />
            </Link>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">{project.title}</h3>
          <p className="text-xs font-mono mb-5" style={{ color: `${project.color}90` }}>{project.type}</p>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">{project.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-lg" style={{ background: `${project.color}10`, color: project.accent, border: `1px solid ${project.color}20` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 pt-5 border-t" style={{ borderColor: `${project.color}12` }}>
            {project.stack.map((s) => (
              <span key={s} className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/8 text-zinc-500">{s}</span>
            ))}
          </div>
        </div>

        {/* Film strip holes bottom */}
        <div className="flex justify-around px-4 py-2 border-t" style={{ borderColor: `${project.color}15` }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-sm" style={{ background: "#0a0805", border: `1px solid ${project.color}20` }} />
          ))}
        </div>

        {/* Spotlight overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${project.color}08, transparent 60%)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <main
      className="min-h-screen text-white selection:bg-amber-500 selection:text-black"
      style={{ background: "linear-gradient(180deg, #110f0e 0%, #0d0b09 50%, #0a0806 100%)" }}
    >
      {/* Film grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400 text-xs font-mono mb-8"
          >
            <Sparkles size={12} /> FILM LAB · {PROJECTS.length} NEGATIVES DEVELOPED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            <span className="text-white">Work that</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              left a mark.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-zinc-500 text-sm max-w-lg leading-relaxed"
          >
            Each project is a frame developed in the darkroom. Built with precision, shipped with intent.
          </motion.p>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </section>

        {/* More work CTA */}
        <section className="text-center">
          <p className="text-zinc-600 font-mono text-xs mb-6">MORE IN THE DARKROOM — CONTACT FOR FULL PORTFOLIO</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-black"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", boxShadow: "0 0 40px #f59e0b30" }}
          >
            Request Full Portfolio <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
