import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { jsonError } from "@/lib/prompt-api";
import { forbiddenResponse, isSameOriginRequest } from "@/lib/security";
import { createSupabaseCookieClient } from "@/lib/supabase/server";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type SavedPromptRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  { params }: SavedPromptRouteContext
) {
  try {
    if (!isSameOriginRequest(request)) {
      return forbiddenResponse();
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: {
            message: "Log in to manage saved prompts."
          }
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!UUID_PATTERN.test(id)) {
      return NextResponse.json(
        {
          error: {
            message: "Saved prompt id is invalid."
          }
        },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseCookieClient();
    const { data, error } = await supabase
      .from("saved_prompts")
      .delete()
      .eq("user_id", user.id)
      .or(`id.eq.${id},prompt_id.eq.${id}`)
      .select("id,prompt_id")
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return NextResponse.json(
        {
          error: {
            message: "Saved prompt not found."
          }
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        id: data.id,
        promptId: data.prompt_id
      }
    });
  } catch (error) {
    return jsonError(error);
  }
}
