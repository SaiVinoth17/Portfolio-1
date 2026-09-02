"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Inbox,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  ExternalLink,
  Menu,
  X,
  KeyRound,
  UserCheck,
} from "lucide-react";
import { User, Session } from "@/lib/db/types";

interface Props {
  user: User;
  session: Session;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminDashboardShell({ user, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/admin/login");
    router.refresh();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "ADMIN":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "EDITOR":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "VIEWER":
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    }
  };

  return (
    <div className="min-h-screen flex bg-[#07070a] text-zinc-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/10 bg-zinc-950/60 backdrop-blur-xl p-4 sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Logo / Brand */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              <Shield size={13} /> AEVION STUDIO
            </div>
            <div className="text-sm font-bold tracking-tight text-white font-mono mt-0.5">
              ADMIN CONSOLE
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs transition-all ${
                    isActive
                      ? "bg-white/10 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-emerald-400" : "text-zinc-500"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sub-links under Settings */}
          {pathname.startsWith("/admin/settings") && (
            <div className="px-3 pt-2 border-t border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2">
                SETTINGS MODULES
              </div>
              <Link
                href="/admin/settings/security"
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-mono ${
                  pathname === "/admin/settings/security"
                    ? "text-emerald-400 bg-white/5"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <KeyRound size={13} /> Active Sessions
              </Link>
              {user.role === "OWNER" && (
                <Link
                  href="/admin/settings/users"
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-mono ${
                    pathname === "/admin/settings/users"
                      ? "text-emerald-400 bg-white/5"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <UserCheck size={13} /> User Management
                </Link>
              )}
            </div>
          )}
        </div>

        {/* User profile & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-semibold font-mono text-white truncate">
                {user.name}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 truncate">{user.email}</div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold border uppercase tracking-wider ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
            >
              Site <ExternalLink size={11} />
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 py-2 px-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
            <Shield size={14} className="text-emerald-400" /> AEVION ADMIN
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden p-4 border-b border-white/10 bg-zinc-950 space-y-3">
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:bg-white/5"
                >
                  <item.icon size={15} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-red-400 flex items-center gap-1"
              >
                <LogOut size={12} /> Sign out
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
