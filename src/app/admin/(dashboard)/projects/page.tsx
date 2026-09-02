"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FolderGit2, ExternalLink, Edit3, CheckCircle2, RefreshCw, X, Save } from "lucide-react";
import { ProjectRecord } from "@/lib/db/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const json = await res.json();
        setProjects(json.projects);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setSaveMessage("Project updated successfully.");
        await fetchProjects();
        setTimeout(() => {
          setEditingProject(null);
          setSaveMessage(null);
        }, 1200);
      } else {
        const err = await res.json();
        setSaveMessage(err.error || "Failed to update project.");
      }
    } catch (err: any) {
      setSaveMessage(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest font-bold">
            <FolderGit2 size={13} /> STUDIO PORTFOLIO ARCHIVE
          </div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
            PROJECT MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Manage flagship case studies and verified performance claims
          </p>
        </div>

        <button
          onClick={fetchProjects}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">PROJECT</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">PERFORMANCE PROFILE</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    Loading studio projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    No projects found in database.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{p.title}</div>
                      <div className="text-zinc-500 text-[11px] truncate max-w-xs">{p.subtitle}</div>
                    </td>
                    <td className="p-4 text-zinc-300">{p.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                          p.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : p.status === "DRAFT"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-zinc-500/10 text-zinc-400 border-zinc-500/30"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-400/90">{p.metrics}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="View Public Page"
                        >
                          <ExternalLink size={13} />
                        </Link>
                        <button
                          onClick={() => setEditingProject({ ...p })}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                        >
                          <Edit3 size={12} /> Edit
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

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-white text-base">
                EDIT // {editingProject.title}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-mono flex items-center gap-2">
                <CheckCircle2 size={14} /> {saveMessage}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400">PROJECT TITLE</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">SUBTITLE / TAGLINE</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, subtitle: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-zinc-400">CATEGORY</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400">STATUS</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as "PUBLISHED" | "DRAFT" | "ARCHIVED",
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">PERFORMANCE METRIC SPECIFICATION</label>
                <input
                  type="text"
                  value={editingProject.metrics}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, metrics: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={13} /> {saving ? "Saving..." : "Commit Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
