"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal, Activity, Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AevionText } from "@/components/motion";

const PRODUCTS = [
  {
    id: "aevion-os",
    icon: "⚡",
    name: "Aevion Studio OS",
    tagline: "The motion operating system for the web",
    desc: "A GPU-accelerated creative portfolio platform with WebGL experiments, command palette, GSAP scroll narratives, and a 941-frame cinematic sequence.",
    status: "LIVE",
    type: "Platform",
    color: "#1e3a5f",
    accent: "#3b82f6",
    href: "/",
    features: ["WebGL 3D Experiments", "GSAP Scroll Narratives", "AI Chat Interface", "Command Palette OS"],
    pricing: "Free · Open Portfolio",
  },
  {
    id: "aevion-ai",
    icon: "◈",
    name: "Aevion AI",
    tagline: "Streaming AI assistant built into every page",
    desc: "Real-time Groq LLM inference with streaming Server-Sent Events, structured tool-calling, and context-aware responses about the Aevion ecosystem.",
    status: "LIVE",
    type: "AI Tool",
    color: "#0f2942",
    accent: "#0ea5e9",
    href: "/",
    features: ["Groq Llama 3.3 Backend", "Real-Time SSE Streaming", "Tool-Calling Agents", "Context Memory"],
    pricing: "Integrated · Free",
  },
  {
    id: "aevion-components",
    icon: "▣",
    name: "Aevion Components",
    tagline: "Production-grade motion component library",
    desc: "A curated library of battle-tested React components with Framer Motion animations, GSAP integrations, and Three.js wrappers. TypeScript-first.",
    status: "COMING SOON",
    type: "Developer Tool",
    color: "#1a1030",
    accent: "#8b5cf6",
    href: "/contact",
    features: ["50+ Animated Components", "Three.js Wrappers", "GSAP Integrations", "TypeScript Native"],
    pricing: "Early Access · Register Now",
  },
  {
    id: "aevion-kit",
    icon: "⊛",
    name: "Aevion Starter Kit",
    tagline: "Next.js 16 + Supabase + AI boilerplate",
    desc: "Production-ready Next.js 16 starter with Supabase auth, Stripe billing, Groq AI integration, and the complete Aevion design system pre-configured.",
    status: "COMING SOON",
    type: "Boilerplate",
    color: "#0c1a10",
    accent: "#10b981",
    href: "/contact",
    features: ["Next.js 16 App Router", "Supabase + Stripe", "Groq AI Integration", "Full Design System"],
    pricing: "One-Time License · $299",
  },
];

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front face */}
        <div
          className="rounded-3xl p-8 border h-full backface-hidden"
          style={{ background: `linear-gradient(135deg, ${product.color} 0%, #ffffff08 100%)`, borderColor: `${product.accent}25`, backfaceVisibility: "hidden" }}
        >
          {/* Status badge */}
          <div className="flex items-center justify-between mb-8">
            <span
              className="text-[10px] font-mono font-bold px-3 py-1 rounded-full"
              style={{ background: `${product.accent}20`, color: product.accent, border: `1px solid ${product.accent}30` }}
            >
              {product.status}
            </span>
            <span className="text-[10px] font-mono text-zinc-600">{product.type}</span>
          </div>

          <div className="text-4xl mb-4">{product.icon}</div>
          <h3 className="text-2xl font-extrabold text-white mb-1">{product.name}</h3>
          <p className="text-xs font-mono mb-4" style={{ color: `${product.accent}` }}>{product.tagline}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8">{product.desc}</p>

          <div className="flex items-center gap-3">
            <Link
              href={product.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white"
              style={{ background: `linear-gradient(135deg, ${product.accent}, ${product.accent}aa)` }}
            >
              Open <ExternalLink size={12} />
            </Link>
            <button
              onClick={() => setFlipped(true)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs border border-white/12 text-zinc-400 hover:text-white transition-colors"
            >
              Pricing →
            </button>
          </div>
        </div>

        {/* Back face — Pricing */}
        <div
          className="absolute inset-0 rounded-3xl p-8 border flex flex-col"
          style={{
            background: `linear-gradient(135deg, ${product.color} 0%, #ffffff10 100%)`,
            borderColor: `${product.accent}25`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-xs font-mono font-bold tracking-widest mb-6" style={{ color: product.accent }}>PRICING & FEATURES</div>

          <div className="flex-1 space-y-3 mb-8">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                <span style={{ color: product.accent }} className="font-mono text-xs">✓</span>
                {f}
              </div>
            ))}
          </div>

          <div className="border-t pt-5 mb-6" style={{ borderColor: `${product.accent}20` }}>
            <div className="text-lg font-extrabold text-white">{product.pricing}</div>
          </div>

          <div className="flex gap-3">
            <Link href={product.href} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-black" style={{ background: product.accent }}>
              Get Started <ArrowUpRight size={12} />
            </Link>
            <button onClick={() => setFlipped(false)} className="px-4 py-3 rounded-xl border border-white/10 text-xs text-zinc-500 hover:text-white transition-colors">
              ←
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsPage() {
  return (
    <main
      className="min-h-screen text-zinc-900 selection:bg-blue-600 selection:text-white"
      style={{ background: "#ffffff" }}
    >
      <div className="relative pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Hero — clean App Store energy */}
        <section className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-50 text-blue-600 text-xs font-mono mb-8">
            <Package size={12} />
            <AevionText variant="eyebrow" text={`AEVION PRODUCTS · ${PRODUCTS.length} LAUNCHES`} />
          </div>

          <AevionText
            as="h1"
            variant="display"
            text="First-party software tools & platforms."
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6 text-zinc-900 text-center"
          />

          <AevionText
            variant="paragraph"
            text="Proprietary tools, developer runtimes, and motion platforms engineered by Aevion Studio. Click any card to inspect technical specifications."
            className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed text-center"
            delay={0.15}
          />
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </section>

        {/* Enterprise CTA */}
        <section
          className="rounded-3xl p-12 text-center border-2 border-zinc-100"
          style={{ background: "linear-gradient(135deg, #f8faff, #eef2ff)" }}
        >
          <AevionText
            variant="eyebrow"
            text="ENTERPRISE & BESPOKE"
            className="text-xs font-mono font-bold text-blue-600 tracking-widest mb-4"
          />
          <AevionText
            as="h2"
            variant="section"
            text="Need a bespoke platform?"
            className="text-3xl font-extrabold text-zinc-900 mb-3 text-center"
          />
          <AevionText
            variant="paragraph"
            text="We partner with visionary teams to build dedicated software architectures. Inquire directly."
            className="text-zinc-500 text-sm mb-8 max-w-md mx-auto text-center"
          />
          <AevionText variant="button">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #1e3a5f, #3b82f6)", boxShadow: "0 0 40px #3b82f630" }}
            >
              Contact for Enterprise <ArrowUpRight size={16} />
            </Link>
          </AevionText>
        </section>
      </div>
    </main>
  );
}
