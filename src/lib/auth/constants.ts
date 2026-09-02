/**
 * Aevion Studio — Security & Authorization Constants
 * Single-Owner Production Policy
 */

export const AUTHORIZED_OWNER_EMAIL = "saivinothdeveloper@gmail.com";

/**
 * Safely normalize email addresses for consistent case-insensitive comparison.
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Validates whether an email matches the single authorized OWNER account.
 */
export function isAuthorizedOwner(email: string): boolean {
  return normalizeEmail(email) === AUTHORIZED_OWNER_EMAIL;
}
