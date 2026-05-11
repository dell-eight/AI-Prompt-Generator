"use client";

import type { ReactNode } from "react";

import { difficulties, promptCategories, promptTools } from "@/lib/constants";
import type { Difficulty } from "@/lib/types";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterSidebarProps = {
  categories?: FilterOption[];
  tags?: FilterOption[];
  id?: string;
  className?: string;
  selectedCategory: string;
  selectedTool: string;
  selectedDifficulty: "All" | Difficulty;
  selectedTag: string;
  onCategoryChange: (category: string) => void;
  onToolChange: (tool: string) => void;
  onDifficultyChange: (difficulty: "All" | Difficulty) => void;
  onTagChange: (tag: string) => void;
};

export function FilterSidebar({
  categories,
  tags,
  id,
  className,
  selectedCategory,
  selectedTool,
  selectedDifficulty,
  selectedTag,
  onCategoryChange,
  onToolChange,
  onDifficultyChange,
  onTagChange
}: FilterSidebarProps) {
  const categoryOptions =
    categories && categories.length > 0
      ? categories
      : promptCategories.map((category) => ({
          label: category,
          value: category
        }));

  const toolOptions = promptTools.map((tool) => ({
    label: tool,
    value: tool
  }));

  return (
    <aside id={id} className={className ?? "rounded-lg border bg-card p-4"}>
      <div>
        <h2 className="text-sm font-semibold">Filters</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Narrow the library by use case and tool.
        </p>
      </div>

      <FilterGroup title="Category">
        {[{ label: "All", value: "All" }, ...categoryOptions].map((category) => (
          <FilterButton
            key={category.value}
            isActive={selectedCategory === category.value}
            label={category.label}
            onClick={() => onCategoryChange(category.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tool">
        {[{ label: "All", value: "All" }, ...toolOptions].map((tool) => (
          <FilterButton
            key={tool.value}
            isActive={selectedTool === tool.value}
            label={tool.label}
            onClick={() => onToolChange(tool.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Difficulty">
        {(["All", ...difficulties] as const).map((difficulty) => (
          <FilterButton
            key={difficulty}
            isActive={selectedDifficulty === difficulty}
            label={difficulty}
            onClick={() => onDifficultyChange(difficulty)}
          />
        ))}
      </FilterGroup>

      {tags && tags.length > 0 ? (
        <FilterGroup title="Tag">
          {[{ label: "All", value: "All" }, ...tags].slice(0, 16).map((tag) => (
            <FilterButton
              key={tag.value}
              isActive={selectedTag === tag.value}
              label={tag.label}
              onClick={() => onTagChange(tag.value)}
            />
          ))}
        </FilterGroup>
      ) : null}
    </aside>
  );
}

function FilterGroup({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 lg:flex-col">{children}</div>
    </div>
  );
}

function FilterButton({
  isActive,
  label,
  onClick
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isActive
          ? "rounded-md bg-primary px-3 py-2 text-left text-sm font-medium text-primary-foreground"
          : "rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}
