import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  CategoryBadge,
  DifficultyBadge,
  ToolBadge
} from "@/components/prompts/prompt-badges";
import { CopyButton, SaveButton } from "@/components/prompts/prompt-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { PromptListItem } from "@/lib/types";

type PromptCardData = PromptListItem & {
  promptText?: string;
};

type PromptCardProps = {
  prompt: PromptCardData;
  isAuthenticated?: boolean;
  isSaved?: boolean;
};

export function PromptCard({
  prompt,
  isAuthenticated = false,
  isSaved = false
}: PromptCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          <CategoryBadge category={prompt.category.name} />
          <ToolBadge tool={prompt.tool} />
          <DifficultyBadge difficulty={prompt.difficulty} />
        </div>
        <CardTitle className="leading-tight">{prompt.title}</CardTitle>
        <CardDescription>{prompt.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          {prompt.promptText ? <CopyButton text={prompt.promptText} /> : null}
          <SaveButton
            promptId={prompt.id}
            initialSaved={isSaved}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/prompts/${prompt.slug}`}>
            View
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
