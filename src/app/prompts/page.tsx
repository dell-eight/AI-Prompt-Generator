import { PromptLibraryClient } from "@/components/prompts/prompt-library-client";
import { getCurrentProfile } from "@/lib/auth";
import {
  filterAndPaginatePrompts,
  getCategories,
  getPublishedPrompts,
  getTags,
  parsePromptListQuery
} from "@/lib/prompt-api";
import type {
  CategoryResponseItem,
  PromptListPagination,
  TagResponseItem
} from "@/lib/types";
import { getSavedPromptIdsForCurrentUser } from "@/lib/saved-prompts";

export const metadata = {
  title: "AI Prompt Library",
  description:
    "Search ready-to-use AI prompt templates by tool, category, difficulty, and tags for ChatGPT, Cursor, Claude, Canva AI, writing, coding, business, and automation.",
  alternates: {
    canonical: "/prompts"
  },
  openGraph: {
    title: "AI Prompt Library - PromptForge",
    description:
      "Browse structured AI prompt templates for writing, coding, debugging, business ideas, image generation, and automation.",
    url: "/prompts"
  }
};

export const dynamic = "force-dynamic";

type PromptLibraryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PromptLibraryPage({
  searchParams
}: PromptLibraryPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialData = await getInitialLibraryData(resolvedSearchParams);

  return (
    <section className="section-padding">
      <div className="page-shell">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Prompt Library</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            AI prompt library for better results
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Search ready-to-use prompt templates for ChatGPT, Cursor, Claude,
            Canva AI, image generation, books, business ideas, coding,
            debugging, AI automation, and n8n workflows.
          </p>
        </div>
        <PromptLibraryClient
          initialPrompts={initialData.prompts}
          initialPagination={initialData.pagination}
          initialError={initialData.error}
          categories={initialData.categories.map(toFilterOption)}
          tags={initialData.tags.map(toFilterOption)}
          savedPromptIds={initialData.savedPromptIds}
          isAuthenticated={initialData.isAuthenticated}
        />
      </div>
    </section>
  );
}

async function getInitialLibraryData(
  searchParams: Record<string, string | string[] | undefined>
) {
  try {
    const queryParams = toUrlSearchParams(searchParams);

    if (!queryParams.has("limit")) {
      queryParams.set("limit", "12");
    }

    if (!queryParams.has("sort")) {
      queryParams.set("sort", "featured");
    }

    const filters = parsePromptListQuery(queryParams);
    const profile = await getCurrentProfile();
    const [prompts, categories, tags, savedPromptIds] = await Promise.all([
      getPublishedPrompts(),
      getCategories(),
      getTags(),
      profile ? getSavedPromptIdsForCurrentUser(profile.id) : Promise.resolve([])
    ]);
    const promptList = filterAndPaginatePrompts(prompts, filters);

    return {
      prompts: promptList.data,
      pagination: promptList.pagination,
      categories: categories.data,
      tags: tags.data,
      savedPromptIds,
      isAuthenticated: Boolean(profile),
      error: ""
    };
  } catch (error) {
    return {
      prompts: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      } satisfies PromptListPagination,
      categories: [],
      tags: [],
      savedPromptIds: [],
      isAuthenticated: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load the prompt library."
    };
  }
}

function toFilterOption(item: CategoryResponseItem | TagResponseItem) {
  return {
    label: item.name,
    value: item.slug
  };
}

function toUrlSearchParams(
  searchParams: Record<string, string | string[] | undefined>
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      params.set(key, value);
    }

    if (Array.isArray(value) && value[0]) {
      params.set(key, value[0]);
    }
  }

  return params;
}
