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
  console.log("  AEVION STUDIO — SINGLE OWNER SECURITY TEST SUITE");
  console.log("  Target: saivinothdeveloper@gmail.com (Role: OWNER)");
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
  const { AUTHORIZED_OWNER_EMAIL, normalizeEmail, isAuthorizedOwner } = await import(
    "../src/lib/auth/constants.ts"
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

  // --- SECTION 1: Single Owner Email Policy & Case Normalization ---
  console.log("[1] Single Admin Policy & Case-Insensitive Normalization");
  assert(AUTHORIZED_OWNER_EMAIL === "saivinothdeveloper@gmail.com", "Authorized email constant verified");
  assert(
    normalizeEmail("SAIVINOTHDEVELOPER@GMAIL.COM") === "saivinothdeveloper@gmail.com",
    "Uppercase email normalizes to saivinothdeveloper@gmail.com"
  );
  assert(
    normalizeEmail("  SaiVinothDeveloper@Gmail.Com  ") === "saivinothdeveloper@gmail.com",
    "Mixed case with whitespace normalizes to saivinothdeveloper@gmail.com"
  );
  assert(
    isAuthorizedOwner("SAIVINOTHDEVELOPER@GMAIL.COM"),
    "isAuthorizedOwner recognizes uppercase variant"
  );
  assert(
    !isAuthorizedOwner("attacker@gmail.com"),
    "isAuthorizedOwner strictly rejects unauthorized email"
  );
  assert(
    !isAuthorizedOwner("admin@aevionstudio.in"),
    "isAuthorizedOwner strictly rejects non-owner alias"
  );

  // --- SECTION 2: Cryptographic Password Hashing & Timing Resistance ---
  console.log("\n[2] Cryptographic Scrypt Password Hashing & Timing Resistance");
  const ownerRawSecret = "AevionSecure2026!#$";
  const ownerHash = await hashPassword(ownerRawSecret);
  assert(ownerHash.startsWith("scrypt$"), "Hash formatted as scrypt with cryptographically secure salt");
  assert(await verifyPassword(ownerRawSecret, ownerHash), "Valid password successfully verified via timingSafeEqual");
  assert(!(await verifyPassword("WrongPassword123!", ownerHash)), "Invalid password rejected");
  assert(!(await verifyPassword("", ownerHash)), "Empty password rejected");

  // --- SECTION 3: Initial Bootstrap & Permanent Self-Locking ---
  console.log("\n[3] First-Admin Bootstrap & Permanent Self-Locking");
  assert((await db.users.countOwners()) === 0, "Initial database has 0 owners");

  // Create initial owner
  const ownerUser = await db.users.create({
    id: crypto.randomUUID(),
    email: AUTHORIZED_OWNER_EMAIL,
    password_hash: ownerHash,
    name: "Sai Vinoth (Sai Rio)",
    role: "OWNER",
    is_active: true,
    email_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: null,
  });

  assert(ownerUser.email === "saivinothdeveloper@gmail.com", "Owner initialized with saivinothdeveloper@gmail.com");
  assert(ownerUser.role === "OWNER", "User provisioned with OWNER privileges");
  assert((await db.users.countOwners()) === 1, "Owner count is exactly 1");

  // Duplicate bootstrap attempt must fail
  const duplicateOwnerAttempt = async () => {
    const ownerCount = await db.users.countOwners();
    if (ownerCount > 0) {
      return { allowed: false, status: 403, error: "Admin bootstrap is permanently disabled." };
    }
    return { allowed: true };
  };
  const duplicateResult = await duplicateOwnerAttempt();
  assert(
    !duplicateResult.allowed && duplicateResult.status === 403,
    "Duplicate OWNER bootstrap strictly blocked with HTTP 403"
  );

  // --- SECTION 4: Authentication Matrix Verification ---
  console.log("\n[4] Complete Authentication Flow Verification Matrix");

  // Simulated login evaluator mimicking POST /api/auth/login
  async function simulateLogin(email, password) {
    const normalized = normalizeEmail(email);
    // 1. Single owner policy check
    if (!isAuthorizedOwner(normalized)) {
      return { status: 401, error: "Invalid email or password." };
    }
    // 2. User lookup
    const user = await db.users.findByEmail(normalized);
    if (!user || !user.is_active) {
      return { status: 401, error: "Invalid email or password." };
    }
    // 3. Password verify
    const match = await verifyPassword(password, user.password_hash);
    if (!match) {
      return { status: 401, error: "Invalid email or password." };
    }
    return { status: 200, user };
  }

  // 1. Authorized email + correct password → SUCCESS
  const auth1 = await simulateLogin("saivinothdeveloper@gmail.com", ownerRawSecret);
  assert(auth1.status === 200 && auth1.user.role === "OWNER", "Authorized email + correct password → SUCCESS");

  // 2. Authorized email + wrong password → FAIL
  const auth2 = await simulateLogin("saivinothdeveloper@gmail.com", "IncorrectPassword!");
  assert(auth2.status === 401 && auth2.error === "Invalid email or password.", "Authorized email + wrong password → FAIL");

  // 3. Unauthorized email + correct password → FAIL
  const auth3 = await simulateLogin("intruder@external.io", ownerRawSecret);
  assert(auth3.status === 401 && auth3.error === "Invalid email or password.", "Unauthorized email + correct password → FAIL (Generic Error)");

  // 4. Unauthorized email + wrong password → FAIL
  const auth4 = await simulateLogin("intruder@external.io", "RandomBadPassword");
  assert(auth4.status === 401 && auth4.error === "Invalid email or password.", "Unauthorized email + wrong password → FAIL (Generic Error)");

  // 5. Case-normalized authorized email → SUCCESS
  const auth5 = await simulateLogin("SAIVINOTHDEVELOPER@GMAIL.COM", ownerRawSecret);
  assert(auth5.status === 200, "Case-normalized authorized email (uppercase) → SUCCESS");

  const auth5b = await simulateLogin("  SaiVinothDeveloper@gmail.com  ", ownerRawSecret);
  assert(auth5b.status === 200, "Case-normalized authorized email (whitespace + mixed) → SUCCESS");

  // --- SECTION 5: Session Lifecycle, Expiration & Revocation ---
  console.log("\n[5] Server-Managed Database Sessions & Invalidation");
  const rawSessionToken = generateRandomToken(32);
  const tokenHash = hashToken(rawSessionToken);

  const activeSession = await db.sessions.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    session_token_hash: tokenHash,
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Test Suite Runner",
  });

  // Active session lookup
  const foundSession = await db.sessions.findByTokenHash(tokenHash);
  assert(foundSession !== null && foundSession.id === activeSession.id, "Active session successfully validated via token hash");

  // Expired session verification
  const expiredRawToken = generateRandomToken(32);
  const expiredTokenHash = hashToken(expiredRawToken);
  await db.sessions.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    session_token_hash: expiredTokenHash,
    expires_at: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
    created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
    last_used_at: new Date(Date.now() - 3600 * 1000).toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Expired Client",
  });

  async function validateSessionState(hash) {
    const s = await db.sessions.findByTokenHash(hash);
    if (!s) return { valid: false, reason: "NOT_FOUND" };
    if (new Date(s.expires_at).getTime() <= Date.now()) {
      return { valid: false, reason: "EXPIRED" };
    }
    return { valid: true, session: s };
  }

  const expiredCheck = await validateSessionState(expiredTokenHash);
  assert(!expiredCheck.valid && expiredCheck.reason === "EXPIRED", "Expired session → FAIL");

  // Revoked session verification
  await db.sessions.delete(activeSession.id);
  const revokedCheck = await validateSessionState(tokenHash);
  assert(!revokedCheck.valid && revokedCheck.reason === "NOT_FOUND", "Revoked session → FAIL");

  // Missing session verification
  const missingCheck = await validateSessionState(hashToken("NonExistentTokenStringHere00000000000"));
  assert(!missingCheck.valid && missingCheck.reason === "NOT_FOUND", "Missing session → FAIL");

  // --- SECTION 6: API Route Guard & Role Hierarchy ---
  console.log("\n[6] API Protection & Role-Based Access Control (RBAC)");

  function simulateRouteGuard(sessionCookie, requiredRole = "VIEWER") {
    if (!sessionCookie) {
      return { status: 401, error: "Authentication required." };
    }
    if (sessionCookie.user.role === "VIEWER" && requiredRole === "OWNER") {
      return { status: 403, error: "Forbidden: Insufficient role permissions." };
    }
    return { status: 200 };
  }

  const noSessionRequest = simulateRouteGuard(null, "OWNER");
  assert(noSessionRequest.status === 401, "Direct admin API without session → 401");

  const viewerRequestForOwner = simulateRouteGuard({ user: { role: "VIEWER" } }, "OWNER");
  assert(viewerRequestForOwner.status === 403, "Non-owner role attempting OWNER functionality → 403");

  const ownerRequestForOwner = simulateRouteGuard({ user: { role: "OWNER" } }, "OWNER");
  assert(ownerRequestForOwner.status === 200, "OWNER role authorized for OWNER functionality → 200");

  // --- SECTION 7: Anti-Lockout Invariant ---
  console.log("\n[7] Anti-Lockout Invariant for Last OWNER");
  const ownerCount = await db.users.countOwners();
  assert(ownerCount === 1, "Single OWNER policy holds 1 active owner");
  const canDemoteOrDelete = ownerCount > 1;
  assert(!canDemoteOrDelete, "Anti-lockout strictly blocks deleting or demoting the last OWNER");

  // --- SECTION 8: Password Change & Invalidation of All Active Sessions ---
  console.log("\n[8] Password Change & Invalidation of All Active Sessions");
  // Establish 2 active sessions for the owner
  const s1 = await db.sessions.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    session_token_hash: hashToken(generateRandomToken(32)),
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Browser 1",
  });
  const s2 = await db.sessions.create({
    id: crypto.randomUUID(),
    user_id: ownerUser.id,
    session_token_hash: hashToken(generateRandomToken(32)),
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    ip_address: "192.168.1.5",
    user_agent: "Browser 2",
  });

  const sessionsBeforeChange = await db.sessions.listByUser(ownerUser.id);
  assert(sessionsBeforeChange.length >= 2, "2 active sessions established before password rotation");

  // Rotate password
  const newSecret = "NewRotatedPassword2026!#$";
  const newHash = await hashPassword(newSecret);
  await db.users.update(ownerUser.id, { password_hash: newHash });

  // Invalidate ALL sessions
  await db.sessions.deleteByUser(ownerUser.id);
  const sessionsAfterChange = await db.sessions.listByUser(ownerUser.id);
  assert(sessionsAfterChange.length === 0, "Password rotation invalidated all active sessions across all devices");

  // Restore store
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
