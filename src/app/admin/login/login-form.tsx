"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInWithPassword, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInWithPassword, initialState);

  return (
    <form action={formAction} className="admin-form">
      <label htmlFor="staff-email">Email address</label>
      <input
        autoComplete="username"
        autoCapitalize="none"
        id="staff-email"
        name="email"
        type="email"
        required
        maxLength={254}
        placeholder="name@example.org"
      />

      <label htmlFor="staff-password">Password</label>
      <input
        autoComplete="current-password"
        id="staff-password"
        name="password"
        type="password"
        required
        maxLength={128}
      />

      <Link className="admin-forgot-link" href="/admin/forgot-password">Forgot password?</Link>

      {state.error ? <p className="admin-form__error" role="alert">{state.error}</p> : null}

      <button className="admin-submit" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in securely"}
      </button>
    </form>
  );
}
