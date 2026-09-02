"use client";

import React, { useEffect, useState } from "react";
import { Users, Shield, CheckCircle2, Clock } from "lucide-react";
import { User } from "@/lib/db/types";

export default function AdminTeamPage() {
  const [users, setUsers] = useState<Omit<User, "password_hash">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => (res.ok ? res.json() : { users: [] }))
      .then((data) => setUsers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
          <Users size={13} /> STUDIO BUILDERS &amp; ADMINISTRATORS
        </div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
          ENGINEERING TEAM &amp; ROLES
        </h1>
        <p className="text-xs text-zinc-500 font-mono mt-0.5">
          Founder parity and authenticated administrative access tiers
        </p>
      </div>

      {/* Founder Cores Deck */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
          EQUAL FOUNDING CORES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> CO-FOUNDER
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                OWNER
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-mono">Sai Rio</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Product · Engineering · AI · Systems · Vision
              </p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed font-mono">
              Architect of autonomous neural pipelines, low-latency streaming infrastructure, and
              first-party digital architectures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="text-cyan-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> CO-FOUNDER
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                OWNER
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-mono">Edison</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Development · Technology · Engineering · Building
              </p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed font-mono">
              Architect of high-performance frontend graphics, distributed serverless execution, and
              computational reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Active System Administrators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            AUTHENTICATED ADMINISTRATOR ROSTER
          </div>
          <span className="text-xs font-mono text-zinc-500">Database Records</span>
        </div>

        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="p-4">NAME</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">ROLE TIER</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">LAST LOGIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      Querying administrators...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      No additional administrators registered.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <Shield size={13} className="text-emerald-400" /> {u.name}
                      </td>
                      <td className="p-4 text-zinc-400">{u.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            u.role === "OWNER"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : u.role === "ADMIN"
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                              : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                          <CheckCircle2 size={12} /> {u.is_active ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-500 text-[11px]">
                        {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : "Never"}
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
