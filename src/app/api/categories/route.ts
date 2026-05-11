import { NextResponse } from "next/server";

import { getCategories, jsonError } from "@/lib/prompt-api";

export async function GET() {
  try {
    return NextResponse.json(await getCategories());
  } catch (error) {
    return jsonError(error);
  }
}
