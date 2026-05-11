import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { ApiValidationError, jsonError } from "@/lib/prompt-api";
import { getSavedPromptsForCurrentUser } from "@/lib/saved-prompts";
import { forbiddenResponse, isSameOriginRequest } from "@/lib/security";
import { createSupabaseCookieClient } from "@/lib/supabase/server";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return unauthorizedResponse();
    }

    const savedPrompts = await getSavedPromptsForCurrentUser(user.id);

    return NextResponse.json({
      data: savedPrompts,
      savedPromptIds: savedPrompts.map((item) => item.promptId)
    });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return forbiddenResponse();
    }

    const user = await getCurrentUser();

    if (!user) {
      return unauthorizedResponse();
    }

    const promptId = await getPromptIdFromRequest(request);
    const supabase = await createSupabaseCookieClient();

    const { data: prompt } = await supabase
      .from("prompts")
      .select("id")
      .eq("id", promptId)
      .eq("is_published", true)
      .maybeSingle();

    if (!prompt) {
      return NextResponse.json(
        {
          error: {
            message: "Prompt not found."
          }
        },
        { status: 404 }
      );
    }

    const { data: existing, error: existingError } = await supabase
      .from("saved_prompts")
      .select("id,user_id,prompt_id,created_at")
      .eq("user_id", user.id)
      .eq("prompt_id", promptId)
      .maybeSingle();

    if (existingError) {
      throw new Error(existingError.message);
    }

    if (existing) {
      return NextResponse.json({
        data: {
          id: existing.id,
          promptId: existing.prompt_id,
          userId: existing.user_id,
          createdAt: existing.created_at
        }
      });
    }

    const { data, error } = await supabase
      .from("saved_prompts")
      .insert({
        user_id: user.id,
        prompt_id: promptId
      })
      .select("id,user_id,prompt_id,created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      {
        data: {
          id: data.id,
          promptId: data.prompt_id,
          userId: data.user_id,
          createdAt: data.created_at
        }
      },
      { status: 201 }
    );
  } catch (error) {
    return jsonError(error);
  }
}

async function getPromptIdFromRequest(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new ApiValidationError("Request body must be valid JSON.");
  }

  const promptId =
    typeof body === "object" &&
    body !== null &&
    "promptId" in body &&
    typeof body.promptId === "string"
      ? body.promptId.trim()
      : "";

  if (!UUID_PATTERN.test(promptId)) {
    throw new ApiValidationError("A valid promptId is required.");
  }

  return promptId;
}

function unauthorizedResponse() {
  return NextResponse.json(
    {
      error: {
        message: "Log in to save prompts."
      }
    },
    { status: 401 }
  );
}
