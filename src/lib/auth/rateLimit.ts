import { db } from "../db";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
}

/**
 * Check and record a rate limit attempt for an action key.
 */
export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const record = await db.rateLimits.get(key);
  const now = Date.now();

  if (record && record.locked_until) {
    const lockedUntil = new Date(record.locked_until).getTime();
    if (now < lockedUntil) {
      const retryAfterSeconds = Math.ceil((lockedUntil - now) / 1000);
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterSeconds,
      };
    }
  }

  const attempts = record?.attempts || 0;
  const remaining = Math.max(0, MAX_LOGIN_ATTEMPTS - attempts);

  return {
    allowed: attempts < MAX_LOGIN_ATTEMPTS,
    remainingAttempts: remaining,
  };
}

/**
 * Record a failed attempt. If threshold exceeded, enforce lockout.
 */
export async function recordFailedAttempt(key: string): Promise<RateLimitResult> {
  const existing = await db.rateLimits.get(key);
  const currentAttempts = (existing?.attempts || 0) + 1;

  let lockUntil: string | null = null;
  if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
    lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString();
  }

  const updated = await db.rateLimits.increment(key, lockUntil);

  if (updated.locked_until) {
    const retryAfterSeconds = Math.ceil(
      (new Date(updated.locked_until).getTime() - Date.now()) / 1000
    );
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.max(1, retryAfterSeconds),
    };
  }

  return {
    allowed: true,
    remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - updated.attempts),
  };
}

/**
 * Reset rate limit counter upon successful action.
 */
export async function resetRateLimit(key: string): Promise<void> {
  await db.rateLimits.reset(key);
}
