import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/crypto";
import { logAuditEvent } from "@/lib/auth/audit";
import { AUTHORIZED_OWNER_EMAIL, normalizeEmail, isAuthorizedOwner } from "@/lib/auth/constants";

export async function POST(req: Request) {
  try {
    // 1. Strict Self-Locking: Check if ANY owner account already exists
    const ownerCount = await db.users.countOwners();
    if (ownerCount > 0) {
      return NextResponse.json(
        {
          error:
            "Admin bootstrap is permanently disabled. An active OWNER account already exists.",
        },
        { status: 403 }
      );
    }

    // 2. Validate bootstrap secret if configured in environment
    const bootstrapSecret = process.env.BOOTSTRAP_SECRET;
    const providedSecret = req.headers.get("x-bootstrap-secret");

    if (bootstrapSecret && (!providedSecret || providedSecret !== bootstrapSecret)) {
      return NextResponse.json(
        { error: "Invalid or missing bootstrap secret token." },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { email, password, name } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "A strong password is required to initialize the OWNER account." },
        { status: 400 }
      );
    }

    if (password.length < 10) {
      return NextResponse.json(
        { error: "Owner password must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 3. Single Admin Policy:
    // Only saivinothdeveloper@gmail.com is authorized to be initialized as OWNER.
    const requestedEmail = email ? normalizeEmail(email) : AUTHORIZED_OWNER_EMAIL;
    if (!isAuthorizedOwner(requestedEmail)) {
      return NextResponse.json(
        { error: "Unauthorized: Only the designated studio owner email may be bootstrapped." },
        { status: 403 }
      );
    }

    // Check if account already exists for this email
    const existing = await db.users.findByEmail(AUTHORIZED_OWNER_EMAIL);
    if (existing) {
      return NextResponse.json(
        { error: "Owner account already initialized." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const ownerUser = await db.users.create({
      id: crypto.randomUUID(),
      email: AUTHORIZED_OWNER_EMAIL,
      password_hash: hashedPassword,
      name: name && typeof name === "string" ? name.trim() : "Sai Vinoth (Sai Rio)",
      role: "OWNER",
      is_active: true,
      email_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login_at: null,
    });

    await logAuditEvent({
      userId: ownerUser.id,
      action: "BOOTSTRAP_INITIALIZED",
      resource: "users",
      req,
      metadata: { email: ownerUser.email, role: "OWNER" },
    });

    return NextResponse.json(
      {
        status: "success",
        message:
          "Owner account successfully initialized for saivinothdeveloper@gmail.com. Bootstrap is now permanently locked.",
        user: {
          id: ownerUser.id,
          email: ownerUser.email,
          name: ownerUser.name,
          role: ownerUser.role,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[Bootstrap API Error]:", err);
    return NextResponse.json(
      { error: "Failed to execute admin bootstrap." },
      { status: 500 }
    );
  }
}
