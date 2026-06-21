import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

export const DEMO_SESSION_COOKIE = "voxkraft_demo_session";

export type DemoSession = {
  id: string;
  email: string;
  fullName: string;
};

export function createDemoSession(fullName: string, email: string): DemoSession {
  return {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    fullName: fullName.trim(),
  };
}

function encodeSession(session: DemoSession): string {
  return Buffer.from(JSON.stringify(session)).toString("base64url");
}

export function decodeDemoSession(value: string): DemoSession | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(value, "base64url").toString("utf8"),
    ) as Partial<DemoSession>;

    if (parsed.id && parsed.email && parsed.fullName) {
      return parsed as DemoSession;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getDemoSession(): Promise<DemoSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  if (!value) return null;
  return decodeDemoSession(value);
}

export function setDemoSessionCookie(response: NextResponse, session: DemoSession) {
  response.cookies.set(DEMO_SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearDemoSessionCookie(response: NextResponse) {
  response.cookies.set(DEMO_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function clearDemoSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);
}

export function isDemoAuthEnabled() {
  return process.env.NEXT_PUBLIC_DEMO_AUTH !== "false";
}
