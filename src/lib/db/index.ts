import fs from "fs";
import path from "path";
import { Pool } from "pg";
import {
  User,
  Session,
  PasswordReset,
  AuditLog,
  MessageRecord,
  ProjectRecord,
  RateLimitRecord,
} from "./types";

let pgPool: Pool | null = null;

function getPgPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pgPool;
}

// Local File Store fallback for development when DATABASE_URL is not configured
const LOCAL_DATA_DIR = path.join(process.cwd(), ".data");
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, "aevion_store.json");

interface DataStore {
  users: User[];
  sessions: Session[];
  password_resets: PasswordReset[];
  audit_logs: AuditLog[];
  rate_limits: RateLimitRecord[];
  messages: MessageRecord[];
  projects: ProjectRecord[];
}

const DEFAULT_STORE: DataStore = {
  users: [],
  sessions: [],
  password_resets: [],
  audit_logs: [],
  rate_limits: [],
  messages: [],
  projects: [
    {
      id: "p1",
      slug: "nilgiris-explorers",
      title: "Nilgiris Explorers",
      subtitle: "Premium Tourism & Experience Discovery Platform",
      category: "Web Application • Travel Engine",
      status: "PUBLISHED",
      metrics: "Production Active • Fluid 60+ FPS Motion",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      link: "https://nilgirisexplorers.com",
      github: "https://github.com/aevionstudio",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "p2",
      slug: "ooty-mistwings",
      title: "Ooty Mistwings",
      subtitle: "Sensory Hotel & Villa Reservation Engine",
      category: "Hospitality Architecture • Motion Experience",
      status: "PUBLISHED",
      metrics: "GPU Composited Motion • Zero Layout Shift",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
      link: "https://ootymistwings.com",
      github: "https://github.com/aevionstudio",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "p3",
      slug: "gaming-kingdom",
      title: "Gaming Kingdom",
      subtitle: "High-Performance Interactive Gaming Community Hub",
      category: "Frontend Architecture • Community Hub",
      status: "PUBLISHED",
      metrics: "Fluid Interactive Feedback • Client Filtering",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      link: "/projects/gaming-kingdom",
      github: "https://github.com/aevionstudio",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "p4",
      slug: "aevion-studio-os",
      title: "Aevion Studio Motion OS v2.0",
      subtitle: "Interactive Web Operating System & 3D Lab",
      category: "Flagship Portfolio • AI & Motion Engine",
      status: "PUBLISHED",
      metrics: "Interactive Motion OS • Strict Type Safety",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
      link: "https://aevionstudio.in",
      github: "https://github.com/aevionstudio",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

function readLocalStore(): DataStore {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(DEFAULT_STORE, null, 2), "utf-8");
      return DEFAULT_STORE;
    }
    const content = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
    return JSON.parse(content) as DataStore;
  } catch {
    return DEFAULT_STORE;
  }
}

function writeLocalStore(store: DataStore): void {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("[Local DB write error]:", err);
  }
}

// Ensure database tables exist if PostgreSQL is connected
let pgSchemaInitialized = false;
async function ensurePgSchema(pool: Pool) {
  if (pgSchemaInitialized) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
        session_token_hash VARCHAR(64) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent VARCHAR(512)
      );

      CREATE TABLE IF NOT EXISTS password_resets (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(64) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        used_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36),
        action VARCHAR(64) NOT NULL,
        resource VARCHAR(128) NOT NULL,
        ip_address VARCHAR(45),
        metadata TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS rate_limits (
        id VARCHAR(36) PRIMARY KEY,
        key VARCHAR(128) UNIQUE NOT NULL,
        attempts INTEGER DEFAULT 1,
        locked_until TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(128),
        project_type VARCHAR(64) NOT NULL,
        budget VARCHAR(64),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'UNREAD',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(150) NOT NULL,
        subtitle VARCHAR(255),
        category VARCHAR(100) NOT NULL,
        status VARCHAR(20) DEFAULT 'PUBLISHED',
        metrics VARCHAR(150),
        image VARCHAR(512),
        link VARCHAR(512),
        github VARCHAR(512),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    pgSchemaInitialized = true;
  } finally {
    client.release();
  }
}

/**
 * Unified Database Client exposing safe, parameterized operations.
 */
export const db = {
  // USER OPERATIONS
  users: {
    async findByEmail(email: string): Promise<User | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<User>(
          "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
          [email.trim()]
        );
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      const user = store.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      return user || null;
    },

    async findById(id: string): Promise<User | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<User>("SELECT * FROM users WHERE id = $1 LIMIT 1", [id]);
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      return store.users.find((u) => u.id === id) || null;
    },

    async countOwners(): Promise<number> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<{ count: string }>(
          "SELECT COUNT(*) as count FROM users WHERE role = 'OWNER' AND is_active = true"
        );
        return parseInt(res.rows[0]?.count || "0", 10);
      }
      const store = readLocalStore();
      return store.users.filter((u) => u.role === "OWNER" && u.is_active).length;
    },

    async list(): Promise<Omit<User, "password_hash">[]> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<User>(
          "SELECT id, email, name, role, is_active, email_verified, created_at, updated_at, last_login_at FROM users ORDER BY created_at ASC"
        );
        return res.rows;
      }
      const store = readLocalStore();
      return store.users.map(({ password_hash, ...rest }) => rest);
    },

    async create(user: User): Promise<User> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query(
          `INSERT INTO users (id, email, password_hash, name, role, is_active, email_verified, created_at, updated_at, last_login_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            user.id,
            user.email.toLowerCase().trim(),
            user.password_hash,
            user.name,
            user.role,
            user.is_active,
            user.email_verified,
            user.created_at,
            user.updated_at,
            user.last_login_at,
          ]
        );
        return user;
      }
      const store = readLocalStore();
      store.users.push(user);
      writeLocalStore(store);
      return user;
    },

    async update(id: string, updates: Partial<User>): Promise<User | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const currentUser = await this.findById(id);
        if (!currentUser) return null;

        const updated = { ...currentUser, ...updates, updated_at: new Date().toISOString() };
        await pool.query(
          `UPDATE users SET
            email = $1, name = $2, role = $3, is_active = $4, email_verified = $5,
            password_hash = $6, last_login_at = $7, updated_at = $8
           WHERE id = $9`,
          [
            updated.email,
            updated.name,
            updated.role,
            updated.is_active,
            updated.email_verified,
            updated.password_hash,
            updated.last_login_at,
            updated.updated_at,
            id,
          ]
        );
        return updated;
      }
      const store = readLocalStore();
      const index = store.users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      store.users[index] = {
        ...store.users[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      writeLocalStore(store);
      return store.users[index];
    },

    async delete(id: string): Promise<boolean> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        return (res.rowCount ?? 0) > 0;
      }
      const store = readLocalStore();
      const initialLen = store.users.length;
      store.users = store.users.filter((u) => u.id !== id);
      store.sessions = store.sessions.filter((s) => s.user_id !== id);
      writeLocalStore(store);
      return store.users.length < initialLen;
    },
  },

  // SESSION OPERATIONS
  sessions: {
    async findByTokenHash(tokenHash: string): Promise<Session | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<Session>(
          "SELECT * FROM sessions WHERE session_token_hash = $1 LIMIT 1",
          [tokenHash]
        );
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      return store.sessions.find((s) => s.session_token_hash === tokenHash) || null;
    },

    async create(session: Session): Promise<Session> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query(
          `INSERT INTO sessions (id, user_id, session_token_hash, expires_at, created_at, last_used_at, ip_address, user_agent)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            session.id,
            session.user_id,
            session.session_token_hash,
            session.expires_at,
            session.created_at,
            session.last_used_at,
            session.ip_address,
            session.user_agent,
          ]
        );
        return session;
      }
      const store = readLocalStore();
      store.sessions.push(session);
      writeLocalStore(store);
      return session;
    },

    async updateLastUsed(sessionId: string): Promise<void> {
      const pool = getPgPool();
      const now = new Date().toISOString();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query("UPDATE sessions SET last_used_at = $1 WHERE id = $2", [now, sessionId]);
        return;
      }
      const store = readLocalStore();
      const s = store.sessions.find((sess) => sess.id === sessionId);
      if (s) {
        s.last_used_at = now;
        writeLocalStore(store);
      }
    },

    async listByUser(userId: string): Promise<Session[]> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<Session>(
          "SELECT * FROM sessions WHERE user_id = $1 ORDER BY last_used_at DESC",
          [userId]
        );
        return res.rows;
      }
      const store = readLocalStore();
      return store.sessions
        .filter((s) => s.user_id === userId)
        .sort((a, b) => new Date(b.last_used_at).getTime() - new Date(a.last_used_at).getTime());
    },

    async delete(sessionId: string): Promise<void> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query("DELETE FROM sessions WHERE id = $1", [sessionId]);
        return;
      }
      const store = readLocalStore();
      store.sessions = store.sessions.filter((s) => s.id !== sessionId);
      writeLocalStore(store);
    },

    async deleteByUser(userId: string, exceptSessionId?: string): Promise<void> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        if (exceptSessionId) {
          await pool.query("DELETE FROM sessions WHERE user_id = $1 AND id != $2", [
            userId,
            exceptSessionId,
          ]);
        } else {
          await pool.query("DELETE FROM sessions WHERE user_id = $1", [userId]);
        }
        return;
      }
      const store = readLocalStore();
      store.sessions = store.sessions.filter((s) => {
        if (s.user_id !== userId) return true;
        if (exceptSessionId && s.id === exceptSessionId) return true;
        return false;
      });
      writeLocalStore(store);
    },
  },

  // PASSWORD RESET OPERATIONS
  passwordResets: {
    async create(reset: PasswordReset): Promise<PasswordReset> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query(
          `INSERT INTO password_resets (id, user_id, token_hash, expires_at, created_at, used_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            reset.id,
            reset.user_id,
            reset.token_hash,
            reset.expires_at,
            reset.created_at,
            reset.used_at,
          ]
        );
        return reset;
      }
      const store = readLocalStore();
      store.password_resets.push(reset);
      writeLocalStore(store);
      return reset;
    },

    async findByTokenHash(tokenHash: string): Promise<PasswordReset | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<PasswordReset>(
          "SELECT * FROM password_resets WHERE token_hash = $1 AND used_at IS NULL LIMIT 1",
          [tokenHash]
        );
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      return (
        store.password_resets.find((r) => r.token_hash === tokenHash && r.used_at === null) || null
      );
    },

    async markUsed(id: string): Promise<void> {
      const pool = getPgPool();
      const now = new Date().toISOString();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query("UPDATE password_resets SET used_at = $1 WHERE id = $2", [now, id]);
        return;
      }
      const store = readLocalStore();
      const r = store.password_resets.find((item) => item.id === id);
      if (r) {
        r.used_at = now;
        writeLocalStore(store);
      }
    },
  },

  // AUDIT LOGS
  audit: {
    async log(entry: AuditLog): Promise<void> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query(
          `INSERT INTO audit_logs (id, user_id, action, resource, ip_address, metadata, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            entry.id,
            entry.user_id,
            entry.action,
            entry.resource,
            entry.ip_address,
            entry.metadata,
            entry.timestamp,
          ]
        );
        return;
      }
      const store = readLocalStore();
      store.audit_logs.unshift(entry);
      if (store.audit_logs.length > 500) {
        store.audit_logs = store.audit_logs.slice(0, 500);
      }
      writeLocalStore(store);
    },

    async list(limit = 50): Promise<AuditLog[]> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<AuditLog>(
          "SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT $1",
          [limit]
        );
        return res.rows;
      }
      const store = readLocalStore();
      return store.audit_logs.slice(0, limit);
    },
  },

  // RATE LIMITING
  rateLimits: {
    async get(key: string): Promise<RateLimitRecord | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<RateLimitRecord>(
          "SELECT * FROM rate_limits WHERE key = $1 LIMIT 1",
          [key]
        );
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      return store.rate_limits.find((r) => r.key === key) || null;
    },

    async increment(key: string, lockUntil: string | null = null): Promise<RateLimitRecord> {
      const pool = getPgPool();
      const now = new Date().toISOString();
      const existing = await this.get(key);

      if (pool) {
        await ensurePgSchema(pool);
        if (existing) {
          const res = await pool.query<RateLimitRecord>(
            `UPDATE rate_limits SET
              attempts = attempts + 1,
              locked_until = COALESCE($1, locked_until),
              updated_at = $2
             WHERE key = $3 RETURNING *`,
            [lockUntil, now, key]
          );
          return res.rows[0];
        } else {
          const res = await pool.query<RateLimitRecord>(
            `INSERT INTO rate_limits (id, key, attempts, locked_until, updated_at)
             VALUES ($1, $2, 1, $3, $4) RETURNING *`,
            [crypto.randomUUID(), key, lockUntil, now]
          );
          return res.rows[0];
        }
      }

      const store = readLocalStore();
      const idx = store.rate_limits.findIndex((r) => r.key === key);
      if (idx !== -1) {
        store.rate_limits[idx].attempts += 1;
        if (lockUntil) store.rate_limits[idx].locked_until = lockUntil;
        store.rate_limits[idx].updated_at = now;
        writeLocalStore(store);
        return store.rate_limits[idx];
      } else {
        const record: RateLimitRecord = {
          id: crypto.randomUUID(),
          key,
          attempts: 1,
          locked_until: lockUntil,
          updated_at: now,
        };
        store.rate_limits.push(record);
        writeLocalStore(store);
        return record;
      }
    },

    async reset(key: string): Promise<void> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query("DELETE FROM rate_limits WHERE key = $1", [key]);
        return;
      }
      const store = readLocalStore();
      store.rate_limits = store.rate_limits.filter((r) => r.key !== key);
      writeLocalStore(store);
    },
  },

  // CONTACT MESSAGES
  messages: {
    async create(msg: MessageRecord): Promise<MessageRecord> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        await pool.query(
          `INSERT INTO messages (id, name, email, company, project_type, budget, message, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            msg.id,
            msg.name,
            msg.email,
            msg.company,
            msg.project_type,
            msg.budget,
            msg.message,
            msg.status,
            msg.created_at,
          ]
        );
        return msg;
      }
      const store = readLocalStore();
      store.messages.unshift(msg);
      writeLocalStore(store);
      return msg;
    },

    async list(limit = 100): Promise<MessageRecord[]> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<MessageRecord>(
          "SELECT * FROM messages ORDER BY created_at DESC LIMIT $1",
          [limit]
        );
        return res.rows;
      }
      const store = readLocalStore();
      return store.messages.slice(0, limit);
    },

    async updateStatus(id: string, status: "UNREAD" | "REVIEWED" | "ARCHIVED"): Promise<boolean> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query("UPDATE messages SET status = $1 WHERE id = $2", [status, id]);
        return (res.rowCount ?? 0) > 0;
      }
      const store = readLocalStore();
      const m = store.messages.find((msg) => msg.id === id);
      if (m) {
        m.status = status;
        writeLocalStore(store);
        return true;
      }
      return false;
    },
  },

  // PROJECTS
  projects: {
    async list(): Promise<ProjectRecord[]> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<ProjectRecord>(
          "SELECT * FROM projects ORDER BY created_at ASC"
        );
        return res.rows;
      }
      const store = readLocalStore();
      return store.projects;
    },

    async findById(id: string): Promise<ProjectRecord | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const res = await pool.query<ProjectRecord>("SELECT * FROM projects WHERE id = $1 LIMIT 1", [id]);
        return res.rows[0] || null;
      }
      const store = readLocalStore();
      return store.projects.find((p) => p.id === id) || null;
    },

    async update(id: string, updates: Partial<ProjectRecord>): Promise<ProjectRecord | null> {
      const pool = getPgPool();
      if (pool) {
        await ensurePgSchema(pool);
        const current = await this.findById(id);
        if (!current) return null;
        const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
        await pool.query(
          `UPDATE projects SET title = $1, subtitle = $2, category = $3, status = $4, metrics = $5, image = $6, link = $7, github = $8, updated_at = $9 WHERE id = $10`,
          [
            updated.title,
            updated.subtitle,
            updated.category,
            updated.status,
            updated.metrics,
            updated.image,
            updated.link,
            updated.github,
            updated.updated_at,
            id,
          ]
        );
        return updated;
      }
      const store = readLocalStore();
      const idx = store.projects.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      store.projects[idx] = {
        ...store.projects[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      writeLocalStore(store);
      return store.projects[idx];
    },
  },
};
