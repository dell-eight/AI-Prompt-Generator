import { NextResponse } from "next/server";

import {
  createAdminPrompt,
  getAdminPrompts
} from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";
import { jsonError } from "@/lib/prompt-api";
import { forbiddenResponse, isSameOriginRequest } from "@/lib/security";

export async function GET() {
  const adminError = await requireAdminResponse();

  if (adminError) {
    return adminError;
  }

  try {
    const prompts = await getAdminPrompts();

    return NextResponse.json({
      data: prompts
    });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return forbiddenResponse();
  }

  const adminError = await requireAdminResponse();

  if (adminError) {
    return adminError;
  }

  try {
    const profile = await getCurrentProfile();
    const prompt = await createAdminPrompt(await request.json(), profile!.id);

    return NextResponse.json(
      {
        data: prompt
      },
      { status: 201 }
    );
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
