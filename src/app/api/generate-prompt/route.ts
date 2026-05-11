import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { promptCategories, promptTools } from "@/lib/constants";
import { ApiValidationError, jsonError } from "@/lib/prompt-api";
import { forbiddenResponse, isSameOriginRequest } from "@/lib/security";
import { createSupabaseCookieClient } from "@/lib/supabase/server";
import type {
  GeneratedPromptRequest,
  PromptCategory,
  PromptTool
} from "@/lib/types";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-mini";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_BUCKETS = 1000;
const TEXT_LIMITS = {
  userGoal: 500,
  context: 1200,
  audience: 240,
  outputFormat: 240,
  tone: 160,
  constraints: 800,
  examples: 1200
} as const;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type OpenAIResponseBody = {
  output_text?: string;
  output?: {
    type?: string;
    content?: {
      type?: string;
      text?: string;
    }[];
  }[];
};

class RateLimitError extends Error {
  status = 429;

  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

class ConfigurationError extends Error {
  status = 503;

  constructor() {
    super("Prompt generation is not configured yet.");
    this.name = "ConfigurationError";
  }
}

const rateLimitBuckets = new Map<string, RateLimitBucket>();

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return forbiddenResponse();
    }

    enforceRateLimit(request);

    const input = await parseGeneratePromptRequest(request);
    const user = await getCurrentUser();
    const generatedPrompt = await generatePrompt(input, user?.id);
    const generatedPromptId = user
      ? await saveGeneratedPrompt(user.id, input, generatedPrompt)
      : null;

    return NextResponse.json({
      data: {
        generatedPrompt,
        generatedPromptId
      }
    });
  } catch (error) {
    if (error instanceof ApiValidationError) {
      return jsonError(error);
    }

    if (error instanceof RateLimitError) {
      return NextResponse.json(
        {
          error: {
            message: error.message
          }
        },
        { status: error.status }
      );
    }

    if (error instanceof ConfigurationError) {
      return NextResponse.json(
        {
          error: {
            message: error.message
          }
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        error: {
          message:
            "Unable to generate a prompt right now. Please try again in a moment."
        }
      },
      { status: 500 }
    );
  }
}

async function parseGeneratePromptRequest(
  request: Request
): Promise<GeneratedPromptRequest> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new ApiValidationError("Request body must be valid JSON.");
  }

  if (!isRecord(body)) {
    throw new ApiValidationError("Request body must be an object.");
  }

  const promptType = parsePromptType(body.promptType);
  const targetTool = parseTargetTool(body.targetTool);
  const userGoal = parseTextField(body.userGoal, "userGoal", {
    required: true,
    maxLength: TEXT_LIMITS.userGoal
  });

  return {
    promptType,
    targetTool,
    userGoal,
    context: parseTextField(body.context, "context", {
      required: false,
      maxLength: TEXT_LIMITS.context
    }),
    audience: parseTextField(body.audience, "audience", {
      required: false,
      maxLength: TEXT_LIMITS.audience
    }),
    outputFormat: parseTextField(body.outputFormat, "outputFormat", {
      required: false,
      maxLength: TEXT_LIMITS.outputFormat
    }),
    tone: parseTextField(body.tone, "tone", {
      required: false,
      maxLength: TEXT_LIMITS.tone
    }),
    constraints: parseTextField(body.constraints, "constraints", {
      required: false,
      maxLength: TEXT_LIMITS.constraints
    }),
    examples: parseTextField(body.examples, "examples", {
      required: false,
      maxLength: TEXT_LIMITS.examples
    })
  };
}

async function generatePrompt(input: GeneratedPromptRequest, userId?: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new ConfigurationError();
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      instructions: buildGeneratorInstructions(),
      input: buildGeneratorInput(input),
      max_output_tokens: 1200,
      temperature: 0.4,
      store: false,
      safety_identifier: userId
    })
  });

  if (!response.ok) {
    throw new Error("OpenAI request failed.");
  }

  const body = (await response.json()) as OpenAIResponseBody;
  const generatedPrompt = extractOutputText(body);

  if (!generatedPrompt) {
    throw new Error("OpenAI response did not include text.");
  }

  return generatedPrompt;
}

async function saveGeneratedPrompt(
  userId: string,
  input: GeneratedPromptRequest,
  generatedPrompt: string
) {
  try {
    const supabase = await createSupabaseCookieClient();
    const { data, error } = await supabase
      .from("generated_prompts")
      .insert({
        user_id: userId,
        tool: input.targetTool,
        goal: input.userGoal,
        input,
        generated_text: generatedPrompt
      })
      .select("id")
      .single();

    if (error) {
      return null;
    }

    return data.id as string;
  } catch {
    return null;
  }
}

function buildGeneratorInstructions() {
  return [
    "You generate high-quality, copy-paste-ready prompts for AI tools.",
    "Use the user's inputs as source material, but do not mention missing fields unless they are important.",
    "The generated output must be only the prompt the user can paste into their chosen AI tool.",
    "Include clear sections when useful: Role, Goal, Context, Task, Constraints, Output Format, Quality Checklist, and Examples.",
    "Keep the prompt practical, specific, beginner-friendly, and safe. Do not promise guaranteed results."
  ].join(" ");
}

function buildGeneratorInput(input: GeneratedPromptRequest) {
  return [
    `Prompt type: ${input.promptType}`,
    `Target AI tool: ${input.targetTool}`,
    `User goal: ${input.userGoal}`,
    `Context/background: ${input.context || "Not provided"}`,
    `Target audience: ${input.audience || "Not provided"}`,
    `Desired output format: ${input.outputFormat || "Not provided"}`,
    `Tone/style: ${input.tone || "Not provided"}`,
    `Constraints: ${input.constraints || "Not provided"}`,
    `Examples/references: ${input.examples || "Not provided"}`,
    "",
    "Generate one polished prompt now."
  ].join("\n");
}

function extractOutputText(body: OpenAIResponseBody) {
  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text.trim();
  }

  return (
    body.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter((text): text is string => Boolean(text?.trim()))
      .join("\n")
      .trim() ?? ""
  );
}

function parsePromptType(value: unknown): PromptCategory {
  if (
    typeof value === "string" &&
    promptCategories.includes(value as PromptCategory)
  ) {
    return value as PromptCategory;
  }

  throw new ApiValidationError("promptType is invalid.");
}

function parseTargetTool(value: unknown): PromptTool {
  if (typeof value === "string" && promptTools.includes(value as PromptTool)) {
    return value as PromptTool;
  }

  throw new ApiValidationError("targetTool is invalid.");
}

function parseTextField(
  value: unknown,
  field: keyof typeof TEXT_LIMITS,
  options: {
    required: boolean;
    maxLength: number;
  }
) {
  if (typeof value !== "string") {
    if (options.required) {
      throw new ApiValidationError(`${field} is required.`);
    }

    return "";
  }

  const trimmed = value.trim();

  if (options.required && !trimmed) {
    throw new ApiValidationError(`${field} is required.`);
  }

  if (trimmed.length > options.maxLength) {
    throw new ApiValidationError(
      `${field} must be ${options.maxLength} characters or fewer.`
    );
  }

  return trimmed;
}

function enforceRateLimit(request: Request) {
  pruneExpiredRateLimitBuckets();

  const key = getRateLimitKey(request);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new RateLimitError(
      "Too many generation requests. Please wait a minute and try again."
    );
  }

  bucket.count += 1;
}

function pruneExpiredRateLimitBuckets() {
  if (rateLimitBuckets.size < MAX_RATE_LIMIT_BUCKETS) {
    return;
  }

  const now = Date.now();

  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}

function getRateLimitKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
