"use client";

import { useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { setNewPassword, type ResetPasswordState } from "./actions";

const initialState: ResetPasswordState = { error: null, success: false, destination: null };

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(setNewPassword, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (state.success && state.destination) {
    return (
      <div className="admin-success" role="status" aria-live="polite">
        <p>Your password has been updated.</p>
        <Link href={state.destination}>Continue</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="admin-form">
      <label htmlFor="new-password">New password</label>
      <input
        autoComplete="new-password"
        id="new-password"
        name="password"
        type={passwordVisible ? "text" : "password"}
        required
        minLength={12}
        maxLength={128}
        aria-describedby="password-requirements"
      />

      <label htmlFor="confirm-password">Confirm new password</label>
      <input
        autoComplete="new-password"
        id="confirm-password"
        name="confirmation"
        type={passwordVisible ? "text" : "password"}
        required
        minLength={12}
        maxLength={128}
      />

      <button
        className="admin-password-toggle"
        type="button"
        aria-pressed={passwordVisible}
        onClick={() => setPasswordVisible((visible) => !visible)}
      >
        {passwordVisible ? "Hide passwords" : "Show passwords"}
      </button>

      <p className="admin-password-requirements" id="password-requirements">
        Use 12–128 characters. A longer passphrase is recommended.
      </p>

      {state.error ? <p className="admin-form__error" role="alert">{state.error}</p> : null}

      <button className="admin-submit" type="submit" disabled={pending}>
        {pending ? "Updating password…" : "Set new password"}
      </button>
    </form>
  );
}
