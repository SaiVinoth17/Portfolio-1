import { NextResponse } from "next/server";
import { getCurrentAuth, destroyCurrentSession } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/auth/audit";

export async function POST(req: Request) {
  try {
    const auth = await getCurrentAuth(req);

    if (auth) {
      await logAuditEvent({
        userId: auth.user.id,
        action: "LOGOUT",
        resource: auth.session.id,
        req,
      });
      await destroyCurrentSession(auth.session.id);
    } else {
      await destroyCurrentSession();
    }

    return NextResponse.json({ status: "success", message: "Logged out successfully." });
  } catch (err: any) {
    console.error("[Logout API Error]:", err);
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
