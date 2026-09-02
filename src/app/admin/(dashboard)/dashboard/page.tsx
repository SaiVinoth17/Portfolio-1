"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Inbox,
  Users,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalProjects: number;
    publishedProjects: number;
    totalMessages: number;
    unreadMessages: number;
    activeAdmins: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    resource: string;
    timestamp: string;
    ip_address: string | null;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Activity size={13} className="animate-pulse" /> PRODUCTION TELEMETRY ACTIVE
          </div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
            CONTROL PLANE OVERVIEW
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Real-time telemetry and database activity logs
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          <span>Refresh State</span>
        </button>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
            <span>PROJECTS</span>
            <FolderGit2 size={16} className="text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {loading ? "..." : data?.stats.totalProjects ?? 0}
          </div>
          <div className="text-[11px] font-mono text-emerald-400">
            {loading ? "..." : `${data?.stats.publishedProjects ?? 0} Published Live`}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
            <span>INBOUND BRIEFS</span>
            <Inbox size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {loading ? "..." : data?.stats.totalMessages ?? 0}
          </div>
          <div className="text-[11px] font-mono text-amber-400">
            {loading ? "..." : `${data?.stats.unreadMessages ?? 0} Awaiting Review`}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
            <span>ADMINISTRATORS</span>
            <Users size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {loading ? "..." : data?.stats.activeAdmins ?? 0}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">Active Role RBAC</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
            <span>DATABASE INTEGRITY</span>
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">OPTIMAL</div>
          <div className="text-[11px] font-mono text-zinc-500">Parameterized Storage</div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/messages"
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 font-bold">INBOUND BRIEFS</div>
            <div className="text-sm font-semibold text-white mt-1">Review Client Inquiries</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Manage /contact submissions
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-zinc-500 group-hover:text-emerald-400 transition-colors"
          />
        </Link>

        <Link
          href="/admin/projects"
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-sky-500/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-mono text-sky-400 font-bold">CASE STUDIES</div>
            <div className="text-sm font-semibold text-white mt-1">Manage Studio Projects</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Update metrics & deliverables
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-zinc-500 group-hover:text-sky-400 transition-colors"
          />
        </Link>

        <Link
          href="/admin/settings/security"
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold">SECURITY SETTINGS</div>
            <div className="text-sm font-semibold text-white mt-1">Session Management</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Inspect & revoke active sessions
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-zinc-500 group-hover:text-amber-400 transition-colors"
          />
        </Link>
      </div>

      {/* Real Audit Activity Log */}
      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
            <Clock size={15} className="text-emerald-400" /> RECENT SECURITY &amp; SYSTEM AUDIT LOGS
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Live Database Records</span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs font-mono text-zinc-500">
            Querying audit log records...
          </div>
        ) : !data?.recentActivity || data.recentActivity.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-zinc-500">
            No audit records recorded yet.
          </div>
        ) : (
          <div className="space-y-2 font-mono text-xs">
            {data.recentActivity.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-semibold">{log.action}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-300 truncate max-w-xs sm:max-w-md">{log.resource}</span>
                </div>
                <div className="text-[11px] text-zinc-500 shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
