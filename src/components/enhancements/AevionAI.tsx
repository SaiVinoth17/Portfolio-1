"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  User,
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
  Paperclip,
  Search,
  Plus,
  Cpu,
  Terminal,
  Zap,
  Code2,
  CornerDownLeft,
  MoreHorizontal,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Users,
  Github,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
interface ProjectCardData {
  title: string;
  description: string;
  tags: string[];
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  suggestedFollowUps?: string[];
  link?: { text: string; url: string };
  projectCard?: ProjectCardData;
  isFoundersCard?: boolean;
  isStreaming?: boolean;
}

// ─────────────────────────────────────────────
//  Quick Action Chips
// ─────────────────────────────────────────────
const QUICK_CHIPS = [
  { icon: Users,      label: "Meet the founders",     query: "Meet the founders" },
  { icon: Sparkles,   label: "What is Aevion?",       query: "What is Aevion?" },
  { icon: Terminal,   label: "What are you building?", query: "What are you building?" },
  { icon: FolderGit2, label: "Explore our projects",   query: "Explore our projects" },
  { icon: Cpu,        label: "Tech Stack",            query: "What is your tech stack?" },
];

// Action cards still used for sidebar history references
const ACTION_CARDS = [
  { icon: Users,      title: "The Founders",          subtitle: "Sai Rio & Edison",                 query: "Meet the founders" },
  { icon: Sparkles,   title: "Aevion Manifesto",      subtitle: "Turning ambition into technology", query: "What is Aevion?" },
  { icon: FolderGit2, title: "Nilgiris Explorers",    subtitle: "Explore tourism & travel platform", query: "Tell me about Nilgiris Explorers" },
  { icon: Terminal,   title: "Tech Stack & Motion",   subtitle: "Next.js 16, GSAP, WebGL",           query: "What technology stack do you use?" },
];

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "ai",
  text: "I'm Aevion's intelligence layer. Ask me about what we're building, the people behind it, or the experiments we're working on.",
  suggestedFollowUps: [
    "Meet the founders",
    "What is Aevion?",
    "What are you building?",
    "Explore our projects",
  ],
};

// ─────────────────────────────────────────────
//  AI Core — animated indicator
// ─────────────────────────────────────────────
type AIState = "idle" | "thinking" | "generating" | "completed";

function AICore({ state }: { state: AIState }) {
  const isActive = state === "thinking" || state === "generating";

  return (
    <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
      {/* Outer atmospheric ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }}
        animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] } : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: isActive ? 1.2 : 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit ring 1 — visible during thinking/generating */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
            className="absolute w-14 h-14 rounded-full border border-emerald-500/20"
          />
        )}
      </AnimatePresence>

      {/* Orbit ring 2 — counter-rotate, generating only */}
      <AnimatePresence>
        {state === "generating" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
            className="absolute w-10 h-10 rounded-full border border-emerald-400/15"
          />
        )}
      </AnimatePresence>

      {/* Core circle */}
      <motion.div
        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.08) 100%)", border: "1px solid rgba(16,185,129,0.3)" }}
        animate={
          state === "completed"
            ? { scale: [1, 1.25, 1], boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.5)", "0 0 0px rgba(16,185,129,0)"] }
            : isActive
            ? { boxShadow: ["0 0 6px rgba(16,185,129,0.2)", "0 0 16px rgba(16,185,129,0.5)", "0 0 6px rgba(16,185,129,0.2)"] }
            : { boxShadow: ["0 0 4px rgba(16,185,129,0.1)", "0 0 8px rgba(16,185,129,0.2)", "0 0 4px rgba(16,185,129,0.1)"] }
        }
        transition={{ duration: isActive ? 1 : 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={isActive ? { rotate: 360 } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={14} className="text-emerald-400" />
        </motion.div>
      </motion.div>

      {/* Orbital particles — generating state */}
      <AnimatePresence>
        {state === "generating" && (
          <>
            {[0, 120, 240].map((angle) => (
              <motion.div
                key={angle}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], rotate: [angle, angle + 360] }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.5, repeat: Infinity }, rotate: { duration: 2.5, repeat: Infinity, ease: "linear" } }}
                className="absolute w-full h-full"
              >
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                  style={{ top: 0, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 6px rgba(16,185,129,0.8)" }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Trigger Button
// ─────────────────────────────────────────────
function TriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="fixed bottom-20 right-6 z-[9990] group cursor-pointer"
      data-cursor="Aevion AI"
    >
      <div
        className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full"
        style={{
          background: "rgba(9,9,12,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 0 1px rgba(16,185,129,0.15), 0 8px 32px rgba(0,0,0,0.6), 0 0 40px rgba(16,185,129,0.08)",
        }}
      >
        {/* Subtle glow bg */}
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, transparent 70%)" }}
        />

        {/* Core dot */}
        <div className="relative w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
          <Sparkles size={11} className="text-emerald-400" />
          {/* Online ping */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        <span className="relative text-[12px] font-medium text-zinc-300 tracking-tight hidden sm:block">Aevion AI</span>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────
export function AevionAI() {
  // ── State (ALL PRESERVED) ──────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [aiState, setAiState] = useState<AIState>("idle");
  const [isFocused, setIsFocused] = useState(false);

  // ── Refs (ALL PRESERVED) ──────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUserAtBottomRef = useRef(true);
  const messageIdCounterRef = useRef(0);

  const hasConversation = messages.length > 1;

  // ── Effects (ALL PRESERVED) ───────────────

  // Load session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aevion_chat_session_v5");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          requestAnimationFrame(() => { setMessages(parsed); });
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Save session to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem("aevion_chat_session_v5", JSON.stringify(messages));
      }
    } catch { /* ignore */ }
  }, [messages]);

  // Cmd/Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track scroll position
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    isUserAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 90;
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (isUserAtBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // Sync AI state with generation state
  useEffect(() => {
    if (isGenerating) {
      setAiState("thinking");
      const t = setTimeout(() => setAiState("generating"), 600);
      return () => clearTimeout(t);
    } else {
      if (aiState === "generating" || aiState === "thinking") {
        setAiState("completed");
        const t = setTimeout(() => setAiState("idle"), 1200);
        return () => clearTimeout(t);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGenerating]);

  // ── Logic (ALL PRESERVED) ─────────────────

  const detectProjectCard = (query: string): ProjectCardData | undefined => {
    const q = query.toLowerCase();
    if (q.includes("nilgiri") || q.includes("explorer")) {
      return { title: "Nilgiris Explorers", description: "Premium travel & tourism discovery platform for Ooty and the Nilgiris with immersive UI and AI enhancements.", tags: ["Next.js 16", "React 19", "Tourism UI", "SEO Engine"] };
    }
    if (q.includes("mistwing") || q.includes("ooty")) {
      return { title: "Ooty Mistwings", description: "Cinematic destination discovery platform featuring immersive visual storytelling and motion interactions.", tags: ["Destination Storytelling", "Cinematic UI", "Next.js", "Performance"] };
    }
    if (q.includes("gaming") || q.includes("kingdom")) {
      return { title: "Gaming Kingdom", description: "Fast, visually engaging gaming web platform built to showcase high-performance responsive frontend architecture.", tags: ["Gaming UI", "High FPS", "React", "Tailwind"] };
    }
    return undefined;
  };

  const handleCopyText = (text: string, id: string) => {
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
    setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)));
  };

  const handleClearChat = () => {
    handleStopGenerating();
    setMessages([INITIAL_MESSAGE]);
    try { localStorage.removeItem("aevion_chat_session_v5"); } catch { /* ignore */ }
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((m) => `**${m.sender === "user" ? "Visitor" : "Aevion AI"}**: ${m.text}`)
      .join("\n\n---\n\n");
    const blob = new Blob([chatText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aevion-ai-session.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isGenerating) return;

    let fullPrompt = queryText;
    if (attachedFile) {
      fullPrompt = `[Attached File: ${attachedFile}]\n\n${queryText}`;
      setAttachedFile(null);
    }

    messageIdCounterRef.current += 1;
    const userMsgId = `user-msg-${messageIdCounterRef.current}`;
    const userMsg: Message = { id: userMsgId, sender: "user", text: fullPrompt };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsGenerating(true);
    isUserAtBottomRef.current = true;

    messageIdCounterRef.current += 1;
    const streamMsgId = `ai-msg-${messageIdCounterRef.current}`;
    const streamingMsg: Message = {
      id: streamMsgId,
      sender: "ai",
      text: "",
      projectCard: detectProjectCard(fullPrompt),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, streamingMsg]);

    try {
      const historyForAI = messages
        .filter((m) => m.id !== "1" && !m.isStreaming && m.text.trim().length > 0)
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt, history: historyForAI }),
      });

      let data: { text?: string; suggestedFollowUps?: string[]; isFoundersCard?: boolean; error?: string; details?: string } = {};
      try { data = await res.json(); } catch (jsonErr) { console.error("[Aevion AI] JSON parse error:", jsonErr); }

      let responseText = "";
      let followUps: string[] = [];
      let isFounders = false;

      if (!res.ok) {
        if (res.status === 401) {
          responseText = `⚠️ **Configuration Notice**: ${data.error || "AI API key is missing. Configure the required environment variable."}`;
        } else if (res.status === 429) {
          responseText = "⏳ **Rate Limit**: The AI service is experiencing high request volume. Please wait a moment and try again.";
        } else {
          responseText = data.error
            ? `⚠️ **${data.error}**: ${data.details || "Please try again in a moment."}`
            : `⚠️ **AI Service Notice**: Server returned status ${res.status}. Please try again.`;
        }
        followUps = ["Meet the founders", "What is Aevion?", "What are you building?"];
      } else {
        responseText = data.text || "I'm Aevion's intelligence layer. What would you like to explore?";
        followUps = data.suggestedFollowUps || ["Meet the founders", "What is Aevion?", "Explore our projects"];
        isFounders = Boolean(data.isFoundersCard || (responseText.includes("Sai Rio") && responseText.includes("Edison")) || /founder|founders|meet the founders/i.test(fullPrompt));
      }

      let charIndex = 0;
      streamingIntervalRef.current = setInterval(() => {
        charIndex += 4;
        if (charIndex >= responseText.length) {
          if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
          setIsGenerating(false);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === streamMsgId
                ? {
                    ...m,
                    text: responseText,
                    suggestedFollowUps: followUps,
                    isFoundersCard: isFounders,
                    isStreaming: false,
                  }
                : m
            )
          );
        } else {
          const currentSlice = responseText.slice(0, charIndex);
          setMessages((prev) => prev.map((m) => (m.id === streamMsgId ? { ...m, text: currentSlice } : m)));
        }
      }, 15);
    } catch {
      setIsGenerating(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamMsgId ? { ...m, text: "An error occurred while connecting to the AI server. Please try again.", isStreaming: false } : m
        )
      );
    }
  };

  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUserMessage) handleSendQuery(lastUserMessage.text);
  };

  const toggleVoice = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setInput("Tell me about Nilgiris Explorers and your engineering decisions");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file.name);
  };

  // ── Interactive Founders Panel ─────────────
  const FoundersInteractivePanel = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    const founders = [
      {
        id: "sai-rio",
        name: "Sai Rio",
        role: "CO-FOUNDER",
        tagline: "Product • Engineering • AI • Systems • Vision",
        bio: "Directs autonomous AI systems, Next.js 16 frameworks, vector context pipelines, streaming inference, and product vision.",
        disciplines: ["Autonomous AI", "Next.js 16", "Vector Context", "Systems Vision"],
        color: "#34d399",
        accentBg: "rgba(52, 211, 153, 0.08)",
        accentBorder: "rgba(52, 211, 153, 0.25)",
      },
      {
        id: "edison",
        name: "Edison",
        role: "CO-FOUNDER",
        tagline: "Development • Technology • Engineering • Building",
        bio: "Directs core software engineering, high-throughput pipelines, 120 FPS WebGL shaders, and edge infrastructure.",
        disciplines: ["Core Software", "120 FPS Shaders", "Edge Infra", "Building"],
        github: "https://github.com/edisonedi84431-art",
        color: "#38bdf8",
        accentBg: "rgba(56, 189, 248, 0.08)",
        accentBorder: "rgba(56, 189, 248, 0.25)",
      },
    ];

    return (
      <div className="mt-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-1.5">
            <Users size={12} /> Aevion Co-Founders Matrix
          </span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Equal Standing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {founders.map((f) => {
            const isExpanded = activeId === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setActiveId(isExpanded ? null : f.id)}
                className="p-3 rounded-xl border transition-all duration-300 cursor-pointer space-y-1.5 group"
                style={{
                  background: isExpanded ? f.accentBg : "rgba(255, 255, 255, 0.02)",
                  borderColor: isExpanded ? f.accentBorder : "rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded uppercase inline-block"
                      style={{ background: f.accentBg, color: f.color, border: `1px solid ${f.accentBorder}` }}
                    >
                      {f.role}
                    </span>
                    <div className="text-xs font-bold text-white mt-1 group-hover:text-zinc-100">{f.name}</div>
                  </div>

                  {f.github && (
                    <a
                      href={f.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github size={11} />
                    </a>
                  )}
                </div>

                <div className="text-[10px] font-mono text-zinc-400 leading-tight">
                  {f.tagline}
                </div>

                <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                  {f.bio}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {f.disciplines.map((d) => (
                    <span
                      key={d}
                      className="text-[8px] font-mono px-1 py-0.5 rounded bg-white/[0.03] border border-white/10 text-zinc-400"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Text Formatter (ALL PRESERVED) ────────
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
            <div key={idx} className="my-3 rounded-2xl overflow-hidden font-mono text-[13px] shadow-xl" style={{ background: "#080a0e", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-4 py-2 flex justify-between items-center border-b" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-600">code</span>
                </div>
                <button onClick={() => handleCopyText(codeContent, `code-${idx}`)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] text-zinc-600">
                  <Copy size={11} /> {copiedId === `code-${idx}` ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 text-emerald-400 overflow-x-auto leading-relaxed text-[12px]">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }
        return null;
      }
      if (inCodeBlock) { codeLines.push(line); return null; }

      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter((c) => c.trim().length > 0);
        return (
          <div key={idx} className="flex gap-2 font-mono text-[12px] p-2.5 rounded-xl my-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {cells.map((c, i) => <span key={i} className="flex-1 text-zinc-300">{c.trim()}</span>)}
          </div>
        );
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={idx} className="font-semibold text-white mt-3 mb-1 text-[15px] tracking-tight">{line.replace(/\*\*/g, "")}</p>;
      }

      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <p key={idx} className="pl-3 text-zinc-300 my-1 flex items-start gap-2 text-[14px] leading-relaxed">
            <span className="text-emerald-400 mt-1.5 text-[8px]">●</span>
            <span>{line.replace(/^[•-]\s*/, "")}</span>
          </p>
        );
      }

      return <p key={idx} className="my-1 text-zinc-300 leading-relaxed text-[14px]">{line}</p>;
    });
  };

  const totalTokensEstimate = messages.reduce((acc, m) => acc + m.text.length, 0);

  // ── Render ────────────────────────────────
  return (
    <>
      {/* ── Trigger Button ─────────────────── */}
      <TriggerButton onClick={() => setIsOpen(true)} />

      {/* ── Backdrop Overlay ───────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990]"
            style={{ backdropFilter: "blur(12px) saturate(150%)", background: "radial-gradient(ellipse at 60% 40%, rgba(16,185,129,0.04) 0%, rgba(0,0,0,0.75) 70%)" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Main Window ────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed z-[9999] flex flex-col antialiased"
            style={{
              bottom: "5rem",
              right: "1rem",
              left: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
              height: "85vh",
              maxHeight: "720px",
              // On larger screens, pin to the right
              ...(typeof window !== "undefined" && window.innerWidth >= 640 ? { left: "auto", right: "1.5rem", margin: 0 } : {}),
              background: "rgba(7,8,11,0.97)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px",
              boxShadow: "0 0 0 1px rgba(16,185,129,0.06), 0 32px 80px rgba(0,0,0,0.85), 0 0 120px rgba(16,185,129,0.04)",
              backdropFilter: "blur(40px) saturate(180%)",
            }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ───────────────────────── */}
            <div
              className="flex items-center justify-between px-5 py-3.5 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Left: sidebar toggle + brand */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar((p) => !p)}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                  title="Toggle history"
                >
                  {showSidebar ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
                </button>

                <div className="flex items-center gap-2.5">
                  {/* AI core dot */}
                  <div className="relative w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <Sparkles size={12} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-white tracking-tight">AEVION AI</span>
                      <div className="flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        <span className="text-[10px] text-emerald-500 font-medium tracking-wide uppercase">Online</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-600 tracking-wide">Intelligence Engine</div>
                  </div>
                </div>
              </div>

              {/* Right: secondary actions (collapsed) + close */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    onClick={() => setShowSecondaryMenu((p) => !p)}
                    className="text-zinc-600 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  <AnimatePresence>
                    {showSecondaryMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-9 rounded-xl overflow-hidden z-50 min-w-[160px]"
                        style={{ background: "rgba(12,14,18,0.98)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}
                      >
                        {[
                          { icon: Download, label: "Export chat", action: handleExportChat },
                          { icon: Trash2, label: "Clear history", action: handleClearChat },
                          { icon: Plus, label: "New session", action: handleClearChat },
                        ].map(({ icon: Icon, label, action }) => (
                          <button
                            key={label}
                            onClick={() => { action(); setShowSecondaryMenu(false); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
                          >
                            <Icon size={13} /> {label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-600 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Body ─────────────────────────── */}
            <div className="flex-1 min-h-0 flex overflow-hidden">

              {/* Sidebar */}
              <AnimatePresence>
                {showSidebar && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 188, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex flex-col overflow-hidden shrink-0"
                    style={{ borderRight: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}
                  >
                    <div className="p-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">History</span>
                      <button onClick={handleClearChat} className="text-zinc-600 hover:text-emerald-400 p-1 cursor-pointer transition-colors" title="New session">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] text-zinc-600" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <Search size={12} />
                        <input
                          type="text"
                          value={sidebarSearch}
                          onChange={(e) => setSidebarSearch(e.target.value)}
                          placeholder="Search..."
                          className="bg-transparent focus:outline-none text-zinc-300 w-full text-[11px]"
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-0.5 no-scrollbar">
                      {messages
                        .filter((m) => m.sender === "user" && m.text.toLowerCase().includes(sidebarSearch.toLowerCase()))
                        .map((m, i) => (
                          <div
                            key={i}
                            onClick={() => handleSendQuery(m.text)}
                            className="px-3 py-2 rounded-xl cursor-pointer text-zinc-500 hover:text-zinc-200 text-[11px] truncate transition-colors hover:bg-white/5"
                          >
                            {m.text}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main chat area */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                {/* Messages scroll area */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth touch-pan-y [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
                >

                  {/* ── LANDING STATE (no conversation) ── */}
                  {!hasConversation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center justify-center min-h-full py-10 px-6 text-center"
                    >
                      {/* AI Core Visual */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-6"
                      >
                        <AICore state={aiState} />
                      </motion.div>

                      {/* ✦ symbol */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-emerald-400 text-[10px] font-mono tracking-[0.3em] mb-3 uppercase"
                      >
                        ✦ AEVION INTELLIGENCE
                      </motion.div>

                      {/* Hero heading */}
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="text-[22px] font-semibold text-white tracking-tight leading-snug mb-3"
                      >
                        What are we building today?
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-[13px] text-zinc-500 max-w-[320px] leading-relaxed mb-8"
                      >
                        Tell Aevion what you want to create, solve, analyze, or explore.
                      </motion.p>

                      {/* Quick action chips */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="flex flex-wrap gap-2 justify-center"
                      >
                        {QUICK_CHIPS.map(({ icon: Icon, label, query }) => (
                          <motion.button
                            key={label}
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSendQuery(query)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] text-zinc-400 hover:text-white cursor-pointer transition-all"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(16,185,129,0.06)";
                              e.currentTarget.style.borderColor = "rgba(16,185,129,0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                            }}
                          >
                            <Icon size={11} className="text-emerald-400 opacity-70" />
                            {label}
                          </motion.button>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* ── CONVERSATION STATE ── */}
                  {hasConversation && (
                    <div className="p-5 space-y-6">
                      {messages.map((msg, msgIdx) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="group"
                        >
                          {msg.sender === "user" ? (
                            /* USER message — right-aligned, minimal bubble */
                            <div className="flex justify-end">
                              <div
                                className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm text-[13px] text-white leading-relaxed relative"
                                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
                              >
                                {msg.text}
                                {!msg.isStreaming && msg.text && (
                                  <button
                                    onClick={() => handleCopyText(msg.text, msg.id)}
                                    className="absolute -bottom-3 right-2 p-1 rounded-md text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                    style={{ background: "rgba(7,8,11,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
                                  >
                                    {copiedId === msg.id ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            /* AI message — editorial layout */
                            <div className="space-y-3">
                              {/* AI sender label */}
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                                  <Sparkles size={10} className="text-emerald-400" />
                                </div>
                                <span className="text-[10px] font-medium text-zinc-600 tracking-wide uppercase">Aevion</span>
                                {msg.isStreaming && (
                                  <div className="flex gap-0.5 items-center">
                                    {[0, 1, 2].map((i) => (
                                      <motion.span
                                        key={i}
                                        className="w-1 h-1 rounded-full bg-emerald-500"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Message content */}
                              <div className="pl-7 relative">
                                <div className="text-zinc-300 space-y-0.5 relative">
                                  {formatText(msg.text)}
                                  {msg.isStreaming && (
                                    <motion.span
                                      className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 rounded-full"
                                      animate={{ opacity: [1, 0] }}
                                      transition={{ duration: 0.6, repeat: Infinity }}
                                    />
                                  )}
                                </div>

                                {/* Interactive Founders Panel */}
                                {msg.isFoundersCard && !msg.isStreaming && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                  >
                                    <FoundersInteractivePanel />
                                  </motion.div>
                                )}

                                {/* Project card */}
                                {msg.projectCard && !msg.isStreaming && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 p-4 rounded-2xl space-y-3"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <FolderGit2 size={13} className="text-emerald-400" />
                                      <span className="text-[11px] font-semibold text-white">{msg.projectCard.title}</span>
                                    </div>
                                    <p className="text-[12px] text-zinc-500 leading-relaxed">{msg.projectCard.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {msg.projectCard.tags.map((tag, idx) => (
                                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md text-emerald-400" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}

                                {/* Link */}
                                {msg.link && !msg.isStreaming && (
                                  <a href={msg.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 mt-2 text-[12px] transition-colors">
                                    {msg.link.text} <ArrowUpRight size={12} />
                                  </a>
                                )}

                                {/* Copy button */}
                                {!msg.isStreaming && msg.text && msg.id !== "1" && (
                                  <button
                                    onClick={() => handleCopyText(msg.text, msg.id)}
                                    className="mt-3 flex items-center gap-1 text-[10px] text-zinc-700 hover:text-zinc-400 cursor-pointer transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    {copiedId === msg.id ? <><Check size={10} className="text-emerald-400" /> Copied</> : <><Copy size={10} /> Copy</>}
                                  </button>
                                )}
                              </div>

                              {/* Suggested follow-ups */}
                              {!msg.isStreaming && msg.suggestedFollowUps && msgIdx === messages.length - 1 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                  className="pl-7 flex flex-wrap gap-1.5"
                                >
                                  {msg.suggestedFollowUps.map((chip, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleSendQuery(chip)}
                                      className="text-[11px] px-3 py-1.5 rounded-full text-zinc-500 hover:text-zinc-200 cursor-pointer transition-all"
                                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                                    >
                                      {chip}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* ── Status bar ─────────────────── */}
                <div
                  className="px-5 py-2 flex justify-between items-center text-[11px] text-zinc-700 font-mono shrink-0"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-1 hover:text-zinc-400 transition-colors cursor-pointer disabled:opacity-30"
                    >
                      <RefreshCw size={11} /> Regenerate
                    </button>
                    <span className="text-zinc-800">·</span>
                    <span className="text-zinc-800">~{totalTokensEstimate} tokens</span>
                  </div>

                  {isGenerating && (
                    <button
                      onClick={handleStopGenerating}
                      className="flex items-center gap-1 text-red-500/70 hover:text-red-400 cursor-pointer transition-colors"
                    >
                      <Square size={10} /> Stop
                    </button>
                  )}
                </div>

                {/* ── File attachment badge ──────── */}
                {attachedFile && (
                  <div className="px-5 py-2 flex items-center justify-between text-[11px] font-mono text-emerald-400 shrink-0" style={{ background: "rgba(16,185,129,0.05)", borderTop: "1px solid rgba(16,185,129,0.12)" }}>
                    <span className="truncate">↳ {attachedFile}</span>
                    <button onClick={() => setAttachedFile(null)} className="hover:text-white cursor-pointer ml-2 shrink-0"><X size={12} /></button>
                  </div>
                )}

                {/* ── Command Composer ───────────── */}
                <div
                  className="p-4 shrink-0"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

                  <motion.div
                    animate={isFocused
                      ? { boxShadow: "0 0 0 1px rgba(16,185,129,0.25), 0 8px 32px rgba(0,0,0,0.4)" }
                      : { boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.3)" }
                    }
                    transition={{ duration: 0.2 }}
                    className="flex flex-col rounded-2xl overflow-hidden"
                    style={{ background: isFocused ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)" }}
                  >
                    {/* Textarea */}
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
                      placeholder={hasConversation ? "Continue the conversation..." : "Describe an idea, problem, or project..."}
                      className="w-full bg-transparent px-4 pt-3.5 pb-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none resize-none overflow-hidden leading-relaxed"
                      style={{ minHeight: "44px", maxHeight: "140px" }}
                    />

                    {/* Controls row */}
                    <div className="flex items-center justify-between px-3 pb-3 pt-1">
                      <div className="flex items-center gap-1">
                        {/* Attachment */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          title="Attach file"
                          className="p-1.5 text-zinc-600 hover:text-zinc-300 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                        >
                          <Paperclip size={15} />
                        </button>

                        {/* Voice */}
                        <button
                          onClick={toggleVoice}
                          title={isListening ? "Listening..." : "Voice input"}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isListening ? "text-red-400 bg-red-500/10" : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"
                          }`}
                        >
                          {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-700 hidden sm:block">
                          <CornerDownLeft size={9} className="inline mr-0.5" /> send
                        </span>

                        {/* Send button */}
                        <motion.button
                          whileHover={!isGenerating && input.trim() ? { scale: 1.08 } : {}}
                          whileTap={!isGenerating && input.trim() ? { scale: 0.94 } : {}}
                          onClick={() => handleSendQuery(input)}
                          disabled={isGenerating || !input.trim()}
                          className="flex items-center justify-center w-8 h-8 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                          style={{
                            background: input.trim() && !isGenerating
                              ? "rgba(16,185,129,1)"
                              : "rgba(255,255,255,0.05)",
                            boxShadow: input.trim() && !isGenerating ? "0 0 20px rgba(16,185,129,0.3)" : "none",
                          }}
                        >
                          <Send size={14} className={input.trim() && !isGenerating ? "text-black" : "text-zinc-700"} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Hint */}
                  <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-[10px] font-mono text-zinc-800">Cmd+K to toggle</span>
                    <span className="text-[10px] font-mono text-zinc-800">{input.length}/2000</span>
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
