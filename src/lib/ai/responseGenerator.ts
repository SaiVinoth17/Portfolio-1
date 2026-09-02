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
      text: "**Sai Vinoth** and **Edison** founded Aevion Studio as equal co-founders.\n\n• **Sai Vinoth**: Full Stack Developer and AI/ML Engineer.\n• **Edison**: Front End Developer.\n\nTwo builders, zero middlemen, engineering technology without limits.",
      suggestedFollowUps: [
        "What are we building?",
        "Explain the technology",
        "Explore our projects",
      ],
      isFoundersCard: true,
    };
  }

  if (/\b(who is sai|who is sai rio|who is sai vinoth|about sai|sai's role|sai github)\b/i.test(clean)) {
    return {
      text: "**Sai Vinoth** is Co-Founder of Aevion, directing **Full Stack Development and AI/ML Engineering**.\n\nHe engineers our autonomous LLM pipelines, vector indexing, Next.js architecture, and cloud backends.\n\nGitHub: https://github.com/SaiVinoth17",
      suggestedFollowUps: [
        "Who is Edison?",
        "What are we building?",
        "Explain the technology",
      ],
    };
  }

  if (/\b(who is edison|about edison|edison's role|edison github)\b/i.test(clean)) {
    return {
      text: "**Edison** is Co-Founder of Aevion, directing **Front End Development**.\n\nHe architects high-performance UI layers, 120 FPS WebGL shaders, interactive 3D graphics, and client performance.\n\nGitHub: https://github.com/edisonedi84431-art",
      suggestedFollowUps: [
        "Who is Sai Vinoth?",
        "What are we building?",
        "Explore our projects",
      ],
    };
  }

  if (/\b(are sai and edison both founders|are both founders|are they co-founders|who is the main founder|is edison a founder)\b/i.test(clean)) {
    return {
      text: "**Yes. Sai Vinoth and Edison are equal co-founders.**\n\nNeither founder is subordinate to the other. They architect, build, and deploy every system together directly.",
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
      text: "Co-founders **Sai Vinoth** and **Edison** built this platform directly.\n\nEngineered on Next.js 16 App Router, React 19, TypeScript, Three.js shaders, and Tailwind CSS.",
      suggestedFollowUps: [
        "Meet the founders",
        "Explain the technology",
        "Explore our projects",
      ],
    };
  }

  if (/\b(what is aevion|tell me about aevion|about aevion|what does aevion do|why aevion)\b/i.test(clean)) {
    return {
      text: "**Aevion Studio is an independent technology studio and experimental lab.**\n\nFounded by **Sai Rio** and **Edison**, we build autonomous AI systems, resilient cloud platforms, and cinematic WebGL interfaces for visionary teams worldwide.",
      suggestedFollowUps: [
        "Meet the founders",
        "What are we building?",
        "Enter the lab",
      ],
    };
  }

  if (/\b(what are you building|what are we building|current projects|what do you build|experiments|enter the lab)\b/i.test(clean)) {
    return {
      text: "We are currently engineering four flagship systems:\n\n• **Aevion Studio OS**: The studio's motion OS and WebGL sandbox.\n• **Nilgiris Explorers**: Geospatial travel discovery with real-time trail routing.\n• **Ooty Mistwings**: Luxury hospitality booking engine with cinematic 3D previews.\n• **Gaming Kingdom**: Real-time multiplayer gaming hub powered by WebSockets.",
      suggestedFollowUps: [
        "Explain the technology",
        "Meet the founders",
        "Explore Aevion Lab",
      ],
    };
  }

  const result = classifyIntent(query, history);

  if (result.intent === "GREETING") {
    return {
      text: "Aevion Intelligence online.\n\nWhat are we building?",
      suggestedFollowUps: [
        "What does Aevion do?",
        "Meet the founders",
        "Explore our projects",
        "Enter the lab",
      ],
    };
  }

  if (result.topic) {
    let fullText = `${result.topic.content}`;

    if (result.topic.details && result.topic.details.length > 0) {
      fullText += "\n\n" + result.topic.details.map((d) => `• ${d}`).join("\n");
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
    text: "I don't have verified data on that in our archives.\n\nAsk me about founders **Sai Rio** and **Edison**, our projects, or our core AI and WebGL tech stack.",
    suggestedFollowUps: [
      "Meet the founders",
      "What are we building?",
      "Explain the technology",
    ],
  };
}
