import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashToken, hashPassword } from "@/lib/auth/crypto";
import { logAuditEvent } from "@/lib/auth/audit";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { token, newPassword } = body;

    if (!token || typeof token !== "string" || !newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 10) {
      return NextResponse.json(
        { error: "Password must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Hash token to look up in database
    const tokenHash = hashToken(token);
    const resetRecord = await db.passwordResets.findByTokenHash(tokenHash);

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    // Check expiration
    if (new Date(resetRecord.expires_at).getTime() <= Date.now()) {
      return NextResponse.json(
        { error: "This reset token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Mark token as used immediately to prevent replay attacks
    await db.passwordResets.markUsed(resetRecord.id);

    // Hash new password using scrypt
    const newPasswordHash = await hashPassword(newPassword);

    // Update user record
    await db.users.update(resetRecord.user_id, {
      password_hash: newPasswordHash,
    });

    // Invalidate all active sessions for this user for security
    await db.sessions.deleteByUser(resetRecord.user_id);

    await logAuditEvent({
      userId: resetRecord.user_id,
      action: "PASSWORD_RESET_COMPLETED",
      resource: "users",
      req,
    });

    return NextResponse.json({
      status: "success",
      message: "Password has been successfully updated. All previous sessions have been signed out.",
    });
  } catch (err: any) {
    console.error("[Reset Password Error]:", err);
    return NextResponse.json(
      { error: "Failed to reset password." },
      { status: 500 }
    );
  }
}
