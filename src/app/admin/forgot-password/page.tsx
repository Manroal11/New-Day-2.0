import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { getAppBaseUrl, hasPasswordFlowConfiguration } from "@/lib/supabase/password-flow";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Password recovery | New Day",
  description: "Request a password recovery email for New Day staff access.",
};

export const instant = false;

export default async function ForgotPasswordPage() {
  // Read the app origin and secret readiness at request time, not into a
  // prerendered page that could retain build-time environment settings.
  await connection();
  const appBaseUrl = getAppBaseUrl();
  const recoveryRedirectTo = hasPasswordFlowConfiguration() && appBaseUrl
    ? `${appBaseUrl}/auth/callback?flow=recovery`
    : null;

  return (
    <main className="admin-login admin-login--recovery">
      <section className="admin-login__panel" aria-labelledby="forgot-title">
        <Link className="admin-wordmark" href="/" aria-label="New Day home">
          <Image src="/new-day-logo.jpg" width={96} height={96} alt="New Day official logo" priority />
          <span className="admin-wordmark__tagline">Empowering Communities. Building Sustainable Futures.</span>
        </Link>
        <div className="admin-login__intro">
          <p className="admin-eyebrow">Account recovery</p>
          <h1 id="forgot-title">Reset your password.</h1>
          <p>Enter your staff email address and we’ll send recovery instructions if an account is eligible. Staff accounts still setting an initial password can use this flow too.</p>
        </div>
        <ForgotPasswordForm redirectTo={recoveryRedirectTo} />
        <p className="admin-login__help"><Link href="/admin/login">Return to staff sign in</Link></p>
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
