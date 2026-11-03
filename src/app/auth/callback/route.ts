import { NextRequest, NextResponse } from "next/server";
import { clearPasswordFlowCookie, getAppBaseUrl, hasPasswordFlowConfiguration, setPasswordFlowCookie, type PasswordFlow } from "@/lib/supabase/password-flow";
import { createClient } from "@/lib/supabase/server";

function isPasswordFlow(value: string | null): value is PasswordFlow {
  return value === "invite" || value === "recovery";
}

function logCallbackFailure(
  stage: string,
  details: { flow?: PasswordFlow; method?: "pkce" | "token-hash"; error?: unknown } = {},
) {
  const error = details.error;
  const fields: Record<string, string | number | boolean> = { stage };
  if (details.flow) fields.flow = details.flow;
  if (details.method) fields.method = details.method;

  if (error && typeof error === "object") {
    const safeError = error as { name?: unknown; status?: unknown; code?: unknown };
    if (typeof safeError.name === "string") fields.errorName = safeError.name.slice(0, 80);
    if (typeof safeError.status === "number") fields.errorStatus = safeError.status;
    if (typeof safeError.code === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(safeError.code)) {
      fields.errorCode = safeError.code;
    }
  }

  // Never include callback query values, tokens, cookies, email addresses, or error messages.
  console.warn("[auth/callback] Password link could not be completed", fields);
}

function redirectTo(path: string) {
  const appBaseUrl = getAppBaseUrl();
  if (!appBaseUrl) {
    return NextResponse.json({ error: "Password links are not configured." }, { status: 503 });
  }

  const response = NextResponse.redirect(new URL(path, appBaseUrl), 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

async function rejectCallback() {
  try {
    await clearPasswordFlowCookie();
  } catch {
    // The safe fixed redirect remains useful even if cookie cleanup is unavailable.
  }
  return redirectTo("/admin/login?error=invalid-link");
}

export async function GET(request: NextRequest) {
  if (!hasPasswordFlowConfiguration()) {
    logCallbackFailure("configuration-missing");
    return rejectCallback();
  }

  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const requestedFlow = url.searchParams.get("flow");
  const type = url.searchParams.get("type");

  let flow: PasswordFlow | null = null;
  if (tokenHash) {
    if (!isPasswordFlow(type) || (requestedFlow && requestedFlow !== type)) {
      return rejectCallback();
    }
    flow = type;
  } else if (code && isPasswordFlow(requestedFlow)) {
    if (type && type !== requestedFlow) {
      return rejectCallback();
    }
    flow = requestedFlow;
  } else {
    logCallbackFailure("verification-parameters-missing");
    return rejectCallback();
  }

  if (!flow) {
    return rejectCallback();
  }

  try {
    const supabase = await createClient();

    const method = tokenHash ? "token-hash" : "pkce";
    const { error: verificationError } = tokenHash
      ? await supabase.auth.verifyOtp({ type: flow, token_hash: tokenHash })
      : await supabase.auth.exchangeCodeForSession(code!);

    if (verificationError) {
      logCallbackFailure("verification-failed", { flow, method, error: verificationError });
      return rejectCallback();
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      logCallbackFailure("session-user-missing", { flow, method, error });
      await supabase.auth.signOut();
      return rejectCallback();
    }

    const cookieSet = await setPasswordFlowCookie(data.user.id, flow);
    if (!cookieSet) {
      logCallbackFailure("flow-cookie-not-configured", { flow, method });
      await supabase.auth.signOut();
      return rejectCallback();
    }

    return redirectTo("/admin/reset-password");
  } catch (error) {
    logCallbackFailure("callback-exception", { flow, method: tokenHash ? "token-hash" : "pkce", error });
    return rejectCallback();
  }
}
