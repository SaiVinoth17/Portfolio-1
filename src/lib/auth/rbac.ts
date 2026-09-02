import { UserRole } from "../db/types";

const ROLE_RANK: Record<UserRole, number> = {
  OWNER: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

/**
 * Checks if a user's role satisfies the required role tier.
 */
export function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_RANK[userRole] || 0) >= (ROLE_RANK[requiredRole] || 0);
}

/**
 * Granular permission check for administrative actions.
 */
export function canPerformAction(
  userRole: UserRole,
  action:
    | "VIEW_DASHBOARD"
    | "VIEW_MESSAGES"
    | "UPDATE_MESSAGES"
    | "VIEW_PROJECTS"
    | "EDIT_PROJECTS"
    | "DELETE_PROJECTS"
    | "MANAGE_USERS"
    | "MANAGE_SECURITY"
    | "VIEW_AUDIT_LOGS"
): boolean {
  switch (action) {
    case "VIEW_DASHBOARD":
    case "VIEW_MESSAGES":
    case "VIEW_PROJECTS":
      return hasRequiredRole(userRole, "VIEWER");

    case "EDIT_PROJECTS":
      return hasRequiredRole(userRole, "EDITOR");

    case "UPDATE_MESSAGES":
    case "DELETE_PROJECTS":
    case "VIEW_AUDIT_LOGS":
      return hasRequiredRole(userRole, "ADMIN");

    case "MANAGE_USERS":
    case "MANAGE_SECURITY":
      return userRole === "OWNER";

    default:
      return false;
  }
}
