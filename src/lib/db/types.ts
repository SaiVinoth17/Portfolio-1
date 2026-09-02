export type UserRole = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface Session {
  id: string;
  user_id: string;
  session_token_hash: string;
  expires_at: string;
  created_at: string;
  last_used_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export interface PasswordReset {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
  used_at: string | null;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource: string;
  ip_address: string | null;
  metadata: string | null;
  timestamp: string;
}

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  message: string;
  status: "UNREAD" | "REVIEWED" | "ARCHIVED";
  created_at: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  metrics: string;
  image: string;
  link: string;
  github: string;
  created_at: string;
  updated_at: string;
}

export interface RateLimitRecord {
  id: string;
  key: string;
  attempts: number;
  locked_until: string | null;
  updated_at: string;
}
