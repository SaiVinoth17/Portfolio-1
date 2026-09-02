import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";
import { logAuditEvent } from "@/lib/auth/audit";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const projects = await db.projects.list();
    return NextResponse.json({ projects });
  } catch (err: any) {
    console.error("[Admin Projects List Error]:", err);
    return NextResponse.json({ error: "Failed to list projects" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAuth(req, "EDITOR");
  if (!guard.success) return guard.response;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { id, title, subtitle, status, category, metrics } = body;
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const updated = await db.projects.update(id, {
      title,
      subtitle,
      status,
      category,
      metrics,
    });

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await logAuditEvent({
      userId: guard.user.id,
      action: "PROJECT_UPDATED",
      resource: id,
      req,
      metadata: { title: updated.title, status: updated.status },
    });

    return NextResponse.json({ status: "success", project: updated });
  } catch (err: any) {
    console.error("[Admin Project Update Error]:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
