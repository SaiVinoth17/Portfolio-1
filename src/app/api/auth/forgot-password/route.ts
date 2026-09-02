import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { generateRandomToken, hashToken } from "@/lib/auth/crypto";
import { checkRateLimit, recordFailedAttempt } from "@/lib/auth/rateLimit";
import { logAuditEvent } from "@/lib/auth/audit";
import { getClientIp } from "@/lib/auth/session";
import { normalizeEmail, isAuthorizedOwner } from "@/lib/auth/constants";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { email } = body;
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);
    const ip = getClientIp(req) || "unknown_ip";
    const rateKey = `forgot:${ip}:${normalizedEmail}`;

    const rate = await checkRateLimit(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many reset requests. Please wait a few minutes." },
        { status: 429 }
      );
    }
    await recordFailedAttempt(rateKey);

    const user = await db.users.findByEmail(normalizedEmail);
    let devResetLink: string | null = null;

    if (user && user.is_active) {
      const rawToken = generateRandomToken(32);
      const tokenHash = hashToken(rawToken);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins

      await db.passwordResets.create({
        id: crypto.randomUUID(),
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        created_at: new Date().toISOString(),
        used_at: null,
      });

      await logAuditEvent({
        userId: user.id,
        action: "PASSWORD_RESET_REQUESTED",
        resource: normalizedEmail,
        req,
      });

      // In local dev without SMTP server, provide link for testing
      if (process.env.NODE_ENV !== "production") {
        devResetLink = `/admin/reset-password?token=${rawToken}`;
      }
    }

    return NextResponse.json({
      status: "success",
      message: "If an account exists for that email, reset instructions have been sent.",
      ...(devResetLink ? { devResetLink } : {}),
    });
  } catch (err: any) {
    console.error("[Forgot Password Error]:", err);
    return NextResponse.json(
      { error: "Failed to process password reset request." },
      { status: 500 }
    );
  }
}
