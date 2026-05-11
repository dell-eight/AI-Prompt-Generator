import { NextResponse } from "next/server";

import {
  deleteAdminPrompt,
  updateAdminPrompt
} from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";
import { jsonError } from "@/lib/prompt-api";
import { forbiddenResponse, isSameOriginRequest } from "@/lib/security";

type AdminPromptRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: AdminPromptRouteContext) {
  if (!isSameOriginRequest(request)) {
    return forbiddenResponse();
  }

  const adminError = await requireAdminResponse();

  if (adminError) {
    return adminError;
  }

  try {
    const { id } = await params;
    const prompt = await updateAdminPrompt(id, await request.json());

    return NextResponse.json({
      data: prompt
    });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request, { params }: AdminPromptRouteContext) {
  if (!isSameOriginRequest(request)) {
    return forbiddenResponse();
  }

  const adminError = await requireAdminResponse();

  if (adminError) {
    return adminError;
  }

  try {
    const { id } = await params;
    await deleteAdminPrompt(id);

    return NextResponse.json({
      data: {
        deleted: true
      }
    });
  } catch (error) {
    return jsonError(error);
  }
}

async function requireAdminResponse() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return NextResponse.json(
      {
        error: {
          message: "Authentication required."
        }
      },
      { status: 401 }
    );
  }

  if (profile.role !== "admin") {
    return NextResponse.json(
      {
        error: {
          message: "Admin access required."
        }
      },
      { status: 403 }
    );
  }

  return null;
}
