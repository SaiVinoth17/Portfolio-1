"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Briefcase, Sparkles, ArrowUpRight, Code2, Cpu, Zap, Users, Globe } from "lucide-react";
import Link from "next/link";

const ROLES = [
  {
    id: "ml",
    dept: "AI SYSTEMS",
    title: "AI/ML Integration Engineer",
    type: "Full-Time · Remote",
    level: "Senior",
    accent: "#8b5cf6",
    skills: ["Python", "LangChain", "Vector DBs", "FastAPI", "TypeScript"],
    perks: ["Equity", "Async-First", "Home Setup Budget", "Conference Budget"],
    desc: "Build and maintain production LLM pipelines, RAG architectures, and autonomous agent systems that power our AI product suite.",
  },
  {
    id: "fe",
    dept: "CREATIVE ENGINEERING",
    title: "Creative Frontend Engineer",
    type: "Full-Time · Remote",
    level: "Mid–Senior",
    accent: "#a78bfa",
    skills: ["Three.js", "GSAP", "React 19", "TypeScript", "WebGL"],
    perks: ["Equity", "Async-First", "Creative Freedom", "Hardware Budget"],
    desc: "Engineer world-class interactive web experiences: WebGL scenes, 120 FPS scroll animations, and cinematic motion design systems.",
  },
  {
    id: "fullstack",
    dept: "PLATFORM ENGINEERING",
    title: "Full-Stack Product Engineer",
    type: "Full-Time · Remote",
    level: "Mid-Level",
    accent: "#c4b5fd",
    skills: ["Next.js 16", "Supabase", "TypeScript", "Node.js", "Stripe"],
    perks: ["Equity", "Flexible Hours", "Learning Budget", "Open Source Time"],
    desc: "Build the SaaS platforms and cloud infrastructure that Aevion's clients depend on. Own features from database schema to deployed UI.",
  },
];

const VALUES = [
  { icon: Code2, title: "Engineering-First", body: "We don't cut corners. Every system is built for longevity, performance, and maintainability." },
  { icon: Users, title: "Async & Remote", body: "Fully distributed, async-first culture. Work from wherever you do your best thinking." },
  { icon: Zap, title: "Move Fast", body: "Tight cycles, real ownership, and shipping often. You'll have impact from day one." },
  { icon: Globe, title: "Open by Default", body: "We believe in open source, knowledge sharing, and building with the community." },
];

function RoleCard({ role, index }: { role: typeof ROLES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-3xl border overflow-hidden transition-all duration-300"
        style={{ borderColor: `${role.accent}20`, background: "rgba(255,255,255,0.03)" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-7 flex items-start justify-between gap-4 group"
        >
          <div className="flex items-start gap-4">
            {/* Frosted badge */}
            <div
              className="p-3 rounded-2xl backdrop-blur-xl mt-1 shrink-0"
              style={{ background: `${role.accent}15`, border: `1px solid ${role.accent}30` }}
            >
              <Briefcase size={18} style={{ color: role.accent }} />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: role.accent }}>{role.dept}</div>
              <h3 className="text-lg font-bold text-white mb-1">{role.title}</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono text-zinc-500">{role.type}</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full" style={{ background: `${role.accent}15`, color: role.accent }}>
                  {role.level}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-8 h-8 rounded-full flex items-center justify-center mt-1 shrink-0"
            style={{ background: `${role.accent}20`, border: `1px solid ${role.accent}30` }}
          >
            <ArrowUpRight size={14} style={{ color: role.accent }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-7 border-t space-y-6" style={{ borderColor: `${role.accent}15` }}>
                <p className="text-sm text-zinc-400 leading-relaxed mt-6">{role.desc}</p>

                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-600 mb-3">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((s) => (
                      <span key={s} className="text-xs font-mono px-3 py-1 rounded-lg" style={{ background: `${role.accent}12`, color: role.accent, border: `1px solid ${role.accent}25` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-600 mb-3">PERKS</div>
                  <div className="flex flex-wrap gap-2">
                    {role.perks.map((p) => (
                      <span key={p} className="text-xs font-mono px-3 py-1 rounded-lg border border-white/8 text-zinc-400">{p}</span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white"
                  style={{ background: `linear-gradient(135deg, ${role.accent}, #7c3aed)`, boxShadow: `0 0 30px ${role.accent}30` }}
                >
                  Apply for This Role <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CareersPage() {
  return (
    <main
      className="min-h-screen text-white selection:bg-violet-500 selection:text-white"
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #0a0f1e 60%, #080c18 100%)" }}
    >
      {/* Particle dots (pure CSS radial gradients) */}
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #8b5cf620 0%, transparent 40%), radial-gradient(circle at 80% 80%, #7c3aed15 0%, transparent 40%), radial-gradient(circle at 50% 50%, #6d28d910 0%, transparent 50%)",
      }} />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono mb-8"
          >
            <Sparkles size={12} /> WE&apos;RE HIRING · {ROLES.length} OPEN ROLES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            <span className="text-white">Build the</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              impossible.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-zinc-400 text-base leading-relaxed"
          >
            Aevion is a small, elite team that ships extraordinary software. If you obsess over craft, move fast, and want real ownership — we want to hear from you.
          </motion.p>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-xs font-mono font-bold tracking-widest text-violet-500 mb-6">OUR VALUES</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-3xl border border-white/8 backdrop-blur-xl hover:border-violet-500/25 transition-all group"
                  style={{ background: "rgba(139,92,246,0.05)" }}
                >
                  <div className="p-2.5 rounded-xl mb-4 w-fit" style={{ background: "#8b5cf620" }}>
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Open Roles */}
        <section className="mb-24">
          <div className="text-xs font-mono font-bold tracking-widest text-violet-500 mb-8">OPEN POSITIONS</div>
          <div className="space-y-4">
            {ROLES.map((r, i) => <RoleCard key={r.id} role={r} index={i} />)}
          </div>
        </section>

        {/* General application CTA */}
        <section
          className="rounded-3xl p-12 text-center border border-violet-500/15 backdrop-blur-xl"
          style={{ background: "radial-gradient(ellipse at center, #8b5cf608, transparent)" }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-3">Don&apos;t see your role?</h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">We always want to meet exceptional engineers and designers. Send us a speculative application.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", boxShadow: "0 0 40px #8b5cf630" }}
          >
            Send Speculative Application <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
