import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getPasswordFlowAccess } from "@/lib/supabase/password-flow";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Set password | New Day",
  description: "Securely set or update a New Day staff password.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

async function ResetPasswordContent() {
  const access = await getPasswordFlowAccess();
  if (!access) {
    redirect("/admin/login?error=invalid-link");
  }

  return (
    <main className="admin-login admin-login--recovery">
      <section className="admin-login__panel" aria-labelledby="reset-title">
        <Link className="admin-wordmark" href="/" aria-label="New Day home">
          <Image src="/new-day-logo.jpg" width={96} height={96} alt="New Day official logo" priority />
          <span className="admin-wordmark__tagline">Empowering Communities. Building Sustainable Futures.</span>
        </Link>
        <div className="admin-login__intro">
          <p className="admin-eyebrow">{access.flow === "invite" ? "Accept staff invitation" : "Account recovery"}</p>
          <h1 id="reset-title">Choose a password.</h1>
          <p>Your verified email link authorizes a one-time password update for this account.</p>
        </div>
        <ResetPasswordForm />
        <p className="admin-login__help">Need a new link? <Link href="/admin/forgot-password">Request password recovery</Link></p>
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

function ResetPasswordFallback() {
  return (
    <main className="admin-login" aria-busy="true">
      <section className="admin-login__panel">
        <p className="admin-eyebrow">Password setup</p>
        <h1 className="admin-login__fallback-title">Verifying your secure link…</h1>
      </section>
      <aside className="admin-login__aside" aria-hidden="true" />
    </main>
  );
}
