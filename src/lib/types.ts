export type PromptCategory =
  | "ChatGPT"
  | "Cursor/Codex"
  | "Claude"
  | "Canva AI"
  | "Image Generation"
  | "Book Writing"
  | "Business Ideas"
  | "Coding"
  | "Debugging"
  | "AI Automation"
  | "n8n Workflows";

export type PromptTool =
  | "ChatGPT"
  | "Cursor"
  | "Codex"
  | "Claude"
  | "Canva AI"
  | "Midjourney"
  | "DALL-E"
  | "n8n";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Prompt = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: PromptCategory;
  tool: PromptTool;
  difficulty: Difficulty;
  tags: string[];
  promptText: string;
  isFeatured: boolean;
};

export type PromptTaxonomyItem = {
  name: string;
  slug: string;
};

export type PromptListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: PromptTaxonomyItem;
  tool: string;
  difficulty: Difficulty;
  tags: PromptTaxonomyItem[];
  isFeatured: boolean;
  createdAt: string;
};

export type PromptDetail = PromptListItem & {
  promptText: string;
  updatedAt: string;
  relatedPrompts: PromptListItem[];
};

export type PromptListPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PromptListResponse = {
  data: PromptListItem[];
  pagination: PromptListPagination;
  filters: {
    q: string | null;
    category: string | null;
    tool: string | null;
    difficulty: Difficulty | null;
    tag: string | null;
    featured: boolean | null;
    sort: "featured" | "newest" | "oldest" | "title";
  };
};

export type CategoryResponseItem = PromptTaxonomyItem & {
  id: string;
  description: string;
  sortOrder: number;
  createdAt: string;
};

export type TagResponseItem = PromptTaxonomyItem & {
  id: string;
  createdAt: string;
};

export type GeneratedPromptRequest = {
  promptType: PromptCategory;
  targetTool: PromptTool;
  userGoal: string;
  context: string;
  audience: string;
  outputFormat: string;
  tone: string;
  constraints: string;
  examples: string;
};

export type GeneratedPromptResponse = {
  data: {
    generatedPrompt: string;
    generatedPromptId: string | null;
  };
};

export type SavedPrompt = {
  id: string;
  promptId: string;
  userId: string;
  createdAt: string;
};
