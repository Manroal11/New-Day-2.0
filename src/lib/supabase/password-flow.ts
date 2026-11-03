import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type PasswordFlow = "invite" | "recovery";

export const PASSWORD_FLOW_COOKIE = "newday_password_flow";
const FLOW_WINDOW_SECONDS = 15 * 60;

function getSigningSecret(): string | null {
  const secret = process.env.PASSWORD_FLOW_COOKIE_SECRET;
  return secret && Buffer.byteLength(secret, "utf8") >= 32 ? secret : null;
}

export function hasPasswordFlowConfiguration(): boolean {
  return getSigningSecret() !== null && getAppBaseUrl() !== null;
}

export function getAppBaseUrl(): string | null {
  const configured = process.env.APP_BASE_URL;
  const value = configured ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);

  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createPasswordFlowCookieValue(
  userId: string,
  flow: PasswordFlow,
  now = Date.now(),
): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const expiresAt = Math.floor(now / 1000) + FLOW_WINDOW_SECONDS;
  const payload = Buffer.from(`v1|${flow}|${userId}|${expiresAt}`).toString("base64url");
  return `${payload}.${signPayload(payload, secret)}`;
}

export function verifyPasswordFlowCookieValue(
  value: string | undefined,
  userId: string,
  now = Date.now(),
): PasswordFlow | null {
  const secret = getSigningSecret();
  if (!secret || !value) return null;

  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expected = Buffer.from(signPayload(payload, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const decoded = Buffer.from(payload, "base64url").toString("utf8").split("|");
    const [version, flow, payloadUserId, expiresAtText, extraPart] = decoded;
    const expiresAt = Number(expiresAtText);

    if (
      version !== "v1" ||
      (flow !== "invite" && flow !== "recovery") ||
      payloadUserId !== userId ||
      !Number.isSafeInteger(expiresAt) ||
      expiresAt <= Math.floor(now / 1000) ||
      extraPart !== undefined
    ) {
      return null;
    }

    return flow;
  } catch {
    return null;
  }
}

export async function setPasswordFlowCookie(userId: string, flow: PasswordFlow): Promise<boolean> {
  const value = createPasswordFlowCookieValue(userId, flow);
  if (!value) return false;

  const cookieStore = await cookies();
  cookieStore.set(PASSWORD_FLOW_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin/reset-password",
    maxAge: FLOW_WINDOW_SECONDS,
  });
  return true;
}

export async function clearPasswordFlowCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(PASSWORD_FLOW_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin/reset-password",
    maxAge: 0,
  });
}

export async function getPasswordFlowAccess(): Promise<
  { flow: PasswordFlow; userId: string; email: string | null } | null
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;

    const cookieStore = await cookies();
    const flow = verifyPasswordFlowCookieValue(
      cookieStore.get(PASSWORD_FLOW_COOKIE)?.value,
      data.user.id,
    );

    return flow ? { flow, userId: data.user.id, email: data.user.email ?? null } : null;
  } catch {
    return null;
  }
}
