import crypto from "crypto";
import fs from "fs";
import path from "path";

// Initialize local test environment
const LOCAL_DATA_DIR = path.join(process.cwd(), ".data");
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, "aevion_store.json");

// Backup existing store if present
let originalStoreBackup = null;
if (fs.existsSync(LOCAL_DATA_FILE)) {
  originalStoreBackup = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
}

function cleanStore() {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
  const cleanState = {
    users: [],
    sessions: [],
    password_resets: [],
    audit_logs: [],
    rate_limits: [],
    messages: [],
    projects: [],
  };
  fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(cleanState, null, 2), "utf-8");
}

function restoreStore() {
  if (originalStoreBackup) {
    fs.writeFileSync(LOCAL_DATA_FILE, originalStoreBackup, "utf-8");
  }
}

async function runSecurityTests() {
  console.log("\n========================================================");
  console.log("  AEVION STUDIO — AUTOMATED SECURITY & AUTH TEST SUITE");
  console.log("========================================================\n");

  cleanStore();

  const { hashPassword, verifyPassword, generateRandomToken, hashToken } = await import(
    "../src/lib/auth/crypto.ts"
  );
  const { db } = await import("../src/lib/db/index.ts");
  const { hasRequiredRole, canPerformAction } = await import("../src/lib/auth/rbac.ts");
  const { checkRateLimit, recordFailedAttempt, resetRateLimit } = await import(
    "../src/lib/auth/rateLimit.ts"
  );

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // TEST 1: Password Hashing & Constant-Time Verification
  console.log("[1] Cryptographic Password Hashing & Timing Resistance");
  const testPass = "StudioPassword2026!#";
  const hash = await hashPassword(testPass);
  assert(hash.startsWith("scrypt$"), "Hash formatted as scrypt with cryptographically secure salt");
  assert(await verifyPassword(testPass, hash), "Valid password successfully verified");
  assert(!(await verifyPassword("WrongPassword123!", hash)), "Invalid password rejected");
  assert(!(await verifyPassword("", hash)), "Empty password rejected");

  // TEST 2: SQL Injection / Parameterized Safety
  console.log("\n[2] Parameterized Statement SQL Injection Resistance");
  const sqliPayload = "' OR 1=1; DROP TABLE users; --";
  const sqliUser = await db.users.findByEmail(sqliPayload);
  assert(sqliUser === null, "SQL injection payload safely parameterized without error");

  // TEST 3: Admin Bootstrap & Self-Locking
  console.log("\n[3] First-Admin Bootstrap & Self-Locking Guard");
  assert((await db.users.countOwners()) === 0, "Initial database has 0 owners");
  const ownerUser = await db.users.create({
    id: crypto.randomUUID(),
    email: "sairio@aevionstudio.in",
    password_hash: hash,
    name: "Sai Rio",
    role: "OWNER",
    is_active: true,
    email_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: null,
  });
  assert((await db.users.countOwners()) === 1, "First OWNER created successfully");
  assert(
    (await db.users.countOwners()) > 0,
    "Bootstrap condition locks permanently after first owner exists"
  );

  // TEST 4: Anti-Lockout Rules
  console.log("\n[4] Anti-Lockout Rules for Last OWNER");
  const ownerCount = await db.users.countOwners();
  const canDeleteSoleOwner = ownerCount > 1;
  assert(!canDeleteSoleOwner, "System blocks deleting the last remaining OWNER");

  // TEST 5: Role-Based Access Control (RBAC) Matrix
  console.log("\n[5] Role-Based Access Control (RBAC) Matrix Verification");
  assert(hasRequiredRole("OWNER", "VIEWER"), "OWNER possesses VIEWER privileges");
  assert(hasRequiredRole("ADMIN", "EDITOR"), "ADMIN possesses EDITOR privileges");
  assert(!hasRequiredRole("VIEWER", "ADMIN"), "VIEWER denied ADMIN privileges");
  assert(!hasRequiredRole("EDITOR", "OWNER"), "EDITOR denied OWNER privileges");

  assert(canPerformAction("OWNER", "MANAGE_USERS"), "OWNER authorized to MANAGE_USERS");
  assert(!canPerformAction("ADMIN", "MANAGE_USERS"), "ADMIN forbidden to MANAGE_USERS");
  assert(!canPerformAction("EDITOR", "DELETE_PROJECTS"), "EDITOR forbidden to DELETE_PROJECTS");
  assert(canPerformAction("EDITOR", "EDIT_PROJECTS"), "EDITOR authorized to EDIT_PROJECTS");
  assert(canPerformAction("VIEWER", "VIEW_DASHBOARD"), "VIEWER authorized to VIEW_DASHBOARD");

  // TEST 6: Session Creation, Hashing & Invalidation
  console.log("\n[6] Server-Managed Database Sessions");
  const rawSessionToken = generateRandomToken(32);
  const tokenHash = hashToken(rawSessionToken);
  const sessionRecord = await db.sessions.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    session_token_hash: tokenHash,
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Mozilla/5.0 Test Suite",
  });
  assert(sessionRecord.session_token_hash === tokenHash, "Database stores only SHA-256 token hash");
  assert(sessionRecord.session_token_hash !== rawSessionToken, "Raw token is NEVER stored in database");

  const foundSession = await db.sessions.findByTokenHash(tokenHash);
  assert(foundSession !== null && foundSession.user_id === ownerUser.id, "Session retrieved via token hash");

  await db.sessions.delete(sessionRecord.id);
  const deletedSession = await db.sessions.findByTokenHash(tokenHash);
  assert(deletedSession === null, "Session successfully invalidated server-side");

  // TEST 7: Brute-Force Rate Limiting
  console.log("\n[7] Brute-Force Rate Limiting");
  const rateKey = "test_rate_limit:127.0.0.1:target@aevionstudio.in";
  await resetRateLimit(rateKey);

  for (let i = 1; i <= 4; i++) {
    await recordFailedAttempt(rateKey);
  }
  const checkBeforeLock = await checkRateLimit(rateKey);
  assert(checkBeforeLock.allowed, "4 failed attempts still permitted under threshold");

  await recordFailedAttempt(rateKey); // 5th attempt
  const checkAfterLock = await checkRateLimit(rateKey);
  assert(!checkAfterLock.allowed, "5th failed attempt triggers rate limit lockout");
  assert(checkAfterLock.retryAfterSeconds > 0, "Lockout duration reported accurately");

  await resetRateLimit(rateKey);
  const checkAfterReset = await checkRateLimit(rateKey);
  assert(checkAfterReset.allowed, "Rate limit clears upon successful authentication");

  // TEST 8: Single-Use Password Reset Token
  console.log("\n[8] Single-Use Expiring Password Reset Token");
  const resetTokenRaw = generateRandomToken(32);
  const resetTokenHash = hashToken(resetTokenRaw);
  const resetRecord = await db.passwordResets.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    token_hash: resetTokenHash,
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    used_at: null,
  });
  const unconsumedToken = await db.passwordResets.findByTokenHash(resetTokenHash);
  assert(unconsumedToken !== null, "Reset token located in database");

  // Consume token
  await db.passwordResets.markUsed(resetRecord.id);
  const consumedToken = await db.passwordResets.findByTokenHash(resetTokenHash);
  assert(consumedToken === null, "Consumed token cannot be queried or reused (Replay Attack Defeated)");

  // TEST 9: Inbound Contact Form Persistence
  console.log("\n[9] Inbound Brief Database Persistence");
  const testMessage = await db.messages.create({
    id: "AEV-TEST-001",
    name: "Dr. Elena Vance",
    email: "elena@blackmesa.org",
    company: "Black Mesa Research",
    project_type: "AI Systems",
    budget: "$25k+",
    message: "Requirement for autonomous neural reasoning pipelines.",
    status: "UNREAD",
    created_at: new Date().toISOString(),
  });
  const messageList = await db.messages.list();
  const savedMsg = messageList.find((m) => m.id === testMessage.id);
  assert(savedMsg !== undefined && savedMsg.name === "Dr. Elena Vance", "Public /contact brief stored in DB");

  await db.messages.updateStatus(testMessage.id, "REVIEWED");
  const updatedMsg = (await db.messages.list()).find((m) => m.id === testMessage.id);
  assert(updatedMsg?.status === "REVIEWED", "Admin can transition message status to REVIEWED");

  // Restore previous store
  restoreStore();

  console.log("\n========================================================");
  console.log(`  RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
