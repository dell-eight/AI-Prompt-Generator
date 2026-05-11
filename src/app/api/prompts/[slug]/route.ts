import { NextResponse } from "next/server";

import { getPromptBySlug, jsonError } from "@/lib/prompt-api";

type PromptRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: PromptRouteContext) {
  try {
    const { slug } = await params;
    const prompt = await getPromptBySlug(slug);

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

    return NextResponse.json({
      data: prompt
    });
  } catch (error) {
    return jsonError(error);
  }
}
