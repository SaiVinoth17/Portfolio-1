"use client";

import React, { useEffect, useState } from "react";
import { Inbox, Mail, CheckCircle2, Clock, RefreshCw, Archive, Eye } from "lucide-react";
import { MessageRecord } from "@/lib/db/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const json = await res.json();
        setMessages(json.messages);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: "UNREAD" | "REVIEWED" | "ARCHIVED") => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Inbox size={13} /> CLIENT UPLINK TELEMETRY
          </div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
            INBOUND MISSION BRIEFS
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Direct architecture inquiries received through the public /contact form
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Grid: List on Left, Detail Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-3">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-zinc-500 bg-zinc-950/80 rounded-2xl border border-white/10">
              Querying inbound messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-zinc-500 bg-zinc-950/80 rounded-2xl border border-white/10">
              No mission briefs received yet. Submissions to /contact will appear here automatically.
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMessage(m)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 font-mono text-xs ${
                  selectedMessage?.id === m.id
                    ? "bg-zinc-900 border-emerald-500/50 shadow-lg"
                    : "bg-zinc-950/80 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm">{m.name}</div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] border uppercase ${
                      m.status === "UNREAD"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30 font-bold animate-pulse"
                        : m.status === "REVIEWED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="text-zinc-400 text-[11px] truncate">{m.email}</div>
                <div className="text-[11px] text-zinc-500 truncate">
                  {m.project_type} {m.budget ? `· ${m.budget}` : ""}
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-600 pt-1 border-t border-white/5">
                  <span>ID: {m.id}</span>
                  <span>{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail Viewer */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-6 font-mono text-xs shadow-2xl sticky top-6">
              <div className="flex items-start justify-between border-b border-white/10 pb-4 gap-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    MISSION BRIEF // {selectedMessage.id}
                  </div>
                  <h2 className="text-2xl font-bold text-white font-mono mt-1">
                    {selectedMessage.name}
                  </h2>
                  <div className="text-emerald-400 text-xs mt-0.5">
                    {selectedMessage.company || "Independent Entity"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedMessage.id, "REVIEWED")}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                      selectedMessage.status === "REVIEWED"
                        ? "bg-emerald-500 text-black border-emerald-500 font-bold"
                        : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 size={12} /> Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedMessage.id, "ARCHIVED")}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                      selectedMessage.status === "ARCHIVED"
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Archive size={12} /> Archive
                  </button>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">EMAIL ADDRESS</div>
                  <div className="text-white text-xs mt-0.5 select-all">{selectedMessage.email}</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">PROJECT DISCIPLINE</div>
                  <div className="text-cyan-400 text-xs mt-0.5">{selectedMessage.project_type}</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">ESTIMATED BUDGET</div>
                  <div className="text-white text-xs mt-0.5">{selectedMessage.budget || "Unspecified"}</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">RECEIVED AT</div>
                  <div className="text-zinc-300 text-xs mt-0.5">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Full Message Body */}
              <div className="space-y-2">
                <div className="text-zinc-500 text-[10px] uppercase tracking-wider">
                  MISSION BRIEF SPECIFICATION:
                </div>
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 text-zinc-200 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Aevion Studio // Architecture Brief [${selectedMessage.id}]`}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Mail size={13} /> Open Direct Reply Draft
                </a>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-950/40 border border-dashed border-white/10 text-center text-zinc-500 font-mono text-xs space-y-2">
              <Eye size={24} className="text-zinc-600" />
              <div>Select an inbound mission brief from the left to inspect its contents.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
