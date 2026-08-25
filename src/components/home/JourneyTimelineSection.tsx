"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, Terminal, Cpu, GitCommit, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MILESTONES = [
  {
    phase: "PHASE 04",
    status: "CURRENT ERA",
    title: "Aevion Studio Motion OS & AI Synapse",
    desc: "Deployment of Aevion Motion Operating System, Groq-powered contextual AI engine, and interactive WebGL laboratory.",
    tags: ["Next.js 16", "Groq Llama", "Three.js", "Motion OS"],
    accent: "#34d399",
  },
  {
    phase: "PHASE 03",
    status: "DEPLOYED",
    title: "Ooty Mistwings & 3D Visual Storytelling",
    desc: "Architected cinematic WebGL luxury booking experience combining GSAP-driven narrative mechanics with Stripe payment flows.",
    tags: ["WebGL", "GSAP 3", "Interactive Booking"],
    accent: "#a78bfa",
  },
  {
    phase: "PHASE 02",
    status: "DEPLOYED",
    title: "Nilgiris Explorers & Geospatial Engine",
    desc: "Shipped full-scale geospatial travel discovery platform with AI itinerary generation, real-time trail routing, and MapboxGL.",
    tags: ["Geospatial AI", "Supabase", "MapboxGL"],
    accent: "#f59e0b",
  },
  {
    phase: "PHASE 01",
    status: "ORIGIN",
    title: "Founding of Aevion Studio",
    desc: "Sai Rio and Edison united with a singular vision: to establish an elite technology studio dedicated to building ambitious AI software and digital products.",
    tags: ["Sai Rio", "Edison", "Studio Core"],
    accent: "#38bdf8",
  },
];

export default function JourneyTimelineSection() {
  return (
    <section className="relative bg-[#030306] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400">
              <Clock size={13} />
              <span>BUILDING IN PUBLIC // THE CONTINUUM</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white">
              THE EVOLUTION<br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                OF AEVION SYSTEMS.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-zinc-400 leading-relaxed">
              Tracking our chronological engineering leaps, product launches, and architectural milestones in full public view.
            </p>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {MILESTONES.map((m, idx) => (
            <motion.div
              key={m.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline node dot */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-zinc-600 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center"
                style={{ backgroundColor: m.accent }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07070c] hover:border-white/20 transition-all duration-300 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md"
                      style={{
                        background: `${m.accent}15`,
                        color: m.accent,
                        border: `1px solid ${m.accent}30`,
                      }}
                    >
                      {m.phase}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">{m.status}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {m.title}
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-3xl">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
