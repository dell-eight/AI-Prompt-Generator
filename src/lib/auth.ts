import type { User } from "@supabase/supabase-js";

import { createSupabaseCookieClient } from "@/lib/supabase/server";

export type UserRole = "user" | "admin";

export type CurrentProfile = {
  id: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
};

type UserProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: UserRole;
};

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createSupabaseCookieClient();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createSupabaseCookieClient();
  const { data } = await supabase
    .from("users")
    .select("id,email,display_name,role")
    .eq("id", user.id)
    .maybeSingle<UserProfileRow>();

  return {
    id: user.id,
    email: data?.email ?? user.email ?? null,
    displayName:
      data?.display_name ??
      getStringMetadata(user.user_metadata?.display_name) ??
      getStringMetadata(user.user_metadata?.name) ??
      null,
    role: data?.role ?? "user"
  };
}

function getStringMetadata(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
