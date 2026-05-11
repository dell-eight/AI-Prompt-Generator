import { NextResponse } from "next/server";

import {
  filterAndPaginatePrompts,
  getPublishedPrompts,
  jsonError,
  parsePromptListQuery
} from "@/lib/prompt-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parsePromptListQuery(searchParams);
    const prompts = await getPublishedPrompts();

    return NextResponse.json(filterAndPaginatePrompts(prompts, filters));
  } catch (error) {
    return jsonError(error);
  }
}
