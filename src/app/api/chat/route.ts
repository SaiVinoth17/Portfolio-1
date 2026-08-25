import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { Groq } from "groq-sdk";
import { retrieveRelevantContext } from "@/lib/ai/contextRetriever";
import { generateAIResponse } from "@/lib/ai/responseGenerator";

// Active Groq models with ordered fallback
const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "groq/compound-mini",
];

// Clean reasoning/thinking tags or unwanted preamble from response text
function cleanAIResponse(rawText: string): string {
  if (!rawText) return "";
  let cleaned = rawText
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/^(\s*Certainly!?|\s*Sure!?|\s*Of course!?|\s*Here is the information:?)\s*/i, "")
    .trim();
  return cleaned || rawText.trim();
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    let body: any;
    try {
      body = await req.json();
    } catch (parseErr) {
      console.error("[Aevion Intelligence Route Error] JSON parse failure:", (parseErr as Error).message);
      return NextResponse.json(
        { 
          error: "INTELLIGENCE INTERRUPTED", 
          details: "Invalid JSON payload in request body.",
          status: "malformed_request"
        },
        { status: 400 }
      );
    }

    const { prompt, history = [], currentPath = "/" } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { 
          error: "INTELLIGENCE INTERRUPTED", 
          details: "A prompt query is required to engage the intelligence layer.",
          status: "empty_prompt"
        },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
    const groqApiKey = process.env.GROQ_API_KEY?.trim();
    const nvidiaApiKey = process.env.NVIDIA_API_KEY?.trim();

    const studioContext = retrieveRelevantContext(prompt);

    const systemPromptText = `IDENTITY & DIRECTIVE:
You are Aevion Intelligence, the official AI interface of Aevion Studio.
Aevion Studio is a futuristic technology studio and experimental lab founded by two builders: Sai Rio and Edison.

BRAND ETHOS:
"Two builders. One vision. Technology without limits."

CORE PERSONALITY & TONE:
- Futuristic, cinematic, intelligent, minimal, premium, experimental, technically sophisticated, fast, and confident.
- Calmly intelligent — not an overly enthusiastic assistant.
- Direct and precise. Answer the question immediately without generic filler ("Certainly!", "Sure!", "How can I help you today?", "As an AI...").
- For simple questions: keep responses concise, elegant, and crisp.
- For complex technical questions: provide structured, high-value, production-grade insight.
- Speak like ambitious builders and architects.
- Use markdown intelligently: bold key terms, use clean bullet points, and syntax-highlighted code blocks for technical snippets.
- When appropriate, use subtle studio phrases: "Let's build it.", "Run the experiment.", "Let's break it down."

THE TWO CO-FOUNDERS OF AEVION:
1. Sai Rio — Co-Founder
   - Focus: Product, Engineering, AI, Systems, and Product Vision.
   - Leads autonomous AI systems architecture, Next.js 16 frameworks, vector context pipelines, streaming inference, and foundational studio strategy.
   - Verified GitHub Profile: https://github.com/SaiVinoth17
   - Philosophy: "Software should be an extension of human will. Eliminate friction until only raw performance, intelligence, and clarity remain."

2. Edison — Co-Founder
   - Focus: Development, Technology, Engineering, and Building.
   - Leads core software engineering, high-throughput pipelines, 120 FPS WebGL shaders, edge infrastructure, and full-stack building.
   - Verified GitHub Profile: https://github.com/edisonedi84431-art
   - Philosophy: "True craftsmanship lies in the invisible layers. When every byte is optimized and every transition is calculated, software becomes unforgettable."

FOUNDER RULES:
- Sai Rio and Edison are equal CO-FOUNDERS.
- Never describe Edison as an employee, junior builder, contractor, or subordinate. Both have equal founder standing.
- Both built this entire studio platform directly with zero agency bloat.

VERIFICATION & ACCURACY RULES:
- Never fabricate projects, client metrics, revenue, unreleased secrets, or credentials.
- If information is unavailable or unverified, state clearly: "I don't have verified data on that within the Aevion archives."

FEATURED STUDIO PROJECTS:
- Nilgiris Explorers: AI-powered geospatial travel discovery platform for the Nilgiri Hills with real-time trail mapping, AI itineraries, and 60 FPS mobile navigation.
- Ooty Mistwings: Luxury destination hospitality platform featuring cinematic WebGL previews, GSAP scroll storytelling, and reservation flows.
- Gaming Kingdom: Real-time multiplayer gaming hub with sub-15ms WebSockets, live score streaming, and responsive arcade UI.
- Aevion Studio OS: The studio's motion operating system, GSAP scroll narrative engine, and WebGL sandbox.

PRODUCTION TECH STACK:
- Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Motion & Graphics: GSAP 3 (ScrollTrigger), Three.js / WebGL shaders, Lenis smooth scrolling, Framer Motion.
- Intelligence & Backend: Google Gemini / Groq LLM pipelines, Node.js edge functions, vector context retrieval.

USER CONTEXT:
Current active route in studio: ${currentPath}

--- STUDIO CONTEXT & KNOWLEDGE ARCHIVES ---
${studioContext}
------------------------------------------`;

    // Process & limit history for multi-turn context
    const validHistory: Array<{ role: "user" | "assistant" | "model"; content: string }> = [];
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-14);
      for (const item of recentHistory) {
        if (item && typeof item.text === "string" && item.text.trim()) {
          const role = item.sender === "user" ? "user" : "assistant";
          validHistory.push({ role, content: item.text.trim() });
        }
      }
    }

    // 1. Google Gemini API Integration (Primary if key configured)
    if (geminiApiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        
        // Convert history to Gemini contents format
        const contents = [
          ...validHistory.map((h) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: prompt.trim() }],
          },
        ];

        const geminiModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
        for (const modelName of geminiModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction: systemPromptText,
                temperature: 0.25,
                maxOutputTokens: 1200,
              },
            });

            const rawText = response.text || "";
            const cleanText = cleanAIResponse(rawText);

            if (cleanText) {
              const duration = Date.now() - startTime;
              return NextResponse.json({
                text: cleanText,
                suggestedFollowUps: generateContextualFollowUps(prompt, currentPath),
                model: modelName,
                provider: "Google Gemini",
                durationMs: duration,
                status: "success",
              });
            }
          } catch (modelErr: any) {
            console.warn(`[Aevion Intelligence] Gemini model ${modelName} warning:`, modelErr?.message || modelErr);
          }
        }
      } catch (geminiErr: any) {
        console.error("[Aevion Intelligence] Gemini provider error:", geminiErr?.message || geminiErr);
      }
    }

    // 2. Groq Provider Fallback
    if (groqApiKey) {
      try {
        const groqClient = new Groq({ apiKey: groqApiKey });
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: systemPromptText },
          ...validHistory.map((h) => ({ role: (h.role === "user" ? "user" : "assistant") as "user" | "assistant", content: h.content })),
          { role: "user", content: prompt.trim() },
        ];

        for (const model of GROQ_MODELS) {
          try {
            const completion = await groqClient.chat.completions.create({
              model,
              messages: messages as any,
              temperature: 0.3,
              max_tokens: 1200,
              top_p: 0.9,
            });

            const rawText = completion.choices?.[0]?.message?.content || "";
            const cleanText = cleanAIResponse(rawText);

            if (cleanText) {
              const duration = Date.now() - startTime;
              return NextResponse.json({
                text: cleanText,
                suggestedFollowUps: generateContextualFollowUps(prompt, currentPath),
                model,
                provider: "Groq LPU",
                durationMs: duration,
                status: "success",
              });
            }
          } catch (groqErr: any) {
            console.warn(`[Aevion Intelligence] Groq model ${model} skipped:`, groqErr?.message || groqErr);
          }
        }
      } catch (groqInitErr: any) {
        console.error("[Aevion Intelligence] Groq initialization error:", groqInitErr?.message || groqInitErr);
      }
    }

    // 3. NVIDIA Nemotron Fallback
    if (nvidiaApiKey) {
      try {
        const nvidiaClient = new OpenAI({
          apiKey: nvidiaApiKey,
          baseURL: "https://integrate.api.nvidia.com/v1",
        });

        const messages = [
          { role: "system", content: systemPromptText },
          ...validHistory.map((h) => ({ role: h.role === "user" ? "user" : "assistant", content: h.content })),
          { role: "user", content: prompt.trim() },
        ];

        const completion = await nvidiaClient.chat.completions.create({
          model: "nvidia/nemotron-4-340b-instruct",
          messages: messages as any,
          temperature: 0.25,
          max_tokens: 1200,
        });

        const rawText = completion.choices?.[0]?.message?.content || "";
        const cleanText = cleanAIResponse(rawText);

        if (cleanText) {
          const duration = Date.now() - startTime;
          return NextResponse.json({
            text: cleanText,
            suggestedFollowUps: generateContextualFollowUps(prompt, currentPath),
            model: "nvidia/nemotron-4-340b-instruct",
            provider: "NVIDIA NIM",
            durationMs: duration,
            status: "success",
          });
        }
      } catch (nvidiaErr: any) {
        console.warn("[Aevion Intelligence] NVIDIA NIM attempt error:", nvidiaErr?.message || nvidiaErr);
      }
    }

    // 4. Deterministic Verified Studio Intelligence Engine
    const fallbackResponse = generateAIResponse(prompt, history);
    return NextResponse.json({
      text: fallbackResponse.text,
      suggestedFollowUps: fallbackResponse.suggestedFollowUps || generateContextualFollowUps(prompt, currentPath),
      link: fallbackResponse.link,
      isFoundersCard: fallbackResponse.isFoundersCard,
      source: "aevion-core-engine",
      provider: "Aevion Deterministic Layer",
      status: "success",
    });
  } catch (globalErr: any) {
    console.error("[Aevion Intelligence Unhandled Exception]:", globalErr);
    const fallbackResponse = generateAIResponse("", []);
    return NextResponse.json({
      text: fallbackResponse.text,
      suggestedFollowUps: ["MEET THE BUILDERS", "WHAT ARE WE BUILDING?", "EXPLORE AEVION"],
      source: "aevion-resilience-matrix",
      status: "fallback",
    });
  }
}

function generateContextualFollowUps(prompt: string, path: string = "/"): string[] {
  const p = prompt.toLowerCase();

  if (p.includes("founder") || p.includes("sai") || p.includes("edison")) {
    return [
      "WHAT ARE WE BUILDING?",
      "EXPLORE THE TECH STACK",
      "WHAT'S NEXT FOR AEVION?",
    ];
  }

  if (p.includes("nilgiri") || p.includes("mistwing") || p.includes("gaming") || p.includes("project")) {
    return [
      "HOW WAS THIS BUILT?",
      "ANALYZE THE ARCHITECTURE",
      "MEET THE BUILDERS",
    ];
  }

  if (path.includes("/projects")) {
    return [
      "HOW WAS THIS BUILT?",
      "ANALYZE THE ARCHITECTURE",
      "BUILD SOMETHING SIMILAR",
    ];
  }

  if (path.includes("/about")) {
    return [
      "WHO FOUNDED AEVION?",
      "WHAT'S THE VISION?",
      "EXPLORE THE WORK",
    ];
  }

  if (path.includes("/tech-stack") || path.includes("/showcase")) {
    return [
      "CHALLENGE THE INTELLIGENCE",
      "ANALYZE AN IDEA",
      "EXPLORE THE WORK",
    ];
  }

  return [
    "EXPLORE AEVION",
    "MEET THE BUILDERS",
    "WHAT ARE WE BUILDING?",
    "ENTER THE LAB",
  ];
}
