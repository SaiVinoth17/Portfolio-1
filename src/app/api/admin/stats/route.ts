import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const [projects, messages, users, audits] = await Promise.all([
      db.projects.list(),
      db.messages.list(100),
      db.users.list(),
      db.audit.list(15),
    ]);

    const publishedProjects = projects.filter((p) => p.status === "PUBLISHED").length;
    const unreadMessages = messages.filter((m) => m.status === "UNREAD").length;
    const activeAdmins = users.filter((u) => u.is_active).length;

    return NextResponse.json({
      stats: {
        totalProjects: projects.length,
        publishedProjects,
        totalMessages: messages.length,
        unreadMessages,
        activeAdmins,
      },
      recentActivity: audits,
    });
  } catch (err: any) {
    console.error("[Admin Stats API Error]:", err);
    return NextResponse.json({ error: "Failed to load dashboard statistics" }, { status: 500 });
  }
}
