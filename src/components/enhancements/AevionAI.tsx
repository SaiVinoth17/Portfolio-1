"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  ArrowUpRight,
  FolderGit2,
  Copy,
  Check,
  RefreshCw,
  Square,
  Trash2,
  Download,
  Mic,
  MicOff,
  Search,
  Plus,
  Cpu,
  Terminal,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Users,
  Github,
  AlertTriangle,
  Flame,
  Shield,
  Activity,
  Layers,
  Code2,
  Radio,
} from "lucide-react";

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────
export interface ProjectCardData {
  title: string;
  description: string;
  tags: string[];
}

export interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  suggestedFollowUps?: string[];
  link?: { text: string; url: string };
  projectCard?: ProjectCardData;
  isFoundersCard?: boolean;
  isStreaming?: boolean;
  isError?: boolean;
  modelUsed?: string;
  timestamp?: string;
}

export type AIStatus =
  | "IDLE"
  | "INITIALIZING INTELLIGENCE"
  | "PROCESSING"
  | "ANALYZING"
  | "GENERATING"
  | "COMPLETE"
  | "INTELLIGENCE INTERRUPTED";

// ─────────────────────────────────────────────
//  Context-Aware Prompt Matrix
// ─────────────────────────────────────────────
const CONTEXTUAL_PROMPTS: Record<string, Array<{ icon: any; label: string; query: string }>> = {
  default: [
    { icon: Sparkles,  label: "Explore Aevion",        query: "What is Aevion Studio and its vision?" },
    { icon: Users,     label: "Meet the founders",     query: "Who founded Aevion? Tell me about the founders." },
    { icon: Terminal,  label: "What are we building?", query: "What are you currently building at Aevion?" },
    { icon: FolderGit2, label: "Explore our projects",  query: "Explore our featured projects." },
    { icon: Cpu,       label: "Explain the technology", query: "Explain the technology stack and architecture of Aevion." },
  ],
  about: [
    { icon: Users,     label: "Who founded Aevion?",   query: "Who founded Aevion?" },
    { icon: Sparkles,  label: "Why Aevion?",           query: "What is the mission and philosophy of Aevion?" },
    { icon: Flame,     label: "What's the vision?",    query: "What is the studio vision and founder ethos?" },
    { icon: Radio,     label: "What's next for Aevion?", query: "What is next for Aevion Studio?" },
  ],
  projects: [
    { icon: FolderGit2, label: "Explain this project",  query: "Explain the architecture of Nilgiris Explorers." },
    { icon: Terminal,  label: "How was this built?",    query: "How was the Aevion motion system and 3D stack built?" },
    { icon: Cpu,       label: "Analyze the technology", query: "Analyze the performance engineering behind Aevion projects." },
    { icon: Sparkles,  label: "Build something with me", query: "How do we collaborate with Aevion to build a high-performance system?" },
  ],
  tech: [
    { icon: Terminal,  label: "Challenge the intelligence", query: "What makes Aevion's engineering stack distinct from typical web agencies?" },
    { icon: Cpu,       label: "Analyze an idea",       query: "Let's analyze an autonomous AI architecture idea." },
    { icon: Radio,     label: "Start an experiment",   query: "Let's design a high-frequency WebGL or streaming AI experiment." },
    { icon: Layers,    label: "Explain your architecture", query: "Explain the full-stack and edge streaming architecture." },
  ],
};

const DYNAMIC_PLACEHOLDERS = [
  "What are we building?",
  "Ask Aevion Intelligence...",
  "Challenge the system...",
  "Explore architectures, founders, or projects...",
];

const INITIAL_MESSAGE: Message = {
  id: "initial-aevion-system-msg",
  sender: "ai",
  text: "AEVION INTELLIGENCE ONLINE\n\n*\"Two builders. One vision. Technology without limits.\"*\n\nWhat are we building?",
  suggestedFollowUps: [
    "Explore Aevion",
    "Meet the founders",
    "What are we building?",
    "Enter the lab",
  ],
  timestamp: "ONLINE",
};

// ─────────────────────────────────────────────
//  AI Core Intelligence Telemetry Sphere
// ─────────────────────────────────────────────
function AICoreTelemetry({ status }: { status: AIStatus }) {
  const isBusy =
    status === "INITIALIZING INTELLIGENCE" ||
    status === "PROCESSING" ||
    status === "ANALYZING" ||
    status === "GENERATING";

  return (
    <div className="relative flex items-center justify-center w-20 h-20 mx-auto" aria-hidden="true">
      {/* Outer Atmospheric Aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            status === "INTELLIGENCE INTERRUPTED"
              ? "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
        animate={
          isBusy
            ? { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }
            : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ duration: isBusy ? 1.4 : 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit Track 1 */}
      <motion.div
        className="absolute w-16 h-16 rounded-full border border-emerald-500/20"
        animate={isBusy ? { rotate: 360 } : { rotate: 45 }}
        transition={{
          rotate: { duration: isBusy ? 3 : 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#34d399]" />
      </motion.div>

      {/* Orbit Track 2 (Counter) */}
      {isBusy && (
        <motion.div
          className="absolute w-12 h-12 rounded-full border border-teal-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-1 h-1 rounded-full bg-teal-300 bottom-0 left-1/2 -translate-x-1/2 shadow-[0_0_6px_#2dd4bf]" />
        </motion.div>
      )}

      {/* Core Node */}
      <motion.div
        className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center border shadow-xl"
        style={{
          background:
            status === "INTELLIGENCE INTERRUPTED"
              ? "radial-gradient(circle at 35% 35%, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.1) 100%)"
              : "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.35) 0%, rgba(6,78,59,0.2) 100%)",
          borderColor:
            status === "INTELLIGENCE INTERRUPTED"
              ? "rgba(239,68,68,0.4)"
              : "rgba(16,185,129,0.35)",
        }}
        animate={
          status === "COMPLETE"
            ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0px #10b981", "0 0 25px rgba(16,185,129,0.7)", "0 0 5px rgba(16,185,129,0.2)"] }
            : isBusy
            ? { boxShadow: ["0 0 8px rgba(16,185,129,0.3)", "0 0 20px rgba(16,185,129,0.6)", "0 0 8px rgba(16,185,129,0.3)"] }
            : { boxShadow: "0 0 10px rgba(16,185,129,0.2)" }
        }
        transition={{ duration: isBusy ? 1.2 : 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles
          size={14}
          className={
            status === "INTELLIGENCE INTERRUPTED"
              ? "text-red-400"
              : "text-emerald-400"
          }
        />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Trigger Floating Pill Button
// ─────────────────────────────────────────────
function IntelligenceTrigger({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-label="Open Aevion Intelligence"
      aria-expanded={isOpen}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      style={{
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 bg-zinc-950/90 backdrop-blur-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(16,185,129,0.12)] group-hover:border-emerald-500/40 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_35px_rgba(16,185,129,0.25)]"
      >
        {/* Glow backdrop on hover */}
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Status indicator node */}
        <div className="relative w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-emerald-500/15 border border-emerald-500/30 shrink-0">
          <Sparkles size={11} className="text-emerald-400" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-[12px] font-bold text-zinc-100 tracking-tight font-mono">
              AEVION AI
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase hidden sm:flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-pulse" />
            ONLINE • ⌘J
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────
//  Main Aevion Intelligence Component
// ─────────────────────────────────────────────
export function AevionAI() {
  const pathname = usePathname();

  // ── State ─────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState<AIStatus>("IDLE");
  const [isListening, setIsListening] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // ── Refs ──────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUserAtBottomRef = useRef(true);
  const messageIdCounterRef = useRef(1);
  const lastFailedPromptRef = useRef<string | null>(null);

  const hasConversation = messages.length > 1;

  // Context-aware prompts selection
  const currentPrompts = useMemo(() => {
    if (!pathname) return CONTEXTUAL_PROMPTS.default;
    if (pathname.includes("/about")) return CONTEXTUAL_PROMPTS.about;
    if (pathname.includes("/projects")) return CONTEXTUAL_PROMPTS.projects;
    if (pathname.includes("/tech-stack") || pathname.includes("/showcase")) return CONTEXTUAL_PROMPTS.tech;
    return CONTEXTUAL_PROMPTS.default;
  }, [pathname]);

  // Rotate dynamic placeholder smoothly on idle
  useEffect(() => {
    if (hasConversation) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % DYNAMIC_PLACEHOLDERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [hasConversation]);

  // Load session from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aevion_intelligence_session_v6");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          requestAnimationFrame(() => {
            setMessages(parsed);
          });
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Save session
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem("aevion_intelligence_session_v6", JSON.stringify(messages));
      }
    } catch {
      // Ignore storage write errors
    }
  }, [messages]);

  // Keyboard Shortcuts: Cmd+J or custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-aevion-ai", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-aevion-ai", handleCustomOpen);
    };
  }, [isOpen]);

  // Scroll detection to respect manual reading
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    isUserAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 100;
  }, []);

  // Smooth auto-scroll when at bottom
  useEffect(() => {
    if (isUserAtBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, aiStatus]);

  // Auto-resize input textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // Detect relevant project cards
  const detectProjectCard = (query: string): ProjectCardData | undefined => {
    const q = query.toLowerCase();
    if (q.includes("nilgiri") || q.includes("explorer")) {
      return {
        title: "Nilgiris Explorers",
        description:
          "Geospatial AI discovery platform for mountain trail mapping, terrain visualization, and automated itinerary generation.",
        tags: ["Next.js 16", "MapboxGL", "Vector Routing", "100% SEO"],
      };
    }
    if (q.includes("mistwing") || q.includes("ooty")) {
      return {
        title: "Ooty Mistwings",
        description:
          "Luxury destination discovery platform with cinematic WebGL visuals, fluid GSAP scroll storytelling, and reservation flows.",
        tags: ["WebGL Shaders", "GSAP 3", "Stripe API", "60 FPS"],
      };
    }
    if (q.includes("gaming") || q.includes("kingdom")) {
      return {
        title: "Gaming Kingdom",
        description:
          "High-concurrency real-time multiplayer gaming hub engineered with sub-15ms WebSockets and arcade UI architecture.",
        tags: ["WebSockets", "Socket.io", "React 19", "High Concurrency"],
      };
    }
    return undefined;
  };

  // Copy to clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stop Generation
  const handleStopGenerating = () => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    setIsGenerating(false);
    setAiStatus("COMPLETE");
    setTimeout(() => setAiStatus("IDLE"), 1200);
    setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)));
  };

  // Clear Chat History
  const handleClearChat = () => {
    handleStopGenerating();
    setMessages([INITIAL_MESSAGE]);
    setAiStatus("IDLE");
    try {
      localStorage.removeItem("aevion_intelligence_session_v6");
    } catch {
      // Ignore
    }
  };

  // Export Session as Markdown
  const handleExportChat = () => {
    const chatText = messages
      .map((m) => `### ${m.sender === "user" ? "USER" : "AEVION INTELLIGENCE"}\n${m.text}`)
      .join("\n\n---\n\n");
    const blob = new Blob(
      [
        `# Aevion Intelligence Session Log\n*Generated: ${new Date().toISOString()}*\n*Two builders. One vision. Technology without limits.*\n\n---\n\n${chatText}`,
      ],
      { type: "text/markdown" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aevion-intelligence-log-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Send Query to AI Route
  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isGenerating) return;

    const promptToSend = queryText.trim();
    lastFailedPromptRef.current = promptToSend;

    messageIdCounterRef.current += 1;
    const userMsgId = `user-msg-${messageIdCounterRef.current}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsGenerating(true);
    isUserAtBottomRef.current = true;

    // Status sequence
    setAiStatus("INITIALIZING INTELLIGENCE");
    setTimeout(() => setAiStatus("PROCESSING"), 300);
    setTimeout(() => setAiStatus("ANALYZING"), 700);

    messageIdCounterRef.current += 1;
    const streamMsgId = `ai-msg-${messageIdCounterRef.current}`;
    const streamingMsg: Message = {
      id: streamMsgId,
      sender: "ai",
      text: "",
      projectCard: detectProjectCard(promptToSend),
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, streamingMsg]);

    try {
      const historyForAI = messages
        .filter((m) => m.id !== "initial-aevion-system-msg" && !m.isStreaming && m.text.trim().length > 0)
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          history: historyForAI,
          currentPath: pathname || "/",
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("[Aevion Intelligence] JSON response error:", jsonErr);
      }

      let responseText = "";
      let followUps: string[] = [];
      let isFounders = false;
      let isErrorResponse = false;
      const modelName = data?.model || data?.provider || "Aevion Core";

      if (!res.ok) {
        isErrorResponse = true;
        setAiStatus("INTELLIGENCE INTERRUPTED");
        responseText = `INTELLIGENCE INTERRUPTED\n\n${data?.details || data?.error || "Unable to complete the intelligence query."}\n\nSelect **Retry** or issue a refined command.`;
        followUps = ["Meet the founders", "What are we building?", "Explore our projects"];
      } else {
        responseText = data.text || "Aevion Intelligence ready. State your objective.";
        followUps = data.suggestedFollowUps || ["Explore Aevion", "Meet the founders", "What are we building?"];
        isFounders = Boolean(
          data.isFoundersCard ||
            (responseText.includes("Sai Rio") && responseText.includes("Edison")) ||
            /founder|founders|meet the founders|who created|who is sai|who is edison/i.test(promptToSend)
        );
        setAiStatus("GENERATING");
      }

      // Smooth token chunk streaming
      let charIndex = 0;
      const chunkSize = responseText.length > 500 ? 8 : 4;
      const streamSpeed = responseText.length > 500 ? 10 : 14;

      streamingIntervalRef.current = setInterval(() => {
        charIndex += chunkSize;
        if (charIndex >= responseText.length) {
          if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
          setIsGenerating(false);
          setAiStatus(isErrorResponse ? "INTELLIGENCE INTERRUPTED" : "COMPLETE");

          setTimeout(() => {
            setAiStatus("IDLE");
          }, 1500);

          setMessages((prev) =>
            prev.map((m) =>
              m.id === streamMsgId
                ? {
                    ...m,
                    text: responseText,
                    suggestedFollowUps: followUps,
                    isFoundersCard: isFounders,
                    isError: isErrorResponse,
                    modelUsed: modelName,
                    isStreaming: false,
                  }
                : m
            )
          );
        } else {
          const currentSlice = responseText.slice(0, charIndex);
          setMessages((prev) =>
            prev.map((m) => (m.id === streamMsgId ? { ...m, text: currentSlice } : m))
          );
        }
      }, streamSpeed);
    } catch (networkErr: any) {
      console.error("[Aevion Intelligence Error]:", networkErr);
      setIsGenerating(false);
      setAiStatus("INTELLIGENCE INTERRUPTED");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamMsgId
            ? {
                ...m,
                text: "INTELLIGENCE INTERRUPTED\n\nNetwork or endpoint connection failure. Verify connectivity and try again.",
                isError: true,
                isStreaming: false,
                suggestedFollowUps: ["Meet the founders", "What are we building?", "Enter the lab"],
              }
            : m
        )
      );
    }
  };

  // Retry previous prompt
  const handleRetry = () => {
    if (lastFailedPromptRef.current) {
      handleSendQuery(lastFailedPromptRef.current);
    } else {
      const lastUser = [...messages].reverse().find((m) => m.sender === "user");
      if (lastUser) handleSendQuery(lastUser.text);
    }
  };

  // Voice toggle
  const toggleVoice = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setInput("Explain the architecture behind Nilgiris Explorers");
    }
  };

  // ── Founders Interactive Dossier Matrix ───
  const FoundersInteractivePanel = () => {
    const founders = [
      {
        id: "sai-rio",
        name: "Sai Rio",
        role: "CO-FOUNDER",
        discipline: "Product • Engineering • AI • Systems • Vision",
        focus:
          "Autonomous AI systems architecture, Next.js 16 frameworks, vector context pipelines, streaming inference, and overall studio vision.",
        quote: "Software should be an extension of human will. Eliminate friction until only raw intelligence remains.",
        tags: ["Autonomous AI", "Next.js 16", "Vector Context", "Systems Vision"],
        github: "https://github.com/SaiVinoth17",
        color: "#34d399",
      },
      {
        id: "edison",
        name: "Edison",
        role: "CO-FOUNDER",
        discipline: "Development • Technology • Engineering • Building",
        focus:
          "Core software engineering, high-throughput pipelines, 120 FPS WebGL shaders, edge infrastructure, and full-stack building.",
        quote: "True craftsmanship lies in the invisible layers. When every byte is optimized, software becomes unforgettable.",
        tags: ["Core Software", "WebGL Shaders", "Edge Infra", "Building"],
        github: "https://github.com/edisonedi84431-art",
        color: "#38bdf8",
      },
    ];

    return (
      <div className="mt-3.5 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 shadow-inner">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <Users size={13} className="text-emerald-400" />
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              Aevion Co-Founders Matrix
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            Equal Standing
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {founders.map((f) => (
            <div
              key={f.id}
              className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 space-y-2 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase inline-block"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      color: f.color,
                      border: "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    {f.role}
                  </span>
                  <div className="text-[13px] font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                    {f.name}
                  </div>
                </div>

                {f.github && (
                  <a
                    href={f.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Verified GitHub"
                  >
                    <Github size={12} />
                  </a>
                )}
              </div>

              <div className="text-[10px] font-mono text-zinc-400 leading-tight">
                {f.discipline}
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {f.focus}
              </p>

              <div className="text-[10px] italic text-zinc-500 border-l border-emerald-500/30 pl-2">
                &ldquo;{f.quote}&rdquo;
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Precision Text & Code Formatter ───────
  const formatText = (text: string) => {
    const lines = text.split("\n");
    let inCodeBlock = false;
    const codeLines: string[] = [];

    return lines.map((line, idx) => {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        if (!inCodeBlock) {
          const codeContent = codeLines.join("\n");
          codeLines.length = 0;
          return (
            <div
              key={idx}
              className="my-3 rounded-2xl overflow-hidden font-mono text-[12px] shadow-2xl border border-white/10 bg-black/90"
            >
              <div className="px-4 py-2 flex justify-between items-center bg-zinc-900/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-mono">
                    TERMINAL / CODE
                  </span>
                </div>
                <button
                  onClick={() => handleCopyText(codeContent, `code-${idx}`)}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] text-zinc-400"
                >
                  {copiedId === `code-${idx}` ? (
                    <>
                      <Check size={12} className="text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-emerald-400 overflow-x-auto leading-relaxed text-[12px] bg-black/70">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }
        return null;
      }
      if (inCodeBlock) {
        codeLines.push(line);
        return null;
      }

      if (line.startsWith("### ")) {
        return (
          <h4
            key={idx}
            className="text-[14px] font-bold text-emerald-400 uppercase tracking-wider mt-3 mb-1 font-mono"
          >
            {line.replace("### ", "")}
          </h4>
        );
      }

      if (line.startsWith("## ")) {
        return (
          <h3
            key={idx}
            className="text-[15px] font-bold text-white tracking-tight mt-3 mb-1"
          >
            {line.replace("## ", "")}
          </h3>
        );
      }

      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter((c) => c.trim().length > 0);
        return (
          <div
            key={idx}
            className="flex gap-2 font-mono text-[12px] p-2 rounded-xl my-1 bg-white/[0.02] border border-white/5"
          >
            {cells.map((c, i) => (
              <span key={i} className="flex-1 text-zinc-300">
                {c.trim()}
              </span>
            ))}
          </div>
        );
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={idx} className="font-semibold text-white mt-2 mb-0.5 text-[14px] tracking-tight">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }

      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <p key={idx} className="pl-2 text-zinc-300 my-1 flex items-start gap-2 text-[13px] leading-relaxed">
            <span className="text-emerald-400 mt-1.5 text-[7px]">●</span>
            <span>{line.replace(/^[•-]\s*/, "")}</span>
          </p>
        );
      }

      return (
        <p key={idx} className="my-1 text-zinc-200 leading-relaxed text-[13px]">
          {line}
        </p>
      );
    });
  };

  const totalTokensEstimate = messages.reduce((acc, m) => acc + m.text.length, 0);

  // ── Render ────────────────────────────────
  return (
    <>
      {/* ── Trigger Pill ───────────────────── */}
      <IntelligenceTrigger onClick={() => setIsOpen(true)} isOpen={isOpen} />

      {/* ── Modal Backdrop ─────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Intelligence Window ────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Aevion Intelligence System"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-2 sm:inset-x-auto sm:right-6 bottom-2 sm:bottom-6 z-50 flex flex-col antialiased text-white w-auto sm:w-[620px]"
            style={{
              height: "calc(100dvh - 1rem - env(safe-area-inset-bottom, 0px))",
              maxHeight: "min(740px, 92dvh)",
              background: "rgba(8, 9, 13, 0.98)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              boxShadow:
                "0 0 0 1px rgba(16,185,129,0.12), 0 32px 96px rgba(0,0,0,0.9), 0 0 80px rgba(16,185,129,0.08)",
              backdropFilter: "blur(40px) saturate(180%)",
            }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Top Command Bar ───────────────── */}
            <div
              className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 shrink-0 border-b border-white/10 bg-zinc-950/80"
            >
              {/* Left branding & Telemetry Status */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar((p) => !p)}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer focus:outline-none"
                  title="Toggle History Archive"
                  aria-label="Toggle History Archive"
                >
                  {showSidebar ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="relative w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500/15 border border-emerald-500/30">
                    <Sparkles size={12} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold tracking-tight text-white font-mono">
                        AEVION INTELLIGENCE
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                              aiStatus === "INTELLIGENCE INTERRUPTED"
                                ? "bg-red-400"
                                : "bg-emerald-400"
                            } opacity-75`}
                          />
                          <span
                            className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                              aiStatus === "INTELLIGENCE INTERRUPTED"
                                ? "bg-red-500"
                                : "bg-emerald-500"
                            }`}
                          />
                        </span>
                        <span
                          className={`text-[9px] font-mono font-semibold tracking-widest uppercase ${
                            aiStatus === "INTELLIGENCE INTERRUPTED"
                              ? "text-red-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {aiStatus === "IDLE" ? "ONLINE" : aiStatus}
                        </span>
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500 tracking-wide">
                      Two Builders • One Vision • Studio AI Layer
                    </div>
                  </div>
                </div>
              </div>

              {/* Right utility actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleExportChat}
                  className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Export Intelligence Log"
                  aria-label="Export log"
                >
                  <Download size={15} />
                </button>

                <button
                  onClick={handleClearChat}
                  className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear Session"
                  aria-label="Clear session"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* ── Main Layout Body ──────────────── */}
            <div className="flex-1 min-h-0 flex overflow-hidden">
              {/* History Sidebar */}
              <AnimatePresence>
                {showSidebar && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="h-full flex flex-col overflow-hidden shrink-0 border-r border-white/10 bg-zinc-950/80"
                  >
                    <div className="p-3 flex items-center justify-between border-b border-white/5">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Telemetry Archive
                      </span>
                      <button
                        onClick={handleClearChat}
                        className="text-zinc-500 hover:text-emerald-400 p-1 cursor-pointer transition-colors"
                        title="New Session"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="p-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] bg-white/[0.03] border border-white/5 text-zinc-400">
                        <Search size={12} />
                        <input
                          type="text"
                          value={sidebarSearch}
                          onChange={(e) => setSidebarSearch(e.target.value)}
                          placeholder="Search archive..."
                          className="bg-transparent focus:outline-none text-zinc-200 w-full text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {messages
                        .filter(
                          (m) =>
                            m.sender === "user" &&
                            m.text.toLowerCase().includes(sidebarSearch.toLowerCase())
                        )
                        .map((m, i) => (
                          <div
                            key={i}
                            onClick={() => handleSendQuery(m.text)}
                            className="px-3 py-2 rounded-xl cursor-pointer text-zinc-400 hover:text-white text-[11px] truncate transition-colors hover:bg-white/5 border border-transparent hover:border-white/5"
                          >
                            {m.text}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat View Area */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  className="flex-1 min-h-0 overflow-y-auto p-5 space-y-5 overscroll-contain scroll-smooth touch-pan-y [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {/* ── Empty / Landing State ───────── */}
                  {!hasConversation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center min-h-full py-8 text-center"
                    >
                      <AICoreTelemetry status={aiStatus} />

                      <div className="text-emerald-400 text-[10px] font-mono tracking-[0.25em] mt-4 uppercase font-bold">
                        ✦ AEVION INTELLIGENCE ONLINE
                      </div>

                      <h2 className="text-[22px] font-bold text-white tracking-tight mt-1.5">
                        What are we building?
                      </h2>

                      <p className="text-[12px] text-zinc-400 max-w-[340px] leading-relaxed mt-2">
                        Direct intelligence uplink to Aevion Studio. Explore systems architecture, our co-founders, or start an experiment.
                      </p>

                      {/* Contextual Prompt Matrix Chips */}
                      <div className="flex flex-wrap gap-2 justify-center max-w-[460px] mt-6">
                        {currentPrompts.map(({ icon: Icon, label, query }) => (
                          <motion.button
                            key={label}
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSendQuery(query)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm"
                          >
                            <Icon size={12} className="text-emerald-400" />
                            {label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Active Conversation Stream ──── */}
                  {hasConversation && (
                    <div className="space-y-5">
                      {messages.map((msg, msgIdx) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="group"
                        >
                          {msg.sender === "user" ? (
                            /* User Bubble */
                            <div className="flex justify-end">
                              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-xs bg-emerald-500/15 border border-emerald-500/30 text-white text-[13px] leading-relaxed relative">
                                {msg.text}
                                <div className="text-[9px] font-mono text-emerald-400/60 mt-1 text-right">
                                  {msg.timestamp || "SENT"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* AI Intelligence Output */
                            <div className="space-y-2.5">
                              {/* AI System Badge */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/15 border border-emerald-500/30">
                                    <Sparkles size={10} className="text-emerald-400" />
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider uppercase">
                                    AEVION INTELLIGENCE
                                  </span>
                                  {msg.modelUsed && (
                                    <span className="text-[9px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                                      {msg.modelUsed}
                                    </span>
                                  )}
                                </div>

                                <span className="text-[9px] font-mono text-zinc-600">
                                  {msg.timestamp || "REALTIME"}
                                </span>
                              </div>

                              {/* Message Content Body */}
                              <div className="pl-7 relative">
                                <div
                                  className={`space-y-1 ${
                                    msg.isError
                                      ? "text-red-300 p-3 rounded-xl bg-red-950/20 border border-red-500/30"
                                      : "text-zinc-200"
                                  }`}
                                >
                                  {formatText(msg.text)}

                                  {/* Streaming Terminal Pulse Cursor */}
                                  {msg.isStreaming && (
                                    <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-pulse rounded-xs" />
                                  )}
                                </div>

                                {/* Interactive Founders Matrix */}
                                {msg.isFoundersCard && !msg.isStreaming && (
                                  <FoundersInteractivePanel />
                                )}

                                {/* Featured Project Card */}
                                {msg.projectCard && !msg.isStreaming && (
                                  <div className="mt-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                                    <div className="flex items-center gap-2">
                                      <FolderGit2 size={13} className="text-emerald-400" />
                                      <span className="text-[12px] font-bold text-white">
                                        {msg.projectCard.title}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                                      {msg.projectCard.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {msg.projectCard.tags.map((tag, idx) => (
                                        <span
                                          key={idx}
                                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Error Recovery Controls */}
                                {msg.isError && !msg.isStreaming && (
                                  <div className="mt-3 flex items-center gap-2">
                                    <button
                                      onClick={handleRetry}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-mono transition-colors cursor-pointer"
                                    >
                                      <RefreshCw size={12} /> Retry Query
                                    </button>
                                  </div>
                                )}

                                {/* Copy text button on hover */}
                                {!msg.isStreaming && msg.text && !msg.isError && (
                                  <button
                                    onClick={() => handleCopyText(msg.text, msg.id)}
                                    className="mt-2 text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                                  >
                                    {copiedId === msg.id ? (
                                      <>
                                        <Check size={11} className="text-emerald-400" /> Copied
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={11} /> Copy
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* Follow-up Prompts */}
                              {!msg.isStreaming &&
                                msg.suggestedFollowUps &&
                                msgIdx === messages.length - 1 && (
                                  <div className="pl-7 flex flex-wrap gap-1.5 pt-1">
                                    {msg.suggestedFollowUps.map((chip, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleSendQuery(chip)}
                                        className="text-[11px] px-3 py-1 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
                                      >
                                        {chip}
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* ── Status Telemetry Bar ─────────── */}
                <div
                  className="px-5 py-2 flex justify-between items-center text-[10px] font-mono text-zinc-500 shrink-0 border-t border-white/5 bg-zinc-950/60"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRetry}
                      disabled={isGenerating}
                      className="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer disabled:opacity-30"
                    >
                      <RefreshCw size={11} /> Regenerate
                    </button>
                    <span>·</span>
                    <span>~{totalTokensEstimate} tokens indexed</span>
                  </div>

                  {isGenerating && (
                    <button
                      onClick={handleStopGenerating}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                    >
                      <Square size={10} /> Stop
                    </button>
                  )}
                </div>

                {/* ── Input Command Composer ───────── */}
                <div className="p-4 shrink-0 border-t border-white/10 bg-zinc-950/90">
                  <div
                    className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-200 ${
                      isFocused
                        ? "border-emerald-500/50 bg-white/[0.04] shadow-[0_0_20px_rgba(16,185,129,0.12)]"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendQuery(input);
                        }
                      }}
                      rows={1}
                      placeholder={
                        hasConversation
                          ? "State next query or command..."
                          : DYNAMIC_PLACEHOLDERS[placeholderIndex]
                      }
                      className="w-full bg-transparent px-4 pt-3 pb-2 text-[13px] text-white placeholder-zinc-500 focus:outline-none resize-none overflow-hidden leading-relaxed"
                      style={{ minHeight: "44px", maxHeight: "140px" }}
                    />

                    {/* Composer Footer Actions */}
                    <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleVoice}
                          title={isListening ? "Listening..." : "Voice input"}
                          aria-label="Voice input"
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isListening
                              ? "text-red-400 bg-red-500/10"
                              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                          }`}
                        >
                          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-600 hidden sm:inline">
                          Enter to send • Shift+Enter for newline
                        </span>

                        <motion.button
                          whileHover={!isGenerating && input.trim() ? { scale: 1.06 } : {}}
                          whileTap={!isGenerating && input.trim() ? { scale: 0.94 } : {}}
                          onClick={() => handleSendQuery(input)}
                          disabled={isGenerating || !input.trim()}
                          aria-label="Send Query"
                          className="flex items-center justify-center w-8 h-8 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                          style={{
                            background:
                              input.trim() && !isGenerating
                                ? "#10b981"
                                : "rgba(255, 255, 255, 0.05)",
                            boxShadow:
                              input.trim() && !isGenerating
                                ? "0 0 16px rgba(16,185,129,0.4)"
                                : "none",
                          }}
                        >
                          <Send
                            size={13}
                            className={
                              input.trim() && !isGenerating ? "text-black" : "text-zinc-600"
                            }
                          />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 px-1 text-[9px] font-mono text-zinc-600">
                    <span>Press ⌘J or click trigger anytime</span>
                    <span>{input.length}/2000</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AevionAI;
