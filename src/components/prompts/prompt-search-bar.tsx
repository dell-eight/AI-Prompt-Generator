"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

type PromptSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export function PromptSearchBar({
  value,
  onChange,
  onClear
}: PromptSearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search prompts, tools, tags, or use cases..."
        className="pl-9 pr-10"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
