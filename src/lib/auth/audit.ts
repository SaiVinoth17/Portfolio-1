import crypto from "crypto";
import { db } from "../db";
import { getClientIp } from "./session";

export type AuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "LOGOUT"
  | "PASSWORD_CHANGED"
  | "PASSWORD_RESET_REQUESTED"
  | "PASSWORD_RESET_COMPLETED"
  | "SESSION_REVOKED"
  | "ALL_SESSIONS_REVOKED"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DEACTIVATED"
  | "USER_DELETED"
  | "BOOTSTRAP_INITIALIZED"
  | "PROJECT_UPDATED"
  | "MESSAGE_STATUS_CHANGED";

interface LogAuditParams {
  userId?: string | null;
  action: AuditAction;
  resource: string;
  req?: Request;
  metadata?: Record<string, unknown>;
}

export async function logAuditEvent({
  userId = null,
  action,
  resource,
  req,
  metadata = {},
}: LogAuditParams): Promise<void> {
  try {
    const ipAddress = getClientIp(req);

    // Sanitize metadata to never include sensitive fields
    const sanitizedMeta = { ...metadata };
    delete sanitizedMeta.password;
    delete sanitizedMeta.password_hash;
    delete sanitizedMeta.token;
    delete sanitizedMeta.session_token;
    delete sanitizedMeta.rawToken;

    await db.audit.log({
      id: crypto.randomUUID(),
      user_id: userId,
      action,
      resource,
      ip_address: ipAddress,
      metadata: Object.keys(sanitizedMeta).length > 0 ? JSON.stringify(sanitizedMeta) : null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Audit Log Error]:", err);
  }
}
