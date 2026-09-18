"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Radio,
  ShoppingBag,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/data/projects";
import GeoTerrainEngine from "@/components/interactive/GeoTerrainEngine";
import OSDesktop from "@/components/interactive/OSDesktop";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
  nextProject: Project;
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
  nextProject,
}: ProjectDetailClientProps) {
  return (
    <main className="min-h-screen bg-transparent relative z-10 text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft size={14} /> BACK TO ARCHIVE
        </Link>
      </div>

      {/* Hero Header */}
      <section className="space-y-6 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
              style={{
                backgroundColor: `${project.color}15`,
                borderColor: `${project.color}35`,
                color: project.accent,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              ENGINEERING SPECIFICATION // {project.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight font-sans">
            {project.title}
          </h1>

          <p className="text-zinc-400 max-w-3xl font-mono text-sm leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold text-xs rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              Launch Live Demo <ExternalLink size={14} />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-400 font-mono text-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>Specification &amp; Architecture Showcase</span>
            </div>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-2xl hover:border-emerald-500/40 transition-all"
            >
              <Github size={14} /> View Source Code
            </a>
          )}
        </div>
      </section>

      {/* Cinematic Banner */}
      <section className="mb-16 rounded-3xl overflow-hidden border border-white/10 relative h-[380px] sm:h-[480px] shadow-2xl">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.category} Screenshot & Architecture Banner`}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-emerald-400 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider">{project.status}</span>
          </div>
          <span className="text-white font-bold">{project.metrics}</span>
        </div>
      </section>

      {/* Domain-Specific Interactive Storytelling Hub */}
      <section className="mb-16">
        {project.specialType === "travel" && <GeoTerrainEngine />}
        {project.specialType === "ai-os" && <OSDesktop />}

        {project.specialType === "ecommerce" && (
          <div className="p-8 rounded-3xl border border-pink-500/20 bg-zinc-950 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400 font-bold">
                <ShoppingBag size={16} /> FLORAL E-COMMERCE &amp; DIRECT ORDER SYSTEM
              </div>
              <span className="text-xs font-mono text-zinc-400">Mobile-First Florist Platform</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">CATALOG PIPELINE</span>
                <p className="text-pink-400 font-bold text-sm">Visual Bouquet Curation</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">ORDERING ENGINE</span>
                <p className="text-white font-bold text-sm">Direct WhatsApp Uplink</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">LOAD PERFORMANCE</span>
                <p className="text-cyan-400 font-bold text-sm">Sub-800ms WebP Edge Delivery</p>
              </div>
            </div>
          </div>
        )}

        {project.specialType === "motion" && (
          <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Zap size={16} /> GPU COMPOSITED MOTION SPECS
              </div>
              <span className="text-xs font-mono text-zinc-400">GSAP 3 + Lenis Momentum</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">FRAME RATE</span>
                <p className="text-emerald-400 font-bold text-sm">Native Refresh Rate (V-Sync)</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">LAYOUT SHIFT (CLS)</span>
                <p className="text-white font-bold text-sm">0.000 (Perfect Zero)</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">ACCELERATION</span>
                <p className="text-cyan-400 font-bold text-sm">GPU Layer Compositing</p>
              </div>
            </div>
          </div>
        )}

        {project.specialType === "gaming" && (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Radio size={16} /> CYBERPUNK HUD TELEMETRY
              </div>
              <span className="text-xs font-mono text-zinc-400">Web Audio API Synth</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">AUDIO ENGINE</span>
                <p className="text-emerald-400 font-bold text-sm">Harmonic Sound FX Synth</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">INPUT LATENCY</span>
                <p className="text-cyan-400 font-bold text-sm">&lt;15ms Instant Socket Sync</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-zinc-500">GLASSMORPHISM</span>
                <p className="text-white font-bold text-sm">Custom Backdrop Shader</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Grid: Deep Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8 mb-16">
        {/* Left 2 Columns: Architecture, Problem & Approach */}
        <div className="lg:col-span-2 space-y-8">
          {/* Narrative: Problem and Solution */}
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-emerald-400" size={20} /> Architectural Narrative
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm">{project.description}</p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-red-400/90 font-bold">
                  01 // THE CHALLENGE &amp; PROBLEM
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  02 // ARCHITECTURE &amp; APPROACH
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.approach}</p>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  03 // VERIFIED OUTCOMES
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.metrics}</p>
              </div>
            </div>
          </div>

          {/* What We Built / Core Deliverables */}
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-emerald-400" size={20} /> What We Built
            </h2>
            <p className="text-xs font-mono text-zinc-400">
              PRODUCTION DELIVERABLES SHIPPED FOR {project.title.toUpperCase()}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.whatWeBuilt.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-2.5 text-xs text-zinc-300"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Challenges & Takeaways */}
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={20} /> Engineering Challenges &amp; Solutions
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold tracking-wider">CHALLENGE:</span>
                <p className="text-zinc-300 leading-relaxed font-sans">{project.challenges}</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold tracking-wider">ENGINEERED SOLUTION:</span>
                <p className="text-zinc-300 leading-relaxed font-sans">{project.lessons}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Tech Stack & Score */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-emerald-400" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="text-emerald-400" size={18} /> Verified Metrics
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold leading-relaxed">
              {project.metrics}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
              PROJECT REPOSITORY &amp; ACCESS
            </h3>
            <div className="space-y-3 pt-1">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
                >
                  <span>Verified Live Deployment</span>
                  <ExternalLink size={12} className="text-emerald-400" />
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-zinc-500">
                  Case Study Mode (Internal Specification)
                </div>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
                >
                  <span>Studio GitHub Organization</span>
                  <Github size={12} className="text-emerald-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-white/10 pt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold mb-1">
                DISCOVER MORE ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Related Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              All Projects <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/projects/${rel.slug}`}
                className="group p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-white/25 transition-all duration-300 space-y-4 block backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${rel.color}15`,
                      color: rel.accent,
                      border: `1px solid ${rel.color}30`,
                    }}
                  >
                    {rel.category}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1 line-clamp-2 leading-relaxed">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {rel.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Footer Bar */}
      {nextProject && (
        <section className="border-t border-white/10 pt-12">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                NEXT CASE STUDY //
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">{nextProject.subtitle}</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center">
              <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                EXPLORE SPECIFICATION
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
