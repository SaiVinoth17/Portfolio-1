import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";
import { logAuditEvent } from "@/lib/auth/audit";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const sessions = await db.sessions.listByUser(guard.user.id);
    const enriched = sessions.map((s) => ({
      id: s.id,
      expires_at: s.expires_at,
      created_at: s.created_at,
      last_used_at: s.last_used_at,
      ip_address: s.ip_address,
      user_agent: s.user_agent,
      is_current: s.id === guard.session.id,
    }));

    return NextResponse.json({ sessions: enriched });
  } catch (err: any) {
    console.error("[Admin Sessions List Error]:", err);
    return NextResponse.json({ error: "Failed to list sessions" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const { searchParams } = new URL(req.url);
    const revokeAll = searchParams.get("all") === "true";
    const sessionId = searchParams.get("sessionId");

    if (revokeAll) {
      // Revoke all other sessions except current
      await db.sessions.deleteByUser(guard.user.id, guard.session.id);
      await logAuditEvent({
        userId: guard.user.id,
        action: "ALL_SESSIONS_REVOKED",
        resource: "sessions",
        req,
      });
      return NextResponse.json({
        status: "success",
        message: "All other sessions have been terminated.",
      });
    }

    if (sessionId) {
      await db.sessions.delete(sessionId);
      await logAuditEvent({
        userId: guard.user.id,
        action: "SESSION_REVOKED",
        resource: sessionId,
        req,
      });
      return NextResponse.json({ status: "success", message: "Session revoked." });
    }

    return NextResponse.json({ error: "Missing sessionId or all flag" }, { status: 400 });
  } catch (err: any) {
    console.error("[Admin Session Revoke Error]:", err);
    return NextResponse.json({ error: "Failed to revoke session" }, { status: 500 });
  }
}
