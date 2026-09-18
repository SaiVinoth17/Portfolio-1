"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowUpRight, Github, Layers, Compass, Sparkles, Gamepad2, Laptop, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";
import { AevionMagnetic } from "@/components/motion/AevionMagnetic";

interface CaseStudy {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: string;
  accentColor: string;
  icon: typeof Compass;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "nilgiris-explorers",
    number: "01",
    name: "Nilgiris Explorers",
    category: "AI & Geospatial Platform",
    tagline: "Autonomous travel discovery & interactive mountain mapping engine.",
    problem:
      "Travelers visiting the Nilgiris (Ooty) struggled with fragmented, static guidebooks and poor real-time trail data across rugged mountainous terrain.",
    solution:
      "Engineered an immersive discovery platform featuring dynamic terrain mapping, AI-curated personalized itineraries, high-speed cached offline support, and fluid momentum scroll transitions.",
    outcome:
      "Optimized initial page loads with structured metadata, interactive geospatial maps, and responsive layouts across mobile and desktop devices.",
    technologies: ["Next.js 16", "TypeScript", "GSAP", "Supabase", "MapboxGL", "Tailwind CSS"],
    demoUrl: "/projects/nilgiris-explorers",
    githubUrl: "https://github.com/aevionstudio",
    status: "SHIPPED & LIVE",
    accentColor: "#f59e0b",
    icon: Compass,
  },
  {
    id: "ooty-mistwings",
    number: "02",
    name: "Ooty Mistwings",
    category: "Luxury Hospitality & WebGL UI",
    tagline: "Cinematic digital storytelling with integrated reservation mechanics.",
    problem:
      "Traditional resort websites felt clinical and generic, failing to communicate the sensory magic and atmosphere of a luxury Nilgiri resort stay.",
    solution:
      "Designed a cinematic digital experience powered by GSAP scroll triggers, WebGL visual storytelling, smooth ambient audio, and instant friction-free booking flows.",
    outcome:
      "Elevated brand perception and extended user session engagement through bespoke visual storytelling and GPU-accelerated motion.",
    technologies: ["Next.js", "GSAP 3", "Three.js", "WebGL Shaders", "Tailwind CSS", "Stripe API"],
    demoUrl: "/projects/ooty-mistwings",
    githubUrl: "https://github.com/aevionstudio",
    status: "SHIPPED & LIVE",
    accentColor: "#a78bfa",
    icon: Sparkles,
  },
  {
    id: "gaming-kingdom",
    number: "03",
    name: "Gaming Kingdom",
    category: "Real-Time WebSocket Gaming Portal",
    tagline: "High-concurrency multiplayer hub with bi-directional socket sync.",
    problem:
      "Web gaming hubs frequently suffered from socket latency spikes, UI stutter during high player concurrency, and clunky social leaderboard updates.",
    solution:
      "Architected a low-latency socket engine paired with an aggressive frontend caching layer, live score streaming, and an arcade-inspired responsive UI.",
    outcome:
      "Demonstrated resilient real-time state synchronization under concurrent WebSocket messaging with responsive client rendering.",
    technologies: ["React 19", "Node.js", "Socket.io", "PostgreSQL", "Tailwind CSS", "Web Audio API"],
    demoUrl: "/projects/gaming-kingdom",
    githubUrl: "https://github.com/aevionstudio",
    status: "SHIPPED & LIVE",
    accentColor: "#34d399",
    icon: Gamepad2,
  },
  {
    id: "house-of-petalss",
    number: "04",
    name: "House of Petalss",
    category: "E-Commerce & Florist Platform",
    tagline: "Interactive flower boutique booking & digital storefront in Ooty.",
    problem:
      "Traditional floral shops in Ooty lacked an interactive digital presence with real-time bouquet previews and friction-free direct booking funnels.",
    solution:
      "Engineered an elegant storefront with high-resolution floral curation catalogs, instant WhatsApp direct order uplink, and mobile-first fluid browsing.",
    outcome:
      "Delivered crisp floral visual fidelity, responsive booking interactions, and sub-second page performance across mobile devices.",
    technologies: ["Next.js", "React 19", "Tailwind CSS", "TypeScript", "Framer Motion"],
    demoUrl: "/projects/house-of-petalss",
    githubUrl: "https://github.com/aevionstudio",
    status: "SHIPPED & LIVE",
    accentColor: "#ec4899",
    icon: ShoppingBag,
  },
  {
    id: "aevion-studio-os",
    number: "05",
    name: "Aevion Studio OS",
    category: "Brand Motion & Experimental Lab",
    tagline: "The studio's flagship interactive operating system & 3D sandbox.",
    problem:
      "Generic agency portfolios were boring and failed to demonstrate high-end technical capability in the browser.",
    solution:
      "Created an OS-grade interactive portfolio with customizable command palette, WebGL laboratory, terminal developer mode, and smooth Lenis scroll mechanics.",
    outcome:
      "A living technology demonstration designed, architected, and engineered from scratch by Sai Rio to showcase studio capability in real time.",
    technologies: ["Next.js 16", "Three.js", "GSAP", "Lenis", "OGL", "Groq AI"],
    demoUrl: "/projects/aevion-studio-os",
    githubUrl: "https://github.com/aevionstudio",
    status: "PRODUCTION CORE",
    accentColor: "#38bdf8",
    icon: Laptop,
  },
];

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      // 1. Eyebrow Terminal Decode
      gsap.to(".work-eyebrow-text", {
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 85%",
          once: true,
        },
        scrambleText: {
          text: "PRODUCTION CASE STUDIES",
          chars: "0101#@*!",
          speed: 0.35,
        },
        duration: 0.8,
        ease: "none",
      });

      // 2. Headline Staged Line Displacement
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 82%",
          once: true,
        },
      });

      headlineTl
        .fromTo(
          ".work-hl-line1",
          { x: -35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          ".work-hl-line2",
          { x: 35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "<0.1"
        )
        .fromTo(
          ".work-header-desc",
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".work-archive-btn",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );

      // 3. Project Cards Progressive Reveal
      const cards = gsap.utils.toArray<HTMLElement>(".case-study-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // Case numbers rolling transition
      gsap.utils.toArray<HTMLElement>(".case-num-text").forEach((el) => {
        const text = el.innerText;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          scrambleText: {
            text: text,
            chars: "0123456789",
            speed: 0.3,
          },
          duration: 0.6,
          ease: "none",
        });
      });

      // Project names tracking snap
      gsap.fromTo(
        ".case-name-text",
        { letterSpacing: "-0.04em", y: 12, opacity: 0 },
        {
          letterSpacing: "0em",
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-study-card",
            start: "top 78%",
            once: true,
          },
        }
      );

      // Categories tracking expansion
      gsap.fromTo(
        ".case-cat-text",
        { letterSpacing: "0.05em", opacity: 0 },
        {
          letterSpacing: "0.18em",
          opacity: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".case-study-card",
            start: "top 78%",
            once: true,
          },
        }
      );

      // Narrative boxes directional entrance
      gsap.fromTo(
        ".case-narrative-box",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".case-study-card",
            start: "top 72%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative scroll-mt-20 bg-[#050509] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Section Header */}
        <div className="work-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400 select-none">
              <Layers size={13} />
              <span className="work-eyebrow-text">PRODUCTION CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white select-none">
              <span className="work-hl-line1 block">SELECTED</span>
              <span className="work-hl-line2 block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                SYSTEMS &amp; ARCHITECTURE.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="work-header-desc text-sm font-mono text-zinc-400 leading-relaxed">
              Every project is a bespoke case study engineered with strict type safety, visual
              storytelling, and high-performance mechanics.
            </p>
            <div>
              <Link
                href="/projects"
                className="work-archive-btn inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-[0.1em] font-bold select-none"
              >
                ACCESS FULL ARCHIVE <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Large Format Editorial Case Studies */}
        <div className="space-y-12">
          {CASE_STUDIES.map((project) => {
            return (
              <div
                key={project.id}
                className="case-study-card rounded-3xl border border-white/10 bg-[#08080f] p-8 sm:p-12 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow accent */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ background: project.accentColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column: Number, Title, Overview */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 select-none">
                        <span className="case-num-text text-sm font-mono font-bold text-zinc-500">
                          CASE {project.number}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span
                          className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full"
                          style={{
                            background: `${project.accentColor}15`,
                            color: project.accentColor,
                            border: `1px solid ${project.accentColor}30`,
                          }}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="case-name-text text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-zinc-100 transition-colors select-none">
                          {project.name}
                        </h3>
                        <div className="case-cat-text text-xs font-mono text-zinc-400 mt-1 uppercase select-none">
                          {project.category}
                        </div>
                      </div>

                      <p className="case-tagline-text text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Stack & Links */}
                    <div className="space-y-6 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="case-tech-pill text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 select-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {project.demoUrl && (
                          <AevionMagnetic strength={0.25}>
                            <Link
                              href={project.demoUrl}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-zinc-200 transition-all hover:scale-105"
                            >
                              INITIALIZE DEMO <ArrowUpRight size={14} />
                            </Link>
                          </AevionMagnetic>
                        )}
                        {project.githubUrl && (
                          <AevionMagnetic strength={0.3}>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors block"
                              title="GitHub Repository"
                            >
                              <Github size={16} />
                            </a>
                          </AevionMagnetic>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Problem, Solution, Outcome Narrative */}
                  <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
                    <div className="case-narrative-box p-6 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-red-400/90 font-semibold select-none">
                        01 // THE CHALLENGE
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="case-narrative-box p-6 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold select-none">
                        02 // ARCHITECTURE &amp; SOLUTION
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div className="case-narrative-box p-6 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold select-none">
                        03 // MEASURABLE OUTCOME
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
