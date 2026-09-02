import { NextResponse } from "next/server";
import { getCurrentAuth } from "./session";
import { hasRequiredRole } from "./rbac";
import { User, Session, UserRole } from "../db/types";

export type AuthResult =
  | { success: true; user: User; session: Session; response?: never }
  | { success: false; response: NextResponse; user?: never; session?: never };

/**
 * Server-side route guard enforcing authentication and role-based permissions.
 */
export async function requireAuth(
  req: Request,
  requiredRole: UserRole = "VIEWER"
): Promise<AuthResult> {
  const auth = await getCurrentAuth(req);

  if (!auth) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Authentication required. Session is invalid or expired." },
        { status: 401 }
      ),
    };
  }

  if (!auth.user.is_active) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Account has been suspended or deactivated." },
        { status: 403 }
      ),
    };
  }

  if (!hasRequiredRole(auth.user.role, requiredRole)) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Forbidden. Insufficient role permissions.",
          requiredRole,
          currentRole: auth.user.role,
        },
        { status: 403 }
      ),
    };
  }

  return { success: true, user: auth.user, session: auth.session };
}
