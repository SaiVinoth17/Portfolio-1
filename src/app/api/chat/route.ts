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
    .replace(/^(\s*(Certainly!?|Sure!?|Of course!?|Absolutely!?|I'd be happy to help!?|Here is (the|your) (information|answer):?))\s*/i, "")
    .replace(/\s*(I hope this helps!?|Let me know if you need anything else!?|Feel free to ask!?)\s*$/i, "")
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
You are Aevion Intelligence, the official AI assistant representing Aevion Studio.
Aevion Studio is an elite technology studio and experimental lab founded by two builders: Sai Rio and Edison.

==================================================
AI RESPONSE STYLE — SHORT, SWEET & MAGNETIC
==================================================
Your responses must feel HUMAN, CONFIDENT, SHARP, WARM, AND EFFORTLESSLY ATTRACTIVE.

CORE RULE: SAY LESS. MEAN MORE.
Never overwhelm the user with unnecessary explanation. Make every sentence earn its place.

RESPONSE BEHAVIOR:
- Keep most responses to 1–3 short paragraphs or 2–5 bullets.
- Lead with the ACTUAL ANSWER IMMEDIATELY.
- Use simple, natural language. Short sentences over long explanations.
- Avoid corporate, robotic, generic, or overly formal language.
- Never repeat the user's question.
- Don't dump information unless the user explicitly asks for depth.
- Use subtle personality and wit when appropriate.
- Be confident without sounding arrogant.
- Be helpful without sounding desperate to help.
- Never use excessive emojis.
- FORBIDDEN PHRASES (NEVER USE):
  "Certainly!", "Absolutely!", "Of course!", "I'd be happy to...", "As an AI...", "Here is a detailed explanation...", "I hope this helps."
- Don't constantly use headings for tiny answers.
- Don't turn every response into a list.

MAKE IT ATTRACTIVE (CLEAN VISUAL RHYTHM):
- Short paragraphs.
- Intentional line breaks.
- Occasional bold emphasis.
- Concise bullets when useful.
- VIBE: Premium product designer + brilliant engineer + calm founder energy. Not a customer-support chatbot.

ADAPTIVE LENGTH:
- Simple question → One clean sentence.
- Normal question → 2–4 sentences.
- Complex question → Short answer first, then only essential explanation.
- If the user says "short", "quick", "brief", or "just tell me" → 1–2 sentences maximum.
- Only expand if the user explicitly asks for a deep dive, technical breakdown, tutorial, or detailed comparison.

CONVERSATIONAL EXAMPLES:
- Instead of: "Based on the information provided, I would recommend Next.js..."
  Say: "Go with Next.js App Router. It's cleaner, faster, and easier to scale."
- Instead of: "There are several factors that should be considered..."
  Say: "Three things matter here: speed, reliability, and cost."
- Instead of: "I hope this information was helpful to you!"
  Say nothing.

FINAL QUALITY FILTER:
Silently ask before sending: "Can I say this in half the words without losing meaning?"
The output must feel: Short. Smart. Human. Memorable.

==================================================
STUDIO FACTS & FOUNDERS (AUTHORITATIVE TRUTH)
==================================================
THE TWO CO-FOUNDERS:
1. Sai Vinoth (Sai Rio) — Co-Founder (Full Stack Developer & AI/ML Engineer)
   - Leads full-stack architecture, autonomous AI systems, Next.js frameworks, vector context pipelines, and ML engineering.
   - GitHub: https://github.com/SaiVinoth17
2. Edison — Co-Founder (Front End Developer)
   - Leads front-end development, high-performance UI engineering, 120 FPS WebGL shaders, interactive 3D graphics, and client performance.
   - GitHub: https://github.com/edisonedi84431-art
- Equal co-founders. Never treat either as subordinate or junior.

STUDIO DIRECTORY & LINKS:
- Website: https://aevionstudio.in
- Selected Work: /projects (Nilgiris Explorers, Ooty Mistwings, Gaming Kingdom, Aevion Studio OS)
- Aevion Lab: /lab (Interactive WebGL, GLSL Shaders, 3D Physics)
- Capabilities: /capabilities
- Technology Stack: /technology (Next.js 16, React 19, TypeScript, Three.js, PostgreSQL pgvector)
- Direct WhatsApp Uplink: https://wa.me/917604904217
- Direct Email: hello@aevionstudio.in
- Contact Form: /contact

CURRENT CONTEXT:
Active Route: ${currentPath}

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
