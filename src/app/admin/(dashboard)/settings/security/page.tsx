"use client";

import React, { useEffect, useState } from "react";
import { KeyRound, Shield, Laptop, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";

interface SessionInfo {
  id: string;
  expires_at: string;
  created_at: string;
  last_used_at: string;
  ip_address: string | null;
  user_agent: string | null;
  is_current: boolean;
}

export default function SecuritySettingsPage() {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/admin/sessions");
      if (res.ok) {
        const json = await res.json();
        setSessions(json.sessions);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevokeSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/admin/sessions?sessionId=${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setActionMessage("Session revoked successfully.");
        await fetchSessions();
        setTimeout(() => setActionMessage(null), 2000);
      }
    } catch {
      // ignore
    }
  };

  const handleRevokeAllOther = async () => {
    try {
      const res = await fetch(`/api/admin/sessions?all=true`, {
        method: "DELETE",
      });
      if (res.ok) {
        setActionMessage("All other remote sessions have been terminated.");
        await fetchSessions();
        setTimeout(() => setActionMessage(null), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
            <KeyRound size={13} /> ACTIVE SERVER SESSIONS
          </div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
            SESSION MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Database-backed cryptographic session tokens and remote revocation
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchSessions}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button
            onClick={handleRevokeAllOther}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 size={13} /> Terminate Other Sessions
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
          <CheckCircle2 size={15} /> {actionMessage}
        </div>
      )}

      {/* Sessions Table */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-4">DEVICE / USER AGENT</th>
                <th className="p-4">IP ADDRESS</th>
                <th className="p-4">ESTABLISHED</th>
                <th className="p-4">LAST ACTIVE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    Querying active session records...
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No active sessions found.
                  </td>
                </tr>
              ) : (
                sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Laptop size={14} className="text-zinc-500 shrink-0" />
                        <span className="text-white text-xs truncate max-w-xs" title={s.user_agent || ""}>
                          {s.user_agent ? s.user_agent.slice(0, 45) + "..." : "Standard Client"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">{s.ip_address || "127.0.0.1"}</td>
                    <td className="p-4 text-zinc-400 text-[11px]">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-zinc-300 text-[11px]">
                      {new Date(s.last_used_at).toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                      {s.is_current ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          THIS DEVICE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700">
                          REMOTE
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {!s.is_current && (
                        <button
                          onClick={() => handleRevokeSession(s.id)}
                          className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-[11px] transition-colors cursor-pointer"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
