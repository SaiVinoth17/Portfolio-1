import { KNOWLEDGE_BASE, KnowledgeTopic } from "./knowledgeBase";

export type IntentType =
  | "GREETING"
  | "SERVICES"
  | "TECHNOLOGIES"
  | "PROJECTS"
  | "WORKFLOW"
  | "STUDIO"
  | "CONTACT"
  | "FAQ"
  | "UNKNOWN";

export interface ConversationMessage {
  sender: "ai" | "user";
  text: string;
}

export interface IntentResult {
  intent: IntentType;
  topic: KnowledgeTopic | null;
  score: number;
}

export function classifyIntent(query: string, history: ConversationMessage[]): IntentResult {
  const cleanQuery = query.toLowerCase().trim();

  // Greetings check
  if (/^(hi|hello|hey|greetings|good morning|good evening|yo)\b/.test(cleanQuery)) {
    return {
      intent: "GREETING",
      topic: null,
      score: 1.0,
    };
  }

  // Handle follow-up context (e.g. "tell me more", "what about that?", "how do I start?")
  let contextualQuery = cleanQuery;
  if (/^(tell me more|more info|what about that|how|can you elaborate|details)\b/.test(cleanQuery) && history.length > 0) {
    const lastUserMsg = [...history].reverse().find((m) => m.sender === "user");
    if (lastUserMsg) {
      contextualQuery += " " + lastUserMsg.text.toLowerCase();
    }
  }

  let bestMatch: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;
    const tokens = contextualQuery.split(/\s+/);

    for (const kw of topic.keywords) {
      if (contextualQuery.includes(kw)) {
        score += 2;
      }
      for (const token of tokens) {
        if (kw.includes(token) && token.length > 2) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  if (bestMatch && highestScore >= 2) {
    const categoryToIntent: Record<string, IntentType> = {
      services: "SERVICES",
      technologies: "TECHNOLOGIES",
      projects: "PROJECTS",
      workflow: "WORKFLOW",
      studio: "STUDIO",
      contact: "CONTACT",
      faq: "FAQ",
    };

    return {
      intent: categoryToIntent[bestMatch.category] || "UNKNOWN",
      topic: bestMatch,
      score: highestScore,
    };
  }

  return {
    intent: "UNKNOWN",
    topic: null,
    score: 0,
  };
}
