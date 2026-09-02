import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, budget, message } = body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your name or callsign." },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate message / brief
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of what you are building (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Sanitize payload
    const briefRecord = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      company: typeof company === "string" ? company.trim().slice(0, 120) : "Independent",
      projectType: typeof projectType === "string" ? projectType.trim() : "Custom Architecture",
      budget: typeof budget === "string" ? budget.trim() : "Not specified",
      message: message.trim().slice(0, 3000),
      receivedAt: new Date().toISOString(),
    };

    // Persist to database messages table for Admin Console viewing
    const refId = `AEV-${Date.now().toString(36).toUpperCase()}`;
    await db.messages.create({
      id: refId,
      name: briefRecord.name,
      email: briefRecord.email,
      company: briefRecord.company,
      project_type: briefRecord.projectType,
      budget: briefRecord.budget,
      message: briefRecord.message,
      status: "UNREAD",
      created_at: briefRecord.receivedAt,
    });

    // Server log for production observability (without exposing sensitive credentials)
    console.log(
      `[Aevion Studio Contact] Brief ${refId} saved from: ${briefRecord.name} (${briefRecord.email}) | Type: ${briefRecord.projectType}`
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Mission brief acknowledged. Sai Rio and Edison will review your architecture requirements within 24 hours.",
        referenceId: refId,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Aevion Studio Contact API Error]:", err?.message || err);
    return NextResponse.json(
      {
        error: "Transmission temporarily interrupted. Please email hello@aevionstudio.in directly.",
      },
      { status: 500 }
    );
  }
}
