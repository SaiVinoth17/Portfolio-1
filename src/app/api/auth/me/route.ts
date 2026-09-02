import { NextResponse } from "next/server";
import { getCurrentAuth } from "@/lib/auth/session";

export async function GET(req: Request) {
  try {
    const auth = await getCurrentAuth(req);

    if (!auth) {
      return NextResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const { password_hash, ...safeUser } = auth.user;

    return NextResponse.json({
      user: safeUser,
      session: {
        id: auth.session.id,
        expires_at: auth.session.expires_at,
        created_at: auth.session.created_at,
      },
    });
  } catch (err: any) {
    console.error("[Auth Me API Error]:", err);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}
