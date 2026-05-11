"use server";

import { redirect } from "next/navigation";

import { createSupabaseCookieClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
};

function getRequiredValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getRedirectPath(formData: FormData): string {
  const next = getRequiredValue(formData, "next");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/saved";
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = getRequiredValue(formData, "email");
  const password = getRequiredValue(formData, "password");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  let signInError: unknown;

  try {
    const supabase = await createSupabaseCookieClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    signInError = error;
  } catch {
    return { error: "Authentication is not configured yet." };
  }

  if (signInError) {
    return { error: "Email or password is incorrect." };
  }

  redirect(getRedirectPath(formData));
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const displayName = getRequiredValue(formData, "name");
  const email = getRequiredValue(formData, "email");
  const password = getRequiredValue(formData, "password");

  if (!email || !password) {
    return { error: "Enter an email and password." };
  }

  if (password.length < 8) {
    return { error: "Use a password with at least 8 characters." };
  }

  let hasSession = false;

  try {
    const supabase = await createSupabaseCookieClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || null
        }
      }
    });

    if (error) {
      return { error: "Unable to create that account. Try a different email." };
    }

    hasSession = Boolean(data.session);
  } catch {
    return { error: "Authentication is not configured yet." };
  }

  if (!hasSession) {
    return {
      message: "Check your email to confirm your account, then log in."
    };
  }

  redirect(getRedirectPath(formData));
}

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createSupabaseCookieClient();
    await supabase.auth.signOut();
  } catch {
    // Logging out should always leave the user on a safe public page.
  }

  redirect("/");
}
