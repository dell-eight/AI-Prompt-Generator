"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  FilterSidebar,
  type FilterOption
} from "@/components/prompts/filter-sidebar";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { PromptSearchBar } from "@/components/prompts/prompt-search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ErrorMessage, LoadingState } from "@/components/ui/state";
import type {
  Difficulty,
  PromptListItem,
  PromptListPagination,
  PromptListResponse
} from "@/lib/types";

const PAGE_SIZE = 12;
const emptyPagination: PromptListPagination = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false
};

type SortOption = PromptListResponse["filters"]["sort"];
type FilterKey = "category" | "tool" | "difficulty" | "tag";

type PromptLibraryClientProps = {
  initialPrompts: PromptListItem[];
  initialPagination?: PromptListPagination;
  initialError?: string;
  categories: FilterOption[];
  tags: FilterOption[];
  savedPromptIds?: string[];
  isAuthenticated?: boolean;
};

export function PromptLibraryClient({
  initialPrompts,
  initialPagination = emptyPagination,
  initialError,
  categories,
  tags,
  savedPromptIds = [],
  isAuthenticated = false
}: PromptLibraryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const didMount = useRef(false);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState(() =>
    getParamOrAll(searchParams, "category")
  );
  const [tool, setTool] = useState(() => getParamOrAll(searchParams, "tool"));
  const [difficulty, setDifficulty] = useState<"All" | Difficulty>(() =>
    parseDifficultyParam(searchParams.get("difficulty"))
  );
  const [tag, setTag] = useState(() => getParamOrAll(searchParams, "tag"));
  const [sort, setSort] = useState<SortOption>(() =>
    parseSortParam(searchParams.get("sort"))
  );
  const [page, setPage] = useState(() => parsePageParam(searchParams.get("page")));
  const [prompts, setPrompts] = useState(initialPrompts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError ?? "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters =
    Boolean(query.trim()) ||
    category !== "All" ||
    tool !== "All" ||
    difficulty !== "All" ||
    tag !== "All" ||
    sort !== "featured";

  const loadPrompts = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
        sort
      });

      if (query.trim()) {
        params.set("q", query.trim());
      }

      if (category !== "All") {
        params.set("category", category);
      }

      if (tool !== "All") {
        params.set("tool", tool);
      }

      if (difficulty !== "All") {
        params.set("difficulty", difficulty);
      }

      if (tag !== "All") {
        params.set("tag", tag);
      }

      const response = await fetch(`/api/prompts?${params.toString()}`, {
        signal
      });
      const body = (await response.json()) as
        | PromptListResponse
        | { error?: { message?: string } };

      if (!response.ok) {
        throw new Error(
          "error" in body && body.error?.message
            ? body.error.message
            : "Unable to load prompts."
        );
      }

      const data = body as PromptListResponse;
      setPrompts(data.data);
      setPagination(data.pagination);
      syncUrl({
        pathname,
        router,
        query,
        category,
        tool,
        difficulty,
        tag,
        sort,
        page
      });
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") {
        return;
      }

      setPrompts([]);
      setPagination(emptyPagination);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load prompts."
      );
    } finally {
      setIsLoading(false);
    }
  }, [category, difficulty, page, pathname, query, router, sort, tag, tool]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      void loadPrompts(controller.signal);
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [loadPrompts]);

  function resetToFirstPage() {
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setTool("All");
    setDifficulty("All");
    setTag("All");
    setSort("featured");
    setPage(1);
    setShowMobileFilters(false);
  }

  function clearFilter(filter: FilterKey) {
    if (filter === "category") {
      setCategory("All");
    }

    if (filter === "tool") {
      setTool("All");
    }

    if (filter === "difficulty") {
      setDifficulty("All");
    }

    if (filter === "tag") {
      setTag("All");
    }

    resetToFirstPage();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setShowMobileFilters((current) => !current)}
          aria-controls="prompt-library-filters"
          aria-expanded={showMobileFilters}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showMobileFilters ? "Hide filters" : "Show filters"}
        </Button>
      </div>
      <FilterSidebar
        id="prompt-library-filters"
        className={
          showMobileFilters
            ? "rounded-lg border bg-card p-4 lg:block"
            : "hidden rounded-lg border bg-card p-4 lg:block"
        }
        categories={categories}
        tags={tags}
        selectedCategory={category}
        selectedTool={tool}
        selectedDifficulty={difficulty}
        selectedTag={tag}
        onCategoryChange={(nextCategory) => {
          setCategory(nextCategory);
          resetToFirstPage();
        }}
        onToolChange={(nextTool) => {
          setTool(nextTool);
          resetToFirstPage();
        }}
        onDifficultyChange={(nextDifficulty) => {
          setDifficulty(nextDifficulty);
          resetToFirstPage();
        }}
        onTagChange={(nextTag) => {
          setTag(nextTag);
          resetToFirstPage();
        }}
      />
      <div className="space-y-4">
        <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_180px]">
          <PromptSearchBar
            value={query}
            onChange={(nextQuery) => {
              setQuery(nextQuery);
              resetToFirstPage();
            }}
            onClear={() => {
              setQuery("");
              resetToFirstPage();
            }}
          />
          <Select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortOption);
              resetToFirstPage();
            }}
            aria-label="Sort prompts"
          >
            <option value="featured">Featured first</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
          </Select>
          <div className="space-y-3 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing {prompts.length} of {pagination.total} prompts.
              </p>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4" />
                  Clear all
                </Button>
              ) : null}
            </div>
            <ActiveFilterList
              query={query}
              category={category}
              tool={tool}
              difficulty={difficulty}
              tag={tag}
              sort={sort}
              categories={categories}
              tags={tags}
              onClearSearch={() => {
                setQuery("");
                resetToFirstPage();
              }}
              onClearFilter={clearFilter}
              onClearSort={() => {
                setSort("featured");
                resetToFirstPage();
              }}
            />
          </div>
        </div>

        {error ? (
          <div className="space-y-3">
            <ErrorMessage
              title="Prompt library could not load"
              message={error}
            />
            <Button type="button" variant="outline" onClick={() => void loadPrompts()}>
              Retry
            </Button>
          </div>
        ) : isLoading ? (
          <LoadingState
            title="Loading prompts"
            message="Fetching the latest prompt library from the API."
          />
        ) : (
          <PromptGrid
            prompts={prompts}
            savedPromptIds={savedPromptIds}
            isAuthenticated={isAuthenticated}
            onClearFilters={hasActiveFilters ? clearFilters : undefined}
          />
        )}

        {!error && !isLoading ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!pagination.hasPreviousPage}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ActiveFilterList({
  query,
  category,
  tool,
  difficulty,
  tag,
  sort,
  categories,
  tags,
  onClearSearch,
  onClearFilter,
  onClearSort
}: {
  query: string;
  category: string;
  tool: string;
  difficulty: "All" | Difficulty;
  tag: string;
  sort: SortOption;
  categories: FilterOption[];
  tags: FilterOption[];
  onClearSearch: () => void;
  onClearFilter: (filter: FilterKey) => void;
  onClearSort: () => void;
}) {
  const activeFilters = [
    query.trim()
      ? {
          label: `Search: ${query.trim()}`,
          onClear: onClearSearch
        }
      : null,
    category !== "All"
      ? {
          label: `Category: ${getFilterLabel(categories, category)}`,
          onClear: () => onClearFilter("category")
        }
      : null,
    tool !== "All"
      ? {
          label: `Tool: ${tool}`,
          onClear: () => onClearFilter("tool")
        }
      : null,
    difficulty !== "All"
      ? {
          label: `Difficulty: ${difficulty}`,
          onClear: () => onClearFilter("difficulty")
        }
      : null,
    tag !== "All"
      ? {
          label: `Tag: ${getFilterLabel(tags, tag)}`,
          onClear: () => onClearFilter("tag")
        }
      : null,
    sort !== "featured"
      ? {
          label: `Sort: ${getSortLabel(sort)}`,
          onClear: onClearSort
        }
      : null
  ].filter((filter): filter is { label: string; onClear: () => void } =>
    Boolean(filter)
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter) => (
        <Badge
          key={filter.label}
          variant="secondary"
          className="gap-1 rounded-md pr-1"
        >
          {filter.label}
          <button
            type="button"
            onClick={filter.onClear}
            className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-background hover:text-foreground"
            aria-label={`Remove ${filter.label}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

function syncUrl({
  pathname,
  router,
  query,
  category,
  tool,
  difficulty,
  tag,
  sort,
  page
}: {
  pathname: string;
  router: ReturnType<typeof useRouter>;
  query: string;
  category: string;
  tool: string;
  difficulty: "All" | Difficulty;
  tag: string;
  sort: SortOption;
  page: number;
}) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("q", query.trim());
  }

  if (category !== "All") {
    params.set("category", category);
  }

  if (tool !== "All") {
    params.set("tool", tool);
  }

  if (difficulty !== "All") {
    params.set("difficulty", difficulty);
  }

  if (tag !== "All") {
    params.set("tag", tag);
  }

  if (sort !== "featured") {
    params.set("sort", sort);
  }

  if (page > 1) {
    params.set("page", page.toString());
  }

  const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
  router.replace(nextUrl, { scroll: false });
}

function getParamOrAll(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key)?.trim() || "All";
}

function parseDifficultyParam(value: string | null): "All" | Difficulty {
  if (
    value === "Beginner" ||
    value === "Intermediate" ||
    value === "Advanced"
  ) {
    return value;
  }

  return "All";
}

function parseSortParam(value: string | null): SortOption {
  if (
    value === "featured" ||
    value === "newest" ||
    value === "oldest" ||
    value === "title"
  ) {
    return value;
  }

  return "featured";
}

function parsePageParam(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function getFilterLabel(options: FilterOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function getSortLabel(sort: SortOption) {
  if (sort === "newest") {
    return "Newest";
  }

  if (sort === "oldest") {
    return "Oldest";
  }

  if (sort === "title") {
    return "Title A-Z";
  }

  return "Featured first";
}
