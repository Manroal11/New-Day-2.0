"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnvironment } from "./env";
import { supabaseCookieOptions } from "./cookie-options";

/** Create the Supabase client for browser components and client-side actions. */
export function createClient(): SupabaseClient {
  const { url, publishableKey } = getSupabaseEnvironment();

  return createBrowserClient(url, publishableKey, {
    cookieOptions: supabaseCookieOptions,
  });
}
