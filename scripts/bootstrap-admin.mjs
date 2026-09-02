import readline from "readline";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const AUTHORIZED_OWNER_EMAIL = "saivinothdeveloper@gmail.com";

// Support both .env and .env.local
const envLocalPath = path.join(process.cwd(), ".env.local");
const envPath = path.join(process.cwd(), ".env");

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = (match[2] || "").trim().replace(/^['"]|['"]$/g, "");
      }
    }
  }
}

loadEnvFile(envLocalPath);
loadEnvFile(envPath);

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(
      password,
      salt,
      64,
      { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 },
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(`scrypt$${salt}$${derivedKey.toString("hex")}`);
      }
    );
  });
}

const LOCAL_DATA_DIR = path.join(process.cwd(), ".data");
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, "aevion_store.json");

function getStore() {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DATA_FILE)) {
    return {
      users: [],
      sessions: [],
      password_resets: [],
      audit_logs: [],
      rate_limits: [],
      messages: [],
      projects: [],
    };
  }
  return JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, "utf-8"));
}

function saveStore(store) {
  fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

async function main() {
  console.log("\n==================================================");
  console.log("  AEVION STUDIO — OWNER INITIALIZATION WIZARD");
  console.log("  Single Admin Policy: saivinothdeveloper@gmail.com");
  console.log("==================================================\n");

  const args = process.argv.slice(2);
  let passwordArg;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--password" && args[i + 1]) passwordArg = args[i + 1];
  }

  // 1. Check if owner already exists
  const store = getStore();
  const existingOwner = store.users.find((u) => u.role === "OWNER" && u.is_active);

  if (existingOwner) {
    console.error(
      "❌ BOOTSTRAP ABORTED: An active OWNER account already exists (" +
        existingOwner.email +
        ")."
    );
    console.error("   The bootstrap mechanism is permanently locked.");
    process.exit(1);
  }

  let password = passwordArg;

  if (!password) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

    console.log(`Authorized Administrator Email: ${AUTHORIZED_OWNER_EMAIL}`);
    console.log("Role                         : OWNER\n");

    password = await ask("Enter Strong Password for OWNER (min 10 characters): ");
    rl.close();
  }

  password = (password || "").trim();

  if (password.length < 10) {
    console.error("❌ Password must be at least 10 characters long.");
    process.exit(1);
  }

  console.log("\n🔐 Computing cryptographic memory-hard scrypt hash...");
  const hashedPassword = await hashPassword(password);

  const newOwner = {
    id: crypto.randomUUID(),
    email: AUTHORIZED_OWNER_EMAIL,
    password_hash: hashedPassword,
    name: "Sai Vinoth (Sai Rio)",
    role: "OWNER",
    is_active: true,
    email_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: null,
  };

  store.users.push(newOwner);
  store.audit_logs.unshift({
    id: crypto.randomUUID(),
    user_id: newOwner.id,
    action: "BOOTSTRAP_INITIALIZED",
    resource: "users",
    ip_address: "127.0.0.1",
    metadata: JSON.stringify({ email: newOwner.email, role: "OWNER" }),
    timestamp: new Date().toISOString(),
  });

  saveStore(store);

  console.log("\n✅ OWNER account created successfully!");
  console.log(`   User ID : ${newOwner.id}`);
  console.log(`   Email   : ${newOwner.email}`);
  console.log(`   Role    : ${newOwner.role}`);
  console.log("\n🚀 Bootstrap mechanism has now permanently locked.");
  console.log("   Sign in at: http://localhost:3000/admin/login\n");
}

main().catch((err) => {
  console.error("Bootstrap error:", err);
  process.exit(1);
});
