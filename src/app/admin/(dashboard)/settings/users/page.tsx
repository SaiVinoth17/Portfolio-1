"use client";

import React, { useEffect, useState } from "react";
import { UserCheck, UserPlus, Shield, X, Save, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { User, UserRole } from "@/lib/db/types";

export default function UsersSettingsPage() {
  const [users, setUsers] = useState<Omit<User, "password_hash">[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Omit<User, "password_hash"> | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New User Form State
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("ADMIN");
  const [submitting, setSubmitting] = useState(false);

  // Edit User State
  const [editRole, setEditRole] = useState<UserRole>("ADMIN");
  const [editActive, setEditActive] = useState(true);
  const [editPassword, setEditPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          name: newName,
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create administrator.");
      }

      setStatusMessage("Administrator created successfully.");
      setShowCreateModal(false);
      setNewEmail("");
      setNewName("");
      setNewPassword("");
      await fetchUsers();
      setTimeout(() => setStatusMessage(null), 2500);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setErrorMessage(null);
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const payload: any = {
        id: editingUser.id,
        role: editRole,
        is_active: editActive,
      };
      if (editPassword.trim()) {
        payload.password = editPassword;
      }

      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update administrator.");
      }

      setStatusMessage("Administrator record updated successfully.");
      setEditingUser(null);
      setEditPassword("");
      await fetchUsers();
      setTimeout(() => setStatusMessage(null), 2500);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this administrator account?")) return;

    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete administrator.");
      }

      setStatusMessage("Administrator deleted.");
      await fetchUsers();
      setTimeout(() => setStatusMessage(null), 2500);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
            <UserCheck size={13} /> SINGLE OWNER POLICY ACTIVE
          </div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
            ADMINISTRATOR ACCOUNT
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Single authorized administrator: saivinothdeveloper@gmail.com
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center gap-2">
          <Shield size={14} /> Single Admin Policy Enforced
        </div>
      </div>

      {/* Policy Banner */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 text-xs font-mono text-zinc-400 space-y-1">
        <span className="text-white font-bold block">SINGLE OWNER SECURITY POLICY:</span>
        <p className="leading-relaxed">
          Aevion Studio enforces a single administrator policy. Only <code className="text-emerald-400">saivinothdeveloper@gmail.com</code> is authorized to authenticate with OWNER privileges. Arbitrary public registration and additional sub-admin creation are disabled.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
          <CheckCircle2 size={15} /> {statusMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-center gap-2">
          <AlertCircle size={15} /> {errorMessage}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-4">ADMINISTRATOR</th>
                <th className="p-4">EMAIL</th>
                <th className="p-4">ROLE TIER</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">CREATED</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    Querying administrator records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No administrators registered.
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
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          u.is_active
                            ? "text-emerald-400 bg-emerald-500/5"
                            : "text-red-400 bg-red-500/5"
                        }`}
                      >
                        {u.is_active ? "ACTIVE" : "DISABLED"}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 text-[11px]">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingUser(u);
                            setEditRole(u.role);
                            setEditActive(u.is_active);
                            setEditPassword("");
                          }}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] cursor-pointer"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Account"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-white text-sm uppercase">
                PROVISION ADMINISTRATOR
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400">CALLSIGN / FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Edison"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="edison@aevionstudio.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">PASSWORD (MIN 10 CHARS)</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">ROLE PRIVILEGE TIER</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                >
                  <option value="ADMIN">ADMIN — Full Content, Briefs &amp; Projects</option>
                  <option value="OWNER">OWNER — Full Control &amp; User Provisioning</option>
                  <option value="EDITOR">EDITOR — Manage Projects &amp; Content</option>
                  <option value="VIEWER">VIEWER — Read-Only Observability</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  {submitting ? "Hashing..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-white text-sm uppercase">
                MODIFY // {editingUser.name}
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400">ROLE PRIVILEGE TIER</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                >
                  <option value="OWNER">OWNER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="EDITOR">EDITOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">ACCOUNT ACCESS STATUS</label>
                <select
                  value={editActive ? "true" : "false"}
                  onChange={(e) => setEditActive(e.target.value === "true")}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                >
                  <option value="true">ACTIVE — Allowed to authenticate</option>
                  <option value="false">DISABLED — Suspended / Deactivated</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">RESET PASSWORD (OPTIONAL)</label>
                <input
                  type="password"
                  placeholder="Leave empty to keep unchanged"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={13} /> {submitting ? "Saving..." : "Commit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
