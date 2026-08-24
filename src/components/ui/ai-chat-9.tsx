"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  User,
  ChevronDown,
  Cpu,
  Zap,
  Sliders,
  DollarSign,
  Layers,
  Check,
  RefreshCw,
  Square,
  Copy,
  Paperclip,
  Mic,
  MicOff,
  Globe,
  CornerDownLeft,
  X,
  Code2,
  BrainCircuit,
  Info,
} from "lucide-react";

export interface AIModel {
  id: string;
  name: string;
  provider: "groq" | "nvidia" | "openai" | "anthropic" | "google";
  providerName: string;
  description: string;
  contextWindow: string;
  inputCost: string;
  outputCost: string;
  speed: string;
  supportsReasoning: boolean;
  isRecommended?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    provider: "groq",
    providerName: "Groq (Active Engine)",
    description: "High-intelligence open-weights reasoning model with high-throughput LPU acceleration.",
    contextWindow: "131,072 tokens",
    inputCost: "$0.15 / 1M tokens",
    outputCost: "$0.60 / 1M tokens",
    speed: "1,250 tok/s",
    supportsReasoning: true,
    isRecommended: true,
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT-OSS 20B",
    provider: "groq",
    providerName: "Groq (Active Engine)",
    description: "Lightweight and ultra-low latency model optimized for interactive chat and rapid code completion.",
    contextWindow: "131,072 tokens",
    inputCost: "$0.08 / 1M tokens",
    outputCost: "$0.20 / 1M tokens",
    speed: "1,800 tok/s",
    supportsReasoning: true,
  },
  {
    id: "groq/compound-mini",
    name: "Compound Mini",
    provider: "groq",
    providerName: "Groq (Active Engine)",
    description: "High-speed reasoning assistant designed for concise coding and knowledge synthesis.",
    contextWindow: "128,000 tokens",
    inputCost: "$0.05 / 1M tokens",
    outputCost: "$0.10 / 1M tokens",
    speed: "950 tok/s",
    supportsReasoning: false,
  },
  {
    id: "nvidia/nemotron-3.5-lightning-30b-a3b",
    name: "Nemotron 3.5 Lightning",
    provider: "nvidia",
    providerName: "NVIDIA NIM",
    description: "NVIDIA's flagship distilled instruction model engineered for high accuracy and software design.",
    contextWindow: "128,000 tokens",
    inputCost: "$0.20 / 1M tokens",
    outputCost: "$0.70 / 1M tokens",
    speed: "650 tok/s",
    supportsReasoning: true,
  },
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "anthropic",
    providerName: "Anthropic",
    description: "Hybrid reasoning architecture for complex coding, architectural synthesis, and full-stack design.",
    contextWindow: "200,000 tokens",
    inputCost: "$3.00 / 1M tokens",
    outputCost: "$15.00 / 1M tokens",
    speed: "120 tok/s",
    supportsReasoning: true,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    providerName: "Google Cloud",
    description: "Million-token multimodal model with high-speed reasoning and deep retrieval capabilities.",
    contextWindow: "1,000,000 tokens",
    inputCost: "$0.10 / 1M tokens",
    outputCost: "$0.40 / 1M tokens",
    speed: "400 tok/s",
    supportsReasoning: true,
  },
];

export type ReasoningEffort = "none" | "low" | "medium" | "high";

export interface AIChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  modelUsed?: string;
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
}

interface AIChat9Props {
  className?: string;
  initialPrompt?: string;
  onClose?: () => void;
}

export function AIChat9({ className = "", initialPrompt = "", onClose }: AIChat9Props) {
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [reasoningEffort, setReasoningEffort] = useState<ReasoningEffort>("medium");
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);

  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "initial-1",
      sender: "ai",
      text: "Hey! I'm Aevion AI powered by the AI Chat 9 engine. You can configure models, providers, context windows, and reasoning effort dynamically using the model picker below.",
      suggestedFollowUps: [
        "Who is Sai Vinoth?",
        "Tell me about Nilgiris Explorers",
        "What is your tech stack?",
      ],
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const msgIdCounter = useRef(1);

  // Auto-grow input textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredModels =
    selectedProvider === "all"
      ? AI_MODELS
      : AI_MODELS.filter((m) => m.provider === selectedProvider);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStopGenerating = () => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    setIsGenerating(false);
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  };

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isGenerating) return;

    msgIdCounter.current += 1;
    const userMsg: AIChatMessage = {
      id: `user-${msgIdCounter.current}`,
      sender: "user",
      text: queryText.trim(),
    };

    msgIdCounter.current += 1;
    const streamMsgId = `ai-${msgIdCounter.current}`;
    const aiStreamMsg: AIChatMessage = {
      id: streamMsgId,
      sender: "ai",
      text: "",
      modelUsed: selectedModel.name,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, aiStreamMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const historyForAI = messages
        .filter((m) => m.id !== "initial-1" && !m.isStreaming && m.text.trim())
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: queryText,
          history: historyForAI,
          model: selectedModel.id,
          reasoningEffort,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Ignore json parse error
      }

      let fullResponse = "";
      let followUps: string[] = [];

      if (!res.ok) {
        if (res.status === 401) {
          fullResponse = `⚠️ **Authentication Error**: ${data.error || "API key is missing or invalid."}`;
        } else if (res.status === 429) {
          fullResponse = "⏳ **Rate Limit**: High server volume. Please retry in a few seconds.";
        } else {
          fullResponse = `⚠️ **Error (${res.status})**: ${data.details || data.error || "Unable to generate response."}`;
        }
        followUps = ["Who is Sai Vinoth?", "What is your tech stack?"];
      } else {
        fullResponse = data.text || "I'm here! What would you like to explore next?";
        followUps = data.suggestedFollowUps || [
          "Tell me about Nilgiris Explorers",
          "What is your tech stack?",
        ];
      }

      let charIndex = 0;
      streamingIntervalRef.current = setInterval(() => {
        charIndex += 5;
        if (charIndex >= fullResponse.length) {
          if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
          setIsGenerating(false);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === streamMsgId
                ? {
                    ...m,
                    text: fullResponse,
                    suggestedFollowUps: followUps,
                    isStreaming: false,
                  }
                : m
            )
          );
        } else {
          const slice = fullResponse.slice(0, charIndex);
          setMessages((prev) =>
            prev.map((m) => (m.id === streamMsgId ? { ...m, text: slice } : m))
          );
        }
      }, 15);
    } catch {
      setIsGenerating(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamMsgId
            ? {
                ...m,
                text: "An error occurred connecting to the AI endpoint. Please try again.",
                isStreaming: false,
              }
            : m
        )
      );
    }
  };

  const formatMessageText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-emerald-400 text-[15px] mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-bold text-white text-[16px] mt-2.5 mb-1">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={idx} className="font-semibold text-zinc-100 my-1">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <p key={idx} className="pl-3 text-zinc-300 my-0.5 flex items-start gap-1.5 text-[14px]">
            <span className="text-emerald-400">•</span>
            <span>{line.replace(/^[•-]\s*/, "")}</span>
          </p>
        );
      }
      return (
        <p key={idx} className="my-1 text-zinc-200 text-[14px] leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className={`relative flex flex-col h-full w-full bg-zinc-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl text-white font-sans ${className}`}
    >
      {/* Header Bar */}
      <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-zinc-900/60 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Sparkles size={16} className="text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white">AI Chat 9 • Composer</h3>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                React Bits Pro
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Model picker with detail card & reasoning controls</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-[14px] overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                msg.sender === "user"
                  ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-bold"
                  : "bg-zinc-900 border border-white/10 text-emerald-400"
              }`}
            >
              {msg.sender === "user" ? <User size={14} /> : <Sparkles size={14} />}
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[85%] relative ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md border border-emerald-400/20"
                  : "bg-zinc-900/80 border border-white/10 text-zinc-200 shadow-lg"
              }`}
            >
              {msg.modelUsed && (
                <div className="text-[10px] font-mono text-emerald-400 mb-1 flex items-center gap-1">
                  <Cpu size={10} /> {msg.modelUsed}
                </div>
              )}

              {formatMessageText(msg.text)}

              {msg.isStreaming && (
                <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-pulse rounded-xs" />
              )}

              {!msg.isStreaming && msg.sender === "ai" && (
                <button
                  onClick={() => handleCopy(msg.text, msg.id)}
                  className="mt-2 text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === msg.id ? "Copied" : "Copy response"}</span>
                </button>
              )}

              {/* Follow ups */}
              {msg.suggestedFollowUps && !msg.isStreaming && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/10">
                  {msg.suggestedFollowUps.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] bg-black/40 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-emerald-400 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Model Picker & Detail Card Floating Drawer */}
      <AnimatePresence>
        {isPickerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-24 left-4 right-4 z-50 bg-zinc-950/98 border border-white/15 rounded-2xl shadow-2xl p-4 backdrop-blur-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <BrainCircuit size={16} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Model & Provider Detail Card
                </span>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Provider Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {["all", "groq", "nvidia", "anthropic", "google"].map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvider(prov)}
                  className={`px-2.5 py-1 rounded-lg font-mono uppercase text-[11px] transition-all cursor-pointer ${
                    selectedProvider === prov
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>

            {/* Model List & Detail Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              {/* Model Selection List */}
              <div className="space-y-1.5">
                {filteredModels.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedModel.id === model.id
                        ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                        : "bg-zinc-900/50 border-white/5 hover:border-white/15 text-zinc-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-white">{model.name}</span>
                        {model.isRecommended && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400">{model.providerName}</p>
                    </div>
                    {selectedModel.id === model.id && <Check size={14} className="text-emerald-400" />}
                  </div>
                ))}
              </div>

              {/* Detail Card carrying Context, Cost & Reasoning */}
              <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3 space-y-2.5 flex flex-col justify-between text-xs font-mono">
                <div>
                  <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-white/10 pb-1.5">
                    <span className="truncate">{selectedModel.name}</span>
                    <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {selectedModel.speed}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans mt-1.5 leading-snug">
                    {selectedModel.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 block text-[10px] uppercase">Context</span>
                    <span className="text-zinc-200 font-semibold">{selectedModel.contextWindow}</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 block text-[10px] uppercase">Est. Cost</span>
                    <span className="text-emerald-400 font-semibold">{selectedModel.outputCost}</span>
                  </div>
                </div>

                {/* Reasoning Effort Control */}
                {selectedModel.supportsReasoning && (
                  <div className="space-y-1 pt-1 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400 flex items-center gap-1">
                        <Sliders size={11} className="text-emerald-400" /> Reasoning Effort
                      </span>
                      <span className="text-emerald-400 uppercase text-[10px] font-bold">
                        {reasoningEffort}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 pt-0.5">
                      {(["none", "low", "medium", "high"] as ReasoningEffort[]).map((effort) => (
                        <button
                          key={effort}
                          onClick={() => setReasoningEffort(effort)}
                          className={`py-1 rounded text-[10px] uppercase transition-all cursor-pointer font-bold ${
                            reasoningEffort === effort
                              ? "bg-emerald-500 text-zinc-950"
                              : "bg-black/50 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {effort}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Composer Bottom Bar with Model Picker Button */}
      <div className="p-3.5 border-t border-white/10 bg-zinc-950/95 space-y-2 shrink-0">
        {/* Model Picker Pill Bar */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => setIsPickerOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
              {selectedModel.name}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
              ({selectedModel.contextWindow})
            </span>
            <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isPickerOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWebSearchEnabled((prev) => !prev)}
              title="Toggle Live Web Grounding"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono ${
                webSearchEnabled
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-zinc-900/60 text-zinc-400 border-white/10 hover:text-white"
              }`}
            >
              <Globe size={13} />
              <span className="hidden sm:inline">Web</span>
            </button>

            {isGenerating && (
              <button
                onClick={handleStopGenerating}
                className="px-2.5 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 text-xs flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <Square size={11} /> Stop
              </button>
            )}
          </div>
        </div>

        {/* Input Composer Field */}
        <div className="flex items-end gap-2 bg-zinc-900 border border-white/10 rounded-2xl p-1.5 focus-within:border-emerald-500/60 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            rows={1}
            placeholder={`Message ${selectedModel.name}...`}
            className="flex-1 bg-transparent px-3 py-2 text-[14px] text-white placeholder-zinc-500 focus:outline-none resize-none overflow-hidden max-h-32"
          />

          <button
            onClick={() => handleSendMessage(input)}
            disabled={isGenerating || !input.trim()}
            className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-zinc-950 rounded-xl transition-all cursor-pointer font-bold shadow-md shadow-emerald-500/20 shrink-0"
          >
            <Send size={15} />
          </button>
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono px-1">
          <span className="flex items-center gap-1">
            <CornerDownLeft size={10} /> Enter to send • Shift+Enter for new line
          </span>
          <span>Reasoning: {selectedModel.supportsReasoning ? reasoningEffort : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
