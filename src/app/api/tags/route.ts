import { NextResponse } from "next/server";

import { getTags, jsonError } from "@/lib/prompt-api";

export async function GET() {
  try {
    return NextResponse.json(await getTags());
  } catch (error) {
    return jsonError(error);
  }
}
