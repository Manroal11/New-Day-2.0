import "server-only";

import { createClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "staff";

export type StaffAccess =
  | { status: "anonymous" }
  | { status: "unauthorized"; email: string | null }
  | { status: "unavailable"; email: string | null }
  | { status: "setup-required"; email: string | null; role: StaffRole }
  | { status: "authorized"; email: string; role: StaffRole };

/** Verify the Supabase user and their own RLS-protected staff membership. */
export async function getStaffAccess(): Promise<StaffAccess> {
  let email: string | null = null;

  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return { status: "anonymous" };
    }

    email = userData.user.email ?? null;

    const { data: membership, error: membershipError } = await supabase
      .from("staff_members")
      .select("role, password_set_at")
      .eq("user_id", userData.user.id)
      .maybeSingle();

    if (membershipError) {
      return { status: "unavailable", email };
    }

    if (membership?.role !== "admin" && membership?.role !== "staff") {
      return { status: "unauthorized", email };
    }

    if (!membership.password_set_at) {
      return { status: "setup-required", email, role: membership.role };
    }

    return { status: "authorized", email: email ?? "Staff member", role: membership.role };
  } catch {
    return { status: "unavailable", email };
  }
}
