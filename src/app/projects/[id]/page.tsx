"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ArrowLeft,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const PROJECT_DATA: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    overview: string;
    problem: string;
    solution: string;
    architecture: string[];
    techStack: string[];
    challenges: string;
    lessons: string;
    metrics: string;
    link: string;
    github: string;
  }
> = {
  "nilgiris-explorers": {
    title: "Nilgiris Explorers",
    subtitle: "Premium Tourism & Experience Discovery Platform",
    category: "Web Application • Travel Engine",
    overview:
      "Nilgiris Explorers is a high-performance travel and experience booking platform designed for Ooty and the Nilgiris district. It combines interactive map exploration, destination guides, and seamless booking workflows.",
    problem:
      "Travelers visiting Ooty faced fragmented, outdated travel websites with poor mobile responsiveness and slow page loading speeds.",
    solution:
      "Engineered a Next.js 16 App Router application featuring sub-second page transitions, dynamic maps, mobile-first responsive layouts, and structured SEO schema for local tourism.",
    architecture: [
      "Next.js 16 App Router Server Components",
      "React 19 & TypeScript Safety",
      "Tailwind CSS v4 Utility Styling",
      "JSON-LD Local Business Schema",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Vercel Edge"],
    challenges:
      "Optimizing high-resolution destination photographs without incurring Layout Thrashing or poor Largest Contentful Paint (LCP) on mobile networks.",
    lessons:
      "Utilizing Next.js image optimization along with WebP format reduced payload size by 68% while maintaining crisp image clarity.",
    metrics: "Lighthouse 98 Performance • 100% Mobile Responsive • Sub-second LCP",
    link: "https://nilgirisexplorers.com",
    github: "https://github.com/aevionstudio",
  },
  "ooty-mistwings": {
    title: "Ooty Mistwings",
    subtitle: "Cinematic Destination & Visual Storytelling Platform",
    category: "Creative Web Engineering • Destination Discovery",
    overview:
      "Ooty Mistwings is an immersive visual storytelling platform showcasing the natural landscapes, mist-covered valleys, and heritage sites of the Nilgiris through cinematic web motion.",
    problem:
      "Static travel blogs failed to capture the visual beauty of the Nilgiris, leading to low visitor engagement times.",
    solution:
      "Developed a creative web experience utilizing GSAP 3 ScrollTrigger, Lenis smooth scrolling, and GPU-accelerated parallax layers to create a 120 FPS visual experience.",
    architecture: [
      "GSAP 3 ScrollTrigger Engine",
      "Lenis Smooth Scroll Mechanics",
      "TypeScript Type Safety",
      "Parallax Layer Transformations",
    ],
    techStack: ["GSAP 3", "Lenis", "React 19", "TypeScript", "Tailwind v4"],
    challenges:
      "Synchronizing scroll-triggered animations across high-DPI desktop screens and mobile touch viewports without frame drops.",
    lessons:
      "Applying CSS translateZ(0) hardware acceleration and throttling scroll events ensured smooth 60-120 FPS rendering across all devices.",
    metrics: "120 FPS Motion Rendering • Zero Cumulative Layout Shift",
    link: "https://ootymistwings.com",
    github: "https://github.com/aevionstudio",
  },
  "gaming-kingdom": {
    title: "Gaming Kingdom",
    subtitle: "High-Performance Interactive Gaming Community Hub",
    category: "Frontend Architecture • Community Hub",
    overview:
      "Gaming Kingdom is a community platform engineered for gamers featuring live event tracking, interactive game catalogs, audio feedback, and dark glassmorphic styling.",
    problem:
      "Existing gaming portals were bloated with heavy ad scripts and slow JavaScript execution times, causing bad user experience.",
    solution:
      "Built a lightweight, component-driven React 19 application with instant state updates, dynamic filtering, and Web Audio sound feedback.",
    architecture: [
      "React 19 Concurrent Rendering",
      "Modular State Management",
      "Web Audio API Feedback Engine",
      "Dark Glassmorphic UI Tokens",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind v4", "Web Audio API"],
    challenges:
      "Managing complex client-side state across dynamic game catalog filters while maintaining fast rendering speeds.",
    lessons:
      "Decoupling filter state into lightweight custom hooks eliminated unnecessary component re-renders.",
    metrics: "60 FPS Interactive Feedback • Sub-50ms Response Latency",
    link: "https://ootythegamingkingdom.com",
    github: "https://github.com/aevionstudio",
  },
  "aevion-studio-os": {
    title: "Aevion Studio Motion OS v2.0",
    subtitle: "Awwwards-Grade Interactive Web Operating System",
    category: "Creative Engineering • AI Assistant",
    overview:
      "Aevion Studio Motion OS is an interactive web operating system embedded directly into the studio website, featuring magnetic cursor physics, Groq AI assistant, and telemetry.",
    problem:
      "Standard agency portfolios feel static and fail to demonstrate real full-stack and AI software capabilities.",
    solution:
      "Transformed the portfolio into a living motion environment featuring an AI assistant (Sai Vinoth AI), 3D scroll morphing, and interactive command palette.",
    architecture: [
      "Groq Llama 3.3 Versatile Engine",
      "Next.js 16 Serverless API Routes",
      "GSAP 3 & Framer Motion Physics",
      "Web Audio API Sound Engine",
    ],
    techStack: ["Next.js 16", "Groq SDK", "GSAP 3", "Framer Motion", "TypeScript"],
    challenges:
      "Integrating real-time AI token streaming with markdown code block rendering while keeping modal scrolling smooth.",
    lessons:
      "Implementing data-lenis-prevent and overflow-y-auto min-h-0 containers allowed independent modal scrolling without scroll hijacking.",
    metrics: "Awwwards-Grade Experience • 100% Type Safe",
    link: "https://aevion.studio",
    github: "https://github.com/aevionstudio",
  },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = PROJECT_DATA[id] || PROJECT_DATA["nilgiris-explorers"];

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Projects & Case Studies
        </Link>
      </div>

      {/* Header */}
      <section className="space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <FolderGit2 size={14} /> {project.category}
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
          {project.title}
        </h1>

        <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all inline-flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
          >
            Launch Live Demo <ExternalLink size={16} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold rounded-2xl transition-all inline-flex items-center gap-2 text-sm"
          >
            View Code Repository <Github size={16} />
          </a>
        </div>
      </section>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2 space-y-12">
          {/* Overview & Problem */}
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-emerald-400" size={22} /> Project Overview
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm">{project.overview}</p>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-amber-500/20 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">The Core Challenge</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{project.problem}</p>
            </div>
          </div>

          {/* Solution & Architecture */}
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-emerald-400" size={22} /> Solution & Engineering Decisions
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm">{project.solution}</p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-zinc-400">Architecture Components</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((arch, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges & Lessons */}
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={22} /> Engineering Challenges & Takeaways
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold">CHALLENGE:</span>
                <p className="text-zinc-300">{project.challenges}</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold">LESSON LEARNED:</span>
                <p className="text-zinc-300">{project.lessons}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Specs */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="text-emerald-400" size={18} /> Performance Score
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold">
              {project.metrics}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
