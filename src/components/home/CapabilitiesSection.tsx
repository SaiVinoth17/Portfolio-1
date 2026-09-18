"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Cpu, Zap, Globe, Shield, Terminal, Database, ArrowUpRight, Activity } from "lucide-react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

const LAB_MODULES = [
  {
    id: "ai-systems",
    icon: Cpu,
    title: "AI Systems",
    category: "INTELLIGENCE",
    summary:
      "Autonomous AI agents, contextual RAG vector retrieval, streaming inference pipelines, structured tool calling, and intelligent workflow automation.",
    metrics: "Streaming SSE & Tool Calling",
    color: "#34d399",
  },
  {
    id: "software-engineering",
    icon: Terminal,
    title: "Software Engineering",
    category: "SYSTEMS",
    summary:
      "Resilient full-stack applications, distributed backend services, high-throughput REST & GraphQL APIs, relational database modeling, and edge runtimes.",
    metrics: "Full-Stack Architecture",
    color: "#38bdf8",
  },
  {
    id: "immersive-web",
    icon: Zap,
    title: "Immersive Web",
    category: "GRAPHICS",
    summary:
      "Bespoke Three.js & OGL vertex/fragment shaders, procedural particles, fluid physics, and hardware-accelerated 3D interfaces rendered at native display refresh rates.",
    metrics: "WebGL & Fragment Shaders",
    color: "#f59e0b",
  },
  {
    id: "product-engineering",
    icon: Globe,
    title: "Product Engineering",
    category: "FOUNDRY",
    summary:
      "End-to-end MVP execution, scalable SaaS platforms, custom internal productivity tools, subscription billing architectures, and modular design systems.",
    metrics: "SaaS & Platform Architecture",
    color: "#a78bfa",
  },
  {
    id: "realtime-systems",
    icon: Database,
    title: "Real-Time Systems",
    category: "NETWORKING",
    summary:
      "Low-latency WebSocket infrastructure, bi-directional multiplayer state synchronization, collaborative canvas sessions, and live telemetry dashboards.",
    metrics: "Bi-Directional State Sync",
    color: "#fb7185",
  },
  {
    id: "systems-security",
    icon: Shield,
    title: "Systems Hardening",
    category: "PROTECTION",
    summary:
      "Granular Row Level Security (RLS) policies, strict end-to-end TypeScript boundaries with Zod validation, authenticated sessions, and zero-trust perimeter defense.",
    metrics: "Strict Type Safety & RLS",
    color: "#2dd4bf",
  },
];

export default function CapabilitiesSection() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      // 1. Eyebrow Decode
      gsap.to(".cap-eyebrow-text", {
        scrollTrigger: {
          trigger: ".cap-header",
          start: "top 85%",
          once: true,
        },
        scrambleText: {
          text: "EXPERIMENTAL LAB & CAPABILITIES",
          chars: "0101#@*!",
          speed: 0.35,
        },
        duration: 0.8,
        ease: "none",
      });

      // 2. Headline Horizontal Text Slicing
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cap-header",
          start: "top 82%",
          once: true,
        },
      });

      headlineTl
        .fromTo(
          ".cap-hl-line1",
          { x: -35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          ".cap-hl-line2",
          { x: 35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "<0.1"
        )
        .fromTo(
          ".cap-header-desc",
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        );

      // 3. Cards Grid Progressive Reveal
      gsap.fromTo(
        ".capability-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Category tracking expansion
      gsap.fromTo(
        ".cap-cat-text",
        { letterSpacing: "0.05em", opacity: 0 },
        {
          letterSpacing: "0.2em",
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 78%",
            once: true,
          },
        }
      );

      // Title vertical masked reveal
      gsap.fromTo(
        ".cap-title-text",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 76%",
            once: true,
          },
        }
      );

      // Summary clip-path reveal
      gsap.fromTo(
        ".cap-summary-text",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 72%",
            once: true,
          },
        }
      );

      // Metric telemetry decode
      gsap.utils.toArray<HTMLElement>(".cap-metric-text").forEach((el) => {
        const text = el.innerText;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
          scrambleText: {
            text: text,
            chars: "0101#*!_METRIC",
            speed: 0.4,
          },
          duration: 0.7,
          ease: "none",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative scroll-mt-20 bg-[#040407] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Header */}
        <div className="cap-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400 select-none">
              <Activity size={13} />
              <span className="cap-eyebrow-text">EXPERIMENTAL LAB &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white select-none">
              <span className="cap-hl-line1 block">DEEP SYSTEMS</span>
              <span className="cap-hl-line2 block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                ENGINEERING MATRIX.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="cap-header-desc text-sm font-mono text-zinc-400 leading-relaxed">
              We operate at the convergence of heavy backend distributed logic and high-fidelity
              creative frontend execution.
            </p>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isHovered = hoveredModule === mod.id;

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHoveredModule(mod.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className="capability-card p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group"
                style={{
                  borderColor: isHovered ? mod.color : "rgba(255, 255, 255, 0.08)",
                  background: isHovered
                    ? `radial-gradient(circle at top left, ${mod.color}08, #07070d 80%)`
                    : "#06060c",
                  boxShadow: isHovered ? `0 15px 40px -15px ${mod.color}20` : "none",
                }}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div
                      className="p-3 rounded-2xl border"
                      style={{
                        borderColor: `${mod.color}30`,
                        background: `${mod.color}10`,
                      }}
                    >
                      <Icon size={20} style={{ color: mod.color }} />
                    </div>

                    <span className="cap-cat-text text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none">
                      {mod.category}
                    </span>
                  </div>

                  <h3 className="cap-title-text text-xl font-bold text-white tracking-tight group-hover:text-zinc-100 select-none">
                    {mod.title}
                  </h3>

                  <p className="cap-summary-text text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {mod.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between select-none">
                  <span className="cap-metric-text text-[11px] font-mono font-bold" style={{ color: mod.color }}>
                    {mod.metrics}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
