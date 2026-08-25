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
  Layers,
  Check,
  RefreshCw,
  Square,
  Copy,
  Mic,
  MicOff,
  Globe,
  CornerDownLeft,
  X,
  Code2,
  BrainCircuit,
  Terminal,
  Users,
} from "lucide-react";

export interface AIModel {
  id: string;
  name: string;
  provider: "gemini" | "groq" | "nvidia" | "anthropic" | "openai";
  providerName: string;
  description: string;
  contextWindow: string;
  speed: string;
  supportsReasoning: boolean;
  isRecommended?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
    providerName: "Google DeepMind / Cloud",
    description: "Million-token multimodal model with high-speed reasoning, deep context retrieval, and zero latency.",
    contextWindow: "1,000,000 tokens",
    speed: "450 tok/s",
    supportsReasoning: true,
    isRecommended: true,
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B Versatile",
    provider: "groq",
    providerName: "Groq LPU Engine",
    description: "High-intelligence open-weights reasoning model with high-throughput LPU acceleration.",
    contextWindow: "131,072 tokens",
    speed: "1,250 tok/s",
    supportsReasoning: true,
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    provider: "groq",
    providerName: "Groq LPU Engine",
    description: "Deep reasoning architecture with high token velocity for complex engineering tasks.",
    contextWindow: "131,072 tokens",
    speed: "950 tok/s",
    supportsReasoning: true,
  },
  {
    id: "nvidia/nemotron-4-340b-instruct",
    name: "Nemotron 4 340B",
    provider: "nvidia",
    providerName: "NVIDIA NIM",
    description: "NVIDIA flagship distilled instruction model engineered for high accuracy and software design.",
    contextWindow: "128,000 tokens",
    speed: "650 tok/s",
    supportsReasoning: true,
  },
];

export type ReasoningEffort = "low" | "medium" | "high";

export interface AIChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  modelUsed?: string;
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
  isError?: boolean;
  timestamp?: string;
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
      id: "initial-aevion-composer-msg",
      sender: "ai",
      text: "AEVION INTELLIGENCE ONLINE\n\n*\"Two builders. One vision. Technology without limits.\"*\n\nWhat are we building?",
      suggestedFollowUps: [
        "EXPLORE AEVION",
        "ENTER THE LAB",
        "MEET THE BUILDERS",
        "CHALLENGE THE INTELLIGENCE",
      ],
      timestamp: "ONLINE",
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const msgIdCounter = useRef(1);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Scroll to bottom
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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    msgIdCounter.current += 1;
    const streamMsgId = `ai-${msgIdCounter.current}`;
    const aiStreamMsg: AIChatMessage = {
      id: streamMsgId,
      sender: "ai",
      text: "",
      modelUsed: selectedModel.name,
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, aiStreamMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const historyForAI = messages
        .filter((m) => m.id !== "initial-aevion-composer-msg" && !m.isStreaming && m.text.trim())
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
      let isErrorResponse = false;

      if (!res.ok) {
        isErrorResponse = true;
        fullResponse = `INTELLIGENCE INTERRUPTED\n\n${data.details || data.error || "Unable to complete request. Please retry."}`;
        followUps = ["MEET THE BUILDERS", "RETRY UPLINK"];
      } else {
        fullResponse = data.text || "Aevion Intelligence online. State your objective.";
        followUps = data.suggestedFollowUps || [
          "EXPLORE AEVION",
          "ENTER THE LAB",
          "MEET THE BUILDERS",
        ];
      }

      let charIndex = 0;
      const chunkSize = fullResponse.length > 500 ? 8 : 4;
      streamingIntervalRef.current = setInterval(() => {
        charIndex += chunkSize;
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
                    isError: isErrorResponse,
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
      }, 14);
    } catch {
      setIsGenerating(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamMsgId
            ? {
                ...m,
                text: "INTELLIGENCE INTERRUPTED\n\nNetwork or endpoint connection failure.",
                isError: true,
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
          <h4 key={idx} className="font-bold text-emerald-400 font-mono text-[13px] mt-2 mb-1 uppercase tracking-wider">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-bold text-white text-[15px] mt-2.5 mb-1 tracking-tight">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={idx} className="font-semibold text-zinc-100 my-1 text-[14px]">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <p key={idx} className="pl-2 text-zinc-300 my-0.5 flex items-start gap-2 text-[13px] leading-relaxed">
            <span className="text-emerald-400 mt-1 text-[6px]">●</span>
            <span>{line.replace(/^[•-]\s*/, "")}</span>
          </p>
        );
      }
      return (
        <p key={idx} className="my-1 text-zinc-200 text-[13px] leading-relaxed">
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
      <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-zinc-900/70 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Sparkles size={16} className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white font-mono">AEVION INTELLIGENCE • COMPOSER</h3>
              <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                STUDIO OS
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Two builders • One vision • Technology without limits</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-[13px] overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                msg.sender === "user"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
                  : "bg-zinc-900 border border-white/10 text-emerald-400"
              }`}
            >
              {msg.sender === "user" ? <User size={13} /> : <Sparkles size={13} />}
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[85%] relative ${
                msg.sender === "user"
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-white font-medium shadow-md"
                  : msg.isError
                  ? "bg-red-950/30 border border-red-500/30 text-red-200"
                  : "bg-zinc-900/80 border border-white/10 text-zinc-200 shadow-lg"
              }`}
            >
              {msg.modelUsed && (
                <div className="text-[9px] font-mono text-emerald-400 mb-1.5 flex items-center gap-1">
                  <Cpu size={10} /> {msg.modelUsed}
                </div>
              )}

              {formatMessageText(msg.text)}

              {msg.isStreaming && (
                <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-pulse rounded-xs" />
              )}

              {!msg.isStreaming && msg.sender === "ai" && !msg.isError && (
                <button
                  onClick={() => handleCopy(msg.text, msg.id)}
                  className="mt-2 text-[10px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                </button>
              )}

              {/* Follow-up Prompts */}
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

      {/* Model Picker Drawer */}
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
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Engine & Model Selector
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
              {["all", "gemini", "groq", "nvidia"].map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvider(prov)}
                  className={`px-2.5 py-1 rounded-lg font-mono uppercase text-[10px] transition-all cursor-pointer ${
                    selectedProvider === prov
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>

            {/* Model List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
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

              {/* Detail Card */}
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
                    <span className="text-zinc-500 block text-[9px] uppercase">Context Window</span>
                    <span className="text-zinc-200 font-semibold">{selectedModel.contextWindow}</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 block text-[9px] uppercase">Telemetry</span>
                    <span className="text-emerald-400 font-semibold">{selectedModel.speed}</span>
                  </div>
                </div>

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
                    <div className="grid grid-cols-3 gap-1 pt-0.5">
                      {(["low", "medium", "high"] as ReasoningEffort[]).map((effort) => (
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

      {/* Composer Bottom Bar */}
      <div className="p-3.5 border-t border-white/10 bg-zinc-950/95 space-y-2 shrink-0">
        <div className="flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => setIsPickerOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
              {selectedModel.name}
            </span>
            <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isPickerOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="flex items-center gap-1.5">
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
            placeholder="What are we building?"
            className="flex-1 bg-transparent px-3 py-2 text-[13px] text-white placeholder-zinc-500 focus:outline-none resize-none overflow-hidden max-h-32"
          />

          <button
            onClick={() => handleSendMessage(input)}
            disabled={isGenerating || !input.trim()}
            className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-zinc-950 rounded-xl transition-all cursor-pointer font-bold shadow-md shadow-emerald-500/20 shrink-0"
          >
            <Send size={14} />
          </button>
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono px-1">
          <span className="flex items-center gap-1">
            <CornerDownLeft size={10} /> Enter to send • Shift+Enter for newline
          </span>
          <span>Reasoning: {selectedModel.supportsReasoning ? reasoningEffort : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default AIChat9;
