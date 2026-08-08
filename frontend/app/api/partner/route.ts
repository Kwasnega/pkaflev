import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // TODO: hook this up to email/CRM. For now we just return success.
    console.log("Partner application received:", JSON.stringify(data));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
}
