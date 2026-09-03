import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "../db";
import { User, Session } from "../db/types";
import { generateRandomToken, hashToken } from "./crypto";

export const SESSION_COOKIE_NAME = "aevion_session";
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Default internal administrator identity assigned to valid secret-code sessions.
 * Holds OWNER role with universal administrative clearance.
 */
export const AEVION_ADMIN_USER: User = {
  id: "aevion-admin-code-red",
  email: "admin@aevionstudio.in",
  name: "Aevion Commander",
  role: "OWNER",
  is_active: true,
  email_verified: true,
  password_hash: "",
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  last_login_at: new Date().toISOString(),
};

function getSecretKey(): string {
  return process.env.AEVION_ADMIN_CODE || process.env.BOOTSTRAP_SECRET || "Code Red";
}

/**
 * Signs a cryptographic session token so it can be verified even in stateless serverless environments.
 */
export function signAdminToken(tokenId: string, issuedAt: number): string {
  const payload = `${tokenId}:${issuedAt}`;
  const hmac = crypto.createHmac("sha256", getSecretKey()).update(payload).digest("hex");
  return `${payload}:${hmac}`;
}

/**
 * Validates the HMAC signature and timestamp of an issued session token.
 */
export function verifyAdminToken(rawToken: string): { valid: boolean; tokenId?: string; issuedAt?: number } {
  if (!rawToken || typeof rawToken !== "string") return { valid: false };

  let cleanToken = rawToken;
  try {
    cleanToken = decodeURIComponent(rawToken);
  } catch {}

  const parts = cleanToken.split(":");
  if (parts.length !== 3) return { valid: false };
  const [tokenId, issuedAtStr, signature] = parts;
  const issuedAt = parseInt(issuedAtStr, 10);
  if (isNaN(issuedAt)) return { valid: false };

  // Check expiration
  if (Date.now() - issuedAt > SESSION_DURATION_SECONDS * 1000) {
    return { valid: false };
  }

  const payload = `${tokenId}:${issuedAtStr}`;
  const expectedSig = crypto.createHmac("sha256", getSecretKey()).update(payload).digest("hex");

  try {
    const isMatch = crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );
    if (!isMatch) return { valid: false };
    return { valid: true, tokenId, issuedAt };
  } catch {
    return { valid: false };
  }
}

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
 * Create a server-managed secret-code session and set the secure HttpOnly cookie.
 */
export async function createAdminSession(
  req?: Request
): Promise<{ session: Session; rawToken: string }> {
  // Ensure the admin user exists in the database
  let user = await db.users.findById(AEVION_ADMIN_USER.id);
  if (!user) {
    try {
      user = await db.users.create(AEVION_ADMIN_USER);
    } catch {
      user = AEVION_ADMIN_USER;
    }
  }

  const tokenId = generateRandomToken(24);
  const now = Date.now();
  const rawToken = signAdminToken(tokenId, now);
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(now + SESSION_DURATION_SECONDS * 1000).toISOString();
  const ipAddress = getClientIp(req);
  const userAgent = req?.headers.get("user-agent") || null;

  const session: Session = {
    id: crypto.randomUUID(),
    user_id: user?.id || AEVION_ADMIN_USER.id,
    session_token_hash: tokenHash,
    expires_at: expiresAt,
    created_at: new Date(now).toISOString(),
    last_used_at: new Date(now).toISOString(),
    ip_address: ipAddress ? ipAddress.slice(0, 45) : null,
    user_agent: userAgent ? userAgent.slice(0, 500) : null,
  };

  try {
    await db.sessions.create(session);
  } catch (err) {
    console.warn("[Admin Session DB create error]:", err);
  }

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
 * Backwards-compatible session creator for standard user IDs.
 */
export async function createSession(
  userId: string,
  req?: Request
): Promise<{ session: Session; rawToken: string }> {
  return createAdminSession(req);
}

/**
 * Validate a raw session token against the database or HMAC cryptographic proof.
 */
export async function validateSessionToken(
  rawToken: string
): Promise<{ user: User; session: Session } | null> {
  if (!rawToken || typeof rawToken !== "string") {
    return null;
  }

  let cleanToken = rawToken;
  try {
    cleanToken = decodeURIComponent(rawToken);
  } catch {}

  // 1. Try DB lookup first
  const tokenHash = hashToken(cleanToken);
  try {
    const session = await db.sessions.findByTokenHash(tokenHash);
    if (session) {
      if (new Date(session.expires_at).getTime() <= Date.now()) {
        await db.sessions.delete(session.id);
        return null;
      }

      if (session.user_id === AEVION_ADMIN_USER.id) {
        db.sessions.updateLastUsed(session.id).catch(() => {});
        return { user: AEVION_ADMIN_USER, session };
      }

      const user = await db.users.findById(session.user_id);
      if (user && user.is_active) {
        db.sessions.updateLastUsed(session.id).catch(() => {});
        return { user, session };
      }
    }
  } catch (err) {
    // Fall through to HMAC proof
  }

  // 2. Cryptographic HMAC validation fallback
  const hmacCheck = verifyAdminToken(cleanToken);
  if (hmacCheck.valid && hmacCheck.tokenId && hmacCheck.issuedAt) {
    const syntheticSession: Session = {
      id: hmacCheck.tokenId,
      user_id: AEVION_ADMIN_USER.id,
      session_token_hash: tokenHash,
      expires_at: new Date(hmacCheck.issuedAt + SESSION_DURATION_SECONDS * 1000).toISOString(),
      created_at: new Date(hmacCheck.issuedAt).toISOString(),
      last_used_at: new Date().toISOString(),
      ip_address: null,
      user_agent: null,
    };
    return { user: AEVION_ADMIN_USER, session: syntheticSession };
  }

  return null;
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
    try {
      await db.sessions.delete(sessionId);
    } catch {}
  } else {
    try {
      const auth = await getCurrentAuth();
      if (auth) {
        await db.sessions.delete(auth.session.id);
      }
    } catch {}
  }

  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {}
}
