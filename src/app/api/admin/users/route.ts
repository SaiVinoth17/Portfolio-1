import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth/guard";
import { hashPassword } from "@/lib/auth/crypto";
import { logAuditEvent } from "@/lib/auth/audit";
import { UserRole } from "@/lib/db/types";

export async function GET(req: Request) {
  const guard = await requireAuth(req, "VIEWER");
  if (!guard.success) return guard.response;

  try {
    const users = await db.users.list();
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("[Admin Users List Error]:", err);
    return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Only OWNER can create new administrators
  const guard = await requireAuth(req, "OWNER");
  if (!guard.success) return guard.response;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { email, password, name, role } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Email, password, name, and role are required." },
        { status: 400 }
      );
    }

    const validRoles: UserRole[] = ["OWNER", "ADMIN", "EDITOR", "VIEWER"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
    }

    if (password.length < 10) {
      return NextResponse.json(
        { error: "Password must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await db.users.findByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An administrator with this email address already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db.users.create({
      id: crypto.randomUUID(),
      email: normalizedEmail,
      password_hash: hashedPassword,
      name: name.trim(),
      role,
      is_active: true,
      email_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login_at: null,
    });

    await logAuditEvent({
      userId: guard.user.id,
      action: "USER_CREATED",
      resource: newUser.email,
      req,
      metadata: { targetId: newUser.id, role: newUser.role },
    });

    const { password_hash, ...safeUser } = newUser;
    return NextResponse.json({ status: "success", user: safeUser }, { status: 201 });
  } catch (err: any) {
    console.error("[Admin User Create Error]:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  // Only OWNER can modify admin accounts
  const guard = await requireAuth(req, "OWNER");
  if (!guard.success) return guard.response;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { id, role, is_active, name, password } = body;
    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const targetUser = await db.users.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const ownerCount = await db.users.countOwners();

    // ANTI-LOCKOUT: Prevent demoting the last active OWNER
    if (targetUser.role === "OWNER" && role && role !== "OWNER" && ownerCount <= 1) {
      return NextResponse.json(
        { error: "Forbidden: Cannot demote the last remaining OWNER account." },
        { status: 403 }
      );
    }

    // ANTI-LOCKOUT: Prevent deactivating the last active OWNER
    if (targetUser.role === "OWNER" && is_active === false && ownerCount <= 1) {
      return NextResponse.json(
        { error: "Forbidden: Cannot deactivate the last remaining OWNER account." },
        { status: 403 }
      );
    }

    const updates: Partial<typeof targetUser> = {};
    if (role) updates.role = role;
    if (typeof is_active === "boolean") updates.is_active = is_active;
    if (name) updates.name = name.trim();
    if (password) {
      if (password.length < 10) {
        return NextResponse.json(
          { error: "Password must be at least 10 characters." },
          { status: 400 }
        );
      }
      updates.password_hash = await hashPassword(password);
      // Invalidate target user's existing sessions on password change
      await db.sessions.deleteByUser(targetUser.id);
    }

    const updated = await db.users.update(id, updates);

    await logAuditEvent({
      userId: guard.user.id,
      action: "USER_UPDATED",
      resource: targetUser.email,
      req,
      metadata: { targetId: id, updates: Object.keys(updates) },
    });

    return NextResponse.json({ status: "success", user: updated });
  } catch (err: any) {
    console.error("[Admin User Update Error]:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  // Only OWNER can delete users
  const guard = await requireAuth(req, "OWNER");
  if (!guard.success) return guard.response;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const targetUser = await db.users.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // ANTI-LOCKOUT: Prevent deleting the last OWNER
    const ownerCount = await db.users.countOwners();
    if (targetUser.role === "OWNER" && ownerCount <= 1) {
      return NextResponse.json(
        { error: "Forbidden: Cannot delete the last remaining OWNER account." },
        { status: 403 }
      );
    }

    await db.users.delete(id);

    await logAuditEvent({
      userId: guard.user.id,
      action: "USER_DELETED",
      resource: targetUser.email,
      req,
      metadata: { deletedUserId: id },
    });

    return NextResponse.json({ status: "success", message: "User deleted." });
  } catch (err: any) {
    console.error("[Admin User Delete Error]:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
