import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Groq } from "groq-sdk";
import { retrieveRelevantContext } from "@/lib/ai/contextRetriever";
import { generateAIResponse } from "@/lib/ai/responseGenerator";

// Supported active Groq chat models with ordered fallback
const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "groq/compound-mini",
];

// Helper to remove any internal reasoning/thinking tags from response text
function cleanAIResponse(rawText: string): string {
  if (!rawText) return "";
  let cleaned = rawText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  return cleaned || rawText.trim();
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    let body: any;
    try {
      body = await req.json();
    } catch (parseErr) {
      console.error("[Aevion AI Route Error] JSON parse failure:", (parseErr as Error).message);
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { prompt, history = [] } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      console.error("[Aevion AI Route Error] Missing or empty prompt in request payload.");
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY?.trim();
    const nvidiaApiKey = process.env.NVIDIA_API_KEY?.trim();

    // If no external API key is configured, immediately provide verified deterministic intelligence
    if (!groqApiKey && !nvidiaApiKey) {
      const fallbackResponse = generateAIResponse(prompt, history);
      return NextResponse.json({
        text: fallbackResponse.text,
        suggestedFollowUps: fallbackResponse.suggestedFollowUps,
        link: fallbackResponse.link,
        isFoundersCard: fallbackResponse.isFoundersCard,
        source: "aevion-knowledge-engine",
      });
    }

    const safePromptSnippet = prompt.trim().slice(0, 60);
    console.log(`[Aevion AI Route] Incoming prompt: "${safePromptSnippet}..." (Length: ${prompt.length})`);

    const studioContext = retrieveRelevantContext(prompt);
    const systemPromptText = `IDENTITY:
You are Aevion AI, the official intelligence layer for Aevion Studio.
Aevion Studio is an AI & experimental technology studio founded by TWO co-founders: Sai Rio and Edison.
You represent the studio's craft, engineering mindset, products, and both co-founders equally.
Never break character.

THE CO-FOUNDERS OF AEVION:
1. Sai Rio — Co-Founder
   - Focus: Product, Engineering, AI, Systems, and Product Vision.
   - Leads autonomous AI systems architecture, Next.js 16 frameworks, vector context pipelines, and overall studio vision.
2. Edison — Co-Founder
   - Focus: Development, Technology, Engineering, and Building.
   - Leads core software development, high-throughput pipelines, WebGL graphics, and edge infrastructure.
   - Verified GitHub: https://github.com/edisonedi84431-art

CORE FOUNDER PRINCIPLES:
- Both Sai Rio and Edison are equal CO-FOUNDERS.
- Never describe Edison as a team member, employee, contributor, assistant, or secondary founder.
- Never rank one founder above the other.
- Never randomly choose Sai Rio as the sole founder.
- Aevion was built by two people with a shared vision: "Two builders. One vision. Technology without limits."

CORE ANSWERS TO COMMON QUESTIONS:
- "Who founded Aevion?" -> "Aevion was founded by Sai Rio and Edison — two builders focused on turning ambitious ideas into real technology."
- "Who is Sai Rio?" -> "Sai Rio is Co-Founder of Aevion, leading Product, Engineering, AI, Systems, and Product Vision."
- "Who is Edison?" -> "Edison is Co-Founder of Aevion, leading Development, Technology, Engineering, and Building. His verified GitHub is https://github.com/edisonedi84431-art."
- "Are Sai and Edison both founders?" -> "Yes. Sai Rio and Edison are both co-founders of Aevion with equal founder status."
- "What is Aevion?" -> "Aevion is a futuristic technology and AI creative studio founded by Sai Rio and Edison to turn ambitious ideas into real technology."
- "Who built this website?" -> "This website was designed, architected, and built by co-founders Sai Rio and Edison."

SAFETY & VERIFICATION RULE:
Never fabricate information about Sai Rio or Edison.
If asked about unknown personal credentials, education, revenue, or unverified claims, say:
"I don't have verified information about that yet."

FEATURED STUDIO PROJECTS:
- Nilgiris Explorers: Immersive geospatial travel discovery platform for the Nilgiri Hills with real-time trail mapping, AI-curated itineraries, and dynamic terrain visualization.
- Ooty Mistwings: Luxury booking experience with cinematic WebGL previews, smooth scroll storytelling, and integrated payment flows.
- Gaming Kingdom: Real-time multiplayer gaming hub with live leaderboards, social features, and custom WebSocket engine.
- Aevion Studio OS: The studio's motion operating system and WebGL laboratory.

PERSONALITY & CONVERSATION STYLE:
- Intelligent, concise, confident, technical, curious, slightly futuristic, helpful, and founder-aware.
- Speak like builders, not marketing fluff.

--- AEVION STUDIO PORTFOLIO KNOWLEDGE ---
${studioContext}
---------------------------------------`;

    // Validate and limit conversation history
    const validHistory: Array<{ role: "user" | "assistant"; content: string }> = [];
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-20);
      for (const item of recentHistory) {
        if (
          item &&
          typeof item.text === "string" &&
          item.text.trim() &&
          (item.sender === "user" || item.sender === "ai" || item.sender === "assistant")
        ) {
          const role = item.sender === "user" ? "user" : "assistant";
          validHistory.push({ role, content: item.text.trim() });
        }
      }
    }

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPromptText },
      ...validHistory,
      { role: "user", content: prompt.trim() },
    ];

    let lastErrorDetails: { provider: string; model?: string; status?: number; message: string } | null = null;

    // 1. Optional NVIDIA provider (if NVIDIA_API_KEY is configured)
    if (nvidiaApiKey) {
      try {
        console.log(`[Aevion AI] Attempting completion via NVIDIA Nemotron...`);
        const nvidiaClient = new OpenAI({
          apiKey: nvidiaApiKey,
          baseURL: "https://integrate.api.nvidia.com/v1",
        });

        const completion = await nvidiaClient.chat.completions.create({
          model: "nvidia/nemotron-4-340b-instruct",
          messages: messages as any,
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
        });

        const rawText = completion.choices?.[0]?.message?.content || "";
        const cleanText = cleanAIResponse(rawText);

        if (cleanText) {
          const duration = Date.now() - startTime;
          console.log(`[Aevion AI Success] NVIDIA Nemotron responded in ${duration}ms (${cleanText.length} chars).`);
          return NextResponse.json({
            text: cleanText,
            suggestedFollowUps: [
              "Meet the founders",
              "What is Aevion building?",
              "Explore our projects",
            ],
            model: "nvidia/nemotron-4-340b-instruct",
            provider: "NVIDIA",
            durationMs: duration,
          });
        }
      } catch (nvidiaErr: any) {
        const status = nvidiaErr?.status || nvidiaErr?.statusCode;
        console.error(`[Aevion AI Warning] NVIDIA attempt failed [Status: ${status}]:`, nvidiaErr?.message || nvidiaErr);
        lastErrorDetails = {
          provider: "NVIDIA",
          model: "nvidia/nemotron-4-340b-instruct",
          status,
          message: nvidiaErr?.message || "Unknown NVIDIA API error",
        };
      }
    }

    // 2. Groq provider with multi-model fallback sequence
    if (groqApiKey) {
      const groqClient = new Groq({ apiKey: groqApiKey });

      for (const model of GROQ_MODELS) {
        try {
          console.log(`[Aevion AI] Requesting Groq completion using model: ${model}`);
          const completion = await groqClient.chat.completions.create({
            model,
            messages: messages as any,
            temperature: 0.3,
            max_tokens: 1024,
            top_p: 0.9,
          });

          const rawText = completion.choices?.[0]?.message?.content || "";
          const cleanText = cleanAIResponse(rawText);

          if (cleanText) {
            const duration = Date.now() - startTime;
            console.log(`[Aevion AI Success] Groq model ${model} responded in ${duration}ms (${cleanText.length} chars).`);
            return NextResponse.json({
              text: cleanText,
              suggestedFollowUps: [
                "Meet the founders",
                "What is Aevion building?",
                "Explore our projects",
              ],
              model,
              provider: "Groq",
              durationMs: duration,
            });
          }

          console.warn(`[Aevion AI Warning] Groq model ${model} returned empty completion.`);
        } catch (groqErr: any) {
          const status = groqErr?.status || groqErr?.statusCode;
          const msg = groqErr?.message || String(groqErr);
          console.error(`[Aevion AI Error] Groq model ${model} failed [Status: ${status}]:`, msg);

          lastErrorDetails = {
            provider: "Groq",
            model,
            status,
            message: msg,
          };
        }
      }
    }

    // If external providers fail or rate limit, fall back safely to local verified engine
    const fallbackResponse = generateAIResponse(prompt, history);
    return NextResponse.json({
      text: fallbackResponse.text,
      suggestedFollowUps: fallbackResponse.suggestedFollowUps,
      link: fallbackResponse.link,
      isFoundersCard: fallbackResponse.isFoundersCard,
      source: "aevion-knowledge-engine",
    });
  } catch (globalErr: any) {
    console.error("[Aevion AI Unhandled Exception]:", globalErr);
    const fallbackResponse = generateAIResponse("", []);
    return NextResponse.json({
      text: fallbackResponse.text,
      suggestedFollowUps: fallbackResponse.suggestedFollowUps,
      source: "aevion-knowledge-engine",
    });
  }
}
