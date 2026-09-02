"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, Layout, Globe, Bot, Zap, ShieldCheck, Code2, Rocket, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "ai-systems", cmd: "aevion discipline ai-systems",
    icon: Cpu, color: "#10b981",
    title: "AI Systems Engineering",
    cat: "INTELLIGENCE",
    desc: "Autonomous AI agents, contextual RAG vector retrieval, streaming inference pipelines, structured tool calling, and intelligent workflow automation.",
    deliverables: ["Autonomous Tool-Calling Agents", "Streaming LLM Pipelines (SSE)", "Contextual Vector RAG", "Intelligent Workflows & Automation"],
    timeline: "3–5 weeks",
  },
  {
    id: "software-engineering", cmd: "aevion discipline software-eng",
    icon: Code2, color: "#38bdf8",
    title: "Software Engineering",
    cat: "SYSTEMS",
    desc: "Resilient full-stack applications, distributed backend services, high-throughput REST & GraphQL APIs, relational database modeling, and serverless edge runtimes.",
    deliverables: ["Full-Stack Next.js 16 Systems", "Distributed Backend Services", "Relational Database Modeling", "Strict TypeScript & Zod Validation"],
    timeline: "4–8 weeks",
  },
  {
    id: "immersive-web", cmd: "aevion discipline immersive-web",
    icon: Zap, color: "#f59e0b",
    title: "Immersive Web & Graphics",
    cat: "CREATIVE TECHNOLOGY",
    desc: "Bespoke Three.js & OGL vertex/fragment shaders, procedural particles, fluid physics, and hardware-accelerated 3D interfaces rendered at native display refresh rates.",
    deliverables: ["Custom WebGL & Fragment Shaders", "GSAP 3 ScrollTrigger Timelines", "Lenis Smooth Scroll Systems", "Hardware Layer Compositing"],
    timeline: "3–6 weeks",
  },
  {
    id: "product-engineering", cmd: "aevion discipline product-foundry",
    icon: Layout, color: "#a78bfa",
    title: "Product Engineering & MVPs",
    cat: "FOUNDRY",
    desc: "End-to-end MVP architecture, multi-tenant cloud platforms, custom internal productivity tools, subscription billing engines, and scalable product foundations.",
    deliverables: ["Production-Grade MVP Delivery", "Stripe Billing & Subscriptions", "Internal Platform Tools", "Modular Component Architectures"],
    timeline: "4–8 weeks",
  },
  {
    id: "realtime-systems", cmd: "aevion discipline realtime-sync",
    icon: Globe, color: "#fb7185",
    title: "Real-Time Systems",
    cat: "NETWORKING",
    desc: "Low-latency WebSocket infrastructure, bi-directional multiplayer state synchronization, collaborative canvas sessions, and live telemetry dashboards.",
    deliverables: ["WebSocket State Synchronization", "Multi-User Collaboration Layers", "Live Telemetry Dashboards", "High-Frequency Pub/Sub Messaging"],
    timeline: "3–5 weeks",
  },
  {
    id: "security", cmd: "aevion discipline security-audit",
    icon: ShieldCheck, color: "#2dd4bf",
    title: "Security & Systems Hardening",
    cat: "PROTECTION",
    desc: "Granular Row Level Security (RLS) policies, strict end-to-end type boundaries, zero-trust session management, and OWASP-aligned production hardening.",
    deliverables: ["Database Row-Level Security", "Session Authentication Hardening", "OWASP Verification & CSP", "Rate Limiting & Threat Mitigation"],
    timeline: "1–3 weeks",
  },
];

function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-2 text-[11px] font-mono text-emerald-400"
    >
      <span className="text-emerald-600">$</span>
      <span>{text}</span>
      <motion.span
        className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = svc.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-2xl border border-white/8 overflow-hidden transition-colors duration-300 hover:border-emerald-500/20"
        style={{ background: "#0d0d0d" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/6" style={{ background: "#111111" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-3 text-[10px] font-mono text-zinc-600">{svc.cmd}</span>
        </div>

        {/* Content */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        >
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl mt-0.5" style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}>
              <Icon size={18} style={{ color: svc.color }} />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: svc.color }}>{svc.cat}</div>
              <h3 className="text-base font-bold text-white">{svc.title}</h3>
              <p className="text-xs font-mono text-zinc-600 mt-1">TIMELINE: {svc.timeline}</p>
            </div>
          </div>
          <ChevronRight
            size={16}
            className="text-zinc-600 mt-1 transition-transform duration-300 shrink-0"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-white/6">
                {/* Simulated terminal output */}
                <div className="mt-4 mb-5 p-4 rounded-xl font-mono text-xs space-y-1" style={{ background: "#080808", border: "1px solid #ffffff0a" }}>
                  <div className="text-zinc-600"># Initializing service module...</div>
                  <div className="text-emerald-400">✓ Dependencies resolved</div>
                  <div className="text-zinc-400">→ {svc.desc}</div>
                </div>
                <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-600 mb-3">DELIVERABLES</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {svc.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span style={{ color: svc.color }} className="font-mono text-xs">→</span>
                      {d}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl font-mono font-bold text-xs text-black"
                  style={{ background: svc.color }}
                >
                  Request This Service <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main
      className="min-h-screen text-white selection:bg-emerald-500 selection:text-black"
      style={{ background: "#0d0d0d" }}
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto">
        {/* Terminal hero header */}
        <section className="mb-20">
          <div className="mb-8 space-y-2">
            <TerminalLine text="avy init aevion-studio --mode=production" delay={0} />
            <TerminalLine text="avy load services --all --optimize" delay={0.3} />
            <TerminalLine text="avy status" delay={0.6} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="p-4 rounded-xl text-sm font-mono mb-12 leading-relaxed"
            style={{ background: "#080808", border: "1px solid #10b98120", color: "#10b981" }}
          >
            <div className="text-zinc-500 text-xs mb-2">SYSTEM OUTPUT</div>
            <div>✓ Aevion Studio · v2.0.0 · All services operational</div>
            <div className="text-zinc-500">→ 5 core services loaded · 0 errors · Ready to deploy</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none mb-6"
          >
            Services
            <br />
            <span style={{ background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              available now.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-zinc-500 font-mono text-sm max-w-xl"
          >
            Select a service below to expand the module and view deliverables, timelines, and request access.
          </motion.p>
        </section>

        {/* Service Cards */}
        <section className="space-y-4 mb-24">
          {SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
        </section>

        {/* CTA */}
        <section
          className="rounded-3xl p-12 text-center border border-emerald-500/15"
          style={{ background: "radial-gradient(ellipse at center, #10b98108, transparent)" }}
        >
          <div className="text-xs font-mono text-emerald-500 mb-4">READY TO EXECUTE</div>
          <h2 className="text-3xl font-extrabold text-white mb-3">Start your project.</h2>
          <p className="text-zinc-500 text-sm font-mono mb-8 max-w-sm mx-auto">Provide your brief and we&apos;ll engineer the architecture from scratch.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-black"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 40px #10b98130" }}
          >
            Initialize Project <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
