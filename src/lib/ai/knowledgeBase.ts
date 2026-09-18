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
      "Aevion Studio was founded by Sai Rio (Founder & Lead Engineer) and Edison (Co-Founder). Aevion is conceived, architected, and engineered from scratch by Sai Rio.",
    details: [
      "Sai Rio — Founder · Lead Engineer: Architecture • Full-Stack • Frontend • AI Systems • Product Engineering. (GitHub: https://github.com/SaiVinoth17)",
      "Edison — Co-Founder. (GitHub: https://github.com/edisonedi84431-art)",
      "Architectural Record: 'Every interface, interaction, and system is built from scratch by Sai Rio.'",
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
    title: "About Founder & Lead Engineer Sai Rio",
    keywords: ["sai", "sai rio", "who is sai", "who is sai rio", "about sai", "about sai rio", "sai's role", "sai github"],
    content:
      "Sai Rio is Founder and Lead Engineer of Aevion. He is the builder behind Aevion — responsible for its architecture, interface, engineering, AI systems and product experience, built from the ground up.",
    details: [
      "Role: Founder · Lead Engineer of Aevion Studio.",
      "Craft: Conceived, architected, designed, and engineered Aevion from scratch.",
      "Disciplines: Architecture, Full-Stack Engineering, Frontend, AI Systems, Product Engineering, Creative Technology.",
      "Verified GitHub Profile: https://github.com/SaiVinoth17",
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
      "Edison is Co-Founder of Aevion Studio, partnering in studio foundation, digital vision, and strategic direction.",
    details: [
      "Role: Co-Founder of Aevion Studio.",
      "Focus Areas: Studio foundation, brand direction, and strategic collaboration.",
      "Verified GitHub Profile: https://github.com/edisonedi84431-art",
      "Philosophy: 'Great studios are built on singular conviction. Ambitious ideas turn into enduring reality when vision and engineering align.'",
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
    title: "Founders Record & Architectural Credit",
    keywords: [
      "are sai and edison both founders",
      "are both founders",
      "are they co-founders",
      "who is the main founder",
      "is edison a founder",
      "is sai a founder",
    ],
    content:
      "Sai Rio is the Founder and Lead Engineer who conceived, architected, and engineered Aevion from scratch. Edison is Co-Founder of the studio.",
    details: [
      "Sai Rio: Founder · Lead Engineer (Architecture, Full-Stack, Frontend, AI Systems, Product)",
      "Edison: Co-Founder",
      "Build Attribution: Every interface, interaction, and system was built from scratch by Sai Rio.",
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
      "Aevion is an independent technology and AI creative studio founded by Sai Rio and Edison. Our mission is to turn ambitious ideas into real, production-grade technology.",
    details: [
      "Specialization: High-performance AI software, autonomous LLM pipelines, GPU-accelerated web experiences (WebGL/GSAP), and scalable SaaS platforms.",
      "Core Values: Autonomous Intelligence, Kinetic Engineering, Zero-Compromise Scalability, and Direct Craftsmanship.",
      "Founders: Sai Rio (Founder · Lead Engineer) & Edison (Co-Founder).",
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
    title: "Website Creation & Architectural Record",
    keywords: [
      "who built this website",
      "who made this website",
      "who built this",
      "who designed this",
      "who created this portfolio",
      "who made this",
    ],
    content:
      "This website and the entire Aevion Studio platform were conceived, designed, architected, and engineered from scratch by Sai Rio (Founder & Lead Engineer).",
    details: [
      "Sai Rio: Complete system architecture, Next.js 16 engineering, WebGL shaders, kinetic GSAP motion, and Groq AI integration.",
      "Build Credit: Conceived, architected, designed, and engineered by Sai Rio. Built from zero.",
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
      "At Aevion Studio, we engineer autonomous AI systems, low-latency streaming inference pipelines, motion-first web operating systems, and bespoke digital platforms for ambitious founders.",
    details: [
      "Aevion Studio OS: Motion-first portfolio operating system and WebGL sandbox.",
      "Nilgiris Explorers: Geospatial AI travel discovery engine.",
      "The Gaming Kingdom: High-concurrency WebSocket real-time multiplayer hub.",
      "House of Petalss: Interactive flower boutique booking and florist platform.",
      "Ooty Mistwings: Cinematic WebGL luxury hospitality platform.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about The Gaming Kingdom",
      "Tell me about House of Petalss",
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
      "Live Verified URL: https://nilgirisexplorers.com/",
    ],
    suggestedFollowUps: [
      "Tell me about The Gaming Kingdom",
      "Tell me about House of Petalss",
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
      "Status: Active Case Study Specification.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about House of Petalss",
      "What is your tech stack?",
    ],
  },
  {
    id: "project-gaming-kingdom",
    category: "projects",
    title: "The Gaming Kingdom",
    keywords: ["gaming", "kingdom", "gaming kingdom", "the gaming kingdom", "interactive interface", "gaming website", "frontend", "websocket"],
    content:
      "The Gaming Kingdom is a real-time multiplayer gaming hub powered by sub-15ms WebSockets, live score streaming, and an arcade-inspired responsive UI.",
    details: [
      "Stack: React 19, Node.js, Socket.io, and PostgreSQL.",
      "Live Verified URL: https://www.ootythegamingkingdom.com/",
      "Engineering Focus: Concurrency synchronization under high-frequency messaging with zero dropped frames.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about House of Petalss",
      "Meet the founders",
    ],
  },
  {
    id: "project-house-of-petalss",
    category: "projects",
    title: "House of Petalss",
    keywords: ["petalss", "house of petalss", "flowers", "florist", "bouquet", "flower booking", "ooty florist"],
    content:
      "House of Petalss is an interactive floral boutique platform in Ooty featuring curated flower arrangements, custom event bouquet bookings, and seamless direct inquiries.",
    details: [
      "Stack: Next.js, React 19, Tailwind CSS, TypeScript, and Framer Motion.",
      "Live Verified URL: https://houseofpetalssooty.com/",
      "Case Study: /projects/house-of-petalss",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about The Gaming Kingdom",
      "Explore our projects",
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
      "Aevion Studio is available for select AI software development, SaaS builds, and creative technology partnerships.",
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
