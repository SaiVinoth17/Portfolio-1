import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/crypto";
import { createSession, getClientIp } from "@/lib/auth/session";
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/auth/rateLimit";
import { logAuditEvent } from "@/lib/auth/audit";
import { normalizeEmail, isAuthorizedOwner } from "@/lib/auth/constants";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const ip = getClientIp(req) || "unknown_ip";
    const rateLimitKey = `login:${ip}:${normalizedEmail}`;

    // 1. Check Rate Limiting
    const rateCheck = await checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      await logAuditEvent({
        action: "LOGIN_FAILURE",
        resource: normalizedEmail,
        req,
        metadata: { reason: "RATE_LIMITED", ip },
      });
      return NextResponse.json(
        {
          error: `Too many sign-in attempts. Access is locked for ${rateCheck.retryAfterSeconds} seconds.`,
          retryAfterSeconds: rateCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Single Admin Policy Verification:
    // Only saivinothdeveloper@gmail.com is authorized to authenticate as OWNER.
    // If unauthorized, return the identical generic error to prevent account enumeration.
    if (!isAuthorizedOwner(normalizedEmail)) {
      const updatedRate = await recordFailedAttempt(rateLimitKey);
      await logAuditEvent({
        action: "LOGIN_FAILURE",
        resource: normalizedEmail,
        req,
        metadata: { reason: "UNAUTHORIZED_EMAIL", remainingAttempts: updatedRate.remainingAttempts },
      });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Lookup authorized user in database
    const user = await db.users.findByEmail(normalizedEmail);

    if (!user) {
      const updatedRate = await recordFailedAttempt(rateLimitKey);
      await logAuditEvent({
        action: "LOGIN_FAILURE",
        resource: normalizedEmail,
        req,
        metadata: { reason: "USER_NOT_FOUND", attempts: updatedRate.remainingAttempts },
      });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 4. Check if account is active
    if (!user.is_active) {
      await logAuditEvent({
        userId: user.id,
        action: "LOGIN_FAILURE",
        resource: normalizedEmail,
        req,
        metadata: { reason: "ACCOUNT_DEACTIVATED" },
      });
      return NextResponse.json(
        { error: "This administrator account has been disabled. Contact system administrator." },
        { status: 403 }
      );
    }

    // 5. Verify password in constant time using scrypt
    const passwordMatch = await verifyPassword(password, user.password_hash);
    if (!passwordMatch) {
      const updatedRate = await recordFailedAttempt(rateLimitKey);
      await logAuditEvent({
        userId: user.id,
        action: "LOGIN_FAILURE",
        resource: normalizedEmail,
        req,
        metadata: { reason: "PASSWORD_MISMATCH", remainingAttempts: updatedRate.remainingAttempts },
      });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 6. Successful authentication: Reset rate limits
    await resetRateLimit(rateLimitKey);

    // 7. Update user's last login timestamp
    await db.users.update(user.id, {
      last_login_at: new Date().toISOString(),
    });

    // 8. Create server-side session and set secure HttpOnly cookie
    await createSession(user.id, req);

    // 9. Record audit log
    await logAuditEvent({
      userId: user.id,
      action: "LOGIN_SUCCESS",
      resource: "/admin/dashboard",
      req,
      metadata: { role: user.role, email: user.email },
    });

    return NextResponse.json(
      {
        status: "success",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Login API Error]:", err);
    return NextResponse.json(
      { error: "Authentication system encountered an error." },
      { status: 500 }
    );
  }
}
