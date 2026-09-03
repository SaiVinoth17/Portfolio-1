import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import { LAB_EXPERIMENTS } from "@/lib/data/labExperiments";
import { FlaskConical, Sparkles, ArrowRight, Cpu, Activity, LayoutGrid } from "lucide-react";
import LabDepthShowcase from "@/components/lab/LabDepthShowcase";

export const metadata: Metadata = constructMetadata({
  title: "Aevion Lab · Interactive WebGL & Computational R&D",
  description:
    "Explore Aevion Studio's experimental laboratory: interactive WebGL graphics, custom GLSL shaders, 3D physics engines, and GPU-accelerated interface research.",
  path: "/lab",
  keywords: [
    "Aevion Lab",
    "WebGL Experiments",
    "Three.js Shader Lab",
    "Interactive 3D Web",
    "Creative Technology R&D",
  ],
});

const LAB_FAQS = [
  {
    question: "What is Aevion Lab?",
    answer:
      "Aevion Lab is our internal research and development incubator where Sai Rio and Edison stress-test bleeding-edge WebGL graphics, GLSL mathematical shaders, real-time physics engines, and GPU interfaces before deploying them to client software.",
  },
  {
    question: "Are Aevion Lab experiments production-ready?",
    answer:
      "Yes. Every published experiment is engineered with adaptive device pixel ratios (DPR), viewport-aware rendering loops, and accessibility fallbacks so they run smoothly on modern mobile and desktop devices without draining battery life.",
  },
  {
    question: "Can these interactive WebGL experiments be integrated into our company website?",
    answer:
      "Absolutely. We frequently architect custom variations of these shaders, 3D product visualizers, and interactive canvases for our clients' flagship digital products.",
  },
];

export default function LabIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Lab", url: "/lab" },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(LAB_FAQS)) }}
      />

      {/* Header */}
      <header className="space-y-6 max-w-3xl border-b border-white/10 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-mono uppercase tracking-widest">
          <FlaskConical size={13} /> Interactive Technology Laboratory
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white font-mono">
          AEVION LAB //
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
            GRAPHICS &amp; R&amp;D.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          Where mathematical shaders meet real-time physics. Inspect our published experiments in
          fluid dynamics, procedural geometry deformation, and hardware-accelerated 3D models.
        </p>
      </header>

      {/* 3D Depth Carousel Showcase */}
      <div className="pt-12 pb-6">
        <LabDepthShowcase experiments={LAB_EXPERIMENTS} />
      </div>

      {/* Experiments Grid */}
      <section className="py-16 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            <LayoutGrid size={14} className="text-purple-400" />
            <span>Complete Experimental Index ({LAB_EXPERIMENTS.length})</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">SORTED BY ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_EXPERIMENTS.map((exp) => (
            <Link
              key={exp.slug}
              href={`/lab/${exp.slug}`}
              className="group p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-5 shadow-xl hover:-translate-y-1 duration-200"
            >
              <div className="space-y-4">
                {/* 4:5 Cinematic Visual Banner */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-purple-500/30 transition-colors bg-zinc-900">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-white/10 text-white font-bold">
                      {exp.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {exp.status}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {exp.slug === "threejs-master" && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        OFFICIAL MASTER
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                    {exp.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans mt-1.5 leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>RENDERER</span>
                  <span className="text-zinc-300">{exp.renderer}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>MOBILE</span>
                  <span className="text-cyan-400">{exp.mobileSupport}</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-purple-400 font-bold text-xs">
                  <span>LAUNCH EXPERIMENT</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AEO FAQ */}
      <section className="py-12 border-t border-white/10 space-y-8">
        <div>
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
            Laboratory Insights
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            CREATIVE TECHNOLOGY QUESTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LAB_FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-3 font-mono text-xs"
            >
              <h3 className="text-sm font-bold text-white leading-snug">{faq.question}</h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
