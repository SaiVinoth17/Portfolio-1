"use client";

import React from "react";
import Link from "next/link";
import { Settings, KeyRound, UserCheck, Shield, ArrowRight, Database } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
          <Settings size={13} /> STUDIO CONFIGURATION
        </div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
          SETTINGS &amp; CONTROLS
        </h1>
        <p className="text-xs text-zinc-500 font-mono mt-0.5">
          Security policies, session revocation, and administrator provisioning
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/settings/security"
          className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 transition-all space-y-4 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <KeyRound size={18} />
            </div>
            <ArrowRight
              size={18}
              className="text-zinc-600 group-hover:text-emerald-400 transition-colors"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">Active Sessions &amp; Security</h3>
            <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
              Inspect currently authenticated browser sessions, IP addresses, and revoke remote
              sessions across devices.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/settings/users"
          className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-sky-500/40 transition-all space-y-4 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <UserCheck size={18} />
            </div>
            <ArrowRight
              size={18}
              className="text-zinc-600 group-hover:text-sky-400 transition-colors"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">User Management (OWNER)</h3>
            <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
              Provision new administrators, modify role privileges (OWNER, ADMIN, EDITOR, VIEWER),
              and enforce anti-lockout guards.
            </p>
          </div>
        </Link>
      </div>

      {/* Database State Card */}
      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-400 font-bold">
          <Database size={15} /> DATABASE PERSISTENCE ENGINE
        </div>
        <p className="text-zinc-400 leading-relaxed text-[11px]">
          The database client automatically selects between PostgreSQL (when <code className="text-emerald-400">DATABASE_URL</code> is configured) and a local development data store. All queries use parameterized statements to eliminate SQL injection vulnerabilities.
        </p>
      </div>
    </div>
  );
}
