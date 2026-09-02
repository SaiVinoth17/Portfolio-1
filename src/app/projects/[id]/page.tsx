import { Metadata } from "next";
import ProjectDetailClient, { ProjectDetailData } from "./ProjectDetailClient";

export function generateStaticParams() {
  return [
    { id: "nilgiris-explorers" },
    { id: "ooty-mistwings" },
    { id: "gaming-kingdom" },
    { id: "aevion-studio-os" },
  ];
}

const PROJECT_DATA: Record<string, ProjectDetailData> = {
  "nilgiris-explorers": {
    title: "Nilgiris Explorers",
    subtitle: "Premium Tourism & Experience Discovery Platform",
    category: "Web Application • Travel Engine",
    overview:
      "A comprehensive digital experience platform engineered to showcase the wilderness, heritage tea estates, and trekking corridors of the Nilgiris (Ooty). Features interactive waypoint geometry, offline-first trail maps, and high-performance scroll mechanics.",
    problem:
      "Traditional tourism platforms were sluggish, loaded with generic ads, and failed to offer interactive spatial storytelling for travelers navigating remote mountain trails.",
    solution:
      "Architected a responsive Next.js application with interactive 3D terrain waypoints, cached offline trail documentation, and fluid momentum scroll sequences.",
    architecture: [
      "Dynamic Viewport Waypoint Engine",
      "Tailwind CSS v4 Responsive Token Grid",
      "Next.js 16 Edge Route Rendering",
      "Framer Motion Spring Interpolation",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    challenges:
      "Balancing high-resolution mountain photography with sub-second page loads on rural 4G mobile connections.",
    lessons:
      "Using Next.js Image optimization with responsive sizes attributes and CSS backdrop blurs delivered cinematic visual fidelity without bandwidth penalties.",
    metrics: "Production Active • Fluid 60+ FPS Motion",
    link: "https://nilgirisexplorers.com",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    specialType: "travel",
  },
  "ooty-mistwings": {
    title: "Ooty Mistwings",
    subtitle: "Sensory Hotel & Villa Reservation Engine",
    category: "Hospitality Architecture • Motion Experience",
    overview:
      "An award-caliber digital portal crafted for a luxury cliffside resort in the Nilgiris, highlighting ambient mist transitions, atmospheric audio, and friction-free direct reservations.",
    problem:
      "Hospitality aggregators strip resort identity and charge predatory fees while delivering cold, cookie-cutter booking experiences.",
    solution:
      "Engineered an emotive brand experience using GSAP scroll scrub timelines, Web Audio API soundscapes, and high-conversion reservation funnels.",
    architecture: [
      "GSAP 3 ScrollTrigger Timeline Sequencing",
      "Adaptive Web Audio Ambient Synthesizer",
      "Next.js Dynamic Route Caching",
      "Optimized GPU Transform Layers",
    ],
    techStack: ["Next.js 16", "GSAP 3", "Tailwind CSS", "Web Audio API"],
    challenges:
      "Synchronizing multiple ScrollTrigger scrub timelines without creating micro-stutters or frame drops on low-power devices.",
    lessons:
      "Using transform-only and opacity properties enabled smooth GPU compositing without triggering expensive browser repaint loops.",
    metrics: "GPU Composited Motion • Zero Layout Shift (CLS: 0)",
    link: "https://ootymistwings.com",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    specialType: "motion",
  },
  "gaming-kingdom": {
    title: "Gaming Kingdom",
    subtitle: "High-Performance Interactive Gaming Community Hub",
    category: "Frontend Architecture • Community Hub",
    overview:
      "A fast, visually engaging web platform designed to showcase modern frontend engineering, high responsiveness, and interactive UI components for gaming enthusiasts.",
    problem:
      "Gaming community hubs frequently suffer from heavy bundle sizes, slow re-renders, and poor mobile responsiveness.",
    solution:
      "Designed a lightweight, modular component architecture with instant state updates, dynamic filtering, and dark glassmorphic styling.",
    architecture: [
      "Modular Component Architecture",
      "Optimized React State Pipelines",
      "High-Performance CSS Grid System",
      "Web Audio Interaction Feedback",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Web Audio API"],
    challenges:
      "Balancing rich cyberpunk aesthetics with lightweight bundle delivery and instant client-side filtering responsiveness.",
    lessons:
      "Decoupling complex UI state from heavy renders kept input response latency consistently minimal.",
    metrics: "Fluid Interactive Feedback • Client-Side Filtering",
    link: "/projects/gaming-kingdom",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    specialType: "gaming",
  },
  "aevion-studio-os": {
    title: "Aevion Studio Motion OS v2.0",
    subtitle: "Interactive Web Operating System & 3D Lab",
    category: "Flagship Portfolio • AI & Motion Engine",
    overview:
      "The flagship digital experience for Aevion Studio — engineered with streaming AI conversation, hardware-accelerated 3D scroll physics, sound synthesis, and real-time telemetry.",
    problem:
      "Standard agency portfolios felt static, repetitive, and failed to demonstrate true full-stack engineering and creative graphics capabilities.",
    solution:
      "Transformed the website into a living motion operating system with real-time telemetry, Web Audio API sound synthesis, and interactive CLI terminal.",
    architecture: [
      "Next.js 16 App Router Architecture",
      "Groq Llama 3.3 Low-Latency AI Route",
      "Web Audio API Sound Engine",
      "GSAP 3 & Framer Motion Pipelines",
    ],
    techStack: ["Next.js 16", "Groq SDK", "React 19", "Three.js", "GSAP 3", "Tailwind v4"],
    challenges:
      "Building a multimodal assistant with streaming token responses, memory management, and error fallbacks without blocking the UI thread.",
    lessons:
      "Streaming tokens via Server-Sent Events (SSE) while rendering markdown live provided an instantaneous, premium user feel.",
    metrics: "Interactive Motion OS • Strict Type Safety",
    link: "https://aevionstudio.in",
    github: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    specialType: "ai-os",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_DATA[id] || PROJECT_DATA["nilgiris-explorers"];

  return {
    title: `${project.title} — Case Study | Aevion Studio`,
    description: project.overview,
    alternates: {
      canonical: `/projects/${id}`,
    },
    openGraph: {
      title: `${project.title} — Architecture Case Study | Aevion Studio`,
      description: project.overview,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECT_DATA[id] || PROJECT_DATA["nilgiris-explorers"];

  return <ProjectDetailClient project={project} />;
}
