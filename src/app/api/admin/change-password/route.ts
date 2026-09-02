import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";
import { verifyPassword, hashPassword } from "@/lib/auth/crypto";
import { destroyCurrentSession } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/auth/audit";

export async function POST(req: Request) {
  const guard = await requireAuth(req, "OWNER");
  if (!guard.success) return guard.response;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || typeof currentPassword !== "string") {
      return NextResponse.json(
        { error: "Current password is required." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 10) {
      return NextResponse.json(
        { error: "New password must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation password do not match." },
        { status: 400 }
      );
    }

    // Verify current password with constant-time equality
    const validCurrent = await verifyPassword(currentPassword, guard.user.password_hash);
    if (!validCurrent) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    // Compute memory-hard scrypt hash of new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password in database
    await db.users.update(guard.user.id, {
      password_hash: newPasswordHash,
      updated_at: new Date().toISOString(),
    });

    // Invalidate ALL active sessions for this user across all devices
    await db.sessions.deleteByUser(guard.user.id);

    // Log the security rotation
    await logAuditEvent({
      userId: guard.user.id,
      action: "PASSWORD_CHANGED",
      resource: "users",
      req,
      metadata: { email: guard.user.email },
    });

    // Clear session cookie so user is forced to log in again
    await destroyCurrentSession();

    return NextResponse.json({
      status: "success",
      message:
        "Password rotated successfully. All active sessions have been invalidated. Please sign in again.",
    });
  } catch (err: any) {
    console.error("[Change Password Error]:", err);
    return NextResponse.json(
      { error: "Failed to update password." },
      { status: 500 }
    );
  }
}
