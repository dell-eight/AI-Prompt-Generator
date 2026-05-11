import { EmptyState } from "@/components/ui/state";
import { PromptCard } from "@/components/prompts/prompt-card";
import type { PromptListItem } from "@/lib/types";

type PromptGridProps = {
  prompts: PromptListItem[];
  savedPromptIds?: string[];
  isAuthenticated?: boolean;
  onClearFilters?: () => void;
};

export function PromptGrid({
  prompts,
  savedPromptIds = [],
  isAuthenticated = false,
  onClearFilters
}: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <EmptyState
        title="No prompts match those filters"
        message="Try a broader category, tool, or search phrase."
        action={
          onClearFilters
            ? {
                label: "Clear filters",
                onClick: onClearFilters
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          isAuthenticated={isAuthenticated}
          isSaved={savedPromptIds.includes(prompt.id)}
        />
      ))}
    </div>
  );
}
