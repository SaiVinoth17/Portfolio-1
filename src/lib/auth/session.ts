import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "../db";
import { User, Session } from "../db/types";
import { generateRandomToken, hashToken } from "./crypto";

export const SESSION_COOKIE_NAME = "aevion_session";
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Extracts the real client IP from standard reverse proxy headers.
 */
export function getClientIp(req?: Request): string | null {
  if (!req) return null;
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

/**
 * Create a server-managed session in the database and return the raw session token.
 * Only the SHA-256 hash of the token is persisted in the database.
 */
export async function createSession(
  userId: string,
  req?: Request
): Promise<{ session: Session; rawToken: string }> {
  const rawToken = generateRandomToken(32);
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000).toISOString();
  const ipAddress = getClientIp(req);
  const userAgent = req?.headers.get("user-agent") || null;

  const session: Session = {
    id: crypto.randomUUID(),
    user_id: userId,
    session_token_hash: tokenHash,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    ip_address: ipAddress ? ipAddress.slice(0, 45) : null,
    user_agent: userAgent ? userAgent.slice(0, 500) : null,
  };

  await db.sessions.create(session);

  // Set the session cookie through Next.js server cookie store
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: rawToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return { session, rawToken };
}

/**
 * Validate a raw session token against the database.
 */
export async function validateSessionToken(
  rawToken: string
): Promise<{ user: User; session: Session } | null> {
  if (!rawToken || typeof rawToken !== "string" || rawToken.length < 32) {
    return null;
  }

  const tokenHash = hashToken(rawToken);
  const session = await db.sessions.findByTokenHash(tokenHash);
  if (!session) return null;

  // Check expiration
  if (new Date(session.expires_at).getTime() <= Date.now()) {
    await db.sessions.delete(session.id);
    return null;
  }

  // Check user validity
  const user = await db.users.findById(session.user_id);
  if (!user || !user.is_active) {
    await db.sessions.delete(session.id);
    return null;
  }

  // Asynchronously update last_used_at timestamp without blocking request
  db.sessions.updateLastUsed(session.id).catch(() => {});

  return { user, session };
}

/**
 * Retrieve the current authenticated user and session from request cookies.
 */
export async function getCurrentAuth(
  req?: Request
): Promise<{ user: User; session: Session } | null> {
  let token: string | undefined;

  if (req) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${SESSION_COOKIE_NAME}=`));
    if (match) {
      token = match.substring(SESSION_COOKIE_NAME.length + 1);
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      // Cookies context might not be available in certain middleware contexts
    }
  }

  if (!token) return null;
  return validateSessionToken(token);
}

/**
 * Destroy the current session server-side and clear the cookie.
 */
export async function destroyCurrentSession(sessionId?: string): Promise<void> {
  if (sessionId) {
    await db.sessions.delete(sessionId);
  } else {
    const auth = await getCurrentAuth();
    if (auth) {
      await db.sessions.delete(auth.session.id);
    }
  }

  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // ignore
  }
}
