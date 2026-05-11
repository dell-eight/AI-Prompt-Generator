import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/lib/types";

export function CategoryBadge({ category }: { category: string }) {
  return <Badge variant="info">{category}</Badge>;
}

export function ToolBadge({ tool }: { tool: string }) {
  return <Badge variant="secondary">{tool}</Badge>;
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const variant =
    difficulty === "Beginner"
      ? "success"
      : difficulty === "Intermediate"
        ? "warning"
        : "outline";

  return <Badge variant={variant}>{difficulty}</Badge>;
}
