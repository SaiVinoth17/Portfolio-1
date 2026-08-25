import { classifyIntent, ConversationMessage } from "./intentEngine";

export interface AIResponse {
  text: string;
  suggestedFollowUps: string[];
  link?: { text: string; url: string };
  isFoundersCard?: boolean;
}

export function generateAIResponse(query: string, history: ConversationMessage[] = []): AIResponse {
  const clean = query.toLowerCase().trim();

  // 1. Direct High-Precision Interceptors
  if (/^(who founded aevion|who created aevion|who is behind aevion|who are the founders|meet the founders|founders|founder)\b/i.test(clean)) {
    return {
      text: "Aevion was founded by **Sai Rio** and **Edison** — two builders focused on turning ambitious ideas into real technology.\n\nBoth are co-founders with equal standing:\n\n**Sai Rio — Co-Founder**\n• Product • Engineering • AI • Systems • Vision\n• Directs autonomous AI architecture, Next.js 16 frameworks, vector context pipelines, and foundational studio strategy.\n• Verified GitHub: https://github.com/SaiVinoth17\n\n**Edison — Co-Founder**\n• Development • Technology • Engineering • Building\n• Directs core software engineering, high-throughput pipelines, 120 FPS WebGL shaders, and production infrastructure.\n• Verified GitHub: https://github.com/edisonedi84431-art\n\n*\"Two builders. One vision. Technology without limits.\"*",
      suggestedFollowUps: [
        "What are we building?",
        "Explain the technology",
        "What's next for Aevion?",
        "Explore our projects",
      ],
      isFoundersCard: true,
    };
  }

  if (/\b(who is sai|who is sai rio|about sai|sai's role|sai github)\b/i.test(clean)) {
    return {
      text: "**Sai Rio** is Co-Founder of Aevion.\n\nHe leads **Product, Engineering, AI, Systems, and Product Vision**.\n\n• **Core Disciplines**: Autonomous AI systems, Groq/Gemini streaming inference, Next.js 16 App Router architectures, vector context pipelines, and product direction.\n• **Verified GitHub Profile**: https://github.com/SaiVinoth17\n• **Philosophy**: *\"Software should be an extension of human will. Eliminate friction until only raw performance, intelligence, and clarity remain.\"*\n• Co-founded Aevion alongside Edison with an equal partnership.",
      suggestedFollowUps: [
        "Who is Edison?",
        "What are we building?",
        "Explain the technology",
      ],
    };
  }

  if (/\b(who is edison|about edison|edison's role|edison github)\b/i.test(clean)) {
    return {
      text: "**Edison** is Co-Founder of Aevion.\n\nHe leads **Development, Technology, Engineering, and Building**.\n\n• **Core Disciplines**: Core software development, distributed edge services, 120 FPS WebGL shaders, high-throughput data pipelines, and production engineering.\n• **Verified GitHub Profile**: https://github.com/edisonedi84431-art\n• **Philosophy**: *\"True craftsmanship lies in the invisible layers. When every byte is optimized and every transition is calculated, software becomes unforgettable.\"*\n• Co-founded Aevion alongside Sai Rio with equal founder status.",
      suggestedFollowUps: [
        "Who is Sai Rio?",
        "What are we building?",
        "Explore our projects",
      ],
    };
  }

  if (/\b(are sai and edison both founders|are both founders|are they co-founders|who is the main founder|is edison a founder)\b/i.test(clean)) {
    return {
      text: "**Yes. Sai Rio and Edison are both co-founders of Aevion with equal founder status.**\n\nNeither founder is secondary or subordinate to the other. Aevion is built on a shared, unified foundation:\n\n• **Sai Rio** — Co-Founder (Product • Engineering • AI • Systems • Vision)\n• **Edison** — Co-Founder (Development • Technology • Engineering • Building)\n\nBoth work directly together to architect and engineer every system with zero middle layers.",
      suggestedFollowUps: [
        "What are we building?",
        "Enter the lab",
        "Explore our projects",
      ],
      isFoundersCard: true,
    };
  }

  if (/\b(who built this website|who made this website|who coded this|who designed this|who built this)\b/i.test(clean)) {
    return {
      text: "This website and the entire Aevion Studio platform were designed, architected, and built by co-founders **Sai Rio** and **Edison**.\n\n• **Sai Rio**: Product architecture, system design, and AI pipelines.\n• **Edison**: Core technology development, WebGL performance, and production engineering.\n• **Stack**: Next.js 16 App Router, React 19, TypeScript, Three.js, GSAP 3, and Tailwind CSS v4.",
      suggestedFollowUps: [
        "Meet the founders",
        "Explain the technology",
        "Explore our projects",
      ],
    };
  }

  if (/\b(what is aevion|tell me about aevion|about aevion|what does aevion do|why aevion)\b/i.test(clean)) {
    return {
      text: "**Aevion is a futuristic technology studio and experimental lab.**\n\nFounded by **Sai Rio** and **Edison** under a single principle: *\"Two builders. One vision. Technology without limits.\"*\n\n• **Autonomous AI Systems**: High-speed streaming LLM pipelines, contextual RAG, and reasoning engines.\n• **Kinetic Engineering**: 120 FPS fluid interaction, WebGL shaders, and tactile micro-physics.\n• **Zero-Compromise Scalability**: Strict TypeScript, edge-native cold starts, and distributed architectures.\n• **Direct Founder Craftsmanship**: Every system is built directly by the founders with zero agency bloat.",
      suggestedFollowUps: [
        "Meet the founders",
        "What are we building?",
        "Enter the lab",
      ],
    };
  }

  if (/\b(what are you building|what are we building|current projects|what do you build|experiments|enter the lab)\b/i.test(clean)) {
    return {
      text: "At Aevion, **Sai Rio** and **Edison** are currently engineering autonomous intelligence layers, kinetic WebGL operating systems, and high-performance digital platforms:\n\n• **Aevion Studio OS**: The studio's motion operating system, GSAP scroll narrative engine, and WebGL sandbox.\n• **Nilgiris Explorers**: AI-powered geospatial travel discovery platform with real-time mountain trail mapping.\n• **Ooty Mistwings**: Luxury hospitality platform with cinematic WebGL previews and dynamic reservation flows.\n• **Gaming Kingdom**: Real-time multiplayer gaming hub with sub-15ms WebSockets and responsive arcade UI.",
      suggestedFollowUps: [
        "Explain the technology",
        "Meet the founders",
        "What's next for Aevion?",
      ],
    };
  }

  const result = classifyIntent(query, history);

  if (result.intent === "GREETING") {
    return {
      text: "Aevion Intelligence online.\n\n\"Two builders. One vision. Technology without limits.\"\n\nWhat are we building?",
      suggestedFollowUps: [
        "Explore Aevion",
        "Meet the founders",
        "What are we building?",
        "Enter the lab",
      ],
    };
  }

  if (result.topic) {
    let fullText = `${result.topic.content}`;

    if (result.topic.details && result.topic.details.length > 0) {
      fullText += "\n\n**Key Highlights:**\n" + result.topic.details.map((d) => `• ${d}`).join("\n");
    }

    return {
      text: fullText,
      suggestedFollowUps: result.topic.suggestedFollowUps || [
        "Explore Aevion",
        "Meet the founders",
        "What are we building?",
      ],
      link: result.topic.link,
      isFoundersCard: result.topic.isFoundersCard,
    };
  }

  // Graceful unverified fallback with strict safety rule
  return {
    text: `I don't have verified data on that within the Aevion archives.\n\nI can provide verified technical insights on co-founders **Sai Rio** and **Edison**, our studio projects (*Nilgiris Explorers*, *Ooty Mistwings*, *Gaming Kingdom*, *Aevion Studio OS*), our Next.js 16 & WebGL technology stack, or collaboration options.`,
    suggestedFollowUps: [
      "Meet the founders",
      "What are we building?",
      "Explain the technology",
      "What's next for Aevion?",
    ],
  };
}
