export interface KnowledgeTopic {
  id: string;
  category: "services" | "projects" | "technologies" | "workflow" | "studio" | "faq" | "contact" | "founders";
  title: string;
  keywords: string[];
  content: string;
  details?: string[];
  link?: { text: string; url: string };
  suggestedFollowUps?: string[];
  isFoundersCard?: boolean;
}

export const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    id: "founders-overview",
    category: "founders",
    title: "The Founders of Aevion",
    keywords: [
      "founder",
      "founders",
      "who founded",
      "who created",
      "who owns",
      "who is behind",
      "creator",
      "creators",
      "owner",
      "team",
      "meet the founders",
      "people behind aevion",
      "both founders",
    ],
    content:
      "Aevion was founded by Sai Rio and Edison — two builders focused on turning ambitious ideas into real technology.\n\nBoth are co-founders with equal standing, combining foundational product strategy, systems engineering, AI pipelines, and high-performance software building.",
    details: [
      "Sai Rio — Co-Founder: Product • Engineering • AI • Systems • Product Vision.",
      "Edison — Co-Founder: Development • Technology • Engineering • Building. (GitHub: https://github.com/edisonedi84431-art)",
      "Core Ethos: 'Two builders. One vision. Technology without limits.'",
    ],
    suggestedFollowUps: [
      "Who is Sai Rio?",
      "Who is Edison?",
      "What is Aevion building?",
      "Explore our projects",
    ],
    isFoundersCard: true,
  },
  {
    id: "founder-sai-rio",
    category: "founders",
    title: "About Co-Founder Sai Rio",
    keywords: ["sai", "sai rio", "who is sai", "who is sai rio", "about sai", "about sai rio", "sai's role"],
    content:
      "Sai Rio is Co-Founder of Aevion. He focuses on Product, Engineering, AI, Systems, and Product Vision.",
    details: [
      "Role: Co-Founder of Aevion Studio alongside Edison.",
      "Focus Areas: Autonomous AI systems architecture, Next.js 16 frameworks, vector context pipelines, streaming inference, and overall product vision.",
      "Philosophy: 'Software should be an extension of human will. Eliminate friction until only raw performance, intelligence, and clarity remain.'",
    ],
    suggestedFollowUps: [
      "Who is Edison?",
      "Who founded Aevion?",
      "What are you building?",
    ],
  },
  {
    id: "founder-edison",
    category: "founders",
    title: "About Co-Founder Edison",
    keywords: ["edison", "who is edison", "about edison", "edison role", "edison github", "edison's role"],
    content:
      "Edison is Co-Founder of Aevion. He focuses on Development, Technology, Engineering, and Building.",
    details: [
      "Role: Co-Founder of Aevion Studio alongside Sai Rio.",
      "Focus Areas: Core software engineering, high-throughput pipelines, WebGL graphics & shaders, edge infrastructure, and full-stack building.",
      "Verified GitHub Profile: https://github.com/edisonedi84431-art",
      "Philosophy: 'True craftsmanship lies in the invisible layers. When every byte is optimized and every transition is calculated, software becomes unforgettable.'",
    ],
    suggestedFollowUps: [
      "Who is Sai Rio?",
      "Who founded Aevion?",
      "Explore our projects",
    ],
  },
  {
    id: "founders-equality",
    category: "founders",
    title: "Co-Founders Equality Verification",
    keywords: [
      "are sai and edison both founders",
      "are both founders",
      "are they co-founders",
      "who is the main founder",
      "is edison a founder",
      "is sai a founder",
    ],
    content:
      "Yes. Sai Rio and Edison are both co-founders of Aevion. Neither is secondary to the other. Aevion was created and built by the two of them with equal founder status and a unified vision.",
    details: [
      "Sai Rio: Co-Founder (Product • Engineering • AI • Systems • Vision)",
      "Edison: Co-Founder (Development • Technology • Engineering • Building)",
      "Founding Principle: Two builders working directly together without agency bloat or corporate layers.",
    ],
    suggestedFollowUps: [
      "Who is Sai Rio?",
      "Who is Edison?",
      "What is Aevion?",
    ],
  },
  {
    id: "what-is-aevion",
    category: "studio",
    title: "About Aevion Studio",
    keywords: [
      "what is aevion",
      "tell me about aevion",
      "about aevion",
      "mission",
      "philosophy",
      "manifesto",
      "studio",
      "what does aevion do",
    ],
    content:
      "Aevion is a futuristic technology and AI creative studio co-founded by Sai Rio and Edison. Our mission is to turn ambitious ideas into real, production-grade technology.",
    details: [
      "Specialization: High-performance AI software, autonomous LLM pipelines, GPU-accelerated web experiences (WebGL/GSAP), and scalable SaaS platforms.",
      "Core Values: Autonomous Intelligence, Kinetic Engineering, Zero-Compromise Scalability, and Direct Founder Craftsmanship.",
      "Founders: Sai Rio & Edison.",
    ],
    suggestedFollowUps: [
      "Meet the founders",
      "What are you building?",
      "Explore our projects",
    ],
  },
  {
    id: "who-built-website",
    category: "studio",
    title: "Website Creation & Authorship",
    keywords: [
      "who built this website",
      "who made this website",
      "who built this",
      "who designed this",
      "who created this portfolio",
      "who made this",
    ],
    content:
      "This website and the entire Aevion Studio platform were designed, architected, and built by co-founders Sai Rio and Edison.",
    details: [
      "Sai Rio: Product architecture, system design, and AI systems.",
      "Edison: Core technology development, WebGL performance, and production engineering.",
      "Stack: Next.js 16 App Router, React 19, TypeScript, Three.js, GSAP, and Tailwind CSS v4.",
    ],
    suggestedFollowUps: [
      "Meet the founders",
      "What is your tech stack?",
      "Explore our projects",
    ],
  },
  {
    id: "what-are-you-building",
    category: "projects",
    title: "What We Are Building",
    keywords: [
      "what are you building",
      "current projects",
      "what do you build",
      "experiments",
      "active systems",
    ],
    content:
      "At Aevion, Sai Rio and Edison are building autonomous AI systems, low-latency streaming inference pipelines, motion-first web operating systems, and bespoke digital platforms for ambitious founders.",
    details: [
      "Aevion Studio OS: Motion-first portfolio operating system and WebGL sandbox.",
      "Nilgiris Explorers: Geospatial AI travel discovery engine.",
      "Ooty Mistwings: Cinematic WebGL luxury hospitality platform.",
      "Gaming Kingdom: High-concurrency WebSocket real-time multiplayer hub.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about Ooty Mistwings",
      "Meet the founders",
    ],
  },
  {
    id: "project-nilgiris-explorers",
    category: "projects",
    title: "Nilgiris Explorers",
    keywords: ["nilgiris", "explorers", "ooty", "tourism", "travel", "booking", "destination", "nilgiris explorers"],
    content:
      "Nilgiris Explorers is an AI-powered geospatial travel discovery platform for the Nilgiri Hills (Ooty), featuring real-time mountain trail mapping and personalized itineraries.",
    details: [
      "Problem: Fragmented, static travel guidebooks and poor offline trail mapping.",
      "Solution: Next.js 16 + MapboxGL with AI itinerary generation and high-speed offline caching.",
      "Outcome: 100% Lighthouse SEO score and fluid 60 FPS mobile navigation.",
    ],
    suggestedFollowUps: [
      "Tell me about Ooty Mistwings",
      "Tell me about Gaming Kingdom",
      "Meet the founders",
    ],
  },
  {
    id: "project-ooty-mistwings",
    category: "projects",
    title: "Ooty Mistwings",
    keywords: ["mistwings", "ooty mistwings", "storytelling", "travel website", "visuals", "destination discovery"],
    content:
      "Ooty Mistwings is a luxury destination hospitality experience showcasing the Nilgiris through cinematic WebGL previews, GSAP scroll storytelling, and integrated reservation flows.",
    details: [
      "Architecture: Next.js, GSAP 3 ScrollTrigger, Three.js shaders, and Stripe integration.",
      "Engineering Focus: Balancing high-resolution asset fidelity with sub-second page performance.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about Gaming Kingdom",
      "What is your tech stack?",
    ],
  },
  {
    id: "project-gaming-kingdom",
    category: "projects",
    title: "Gaming Kingdom",
    keywords: ["gaming", "kingdom", "gaming kingdom", "interactive interface", "gaming website", "frontend", "websocket"],
    content:
      "Gaming Kingdom is a real-time multiplayer gaming hub powered by sub-15ms WebSockets, live score streaming, and an arcade-inspired responsive UI.",
    details: [
      "Stack: React 19, Node.js, Socket.io, and PostgreSQL.",
      "Engineering Focus: Concurrency synchronization under high-frequency messaging with zero dropped frames.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "What is your tech stack?",
      "Meet the founders",
    ],
  },
  {
    id: "services-overview",
    category: "services",
    title: "Core Studio Services",
    keywords: ["service", "services", "offer", "build", "do", "capabilities", "solutions", "work", "hire"],
    content:
      "Aevion Studio crafts high-end AI software, custom SaaS platforms, modern web applications, and interactive 3D motion experiences.",
    details: [
      "Autonomous AI Pipelines (LLM integration, contextual RAG, agentic workflows)",
      "Full-Stack Web & SaaS Engineering (Next.js 16, TypeScript, Supabase, PostgreSQL)",
      "Kinetic Motion & WebGL Shaders (GSAP, Three.js, 120 FPS performance)",
      "Systems Architecture & Edge Infrastructure (Serverless, instant cold-starts)",
    ],
    suggestedFollowUps: [
      "What is your tech stack?",
      "Meet the founders",
      "How do I start a project?",
    ],
  },
  {
    id: "tech-stack",
    category: "technologies",
    title: "Technology Stack",
    keywords: ["tech", "technology", "stack", "react", "next", "tailwind", "typescript", "framework", "gsap", "lenis"],
    content:
      "Our core production stack is engineered for 120 FPS fluid performance, strict type safety, and edge scalability.",
    details: [
      "Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4",
      "Motion & 3D: Framer Motion, GSAP 3, Lenis Smooth Scroll, WebGL Shaders",
      "Backend & AI: Node.js, Groq Llama, Supabase, PostgreSQL, Vector Retrievers",
      "Quality Standard: 100% strict type safety and sub-50ms streaming latency",
    ],
    suggestedFollowUps: [
      "Explore our projects",
      "Meet the founders",
      "How do I contact Aevion?",
    ],
  },
  {
    id: "contact-hire",
    category: "contact",
    title: "Contact & Collaboration",
    keywords: ["contact", "hire", "email", "reach", "start", "quote", "get in touch", "pricing"],
    content:
      "Sai Rio and Edison are available for select AI software development, SaaS builds, and creative technology partnerships.",
    details: [
      "Direct Uplink: hello@aevion.studio",
      "Co-Founders: Sai Rio & Edison",
      "Location: Nilgiris, India & Global Edge",
    ],
    link: { text: "Email Studio", url: "mailto:hello@aevion.studio" },
    suggestedFollowUps: [
      "Meet the founders",
      "What is your tech stack?",
      "Explore our projects",
    ],
  },
];
