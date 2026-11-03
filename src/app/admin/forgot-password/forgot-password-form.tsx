"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type ForgotPasswordFormProps = {
  redirectTo: string | null;
};

export function ForgotPasswordForm({ redirectTo }: ForgotPasswordFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!redirectTo) {
      setError("Password recovery is not configured yet. Contact an administrator.");
      return;
    }

    if (window.location.origin !== new URL(redirectTo).origin) {
      setError("Open this page using the configured application address, then request a new recovery email.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    if (typeof email !== "string" || !email.trim()) {
      setError("Enter a valid email address.");
      return;
    }

    setPending(true);
    try {
      // The browser client writes the PKCE verifier to a same-origin cookie
      // before requesting recovery. The server callback reads that same cookie.
      const supabase = createClient();
      const { error: requestError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (requestError) {
        setError("We could not send a recovery email right now. Please try again later.");
        return;
      }

      // Supabase deliberately returns success for unknown accounts. Keep the UI generic.
      setSuccess(true);
    } catch {
      setError("We could not send a recovery email right now. Please try again later.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="admin-success" role="status" aria-live="polite">
        <p>If an account can receive a password recovery email, instructions will arrive shortly. Check your inbox and spam folder.</p>
        <Link href="/admin/login">Return to staff sign in</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label htmlFor="recovery-email">Email address</label>
      <input
        autoComplete="email"
        autoCapitalize="none"
        id="recovery-email"
        name="email"
        type="email"
        required
        maxLength={254}
        placeholder="name@example.org"
        disabled={pending}
      />
      {error || !redirectTo ? (
        <p className="admin-form__error" role="alert">
          {error ?? "Password recovery is not configured yet. Contact an administrator."}
        </p>
      ) : null}
      <button className="admin-submit" type="submit" disabled={pending || !redirectTo}>
        {pending ? "Sending…" : "Send recovery email"}
      </button>
    </form>
  );
}
