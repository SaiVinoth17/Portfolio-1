"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Clock } from "lucide-react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

const MILESTONES = [
  {
    phase: "PHASE 05",
    status: "CURRENT ERA",
    title: "Aevion Studio Motion OS & AI Synapse",
    desc: "Deployment of Aevion Motion Operating System, Groq-powered contextual AI engine, and interactive WebGL laboratory.",
    tags: ["Next.js 16", "Groq Llama", "Three.js", "Motion OS"],
    accent: "#34d399",
  },
  {
    phase: "PHASE 04",
    status: "DEPLOYED",
    title: "House of Petalss & The Gaming Kingdom",
    desc: "Shipped high-concurrency WebSocket arcade hub (The Gaming Kingdom) and modern floral boutique booking platform (House of Petalss) in Ooty.",
    tags: ["WebSockets", "E-Commerce", "React 19", "Real-Time"],
    accent: "#ec4899",
  },
  {
    phase: "PHASE 03",
    status: "DEPLOYED",
    title: "Ooty Mistwings & 3D Visual Storytelling",
    desc: "Architected cinematic WebGL luxury booking experience combining GSAP-driven narrative mechanics with Stripe payment flows.",
    tags: ["WebGL", "GSAP 3", "Interactive Booking"],
    accent: "#a78bfa",
  },
  {
    phase: "PHASE 02",
    status: "DEPLOYED",
    title: "Nilgiris Explorers & Geospatial Engine",
    desc: "Shipped full-scale geospatial travel discovery platform with AI itinerary generation, real-time trail routing, and MapboxGL.",
    tags: ["Geospatial AI", "Supabase", "MapboxGL"],
    accent: "#f59e0b",
  },
  {
    phase: "PHASE 01",
    status: "ORIGIN",
    title: "Founding of Aevion Studio",
    desc: "Aevion Studio was founded by Sai Rio and Edison with a singular vision: to establish an independent technology studio dedicated to engineering ambitious AI software and digital systems.",
    tags: ["Sai Rio", "Edison", "Studio Core"],
    accent: "#38bdf8",
  },
];

export default function JourneyTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      // 1. Eyebrow Tracking Collapse
      gsap.fromTo(
        ".timeline-eyebrow-text",
        { letterSpacing: "0.55em", opacity: 0 },
        {
          letterSpacing: "0.15em",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2. Headline Staged Line Slide
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-header",
          start: "top 82%",
          once: true,
        },
      });

      headlineTl
        .fromTo(
          ".timeline-hl-line1",
          { x: -35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          ".timeline-hl-line2",
          { x: 35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "<0.1"
        )
        .fromTo(
          ".timeline-header-desc",
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        );

      // 3. Timeline Milestones Progressive Reveal
      const items = gsap.utils.toArray<HTMLElement>(".timeline-milestone-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // Phase numbers rolling transition
      gsap.utils.toArray<HTMLElement>(".timeline-phase-text").forEach((el) => {
        const text = el.innerText;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          scrambleText: {
            text: text,
            chars: "0123456789PHASE",
            speed: 0.35,
          },
          duration: 0.6,
          ease: "none",
        });
      });

      // Status decode
      gsap.utils.toArray<HTMLElement>(".timeline-status-text").forEach((el) => {
        const text = el.innerText;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          scrambleText: {
            text: text,
            chars: "01ABCDEF#*",
            speed: 0.3,
          },
          duration: 0.5,
          ease: "none",
        });
      });

      // Milestone titles tracking snap
      gsap.fromTo(
        ".timeline-title-text",
        { letterSpacing: "-0.03em", y: 10, opacity: 0 },
        {
          letterSpacing: "0em",
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-milestone-item",
            start: "top 80%",
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
      id="timeline"
      className="relative scroll-mt-20 bg-[#030306] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Header */}
        <div className="timeline-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400 select-none">
              <Clock size={13} />
              <span className="timeline-eyebrow-text">BUILDING IN PUBLIC // THE CONTINUUM</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white select-none">
              <span className="timeline-hl-line1 block">THE EVOLUTION</span>
              <span className="timeline-hl-line2 block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                OF AEVION SYSTEMS.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="timeline-header-desc text-sm font-mono text-zinc-400 leading-relaxed">
              Tracking our chronological engineering leaps, product launches, and architectural
              milestones in full public view.
            </p>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {MILESTONES.map((m) => (
            <div key={m.phase} className="timeline-milestone-item relative group">
              {/* Timeline node dot */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-zinc-600 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center"
                style={{ backgroundColor: m.accent }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07070c] hover:border-white/20 transition-all duration-300 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 select-none">
                  <div className="flex items-center gap-3">
                    <span
                      className="timeline-phase-text text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md"
                      style={{
                        background: `${m.accent}15`,
                        color: m.accent,
                        border: `1px solid ${m.accent}30`,
                      }}
                    >
                      {m.phase}
                    </span>
                    <span className="timeline-status-text text-[11px] font-mono text-zinc-500">{m.status}</span>
                  </div>
                </div>

                <h3 className="timeline-title-text text-xl sm:text-2xl font-bold text-white tracking-tight select-none">
                  {m.title}
                </h3>

                <p className="timeline-desc-text text-sm text-zinc-400 font-light leading-relaxed max-w-3xl">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="timeline-tag-pill text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 select-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
