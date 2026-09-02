import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/crypto";
import { logAuditEvent } from "@/lib/auth/audit";

export async function POST(req: Request) {
  try {
    // 1. Check if ANY owner account already exists
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

    // 2. Validate bootstrap secret if configured
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

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required to create the first OWNER." },
        { status: 400 }
      );
    }

    if (password.length < 10) {
      return NextResponse.json(
        { error: "Owner password must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await hashPassword(password);

    const ownerUser = await db.users.create({
      id: crypto.randomUUID(),
      email: normalizedEmail,
      password_hash: hashedPassword,
      name: (name && typeof name === "string" ? name.trim() : "System Owner"),
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
        message: "First OWNER account successfully initialized. Bootstrap is now permanently locked.",
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
