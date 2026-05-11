import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Difficulty } from "@/lib/types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;
const MAX_FILTER_LENGTH = 120;
const MAX_PROMPTS_TO_FILTER = 1000;
const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = ["featured", "newest", "oldest", "title"] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

export type ApiPromptListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: {
    name: string;
    slug: string;
  };
  tool: string;
  difficulty: Difficulty;
  tags: {
    name: string;
    slug: string;
  }[];
  isFeatured: boolean;
  createdAt: string;
};

export type ApiPromptDetail = ApiPromptListItem & {
  promptText: string;
  updatedAt: string;
  relatedPrompts: ApiPromptListItem[];
};

type SupabaseRelation<T> = T | T[] | null;

type SupabasePromptTag = {
  tags: SupabaseRelation<{
    name: string;
    slug: string;
  }>;
};

type SupabasePromptRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  prompt_text: string;
  tool: string;
  difficulty: Difficulty;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  categories: SupabaseRelation<{
    name: string;
    slug: string;
  }>;
  prompt_tags: SupabasePromptTag[] | null;
};

export class ApiValidationError extends Error {
  status = 400;

  constructor(message: string) {
    super(message);
    this.name = "ApiValidationError";
  }
}

export function jsonError(error: unknown) {
  if (error instanceof ApiValidationError) {
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
        message: "Something went wrong while processing the request."
      }
    },
    { status: 500 }
  );
}

export function parsePromptListQuery(searchParams: URLSearchParams) {
  return {
    q: parseOptionalText(searchParams, "q"),
    category: parseOptionalText(searchParams, "category"),
    tool: parseOptionalText(searchParams, "tool"),
    difficulty: parseDifficulty(searchParams),
    tag: parseOptionalText(searchParams, "tag"),
    featured: parseFeatured(searchParams),
    page: parsePositiveInteger(searchParams, "page", DEFAULT_PAGE),
    limit: parseLimit(searchParams),
    sort: parseSort(searchParams)
  };
}

export async function getPublishedPrompts() {
  const supabase = createSupabaseServerClient();

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
      created_at,
      updated_at,
      categories!inner (
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
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(MAX_PROMPTS_TO_FILTER);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapPromptRow);
}

export async function getPromptBySlug(slug: string) {
  if (!isSafeSlug(slug)) {
    throw new ApiValidationError("Prompt slug is invalid.");
  }

  const prompts = await getPublishedPrompts();
  const prompt = prompts.find((item) => item.slug === slug);

  if (!prompt) {
    return null;
  }

  const relatedPrompts = prompts
    .filter((item) => item.id !== prompt.id)
    .filter((item) => {
      if (item.category.slug === prompt.category.slug) {
        return true;
      }

      const promptTagSlugs = new Set(prompt.tags.map((tag) => tag.slug));
      return item.tags.some((tag) => promptTagSlugs.has(tag.slug));
    })
    .sort(sortPrompts("featured"))
    .slice(0, 3)
    .map(toListItem);

  return {
    ...prompt,
    relatedPrompts
  };
}

export function filterAndPaginatePrompts(
  prompts: ApiPromptDetail[],
  filters: ReturnType<typeof parsePromptListQuery>
) {
  const filtered = prompts
    .filter((prompt) => matchesSearch(prompt, filters.q))
    .filter((prompt) => matchesTextFilter(prompt.category, filters.category))
    .filter((prompt) => matchesLooseText(prompt.tool, filters.tool))
    .filter((prompt) => !filters.difficulty || prompt.difficulty === filters.difficulty)
    .filter((prompt) => matchesTag(prompt, filters.tag))
    .filter((prompt) => filters.featured === undefined || prompt.isFeatured === filters.featured)
    .sort(sortPrompts(filters.sort));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.limit));
  const start = (filters.page - 1) * filters.limit;
  const items = filtered.slice(start, start + filters.limit).map(toListItem);

  return {
    data: items,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages,
      hasNextPage: filters.page < totalPages,
      hasPreviousPage: filters.page > 1
    },
    filters: {
      q: filters.q ?? null,
      category: filters.category ?? null,
      tool: filters.tool ?? null,
      difficulty: filters.difficulty ?? null,
      tag: filters.tag ?? null,
      featured: filters.featured ?? null,
      sort: filters.sort
    }
  };
}

export async function getCategories() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []).map((category) => ({
      id: category.id as string,
      name: category.name as string,
      slug: category.slug as string,
      description: category.description as string,
      sortOrder: category.sort_order as number,
      createdAt: category.created_at as string
    }))
  };
}

export async function getTags() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("tags")
    .select("id, name, slug, created_at")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []).map((tag) => ({
      id: tag.id as string,
      name: tag.name as string,
      slug: tag.slug as string,
      createdAt: tag.created_at as string
    }))
  };
}

function mapPromptRow(row: SupabasePromptRow): ApiPromptDetail {
  const category = firstRelation(row.categories);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    category: {
      name: category?.name ?? "Uncategorized",
      slug: category?.slug ?? "uncategorized"
    },
    tool: row.tool,
    difficulty: row.difficulty,
    tags:
      row.prompt_tags
        ?.map((promptTag) => firstRelation(promptTag.tags))
        .filter((tag): tag is { name: string; slug: string } => Boolean(tag)) ?? [],
    promptText: row.prompt_text,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    relatedPrompts: []
  };
}

function toListItem(prompt: ApiPromptDetail): ApiPromptListItem {
  return {
    id: prompt.id,
    title: prompt.title,
    slug: prompt.slug,
    description: prompt.description,
    category: prompt.category,
    tool: prompt.tool,
    difficulty: prompt.difficulty,
    tags: prompt.tags,
    isFeatured: prompt.isFeatured,
    createdAt: prompt.createdAt
  };
}

function firstRelation<T>(relation: SupabaseRelation<T>) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function parseOptionalText(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);

  if (value === null) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length > MAX_FILTER_LENGTH) {
    throw new ApiValidationError(`${key} must be ${MAX_FILTER_LENGTH} characters or fewer.`);
  }

  return trimmed;
}

function parseDifficulty(searchParams: URLSearchParams) {
  const value = parseOptionalText(searchParams, "difficulty");

  if (!value) {
    return undefined;
  }

  const difficulty = DIFFICULTIES.find(
    (item) => item.toLowerCase() === value.toLowerCase()
  );

  if (!difficulty) {
    throw new ApiValidationError("difficulty must be Beginner, Intermediate, or Advanced.");
  }

  return difficulty;
}

function parseFeatured(searchParams: URLSearchParams) {
  const value = parseOptionalText(searchParams, "featured");

  if (!value) {
    return undefined;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new ApiValidationError("featured must be true or false.");
}

function parsePositiveInteger(
  searchParams: URLSearchParams,
  key: string,
  fallback: number
) {
  const value = searchParams.get(key);

  if (value === null || value.trim() === "") {
    return fallback;
  }

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue < 1) {
    throw new ApiValidationError(`${key} must be a positive integer.`);
  }

  return numberValue;
}

function parseLimit(searchParams: URLSearchParams) {
  const limit = parsePositiveInteger(searchParams, "limit", DEFAULT_LIMIT);

  if (limit > MAX_LIMIT) {
    throw new ApiValidationError(`limit must be ${MAX_LIMIT} or fewer.`);
  }

  return limit;
}

function parseSort(searchParams: URLSearchParams): SortOption {
  const value = parseOptionalText(searchParams, "sort");

  if (!value) {
    return "featured";
  }

  if (SORT_OPTIONS.includes(value as SortOption)) {
    return value as SortOption;
  }

  throw new ApiValidationError("sort must be featured, newest, oldest, or title.");
}

function matchesSearch(prompt: ApiPromptDetail, query: string | undefined) {
  if (!query) {
    return true;
  }

  const haystack = [
    prompt.title,
    prompt.description,
    prompt.promptText,
    prompt.tool,
    prompt.category.name,
    prompt.category.slug,
    ...prompt.tags.flatMap((tag) => [tag.name, tag.slug])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function matchesTextFilter(
  value: { name: string; slug: string },
  filter: string | undefined
) {
  if (!filter) {
    return true;
  }

  return normalizeToken(value.name) === normalizeToken(filter) || value.slug === normalizeToken(filter);
}

function matchesLooseText(value: string, filter: string | undefined) {
  if (!filter) {
    return true;
  }

  return normalizeToken(value) === normalizeToken(filter);
}

function matchesTag(prompt: ApiPromptDetail, filter: string | undefined) {
  if (!filter) {
    return true;
  }

  const normalizedFilter = normalizeToken(filter);

  return prompt.tags.some(
    (tag) => tag.slug === normalizedFilter || normalizeToken(tag.name) === normalizedFilter
  );
}

function sortPrompts(sort: SortOption) {
  return (left: ApiPromptDetail, right: ApiPromptDetail) => {
    if (sort === "title") {
      return left.title.localeCompare(right.title);
    }

    if (sort === "oldest") {
      return Date.parse(left.createdAt) - Date.parse(right.createdAt);
    }

    if (sort === "newest") {
      return Date.parse(right.createdAt) - Date.parse(left.createdAt);
    }

    if (left.isFeatured !== right.isFeatured) {
      return left.isFeatured ? -1 : 1;
    }

    return Date.parse(right.createdAt) - Date.parse(left.createdAt);
  };
}

function normalizeToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
