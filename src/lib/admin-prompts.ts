import { ApiValidationError } from "@/lib/prompt-api";
import { createSupabaseCookieClient } from "@/lib/supabase/server";
import type { Difficulty } from "@/lib/types";

const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
const MAX_TAGS = 12;
const MAX_TEXT = {
  title: 140,
  slug: 160,
  description: 600,
  promptText: 12000,
  tool: 80,
  tag: 60
};

export type AdminPromptInput = {
  title: string;
  slug: string;
  description: string;
  promptText: string;
  categoryId: string;
  tool: string;
  difficulty: Difficulty;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
};

export type AdminPromptListItem = AdminPromptInput & {
  id: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type AdminTaxonomy = {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

type SupabaseRelation<T> = T | T[] | null;

type AdminPromptRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  prompt_text: string;
  tool: string;
  difficulty: Difficulty;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  categories: SupabaseRelation<{
    id: string;
    name: string;
    slug: string;
  }>;
  prompt_tags: {
    tags: SupabaseRelation<{
      name: string;
      slug: string;
    }>;
  }[] | null;
};

export async function getAdminPrompts() {
  const supabase = await createSupabaseCookieClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
      id,
      title,
      slug,
      description,
      prompt_text,
      tool,
      difficulty,
      is_featured,
      is_published,
      created_at,
      updated_at,
      category_id,
      categories (
        id,
        name,
        slug
      ),
      prompt_tags (
        tags (
          name,
          slug
        )
      )
    `
    )
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapAdminPrompt(row as AdminPromptRow));
}

export async function getAdminPromptById(id: string) {
  assertUuid(id, "Prompt id is invalid.");

  const supabase = await createSupabaseCookieClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
      id,
      title,
      slug,
      description,
      prompt_text,
      tool,
      difficulty,
      is_featured,
      is_published,
      created_at,
      updated_at,
      category_id,
      categories (
        id,
        name,
        slug
      ),
      prompt_tags (
        tags (
          name,
          slug
        )
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapAdminPrompt(data as AdminPromptRow) : null;
}

export async function getAdminTaxonomy(): Promise<AdminTaxonomy> {
  const supabase = await createSupabaseCookieClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return {
    categories: (data ?? []).map((category) => ({
      id: category.id as string,
      name: category.name as string,
      slug: category.slug as string
    }))
  };
}

export async function createAdminPrompt(input: unknown, createdBy: string) {
  assertUuid(createdBy, "Admin profile id is invalid.");
  const parsed = parseAdminPromptInput(input);
  const supabase = await createSupabaseCookieClient();

  const { data, error } = await supabase
    .from("prompts")
    .insert({
      category_id: parsed.categoryId,
      created_by: createdBy,
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.description,
      prompt_text: parsed.promptText,
      tool: parsed.tool,
      difficulty: parsed.difficulty,
      is_featured: parsed.isFeatured,
      is_published: parsed.isPublished
    })
    .select("id")
    .single();

  if (error) {
    throw toAdminMutationError(error.message);
  }

  const promptId = data.id as string;
  await syncPromptTags(promptId, parsed.tags);

  return getAdminPromptById(promptId);
}

export async function updateAdminPrompt(id: string, input: unknown) {
  assertUuid(id, "Prompt id is invalid.");
  const parsed = parseAdminPromptInput(input);
  const supabase = await createSupabaseCookieClient();

  const { error } = await supabase
    .from("prompts")
    .update({
      category_id: parsed.categoryId,
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.description,
      prompt_text: parsed.promptText,
      tool: parsed.tool,
      difficulty: parsed.difficulty,
      is_featured: parsed.isFeatured,
      is_published: parsed.isPublished
    })
    .eq("id", id);

  if (error) {
    throw toAdminMutationError(error.message);
  }

  await syncPromptTags(id, parsed.tags);

  return getAdminPromptById(id);
}

export async function deleteAdminPrompt(id: string) {
  assertUuid(id, "Prompt id is invalid.");

  const supabase = await createSupabaseCookieClient();
  const { error } = await supabase.from("prompts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export function parseAdminPromptInput(input: unknown): AdminPromptInput {
  if (!input || typeof input !== "object") {
    throw new ApiValidationError("Prompt payload is required.");
  }

  const record = input as Record<string, unknown>;
  const title = requiredString(record.title, "title", MAX_TEXT.title);
  const slug = requiredString(record.slug, "slug", MAX_TEXT.slug);
  const description = requiredString(
    record.description,
    "description",
    MAX_TEXT.description
  );
  const promptText = requiredString(record.promptText, "promptText", MAX_TEXT.promptText);
  const categoryId = requiredString(record.categoryId, "categoryId", 80);
  const tool = requiredString(record.tool, "tool", MAX_TEXT.tool);
  const difficulty = requiredDifficulty(record.difficulty);
  const tags = parseTags(record.tags);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new ApiValidationError("slug must use lowercase letters, numbers, and hyphens.");
  }

  assertUuid(categoryId, "categoryId is invalid.");

  return {
    title,
    slug,
    description,
    promptText,
    categoryId,
    tool,
    difficulty,
    tags,
    isFeatured: record.isFeatured === true,
    isPublished: record.isPublished === true
  };
}

async function syncPromptTags(promptId: string, tagNames: string[]) {
  const supabase = await createSupabaseCookieClient();
  const { error: deleteError } = await supabase
    .from("prompt_tags")
    .delete()
    .eq("prompt_id", promptId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (tagNames.length === 0) {
    return;
  }

  const tagRows = tagNames.map((name) => ({
    name,
    slug: slugify(name)
  }));

  const { error: upsertError } = await supabase
    .from("tags")
    .upsert(tagRows, { onConflict: "slug" });

  if (upsertError) {
    throw new Error(upsertError.message);
  }

  const { data: tags, error: tagError } = await supabase
    .from("tags")
    .select("id, slug")
    .in(
      "slug",
      tagRows.map((tag) => tag.slug)
    );

  if (tagError) {
    throw new Error(tagError.message);
  }

  const promptTags =
    tags?.map((tag) => ({
      prompt_id: promptId,
      tag_id: tag.id as string
    })) ?? [];

  if (promptTags.length === 0) {
    return;
  }

  const { error: insertError } = await supabase.from("prompt_tags").insert(promptTags);

  if (insertError) {
    throw new Error(insertError.message);
  }
}

function mapAdminPrompt(row: AdminPromptRow): AdminPromptListItem {
  const category = firstRelation(row.categories);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    promptText: row.prompt_text,
    categoryId: row.category_id,
    category: {
      id: category?.id ?? row.category_id,
      name: category?.name ?? "Uncategorized",
      slug: category?.slug ?? "uncategorized"
    },
    tool: row.tool,
    difficulty: row.difficulty,
    tags:
      row.prompt_tags
        ?.map((promptTag) => firstRelation(promptTag.tags))
        .filter((tag): tag is { name: string; slug: string } => Boolean(tag))
        .map((tag) => tag.name) ?? [],
    isFeatured: row.is_featured,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function firstRelation<T>(relation: SupabaseRelation<T>) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function requiredString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== "string" || !value.trim()) {
    throw new ApiValidationError(`${field} is required.`);
  }

  const trimmed = value.trim();

  if (trimmed.length > maxLength) {
    throw new ApiValidationError(`${field} must be ${maxLength} characters or fewer.`);
  }

  return trimmed;
}

function requiredDifficulty(value: unknown): Difficulty {
  if (typeof value !== "string" || !DIFFICULTIES.includes(value as Difficulty)) {
    throw new ApiValidationError("difficulty must be Beginner, Intermediate, or Advanced.");
  }

  return value as Difficulty;
}

function parseTags(value: unknown) {
  const rawTags = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];

  const tags = Array.from(
    new Set(
      rawTags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );

  if (tags.length > MAX_TAGS) {
    throw new ApiValidationError(`tags may include up to ${MAX_TAGS} items.`);
  }

  const tooLongTag = tags.find((tag) => tag.length > MAX_TEXT.tag);

  if (tooLongTag) {
    throw new ApiValidationError(`tag "${tooLongTag}" is too long.`);
  }

  return tags;
}

function assertUuid(value: string, message: string) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
  ) {
    throw new ApiValidationError(message);
  }
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toAdminMutationError(message: string) {
  if (message.toLowerCase().includes("duplicate key")) {
    return new ApiValidationError("A prompt with that slug already exists.");
  }

  return new Error(message);
}
