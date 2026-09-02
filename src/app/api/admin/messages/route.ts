import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";
import { logAuditEvent } from "@/lib/auth/audit";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const messages = await db.messages.list(100);
    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error("[Admin Messages List Error]:", err);
    return NextResponse.json({ error: "Failed to list messages" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAuth(req, "ADMIN");
  if (!guard.success) return guard.response;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { id, status } = body;
    if (!id || !["UNREAD", "REVIEWED", "ARCHIVED"].includes(status)) {
      return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
    }

    const success = await db.messages.updateStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    await logAuditEvent({
      userId: guard.user.id,
      action: "MESSAGE_STATUS_CHANGED",
      resource: id,
      req,
      metadata: { newStatus: status },
    });

    return NextResponse.json({ status: "success", message: "Status updated" });
  } catch (err: any) {
    console.error("[Admin Message Update Error]:", err);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
