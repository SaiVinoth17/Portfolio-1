export interface KnowledgeTopic {
  id: string;
  category: "services" | "projects" | "technologies" | "workflow" | "studio" | "faq" | "contact";
  title: string;
  keywords: string[];
  content: string;
  details?: string[];
  link?: { text: string; url: string };
  suggestedFollowUps?: string[];
}

export const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    id: "project-nilgiris-explorers",
    category: "projects",
    title: "Nilgiris Explorers",
    keywords: ["nilgiris", "explorers", "ooty", "tourism", "travel", "booking", "destination", "nilgiris explorers"],
    content: "Nilgiris Explorers is a premium tourism and travel platform focused on the Nilgiris region, created to help travelers discover destinations, book experiences, and explore Ooty through a modern digital experience.",
    details: [
      "Purpose: Solves fragmented travel discovery by providing an intuitive, interactive destination experience for Ooty.",
      "Engineering Highlights: Modern React & Next.js architecture, performance-optimized, mobile-first design, SEO optimized, AI-powered enhancements, and premium motion design.",
      "UX & Performance: Immersive UI with fluid transitions engineered for high mobile responsiveness and fast page loads.",
    ],
    suggestedFollowUps: [
      "Tell me about Ooty Mistwings",
      "Tell me about Gaming Kingdom",
      "How do you approach web motion?",
    ],
  },
  {
    id: "project-ooty-mistwings",
    category: "projects",
    title: "Ooty Mistwings",
    keywords: ["mistwings", "ooty mistwings", "storytelling", "travel website", "visuals", "destination discovery"],
    content: "Ooty Mistwings is a travel and destination discovery platform showcasing the beauty of Ooty and the Nilgiris through cinematic UI and immersive storytelling.",
    details: [
      "Purpose: Built to present Ooty through rich visual storytelling, engaging web experiences, and seamless navigation.",
      "Engineering Highlights: Cinematic UI, interactive animations, responsive experience, performance-focused frontend, and destination storytelling.",
      "Engineering Lessons: Balancing high-resolution imagery with performance optimization and smooth scroll feel.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about Gaming Kingdom",
      "What tech stack do you use?",
    ],
  },
  {
    id: "project-gaming-kingdom",
    category: "projects",
    title: "Gaming Kingdom",
    keywords: ["gaming", "kingdom", "gaming kingdom", "interactive interface", "gaming website", "frontend"],
    content: "Gaming Kingdom is a gaming-focused web platform built to demonstrate modern frontend engineering, high responsiveness, and visually engaging user experiences for gaming enthusiasts.",
    details: [
      "Purpose: Engineered to deliver a fast, visually engaging, and responsive experience for gaming enthusiasts.",
      "Engineering Highlights: Interactive UI, smooth animations, responsive design, modern frontend architecture, and performance optimization.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about Ooty Mistwings",
      "What services do you offer?",
    ],
  },
  {
    id: "services-overview",
    category: "services",
    title: "Core Studio Services",
    keywords: ["service", "services", "offer", "build", "do", "capabilities", "solutions", "work"],
    content: "Aevion Studio crafts high-end AI software, custom SaaS platforms, modern web applications, digital engineering, and interactive 3D motion experiences for high-growth businesses.",
    details: [
      "AI & Machine Learning Solutions (LLM Integration, Intelligent Automation)",
      "Full-Stack Custom SaaS & Web Application Development",
      "Interactive 3D Web Motion & Creative Engineering (GSAP, Framer Motion, WebGL)",
      "High-Performance Edge Architecture & API Engineering",
    ],
    suggestedFollowUps: [
      "What tech stack do you use?",
      "Can I see portfolio projects?",
      "How do I start a project?",
    ],
  },
  {
    id: "tech-stack",
    category: "technologies",
    title: "Technology Stack",
    keywords: ["tech", "technology", "stack", "react", "next", "tailwind", "typescript", "framework", "gsap", "lenis"],
    content: "Our core production stack is engineered for smooth 60 FPS performance, strict type safety, and maximum scalability.",
    details: [
      "Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4",
      "Motion & 3D: Framer Motion, GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, WebGL Shaders",
      "Backend & Edge: Node.js, Vercel Serverless Edge, Supabase, Web APIs",
      "Performance: GPU hardware acceleration, Web Workers, Progressive Asset Preloading",
    ],
    suggestedFollowUps: [
      "Tell me about your motion engine",
      "What services do you offer?",
    ],
  },
  {
    id: "projects-portfolio",
    category: "projects",
    title: "Portfolio & Featured Case Studies",
    keywords: ["portfolio", "projects", "work", "case study", "showcase", "demo", "scroll morph", "hero"],
    content: "Our portfolio showcases cutting-edge digital experiences, AI software, and featured platforms including Nilgiris Explorers, Ooty Mistwings, Gaming Kingdom, and our 3D Scroll Morph Hero!",
    details: [
      "Nilgiris Explorers: Premium tourism & travel discovery platform for the Nilgiris.",
      "Ooty Mistwings: Destination discovery platform with cinematic UI and visual storytelling.",
      "Gaming Kingdom: Fast, visually engaging web platform built for gaming enthusiasts.",
      "3D Scroll Morph Hero: Interactive 20-card 3D radial morphing experience with Framer Motion spring physics.",
    ],
    suggestedFollowUps: [
      "Tell me about Nilgiris Explorers",
      "Tell me about Ooty Mistwings",
      "How can we work together?",
    ],
  },
  {
    id: "workflow-process",
    category: "workflow",
    title: "Studio Engineering Workflow",
    keywords: ["process", "workflow", "methodology", "timeline", "steps", "how you work", "phases"],
    content: "We follow a 4-phase agile engineering methodology designed to take projects from concept to edge production smoothly.",
    details: [
      "1. Discovery & System Architecture: Requirements mapping and technical spec design.",
      "2. Interactive Motion Prototype: Prototyping GPU-accelerated visual interactions.",
      "3. Production Engineering: Strict TypeScript, Next.js App Router, and component building.",
      "4. Edge Deployment & Optimization: Lighthouse audit, global CDN delivery, and continuous monitoring.",
    ],
    suggestedFollowUps: [
      "How much does a project cost?",
      "How do I contact Aevion Studio?",
    ],
  },
  {
    id: "studio-team",
    category: "studio",
    title: "About Aevion Studio & Team",
    keywords: ["founder", "sai vinoth", "team", "studio", "about", "who", "location", "company", "culture"],
    content: "Aevion Studio is an AI Software & Digital Engineering Studio founded by Sai Vinoth. We build products where engineering, design, and AI work together seamlessly.",
    details: [
      "Founder: Sai Vinoth (Software Engineer & Founder).",
      "Philosophy: 'Build products people actually enjoy using.'",
      "Specialization: High-performance AI software, SaaS products, and creative web engineering.",
    ],
    suggestedFollowUps: [
      "What projects have you built?",
      "What services do you offer?",
      "How can I contact the studio?",
    ],
  },
  {
    id: "contact-hire",
    category: "contact",
    title: "Contact & Getting Started",
    keywords: ["contact", "hire", "email", "reach", "start", "build", "quote", "get in touch", "pricing"],
    content: "We are available for select AI software development, SaaS builds, and creative web engineering projects.",
    details: [
      "Direct Email: hello@aevion.studio",
      "Quick Action: Click the 'Build With Us' button in the floating bottom menu to initiate a prompt response.",
    ],
    link: { text: "Email Us", url: "mailto:hello@aevion.studio" },
    suggestedFollowUps: [
      "What services do you offer?",
      "What is your tech stack?",
    ],
  },
  {
    id: "faq-pricing",
    category: "faq",
    title: "Frequently Asked Questions",
    keywords: ["faq", "cost", "pricing", "rate", "time", "how long", "estimate", "budget"],
    content: "Project scope and timelines vary based on requirements. We offer fixed-scope project sprints and ongoing monthly engineering retainers.",
    details: [
      "Web Architecture & Motion Builds: Typically 2 to 4 weeks.",
      "Custom SaaS & AI Software: Typically 4 to 8 weeks.",
      "All projects include Lighthouse performance optimization, full source code ownership, and 30 days post-launch support.",
    ],
    suggestedFollowUps: [
      "How do I contact you?",
      "What services do you provide?",
    ],
  },
];
