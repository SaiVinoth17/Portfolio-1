import { classifyIntent, ConversationMessage } from "./intentEngine";

export interface AIResponse {
  text: string;
  suggestedFollowUps: string[];
  link?: { text: string; url: string };
}

export function generateAIResponse(query: string, history: ConversationMessage[]): AIResponse {
  const result = classifyIntent(query, history);

  if (result.intent === "GREETING") {
    return {
      text: "Hello! I am Aevion AI, the digital assistant for Aevion Studio. How can I help you explore our AI software, tech stack, or portfolio today?",
      suggestedFollowUps: [
        "What services do you offer?",
        "Tell me about your tech stack",
        "How can I contact Aevion Studio?",
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
        "What services do you offer?",
        "How can I contact you?",
      ],
      link: result.topic.link,
    };
  }

  // Graceful out-of-domain fallback
  return {
    text: `I don't have specific details on "${query}", but I can provide complete information on Aevion Studio's custom AI software, tech stack, creative 3D motion engineering, or contact options. What would you like to explore?`,
    suggestedFollowUps: [
      "What services does Aevion Studio offer?",
      "What technology stack do you use?",
      "How do I start a project?",
    ],
  };
}
