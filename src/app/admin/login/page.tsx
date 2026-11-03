import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStaffAccess } from "@/lib/supabase/staff";
import { getPasswordFlowAccess } from "@/lib/supabase/password-flow";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Staff sign in | New Day",
  description: "Secure staff sign in for New Day.",
};

type LoginPageProps = Readonly<{
  searchParams: Promise<{ error?: string; notice?: string }>;
}>;

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLoginContent({ searchParams }: LoginPageProps) {
  const [access, params] = await Promise.all([getStaffAccess(), searchParams]);

  if (access.status === "authorized") {
    redirect("/admin");
  }

  if (access.status === "setup-required") {
    const passwordFlow = await getPasswordFlowAccess();
    redirect(passwordFlow ? "/admin/reset-password" : "/admin/forgot-password");
  }

  const notice =
    params.notice === "password-updated"
      ? "Your password has been updated. Sign in with your new password."
      : params.error === "invalid-link"
        ? "This password link is invalid, expired, or already used. Request a new recovery email."
        : params.error === "unauthorized" || access.status === "unauthorized"
          ? "This account is not authorized for staff access. Contact an administrator."
          : params.error === "unavailable" || access.status === "unavailable"
            ? "Staff access could not be verified. Contact an administrator."
            : null;

  return (
    <main className="admin-login">
      <section className="admin-login__panel" aria-labelledby="login-title">
        <Link className="admin-wordmark" href="/" aria-label="New Day home">
          <Image src="/new-day-logo.jpg" width={96} height={96} alt="New Day official logo" priority />
          <span className="admin-wordmark__tagline">Empowering Communities. Building Sustainable Futures.</span>
        </Link>

        <div className="admin-login__intro">
          <p className="admin-eyebrow">Staff portal</p>
          <h1 id="login-title">Welcome back.</h1>
          <p>Sign in with the account invited by your New Day administrator.</p>
        </div>

        {notice ? <p className="admin-notice" role="status">{notice}</p> : null}
        <LoginForm />
        <p className="admin-login__help">Staff access is invitation only. Public registration is unavailable.</p>
      </section>
      <aside className="admin-login__aside" aria-label="New Day staff portal">
        <span className="admin-login__ornament" aria-hidden="true">ND</span>
        <p>Purposeful work.<br />Stronger communities.</p>
        <span className="admin-login__rule" aria-hidden="true" />
        <span className="admin-login__aside-tagline">Empowering Communities.<br />Building Sustainable Futures.</span>
      </aside>
    </main>
  );
}

function LoginFallback() {
  return (
    <main className="admin-login" aria-busy="true">
      <section className="admin-login__panel">
        <p className="admin-eyebrow">Staff portal</p>
        <h1 className="admin-login__fallback-title">Loading secure sign-in…</h1>
      </section>
      <aside className="admin-login__aside" aria-hidden="true" />
    </main>
  );
}
