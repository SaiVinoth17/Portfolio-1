import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "ADMIN");
  if (!guard.success) return guard.response;

  try {
    const logs = await db.audit.list(100);
    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error("[Audit Logs API Error]:", err);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
