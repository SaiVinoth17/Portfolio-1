"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RippleDistortion from "@/components/RippleDistortion";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";
import { AevionMagnetic } from "@/components/motion/AevionMagnetic";

const HERO_BACKGROUNDS = [
  {
    id: "cyber-nexus",
    name: "Cyber Nexus",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2560&auto=format&fit=crop",
    tint: "#10b981",
  },
  {
    id: "liquid-obsidian",
    name: "Liquid Obsidian",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop",
    tint: "#06b6d4",
  },
  {
    id: "quantum-core",
    name: "Quantum Core",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2560&auto=format&fit=crop",
    tint: "#a855f7",
  },
];

export default function AevionHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgIndex, setBgIndex] = useState(0);
  const currentBg = HERO_BACKGROUNDS[bgIndex];

  // ── 1. GSAP Master Cinematic Entrance Timeline ──────────────────────────
  useGSAP(
    () => {
      if (!heroRef.current) return;
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: MOTION.ease.cinematic },
      });

      // System status badge
      tl.fromTo(
          ".hero-status-badge",
          { opacity: 0, scale: 0.92, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: MOTION.duration.fast, delay: 0.15 }
        )
        // Sub-title label
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: MOTION.duration.fast },
          "-=0.3"
        )
        // Monolithic typography lines
        .fromTo(
          ".hero-heading-line",
          { opacity: 0, y: 45, rotateX: 12 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.12,
            duration: MOTION.duration.cinematic,
            ease: MOTION.ease.cinematic,
          },
          "-=0.25"
        )
        // Narrative description
        .fromTo(
          ".hero-narrative",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: MOTION.duration.standard },
          "-=0.5"
        )
        // Dual founder badges
        .fromTo(
          ".hero-founder-badge",
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, stagger: 0.08, duration: MOTION.duration.fast },
          "-=0.4"
        )
        // CTA buttons
        .fromTo(
          ".hero-cta-button",
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: MOTION.duration.fast },
          "-=0.3"
        )
        // Bottom telemetry metric cards
        .fromTo(
          ".hero-metric-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.07, duration: MOTION.duration.standard },
          "-=0.35"
        );
    },
    { scope: heroRef }
  );

  // ── 2. Interactive Canvas Particles (O(n) — no line-drawing) ────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip entirely for reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Fewer particles — the O(n²) line loop is removed entirely
    const particleCount = Math.min(Math.floor(width / 30), 35);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.3 + 0.08,
      });
    }

    let localMouseX = width / 2;
    let localMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      localMouseX = e.clientX;
      localMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Throttle to ~30fps — hero particles don't need 60fps
    let skip = false;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      skip = !skip;
      if (skip) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = localMouseX - p.x;
        const dy = localMouseY - p.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = 180 * 180;

        let alpha = p.baseAlpha;
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          alpha = p.baseAlpha + (1 - dist / 180) * 0.35;
          // Gentle attraction — avoid divide-by-zero
          if (dist > 0.1) {
            p.x += (dx / dist) * 0.18;
            p.y += (dy / dist) * 0.18;
          }
        }

        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full bg-[#030306] text-white flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-8 lg:px-16 selection:bg-emerald-500 selection:text-black"
    >
      {/* Immersive WebGL Ripple Distortion Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <RippleDistortion
          src={currentBg.url}
          brushSize={170}
          strength={0.22}
          swirl={1.1}
          rings={4}
          spread={5.5}
          fade={3.0}
          dispersion={0.07}
          glint={0.35}
          tint={currentBg.tint}
          tintAmount={0.16}
          grayscale={false}
          trigger="both"
          quality="medium"
          className="w-full h-full"
        />

        {/* Cinematic dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030306] via-[#030306]/65 to-[#030306]/85" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center,_var(--tw-gradient-stops)] from-transparent via-[#030306]/40 to-[#030306]/90" />
      </div>

      {/* Interactive Canvas Background Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" style={{ willChange: "transform" }} />



      {/* Main Center Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-14 lg:py-20 flex flex-col justify-center">
        {/* Sub-badge */}
        <div className="hero-status-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 self-start">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
            Two Builders • One Vision • Technology Without Limits
          </span>
        </div>

        {/* Monolithic Brand Heading */}
        <div className="space-y-4">
          <div className="hero-eyebrow text-[12px] sm:text-sm font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold">
            AEVION STUDIO // FOUNDERS: SAI RIO &amp; EDISON
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[88px] xl:text-[104px] font-extrabold tracking-tighter leading-[0.92] text-white">
            <span className="hero-heading-line block">WE BUILD</span>
            <span className="hero-heading-line block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              SYSTEMS THAT<br className="hidden md:block"/>FEEL IMPOSSIBLE.
            </span>
          </h1>
        </div>

        {/* Description & Narrative */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="hero-narrative text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              An elite technology studio building autonomous AI systems, software products,
              high-performance web experiences, and experimental digital architectures. Founded by{" "}
              <strong className="text-white font-semibold">Sai Rio</strong> and{" "}
              <strong className="text-white font-semibold">Edison</strong> — two builders executing directly
              with zero corporate nonsense.
            </p>

            {/* Dual Founder Micro-Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="hero-founder-badge px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">Sai Rio</span>
                <span className="text-zinc-500">/ Product • Engineering • AI • Systems • Vision</span>
              </div>
              <div className="hero-founder-badge px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-white font-semibold">Edison</span>
                <span className="text-zinc-500">/ Development • Technology • Engineering • Building</span>
              </div>
            </div>
          </div>

          {/* Action CTAs with Magnetic Attraction on Desktop */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3">
            <AevionMagnetic strength={0.3}>
              <Link
                href="/projects"
                className="hero-cta-button inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-black font-bold text-[11px] uppercase font-mono tracking-[0.1em] hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              >
                EXPLORE OUR WORK <ArrowUpRight size={16} />
              </Link>
            </AevionMagnetic>

            <AevionMagnetic strength={0.25}>
              <Link
                href="/contact"
                className="hero-cta-button inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-mono text-[11px] uppercase tracking-[0.1em] transition-all"
              >
                BUILD WITH US <ArrowUpRight size={14} className="text-emerald-400" />
              </Link>
            </AevionMagnetic>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Deck */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "FOUNDER CORE", value: "2 Equal Builders", detail: "Sai Rio & Edison" },
            { label: "ENGINEERING STACK", value: "Next.js 16 • React 19", detail: "TypeScript • Three.js • GSAP" },
            { label: "COMPUTE ARCHITECTURE", value: "Edge & Serverless", detail: "Vercel Distributed Runtimes" },
            { label: "DISCIPLINE SPECTRUM", value: "AI + Systems + Motion", detail: "Production Verified" },
          ].map((m, i) => (
            <div
              key={i}
              className="hero-metric-card p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
            >
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{m.label}</div>
              <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">{m.value}</div>
              <div className="text-[11px] font-mono text-emerald-400/80 mt-0.5">{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
