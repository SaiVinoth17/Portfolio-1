import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminSession, getClientIp, AEVION_ADMIN_USER } from "@/lib/auth/session";
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/auth/rateLimit";
import { logAuditEvent } from "@/lib/auth/audit";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { code } = body || {};

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Secret authorization code is required." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req) || "unknown_ip";
    const rateLimitKey = `login:secret_code:${ip}`;

    // 1. Check Rate Limiting to prevent brute-force attacks
    const rateCheck = await checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      await logAuditEvent({
        action: "LOGIN_FAILURE",
        resource: "RESTRICTED_CODE_ACCESS",
        req,
        metadata: { reason: "RATE_LIMITED", ip },
      });
      return NextResponse.json(
        {
          error: `Too many authorization attempts. Access is locked for ${rateCheck.retryAfterSeconds} seconds.`,
          retryAfterSeconds: rateCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Server-side validation against environment variable
    const configuredCode = (process.env.AEVION_ADMIN_CODE || "Code Red").trim();
    const providedCode = code.trim();

    const bufProvided = Buffer.from(providedCode);
    const bufConfigured = Buffer.from(configuredCode);

    const isMatch =
      bufProvided.length === bufConfigured.length &&
      crypto.timingSafeEqual(bufProvided, bufConfigured);

    if (!isMatch) {
      const updatedRate = await recordFailedAttempt(rateLimitKey);
      await logAuditEvent({
        action: "LOGIN_FAILURE",
        resource: "RESTRICTED_CODE_ACCESS",
        req,
        metadata: {
          reason: "INVALID_SECRET_CODE",
          remainingAttempts: updatedRate.remainingAttempts,
          ip,
        },
      });

      return NextResponse.json(
        {
          error: "Invalid authorization code. Access denied.",
          remainingAttempts: updatedRate.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 3. Successful authentication: Reset rate limits
    await resetRateLimit(rateLimitKey);

    // 4. Create server-side session and set secure HttpOnly cookie
    await createAdminSession(req);

    // 5. Record audit log
    await logAuditEvent({
      userId: AEVION_ADMIN_USER.id,
      action: "LOGIN_SUCCESS",
      resource: "/admin/dashboard",
      req,
      metadata: { method: "SECRET_CODE_AUTH", role: AEVION_ADMIN_USER.role },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Clearance confirmed. Access granted.",
        user: {
          id: AEVION_ADMIN_USER.id,
          name: AEVION_ADMIN_USER.name,
          role: AEVION_ADMIN_USER.role,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Secret Code Login API Error]:", err);
    return NextResponse.json(
      { error: "Authentication system encountered an internal error." },
      { status: 500 }
    );
  }
}
