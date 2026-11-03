"use server";

import { getStaffAccess } from "@/lib/supabase/staff";
import { clearPasswordFlowCookie, getPasswordFlowAccess } from "@/lib/supabase/password-flow";
import { createClient } from "@/lib/supabase/server";
import { getPasswordValidationError } from "@/lib/password-policy";

export type ResetPasswordState = {
  error: string | null;
  success: boolean;
  destination: "/admin" | "/admin/login?notice=password-updated" | null;
};

export async function setNewPassword(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");

  if (typeof password !== "string" || typeof confirmation !== "string") {
    return { error: "Enter and confirm your new password.", success: false, destination: null };
  }
  const passwordError = getPasswordValidationError(password, confirmation);
  if (passwordError) {
    return { error: passwordError, success: false, destination: null };
  }

  const flowAccess = await getPasswordFlowAccess();
  if (!flowAccess) {
    return {
      error: "This password link is invalid or expired. Request a new recovery email or invitation.",
      success: false,
      destination: null,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return {
        error: "The password could not be updated. Check the password requirements or request a new link.",
        success: false,
        destination: null,
      };
    }

    const { error: setupError } = await supabase.rpc("complete_my_staff_password_setup");
    if (setupError) {
      return {
        error: "Your password was updated, but staff setup could not be confirmed. Contact an administrator.",
        success: false,
        destination: null,
      };
    }

    const access = await getStaffAccess();
    if (access.status === "setup-required") {
      return {
        error: "Your password was updated, but staff setup could not be confirmed. Contact an administrator.",
        success: false,
        destination: null,
      };
    }

    await clearPasswordFlowCookie();

    return {
      error: null,
      success: true,
      destination: access.status === "authorized" ? "/admin" : "/admin/login?notice=password-updated",
    };
  } catch {
    return {
      error: "The password could not be updated right now. Please try again or request a new link.",
      success: false,
      destination: null,
    };
  }
}
