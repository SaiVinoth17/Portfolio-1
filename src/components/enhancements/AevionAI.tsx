"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
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
  PanelLeftClose,
  PanelLeft,
  Search,
  Plus,
  Cpu,
  Terminal,
  Zap,
  Code2,
  CornerDownLeft,
} from "lucide-react";

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
  isStreaming?: boolean;
}

const ACTION_CARDS = [
  {
    icon: FolderGit2,
    title: "Nilgiris Explorers",
    subtitle: "Explore tourism & travel platform",
    query: "Tell me about Nilgiris Explorers",
  },
  {
    icon: Code2,
    title: "Engineering Philosophy",
    subtitle: "Architecture & trade-offs",
    query: "What is your engineering philosophy?",
  },
  {
    icon: Terminal,
    title: "Tech Stack & Motion",
    subtitle: "Next.js 16, GSAP, Framer Motion",
    query: "What technology stack do you use?",
  },
  {
    icon: Zap,
    title: "Book a Project",
    subtitle: "Collaborate with Aevion Studio",
    query: "How can we work together with Aevion Studio?",
  },
];

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "ai",
  text: "Hey! I'm Sai Vinoth, founder of Aevion Studio. Ask me about my featured projects (Nilgiris Explorers, Ooty Mistwings), engineering decisions, or general technical questions.",
  suggestedFollowUps: [
    "Who built this website?",
    "Tell me about Nilgiris Explorers",
    "How do you approach engineering?",
  ],
};

export function AevionAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUserAtBottomRef = useRef(true);

  // Load chat session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aevion_chat_session_v5");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save chat session to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem("aevion_chat_session_v5", JSON.stringify(messages));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [messages]);

  // Global keyboard shortcut (Cmd/Ctrl + K to open AI window)
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

  // Track scroll position to prevent auto-scrolling when user scrolled up
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    isUserAtBottomRef.current = distanceToBottom < 90;
  };

  useEffect(() => {
    if (isUserAtBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const detectProjectCard = (query: string): ProjectCardData | undefined => {
    const q = query.toLowerCase();
    if (q.includes("nilgiri") || q.includes("explorer")) {
      return {
        title: "Nilgiris Explorers",
        description: "Premium travel & tourism discovery platform for Ooty and the Nilgiris with immersive UI and AI enhancements.",
        tags: ["Next.js 16", "React 19", "Tourism UI", "SEO Engine"],
      };
    }
    if (q.includes("mistwing") || q.includes("ooty")) {
      return {
        title: "Ooty Mistwings",
        description: "Cinematic destination discovery platform featuring immersive visual storytelling and motion interactions.",
        tags: ["Destination Storytelling", "Cinematic UI", "Next.js", "Performance"],
      };
    }
    if (q.includes("gaming") || q.includes("kingdom")) {
      return {
        title: "Gaming Kingdom",
        description: "Fast, visually engaging gaming web platform built to showcase high-performance responsive frontend architecture.",
        tags: ["Gaming UI", "High FPS", "React", "Tailwind"],
      };
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
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  };

  const handleClearChat = () => {
    handleStopGenerating();
    setMessages([INITIAL_MESSAGE]);
    try {
      localStorage.removeItem("aevion_chat_session_v5");
    } catch {
      // Ignore errors
    }
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((m) => `**${m.sender === "user" ? "Visitor" : "Sai Vinoth AI"}**: ${m.text}`)
      .join("\n\n---\n\n");
    const blob = new Blob([chatText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sai-vinoth-ai-session.md";
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

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: fullPrompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsGenerating(true);
    isUserAtBottomRef.current = true;

    const streamMsgId = (Date.now() + 1).toString();
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

      const data = await res.json();
      const responseText = data.text || data.error || "Sorry, I am unable to generate a response right now.";
      const followUps = data.suggestedFollowUps || [
        "Tell me about Nilgiris Explorers",
        "What is your tech stack?",
      ];

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
                    isStreaming: false,
                  }
                : m
            )
          );
        } else {
          const currentSlice = responseText.slice(0, charIndex);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === streamMsgId ? { ...m, text: currentSlice } : m
            )
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
                text: "An error occurred while connecting to the AI server. Please try again.",
                isStreaming: false,
              }
            : m
        )
      );
    }
  };

  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUserMessage) {
      handleSendQuery(lastUserMessage.text);
    }
  };

  const toggleVoice = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setInput("Tell me about Nilgiris Explorers and your engineering decisions");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

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
            <div key={idx} className="my-3 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden font-mono text-[15px] shadow-2xl">
              <div className="bg-zinc-900/90 px-4 py-2 flex justify-between items-center text-zinc-400 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <span className="text-[11px] tracking-wider uppercase font-semibold text-zinc-400">code</span>
                </div>
                <button
                  onClick={() => handleCopyText(codeContent, `code-${idx}`)}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[11px]"
                >
                  <Copy size={12} /> {copiedId === `code-${idx}` ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 text-emerald-400 overflow-x-auto leading-relaxed antialiased">
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

      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter((c) => c.trim().length > 0);
        return (
          <div key={idx} className="flex gap-2 font-mono text-[13px] bg-zinc-900/80 p-2.5 rounded-xl border border-white/10 my-1.5">
            {cells.map((c, i) => (
              <span key={i} className="flex-1 font-semibold text-zinc-200">{c.trim()}</span>
            ))}
          </div>
        );
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={idx} className="font-bold text-white mt-3 mb-1 text-[17px] tracking-tight">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }

      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <p key={idx} className="pl-4 text-zinc-200 my-1 flex items-start gap-2 text-[16px] leading-[1.6]">
            <span className="text-emerald-400 mt-1.5">•</span>
            <span>{line.replace(/^[•-]\s*/, "")}</span>
          </p>
        );
      }

      return (
        <p key={idx} className="my-1.5 text-zinc-200 leading-[1.65] text-[16px] antialiased">
          {line}
        </p>
      );
    });
  };

  const totalTokensEstimate = messages.reduce((acc, m) => acc + m.text.length, 0);

  return (
    <>
      {/* Animated AI Floating Orb Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-[9990] group cursor-pointer"
        data-cursor="Sai Vinoth AI"
      >
        <div className="relative flex items-center justify-center p-3.5 rounded-full bg-zinc-950/90 border border-white/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.35)]">
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse"></span>
          
          <div className="relative z-10 flex items-center gap-2.5 px-1.5">
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-300 flex items-center justify-center shadow-inner">
              <Sparkles size={14} className="text-black" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight hidden sm:inline-block pr-1 font-sans antialiased">
              Sai Vinoth AI
            </span>
          </div>

          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </div>
      </motion.button>

      {/* Floating Raycast / Vision Pro AI Operating System Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-4 sm:right-6 z-[9999] w-[94vw] sm:w-[540px] h-[80vh] max-h-[640px] bg-zinc-950/95 backdrop-blur-2xl border border-white/10 text-white rounded-[28px] shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden ring-1 ring-white/10 antialiased"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
          >
            {/* Fixed Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar((prev) => !prev)}
                  className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-white/5"
                  title="Toggle History Sidebar"
                >
                  {showSidebar ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                      <Sparkles size={16} className="text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                      Sai Vinoth AI <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
                    </h3>
                    <p className="text-[12px] text-zinc-400">
                      Founder of Aevion Studio • <span className="text-emerald-400 font-medium">Online</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2 text-zinc-400">
                <button
                  onClick={handleExportChat}
                  title="Export Chat to Markdown"
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={handleClearChat}
                  title="Reset Chat History"
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Body with strict flex min-h-0 */}
            <div className="flex-1 min-h-0 flex overflow-hidden relative">
              {/* Sidebar Drawer */}
              <AnimatePresence>
                {showSidebar && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="h-full bg-zinc-900/95 border-r border-white/10 flex flex-col overflow-hidden text-xs shrink-0"
                  >
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">History</span>
                      <button
                        onClick={handleClearChat}
                        className="text-zinc-400 hover:text-emerald-400 p-1 cursor-pointer"
                        title="New Chat"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-xl text-[11px] text-zinc-400">
                        <Search size={14} />
                        <input
                          type="text"
                          value={sidebarSearch}
                          onChange={(e) => setSidebarSearch(e.target.value)}
                          placeholder="Search chats..."
                          className="bg-transparent focus:outline-none text-white w-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 text-[12px] no-scrollbar">
                      {messages
                        .filter((m) => m.sender === "user")
                        .map((m, i) => (
                          <div
                            key={i}
                            onClick={() => handleSendQuery(m.text)}
                            className="p-2.5 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 border border-transparent hover:border-white/10 cursor-pointer truncate text-zinc-300 transition-colors"
                          >
                            {m.text}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages Wrapper Flex Container */}
              <div className="flex-1 min-h-0 flex flex-col h-full overflow-hidden bg-gradient-to-b from-transparent via-black/20 to-black/50">
                {/* INDEPENDENT SCROLLABLE MESSAGES CONTAINER WITH LENIS PREVENT */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth p-5 space-y-5 font-sans text-[16px] antialiased touch-pan-y [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/60 transition-colors"
                >
                  {/* Empty State / Suggested Action Cards */}
                  {messages.length === 1 && (
                    <div className="py-3 space-y-4">
                      <div className="text-center space-y-1.5">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
                          Sai Vinoth AI Assistant
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">What would you like to build?</h4>
                        <p className="text-[13px] text-zinc-400">Ask about projects, engineering architecture, or general coding.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {ACTION_CARDS.map((card, i) => {
                          const IconComp = card.icon;
                          return (
                            <button
                              key={i}
                              onClick={() => handleSendQuery(card.query)}
                              className="p-3.5 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 rounded-2xl text-left transition-all hover:scale-[1.02] cursor-pointer group flex flex-col justify-between h-28"
                            >
                              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:rotate-6 transition-transform w-fit">
                                <IconComp size={16} />
                              </div>
                              <div>
                                <h5 className="text-[13px] font-bold text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                                  {card.title}
                                </h5>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{card.subtitle}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((msg) => (
                    <div key={msg.id} className="space-y-2 group">
                      <div
                        className={`flex items-start gap-3 ${
                          msg.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                            msg.sender === "user"
                              ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-bold"
                              : "bg-gradient-to-tr from-zinc-800 to-zinc-900 text-emerald-400 border border-white/10"
                          }`}
                        >
                          {msg.sender === "user" ? <User size={16} /> : <Sparkles size={16} />}
                        </div>

                        {/* User Message Bubbles: High Contrast WCAG AA Compliant */}
                        <div
                          className={`p-4 rounded-2xl max-w-[85%] leading-[1.65] relative ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-medium shadow-lg shadow-emerald-950/40 border border-emerald-500/30 text-[16px]"
                              : "bg-zinc-900/90 border border-white/10 text-zinc-200 shadow-xl text-[16px]"
                          }`}
                        >
                          {formatText(msg.text)}

                          {msg.isStreaming && (
                            <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse rounded-sm" />
                          )}

                          {!msg.isStreaming && msg.text && (
                            <button
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              title="Copy Message"
                              className="absolute -bottom-3 right-3 bg-zinc-950 border border-white/10 p-1.5 rounded-lg text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                            >
                              {copiedId === msg.id ? (
                                <Check size={12} className="text-emerald-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          )}

                          {/* Rich Project Cards */}
                          {msg.projectCard && !msg.isStreaming && (
                            <div className="mt-3 p-3.5 bg-black/70 border border-emerald-500/40 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[14px]">
                                <FolderGit2 size={16} />
                                <span>{msg.projectCard.title}</span>
                              </div>
                              <p className="text-[13px] text-zinc-300 leading-relaxed">
                                {msg.projectCard.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {msg.projectCard.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-mono"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.link && !msg.isStreaming && (
                            <a
                              href={msg.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline mt-2 text-[14px]"
                            >
                              {msg.link.text} <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Suggested Follow-ups */}
                      {msg.sender === "ai" &&
                        !msg.isStreaming &&
                        msg.suggestedFollowUps && (
                          <div className="pl-11 flex flex-wrap gap-2">
                            {msg.suggestedFollowUps.map((chip, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSendQuery(chip)}
                                className="text-[12px] bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-emerald-400 px-3 py-1.5 rounded-full transition-colors cursor-pointer hover:border-emerald-500/40"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Footer Status & Control Bar */}
                <div className="px-5 py-2 bg-zinc-950 border-t border-white/10 flex justify-between items-center text-[12px] text-zinc-400 font-mono shrink-0">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                      className="hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      <RefreshCw size={12} /> Regenerate
                    </button>
                    <span>•</span>
                    <span>~{totalTokensEstimate} tokens</span>
                  </div>

                  {isGenerating && (
                    <button
                      onClick={handleStopGenerating}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Square size={12} /> Stop Generating
                    </button>
                  )}
                </div>

                {/* File Attachment Badge */}
                {attachedFile && (
                  <div className="px-5 py-1.5 bg-emerald-500/10 border-t border-emerald-500/20 text-[12px] text-emerald-400 font-mono flex justify-between items-center shrink-0">
                    <span>Attached: {attachedFile}</span>
                    <button onClick={() => setAttachedFile(null)} className="hover:text-white cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* FIXED STICKY INPUT BAR AT BOTTOM */}
                <div className="p-4 border-t border-white/10 bg-zinc-950/95 flex flex-col gap-2 shrink-0 sticky bottom-0 z-10">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      title="Attach File"
                      className="p-2.5 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Paperclip size={18} />
                    </button>

                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendQuery(input);
                        }
                      }}
                      rows={1}
                      placeholder="Ask Sai Vinoth AI..."
                      className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl px-4 py-2.5 text-[16px] text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none overflow-hidden antialiased"
                    />

                    <button
                      onClick={toggleVoice}
                      title={isListening ? "Listening..." : "Voice Dictation"}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                        isListening
                          ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button
                      onClick={() => handleSendQuery(input)}
                      disabled={isGenerating || !input.trim()}
                      className="p-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 rounded-xl transition-all cursor-pointer font-bold shadow-lg shadow-emerald-500/20"
                    >
                      <Send size={16} />
                    </button>
                  </div>

                  {/* Input Shortcut Hint & Character Counter */}
                  <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono px-1">
                    <span className="flex items-center gap-1">
                      <CornerDownLeft size={10} /> Enter to send • Shift+Enter for new line
                    </span>
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
