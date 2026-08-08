import { NextResponse } from "next/server";
import { users as mockUsers } from "@/lib/mock-data";
import { createAdminSessionValue, getAdminSessionSecret, SESSION_COOKIE_NAME } from "@/lib/admin-session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = body?.email?.toString().trim().toLowerCase();
  const password = body?.password?.toString();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const profile = mockUsers.find((entry) => entry.email.toLowerCase() === email);
  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  const adminPasswords: Record<string, string> = {
    "admin@pkaflev.com": "admin123",
  };

  if (!adminPasswords[email] || adminPasswords[email] !== password) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  const sessionValue = await createAdminSessionValue(getAdminSessionSecret(), expiresAt);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
