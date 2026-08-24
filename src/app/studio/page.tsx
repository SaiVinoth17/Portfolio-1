"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Cpu, Zap, Globe2, Building2, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  { title: "Engineer-Led", body: "Every decision at Aevion starts with the engineering team. No feature ships without a solid technical foundation." },
  { title: "Craft Obsessed", body: "We obsess over the details: loading performance, animation fidelity, type safety, code clarity. Average is not in our vocabulary." },
  { title: "Creatively Driven", body: "Beautiful software isn't a luxury — it's a competitive advantage. Motion, texture, and interaction design are core disciplines." },
  { title: "Client-Partnered", body: "We're not vendors. We're embedded partners who care about your product's success as much as you do." },
];

const CAPABILITIES = [
  { icon: Cpu, label: "AI Engineering", detail: "LLMs, RAG, Streaming Agents" },
  { icon: Zap, label: "Motion & WebGL", detail: "GSAP, Three.js, Framer" },
  { icon: Globe2, label: "Full-Stack SaaS", detail: "Next.js, Supabase, Node" },
  { icon: Building2, label: "Product Architecture", detail: "System Design, Scalability" },
  { icon: Users, label: "Brand Experience", detail: "Identity, Motion, Copywriting" },
  { icon: ShieldCheck, label: "Security Engineering", detail: "RLS, Auth, Hardening" },
];

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (active) {
      let iterations = 0;
      const max = text.length * 2;
      intervalRef.current = setInterval(() => {
        iterations++;
        setDisplay(
          text.split("").map((c, i) =>
            i < Math.floor(iterations / 2) || c === " " ? c : chars[Math.floor(Math.random() * chars.length)]
          ).join("")
        );
        if (iterations >= max) {
          setDisplay(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 35);
    } else {
      setDisplay(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, text]);

  return <span>{display}</span>;
}

export default function StudioPage() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (
    <main
      className="min-h-screen text-white selection:bg-rose-500 selection:text-white"
      style={{ background: "#111111" }}
    >
      {/* Rose-gold diagonal split overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{ background: "linear-gradient(135deg, #f43f5e 0%, transparent 50%, #fb7185 100%)" }}
      />

      {/* Hero — Cinematic full-width */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #181010 0%, #111111 100%)" }}
      >
        {/* Diagonal decorative lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: "200%",
                height: "1px",
                background: `linear-gradient(90deg, transparent, #f43f5e${(12 - i * 2).toString(16).padStart(2, "0")}, transparent)`,
                top: `${10 + i * 18}%`,
                left: "-50%",
                transform: `rotate(-8deg)`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/25 bg-rose-500/10 text-rose-400 text-xs font-mono mb-10">
            <Sparkles size={12} /> AEVION STUDIO · ESTABLISHED 2024
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-extrabold tracking-tighter leading-none mb-8">
            <span className="text-white">We make</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #f43f5e 0%, #fb923c 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              software sing.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Aevion Studio is an elite creative technology studio. We engineer AI-first products, GPU-accelerated web experiences, and full-stack platforms for teams that refuse to settle for ordinary.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-sm"
              style={{ background: "linear-gradient(135deg, #f43f5e, #fb7185)", boxShadow: "0 0 50px #f43f5e30" }}
            >
              Our Services <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-sm border border-white/15 hover:border-rose-500/40 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="text-[10px] font-mono text-zinc-600 tracking-widest">SCROLL</div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </div>
      </section>

      {/* Studio Philosophy */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-rose-500 mb-6">STUDIO PHILOSOPHY</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
              Software built with the precision of engineering and the soul of art.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              We believe that truly great software is indistinguishable from craft. Performance, correctness, and beauty are not tradeoffs — they are our baseline.
            </p>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors"
            >
              See Our Process <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Rotating philosophy quotes */}
          <div className="relative">
            <div className="space-y-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className="p-6 rounded-2xl border border-white/8 hover:border-rose-500/25 transition-all cursor-default group"
                  style={{ background: hoveredPillar === i ? "#f43f5e08" : "transparent" }}
                >
                  <h3 className="text-sm font-bold text-white mb-1.5 font-mono">
                    <span className="text-rose-500/50 mr-2">0{i + 1}</span>
                    <ScrambleText text={p.title.toUpperCase()} active={hoveredPillar === i} />
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        className="px-4 sm:px-8 py-24"
        style={{ background: "linear-gradient(180deg, #111111 0%, #140e0e 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono font-bold tracking-widest text-rose-500 mb-4">CAPABILITIES</div>
            <h2 className="text-4xl font-extrabold text-white">What we do best.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-7 rounded-3xl border border-white/8 hover:border-rose-500/20 hover:bg-rose-500/3 transition-all group text-center"
                >
                  <Icon className="mx-auto mb-4 text-rose-400 group-hover:scale-110 transition-transform" size={28} />
                  <h3 className="text-sm font-bold text-white mb-1">{c.label}</h3>
                  <p className="text-xs text-zinc-600 font-mono">{c.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto py-24 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Ready to start?</h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">Tell us about your project and we&apos;ll architect the solution together.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-black text-sm"
          style={{ background: "linear-gradient(135deg, #f43f5e, #fb923c)", boxShadow: "0 0 60px #f43f5e25" }}
        >
          Start a Project <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
