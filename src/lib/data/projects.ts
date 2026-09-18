export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  whatWeBuilt: string[];
  features: string[];
  technologies: string[];
  metrics: string;
  challenges: string;
  lessons: string;
  liveUrl: string | null;
  githubUrl: string | null;
  image: string;
  images: string[];
  specialType: "travel" | "motion" | "gaming" | "ai-os" | "ecommerce";
  status: "SHIPPED & LIVE" | "PRODUCTION CORE" | "ACTIVE SPECIFICATION";
  year: string;
  tags: string[];
  color: string;
  accent: string;
  published: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "nilgiris-explorers",
    slug: "nilgiris-explorers",
    title: "Nilgiris Explorers",
    subtitle: "Premium Tourism & Geospatial Experience Discovery Platform",
    category: "AI & Geospatial Travel Engine",
    description:
      "An immersive travel discovery platform for the Nilgiri Hills featuring real-time mountain trail mapping, AI-curated itineraries, offline-first trail documentation, and dynamic terrain visualization.",
    problem:
      "Travelers visiting the Nilgiris (Ooty) struggled with fragmented, static guidebooks and poor real-time trail data across rugged mountainous terrain with intermittent connectivity.",
    approach:
      "Architected a responsive Next.js application with interactive 3D terrain waypoints, cached offline trail documentation, and fluid momentum scroll sequences.",
    whatWeBuilt: [
      "Dynamic Viewport Waypoint Geometry Engine",
      "Tailwind CSS v4 Responsive Token Grid",
      "Next.js 16 Edge Route Rendering",
      "Framer Motion Spring Interpolation",
      "Offline-first cached trail routing",
      "High-resolution geospatial terrain viewer",
    ],
    features: [
      "Real-time mountain trail routing",
      "Interactive 3D elevation waypoint viewer",
      "AI-assisted personalized itinerary generator",
      "Offline GPS trail documentation caching",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "GSAP",
      "Supabase",
      "MapboxGL",
      "Tailwind CSS",
    ],
    metrics: "Production Active • Fluid 60+ FPS Motion • Sub-second Page Loads",
    challenges:
      "Balancing high-resolution mountain photography with sub-second page loads on rural 4G mobile connections.",
    lessons:
      "Using Next.js Image optimization with responsive sizes attributes and CSS backdrop blurs delivered cinematic visual fidelity without bandwidth penalties.",
    liveUrl: "https://nilgirisexplorers.com/",
    githubUrl: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    ],
    specialType: "travel",
    status: "SHIPPED & LIVE",
    year: "2024",
    tags: ["AI", "Maps", "Discovery", "Geospatial"],
    color: "#f59e0b",
    accent: "#fbbf24",
    published: true,
  },
  {
    id: "gaming-kingdom",
    slug: "gaming-kingdom",
    title: "The Gaming Kingdom",
    subtitle: "High-Performance Interactive Gaming Portal & Community Hub",
    category: "Real-Time WebSocket Gaming Portal",
    description:
      "A fast, visually engaging web platform designed to showcase modern frontend engineering, high responsiveness, live multiplayer score synchronization, and interactive UI components for gaming enthusiasts in Ooty.",
    problem:
      "Gaming community hubs frequently suffer from heavy bundle sizes, slow re-renders, socket latency spikes under high player concurrency, and poor mobile responsiveness.",
    approach:
      "Architected a low-latency socket engine paired with an aggressive frontend caching layer, live score streaming, and an arcade-inspired responsive UI.",
    whatWeBuilt: [
      "Modular Component Architecture",
      "Optimized React State Pipelines",
      "High-Performance CSS Grid System",
      "Web Audio Interaction Feedback",
      "Real-time dynamic leaderboard streaming",
      "Low-latency WebSocket sync hub",
    ],
    features: [
      "Sub-15ms WebSocket state synchronization",
      "Dynamic client-side leaderboard filtering",
      "Arcade-inspired harmonic sound FX synthesis",
      "Cyberpunk dark glassmorphic styling",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Socket.io",
      "PostgreSQL",
      "Tailwind CSS",
      "Web Audio API",
    ],
    metrics: "Fluid Interactive Feedback • Sub-15ms Socket Sync • Instant Filtering",
    challenges:
      "Balancing rich cyberpunk aesthetics with lightweight bundle delivery and instant client-side filtering responsiveness.",
    lessons:
      "Decoupling complex UI state from heavy renders kept input response latency consistently minimal.",
    liveUrl: "https://www.ootythegamingkingdom.com/",
    githubUrl: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    ],
    specialType: "gaming",
    status: "SHIPPED & LIVE",
    year: "2023",
    tags: ["Real-Time", "Gaming", "WebSockets", "Arcade"],
    color: "#34d399",
    accent: "#6ee7b7",
    published: true,
  },
  {
    id: "house-of-petalss",
    slug: "house-of-petalss",
    title: "House of Petalss",
    subtitle: "Interactive Flower Booking & Boutique Florist Platform in Ooty",
    category: "E-Commerce & Interactive Florist Platform",
    description:
      "A modern digital boutique ordering and floral experience platform for House of Petalss in Ooty. Features visual arrangement catalogs, fresh bloom reservation flows, and friction-free direct inquiries.",
    problem:
      "Traditional florist shops and floral boutiques in Ooty struggled with manual phone orders, lack of real-time bouquet previews, and slow client booking pipelines.",
    approach:
      "Engineered a streamlined, elegant storefront showcasing curated floral arrangements, custom event bouquet bookings, and responsive mobile-first order workflows.",
    whatWeBuilt: [
      "Interactive Floral Catalog & Variant Selector",
      "Direct Booking & Event Inquiry Engine",
      "Mobile-Responsive Visual Showcase",
      "Optimized Image Assets & Fast Edge Delivery",
      "Direct WhatsApp & Contact Ordering Uplink",
      "Bespoke Color & Occasion Filter System",
    ],
    features: [
      "Fresh seasonal flower collection gallery",
      "Bespoke event arrangement reservations",
      "Instant direct florist inquiries and orders",
      "Fluid mobile-first browsing experience",
    ],
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    metrics: "Production Active • Fast Mobile Load Times • Seamless Booking Experience",
    challenges:
      "Presenting rich floral photography with vibrant natural color fidelity while preserving swift mobile load times on variable cellular networks.",
    lessons:
      "Modern WebP asset formatting and progressive image loading delivered crisp floral textures without layout shift or slow down.",
    liveUrl: "https://houseofpetalssooty.com/",
    githubUrl: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200&q=80",
    ],
    specialType: "ecommerce",
    status: "SHIPPED & LIVE",
    year: "2024",
    tags: ["E-Commerce", "Florist", "Booking", "Visual Storefront"],
    color: "#ec4899",
    accent: "#f472b6",
    published: true,
  },
  {
    id: "aevion-studio-os",
    slug: "aevion-studio-os",
    title: "Aevion Studio OS",
    subtitle: "Interactive Web Operating System & 3D Engineering Lab",
    category: "Brand Motion & Experimental Web OS",
    description:
      "The flagship digital experience for Aevion Studio — engineered with streaming AI conversation, hardware-accelerated 3D scroll physics, sound synthesis, and real-time telemetry.",
    problem:
      "Standard agency portfolios felt static, repetitive, and failed to demonstrate true full-stack engineering and creative graphics capabilities.",
    approach:
      "Transformed the website into a living motion operating system with real-time telemetry, Web Audio API sound synthesis, and interactive CLI terminal.",
    whatWeBuilt: [
      "Next.js 16 App Router Architecture",
      "Groq Llama 3.3 Low-Latency AI Route",
      "Web Audio API Sound Engine",
      "GSAP 3 & Framer Motion Pipelines",
      "Three.js 588 Master Examples Integration",
      "Zero-CLS GPU motion compositing system",
    ],
    features: [
      "Global Command Palette (Cmd+K / Ctrl+K)",
      "WebGL 3D Laboratory & Shaders",
      "Streaming AI Assistant (Aevion AI)",
      "Liquid glass navigation & kinetic scroll",
    ],
    technologies: [
      "Next.js 16",
      "Groq SDK",
      "React 19",
      "Three.js",
      "GSAP 3",
      "Tailwind CSS v4",
    ],
    metrics: "Interactive Motion OS • Strict Type Safety • 120 FPS Motion",
    challenges:
      "Building a multimodal assistant with streaming token responses, memory management, and error fallbacks without blocking the UI thread.",
    lessons:
      "Streaming tokens via Server-Sent Events (SSE) while rendering markdown live provided an instantaneous, premium user feel.",
    liveUrl: "https://www.aevionstudio.in/",
    githubUrl: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    ],
    specialType: "ai-os",
    status: "PRODUCTION CORE",
    year: "2024",
    tags: ["WebGL", "GSAP", "Brand OS", "AI Inference"],
    color: "#38bdf8",
    accent: "#7dd3fc",
    published: true,
  },
  {
    id: "ooty-mistwings",
    slug: "ooty-mistwings",
    title: "Ooty Mistwings",
    subtitle: "Sensory Hotel & Villa Reservation Engine",
    category: "Luxury Hospitality & WebGL UI",
    description:
      "An award-caliber digital portal crafted for a luxury cliffside resort in the Nilgiris, highlighting ambient mist transitions, atmospheric audio, and friction-free direct reservations.",
    problem:
      "Hospitality aggregators strip resort identity and charge predatory fees while delivering cold, cookie-cutter booking experiences.",
    approach:
      "Engineered an emotive brand experience using GSAP scroll scrub timelines, Web Audio API soundscapes, and high-conversion reservation funnels.",
    whatWeBuilt: [
      "GSAP 3 ScrollTrigger Timeline Sequencing",
      "Adaptive Web Audio Ambient Synthesizer",
      "Next.js Dynamic Route Caching",
      "Optimized GPU Transform Layers",
      "High-conversion reservation flows",
    ],
    features: [
      "Cinematic mist atmosphere transitions",
      "Dynamic 3D villa previews",
      "Seamless direct booking flow",
      "GPU-composited momentum scroll",
    ],
    technologies: [
      "Next.js 16",
      "GSAP 3",
      "Tailwind CSS",
      "Three.js",
      "Web Audio API",
    ],
    metrics: "GPU Composited Motion • Zero Layout Shift (CLS: 0)",
    challenges:
      "Synchronizing multiple ScrollTrigger scrub timelines without creating micro-stutters or frame drops on low-power devices.",
    lessons:
      "Using transform-only and opacity properties enabled smooth GPU compositing without triggering expensive browser repaint loops.",
    liveUrl: null, // Verified live URL not available; case study mode only
    githubUrl: "https://github.com/aevionstudio",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    ],
    specialType: "motion",
    status: "ACTIVE SPECIFICATION",
    year: "2024",
    tags: ["3D", "Booking", "Luxury", "WebGL"],
    color: "#a78bfa",
    accent: "#c4b5fd",
    published: true,
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getPublishedProjects(): Project[] {
  return PROJECTS.filter((p) => p.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase().trim();
  return PROJECTS.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      p.title.toLowerCase() === normalized ||
      p.slug.replace(/-/g, " ").toLowerCase() === normalized.replace(/-/g, " ")
  );
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProjectBySlug(slug);
  return PROJECTS.filter((p) => p.slug !== current?.slug && p.published).slice(0, limit);
}

export function getNextProject(slug: string): Project {
  const published = getPublishedProjects();
  const index = published.findIndex((p) => p.slug === slug);
  if (index === -1 || index === published.length - 1) {
    return published[0];
  }
  return published[index + 1];
}
