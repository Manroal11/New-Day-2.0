"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffAccess } from "@/lib/supabase/staff";

export type LoginState = { error: string | null };

export async function signInWithPassword(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  if (
    typeof emailValue !== "string" ||
    typeof passwordValue !== "string" ||
    !emailValue.trim() ||
    !passwordValue
  ) {
    return { error: "Enter your staff email and password." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: emailValue.trim(),
      password: passwordValue,
    });

    if (error) {
      return { error: "Sign-in failed. Check your details or contact an administrator." };
    }

    let access = await getStaffAccess();
    if (access.status === "setup-required") {
      const { data: completed, error: setupError } = await supabase.rpc(
        "complete_my_staff_password_setup",
      );
      if (!setupError && completed) {
        access = await getStaffAccess();
      }
    }

    if (access.status !== "authorized") {
      await supabase.auth.signOut();

      if (access.status === "setup-required") {
        return { error: "Staff password setup is incomplete. Request a recovery link or contact an administrator." };
      }

      if (access.status === "unavailable") {
        return { error: "Staff access could not be verified. Contact an administrator." };
      }

      return { error: "This account is not authorized for staff access. Contact an administrator." };
    }
  } catch {
    return { error: "Sign-in is temporarily unavailable. Please try again later." };
  }

  redirect("/admin");
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } finally {
    redirect("/admin/login");
  }
}
