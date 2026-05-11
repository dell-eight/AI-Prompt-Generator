import { NextResponse } from "next/server";

export function forbiddenResponse(message = "Request origin is not allowed.") {
  return NextResponse.json(
    {
      error: {
        message
      }
    },
    { status: 403 }
  );
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);

    return originUrl.origin === requestUrl.origin;
  } catch {
    return false;
  }
}
