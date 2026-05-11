import { createSupabaseCookieClient } from "@/lib/supabase/server";
import type { Difficulty, PromptListItem } from "@/lib/types";

type SupabaseRelation<T> = T | T[] | null;

type SavedPromptRow = {
  id: string;
  user_id: string;
  prompt_id: string;
  created_at: string;
  prompts: SupabaseRelation<{
    id: string;
    title: string;
    slug: string;
    description: string;
    tool: string;
    difficulty: Difficulty;
    is_featured: boolean;
    created_at: string;
    categories: SupabaseRelation<{
      name: string;
      slug: string;
    }>;
    prompt_tags:
      | {
          tags: SupabaseRelation<{
            name: string;
            slug: string;
          }>;
        }[]
      | null;
  }>;
};

export type SavedPromptWithPrompt = {
  id: string;
  promptId: string;
  userId: string;
  createdAt: string;
  prompt: PromptListItem | null;
};

export async function getSavedPromptIdsForCurrentUser(userId: string) {
  const supabase = await createSupabaseCookieClient();
  const { data, error } = await supabase
    .from("saved_prompts")
    .select("prompt_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => item.prompt_id as string);
}

export async function getSavedPromptsForCurrentUser(userId: string) {
  const supabase = await createSupabaseCookieClient();
  const { data, error } = await supabase
    .from("saved_prompts")
    .select(
      `
      id,
      user_id,
      prompt_id,
      created_at,
      prompts!inner (
        id,
        title,
        slug,
        description,
        tool,
        difficulty,
        is_featured,
        created_at,
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
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as SavedPromptRow[]).map(mapSavedPromptRow);
}

function mapSavedPromptRow(row: SavedPromptRow): SavedPromptWithPrompt {
  const prompt = firstRelation(row.prompts);
  const category = firstRelation(prompt?.categories ?? null);

  return {
    id: row.id,
    promptId: row.prompt_id,
    userId: row.user_id,
    createdAt: row.created_at,
    prompt: prompt
      ? {
          id: prompt.id,
          title: prompt.title,
          slug: prompt.slug,
          description: prompt.description,
          category: {
            name: category?.name ?? "Uncategorized",
            slug: category?.slug ?? "uncategorized"
          },
          tool: prompt.tool,
          difficulty: prompt.difficulty,
          tags:
            prompt.prompt_tags
              ?.map((promptTag) => firstRelation(promptTag.tags))
              .filter((tag): tag is { name: string; slug: string } =>
                Boolean(tag)
              ) ?? [],
          isFeatured: prompt.is_featured,
          createdAt: prompt.created_at
        }
      : null
  };
}

function firstRelation<T>(relation: SupabaseRelation<T>) {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}
