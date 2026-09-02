"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Shield,
  Laptop,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
} from "lucide-react";

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
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessionActionMessage, setSessionActionMessage] = useState<string | null>(null);

  // Password Rotation State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rotationLoading, setRotationLoading] = useState(false);
  const [rotationSuccess, setRotationSuccess] = useState<string | null>(null);
  const [rotationError, setRotationError] = useState<string | null>(null);

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
      setLoadingSessions(false);
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
        setSessionActionMessage("Session revoked successfully.");
        await fetchSessions();
        setTimeout(() => setSessionActionMessage(null), 2000);
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
        setSessionActionMessage("All other remote sessions have been terminated.");
        await fetchSessions();
        setTimeout(() => setSessionActionMessage(null), 2000);
      }
    } catch {
      // ignore
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setRotationError(null);
    setRotationSuccess(null);

    if (!currentPassword) {
      setRotationError("Current password is required.");
      return;
    }

    if (newPassword.length < 10) {
      setRotationError("New password must be at least 10 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setRotationError("New passwords do not match.");
      return;
    }

    setRotationLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }

      setRotationSuccess(
        "Password successfully updated! All sessions have been terminated. Redirecting to sign in..."
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1800);
    } catch (err: any) {
      setRotationError(err.message || "Failed to update password.");
    } finally {
      setRotationLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
          <KeyRound size={13} /> OWNER SECURITY CONTROLS
        </div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
          SECURITY &amp; CREDENTIAL MANAGEMENT
        </h1>
        <p className="text-xs text-zinc-500 font-mono mt-0.5">
          Rotate owner credentials and inspect server-managed active sessions
        </p>
      </div>

      {/* 1. Password Rotation Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-6 shadow-xl">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
            <Lock size={15} className="text-emerald-400" /> ROTATE OWNER PASSWORD
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            Changing your password will immediately invalidate all active sessions across all devices.
          </p>
        </div>

        {rotationSuccess && (
          <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0" /> {rotationSuccess}
          </div>
        )}

        {rotationError && (
          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" /> {rotationError}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-400 uppercase tracking-wider text-[11px]">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-zinc-400 uppercase tracking-wider text-[11px]">
                NEW PASSWORD (MIN 10 CHARS)
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 uppercase tracking-wider text-[11px]">
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={rotationLoading}
            className="mt-2 py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
          >
            {rotationLoading ? "COMPUTING MEMORY-HARD HASH..." : (
              <>
                ROTATE PASSWORD &amp; SIGN OUT ALL SESSIONS <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Active Sessions Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-white font-mono font-bold text-sm flex items-center gap-2">
              <Laptop size={15} className="text-sky-400" /> ACTIVE SERVER SESSIONS
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Cryptographic tokens stored as SHA-256 hashes in the database
            </p>
          </div>

          <div className="flex items-center gap-2">
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

        {sessionActionMessage && (
          <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 size={15} /> {sessionActionMessage}
          </div>
        )}

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
                {loadingSessions ? (
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
                          <span
                            className="text-white text-xs truncate max-w-xs"
                            title={s.user_agent || ""}
                          >
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
    </div>
  );
}
