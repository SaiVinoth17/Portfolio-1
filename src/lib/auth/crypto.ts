import crypto from "crypto";

/**
 * Modern memory-hard password hashing using Node.js standard scrypt with cryptographically secure salt.
 * Eliminates native compilation vulnerabilities on Vercel serverless while providing state-of-the-art resistance.
 */

const SCRYPT_PARAMS = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 32 * 1024 * 1024,
  keylen: 64,
};

/**
 * Hash a plaintext password with a unique 16-byte cryptographically secure salt.
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(
      password,
      salt,
      SCRYPT_PARAMS.keylen,
      { N: SCRYPT_PARAMS.N, r: SCRYPT_PARAMS.r, p: SCRYPT_PARAMS.p, maxmem: SCRYPT_PARAMS.maxmem },
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(`scrypt$${salt}$${derivedKey.toString("hex")}`);
      }
    );
  });
}

/**
 * Verify a plaintext password against a stored scrypt hash in constant time.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const parts = storedHash.split("$");
      if (parts.length !== 3 || parts[0] !== "scrypt") {
        return resolve(false);
      }

      const salt = parts[1];
      const originalKey = Buffer.from(parts[2], "hex");

      crypto.scrypt(
        password,
        salt,
        originalKey.length,
        { N: SCRYPT_PARAMS.N, r: SCRYPT_PARAMS.r, p: SCRYPT_PARAMS.p, maxmem: SCRYPT_PARAMS.maxmem },
        (err, derivedKey) => {
          if (err) return resolve(false);
          // Constant-time comparison to prevent timing attacks
          if (derivedKey.length !== originalKey.length) return resolve(false);
          const match = crypto.timingSafeEqual(derivedKey, originalKey);
          resolve(match);
        }
      );
    } catch {
      resolve(false);
    }
  });
}

/**
 * Generate a cryptographically random token with high entropy (default 256 bits).
 */
export function generateRandomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Compute the SHA-256 hash of a sensitive token (such as a session or reset token)
 * before persisting to the database.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
