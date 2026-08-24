"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const PHASES = [
  {
    num: "01", code: "PRE-FLIGHT", title: "Discovery & Architecture",
    duration: "Week 1", icon: "🔭",
    color: "#f97316",
    activities: ["Deep-dive technical brief", "System architecture design", "Tech stack selection", "Project scope & timeline definition"],
    deliverable: "Architecture Document",
  },
  {
    num: "02", code: "LAUNCH PREP", title: "Design System & Foundation",
    duration: "Week 1–2", icon: "⚡",
    color: "#fb923c",
    activities: ["Design token system", "Component library scaffold", "Database schema design", "API contract definition"],
    deliverable: "Design System + Schema",
  },
  {
    num: "03", code: "IGNITION", title: "Core Engineering",
    duration: "Week 2–5", icon: "🚀",
    color: "#fdba74",
    activities: ["Backend API development", "Frontend architecture build", "AI/LLM pipeline integration", "Authentication & security"],
    deliverable: "Working Alpha Build",
  },
  {
    num: "04", code: "ORBIT", title: "Polish & Performance",
    duration: "Week 5–7", icon: "🌍",
    color: "#f97316",
    activities: ["Core Web Vitals optimization", "Motion & animation polish", "Cross-browser testing", "Security audit & RLS review"],
    deliverable: "Production-Ready Build",
  },
  {
    num: "05", code: "TOUCHDOWN", title: "Launch & Handoff",
    duration: "Week 7–8", icon: "🏁",
    color: "#ea580c",
    activities: ["Production deployment", "CI/CD pipeline setup", "Documentation & knowledge transfer", "30-day support window"],
    deliverable: "Launched Product + Docs",
  },
];

function PhaseCard({ phase, index }: { phase: typeof PHASES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-80 sm:w-96"
    >
      <div
        className="h-full rounded-3xl border p-8 relative overflow-hidden"
        style={{ borderColor: `${phase.color}25`, background: `linear-gradient(135deg, ${phase.color}08, transparent)` }}
      >
        {/* Phase number — large watermark */}
        <div
          className="absolute -top-4 -right-4 text-[120px] font-black leading-none pointer-events-none select-none"
          style={{ color: `${phase.color}06` }}
        >
          {phase.num}
        </div>

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: phase.color }}>{phase.code}</div>
              <div className="text-[10px] font-mono text-zinc-600">PHASE {phase.num} OF {PHASES.length}</div>
            </div>
            <div className="text-3xl">{phase.icon}</div>
          </div>

          <h3 className="text-xl font-extrabold text-white mb-1">{phase.title}</h3>
          <div
            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full inline-block mb-6"
            style={{ background: `${phase.color}15`, color: phase.color }}
          >
            {phase.duration}
          </div>

          <ul className="space-y-2 mb-8">
            {phase.activities.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="mt-1 font-mono text-xs shrink-0" style={{ color: phase.color }}>→</span>
                {a}
              </li>
            ))}
          </ul>

          {/* Deliverable */}
          <div className="pt-5 border-t" style={{ borderColor: `${phase.color}20` }}>
            <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-600 mb-1">DELIVERABLE</div>
            <div className="text-sm font-bold text-white">{phase.deliverable}</div>
          </div>
        </div>

        {/* Connector line to next card */}
        {index < PHASES.length - 1 && (
          <div
            className="absolute top-1/2 -right-8 w-8 h-px"
            style={{ background: `linear-gradient(90deg, ${phase.color}40, transparent)` }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function ProcessPage() {
  return (
    <main
      className="min-h-screen text-white selection:bg-orange-500 selection:text-black overflow-x-hidden"
      style={{ background: "#080808" }}
    >
      {/* Star field */}
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse at 50% 0%, #f9731608 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #ea580c06 0%, transparent 50%)",
      }} />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-400 text-xs font-mono mb-8"
            >
              <Sparkles size={12} /> MISSION PROTOCOL · {PHASES.length} PHASES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6"
            >
              <span className="text-white">From brief to</span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                orbit.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-zinc-500 text-sm max-w-lg leading-relaxed"
            >
              Every Aevion project follows a proven mission protocol. Tight cycles, transparent communication, zero surprises.
            </motion.p>
          </div>
        </section>

        {/* Horizontal Scroll Timeline */}
        <section className="pb-20">
          <div className="px-4 sm:px-8 max-w-7xl mx-auto mb-6">
            <div className="text-[10px] font-mono text-zinc-600 tracking-widest">← SCROLL TO ADVANCE MISSION →</div>
          </div>
          <div className="overflow-x-auto pb-8" style={{ scrollSnapType: "x mandatory" }}>
            <div className="flex gap-6 px-4 sm:px-8" style={{ width: "max-content" }}>
              {PHASES.map((phase, i) => (
                <div key={phase.num} style={{ scrollSnapAlign: "start" }}>
                  <PhaseCard phase={phase} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress line above footer */}
        <div className="px-4 sm:px-8 max-w-7xl mx-auto pb-16">
          <div className="flex items-center gap-2 mb-2">
            {PHASES.map((p, i) => (
              <React.Fragment key={p.num}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold text-black"
                  style={{ background: `linear-gradient(135deg, #f97316, #ef4444)` }}
                >
                  {p.num}
                </div>
                {i < PHASES.length - 1 && (
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #f9731640, #ef444440)" }} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between">
            {PHASES.map((p) => (
              <div key={p.num} className="text-[9px] font-mono text-zinc-700 w-8 text-center">{p.code.split(" ")[0]}</div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-24 text-center">
          <p className="text-zinc-600 font-mono text-xs mb-6">READY TO INITIATE LAUNCH SEQUENCE?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-sm"
            style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", boxShadow: "0 0 40px #f9731630" }}
          >
            Start Mission Briefing <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
