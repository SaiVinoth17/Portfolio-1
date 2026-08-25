"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Sparkles, ChevronDown, Activity, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function AevionHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 18), 85);
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
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    let localMouseX = width / 2;
    let localMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      localMouseX = e.clientX;
      localMouseY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      const gridSize = 50;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Distance to mouse
        const dx = localMouseX - p.x;
        const dy = localMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        let alpha = p.baseAlpha;
        if (dist < maxDist) {
          alpha = p.baseAlpha + (1 - dist / maxDist) * 0.6;
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        ctx.fillStyle = `rgba(52, 211, 153, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - distNodes / 110) * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Interactive cursor glow
      const grad = ctx.createRadialGradient(
        localMouseX,
        localMouseY,
        0,
        localMouseX,
        localMouseY,
        320
      );
      grad.addColorStop(0, "rgba(52, 211, 153, 0.08)");
      grad.addColorStop(0.5, "rgba(16, 185, 129, 0.02)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#030306] text-white flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-8 lg:px-16 selection:bg-emerald-500 selection:text-black">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Top telemetry bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 border-b border-white/10 text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AEVION STUDIO // v2.6.4</span>
          </div>
          <span className="text-zinc-500 hidden md:inline">•</span>
          <span className="text-zinc-400 hidden md:inline">QUANTUM CORE ACTIVE</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Cpu size={12} className="text-emerald-400" />
            <span>AI SYNAPSE: ONLINE</span>
          </span>
          <span>•</span>
          <span className="text-zinc-300 font-bold">FOUNDED BY SAI RIO &amp; EDISON</span>
        </div>
      </div>

      {/* Main Center Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 lg:py-24 flex flex-col justify-center">
        {/* Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 self-start"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
            Two Builders • One Vision • Technology Without Limits
          </span>
        </motion.div>

        {/* Monolithic Brand Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="text-[12px] sm:text-sm font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold">
            AEVION TECHNOLOGY STUDIO
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[100px] xl:text-[116px] font-extrabold tracking-tighter leading-[0.92] text-white">
            WE BUILD<br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              WHAT&apos;S NEXT.
            </span>
          </h1>
        </motion.div>

        {/* Description & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              An experimental AI software and high-performance technology studio founded by <strong className="text-white font-semibold">Sai Rio</strong> and <strong className="text-white font-semibold">Edison</strong>. We turn complex computational challenges into ultra-fast, cinematic digital reality.
            </p>

            {/* Dual Founder Micro-Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">Sai Rio</span>
                <span className="text-zinc-500">/ Product • Engineering • AI</span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-white font-semibold">Edison</span>
                <span className="text-zinc-500">/ Technology • Systems • Building</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase font-mono tracking-wider hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              Selected Systems <ArrowUpRight size={16} />
            </Link>

            <Link
              href="#founders"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              Meet The Founders
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Live Metrics Deck */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "FOUNDING CORES", value: "2 Equal Builders", detail: "Sai Rio & Edison" },
            { label: "ENGINEERING STACK", value: "Next.js 16 • Three.js", detail: "TypeScript • Groq" },
            { label: "COMPUTE ARCHITECTURE", value: "Edge Distributed", detail: "< 24ms Cold Start" },
            { label: "SYSTEM STATUS", value: "Production Operational", detail: "100% Zero Bloat" },
          ].map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
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
