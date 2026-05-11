import type { Difficulty, PromptCategory, PromptTool } from "@/lib/types";

export const promptCategories: PromptCategory[] = [
  "ChatGPT",
  "Cursor/Codex",
  "Claude",
  "Canva AI",
  "Image Generation",
  "Book Writing",
  "Business Ideas",
  "Coding",
  "Debugging",
  "AI Automation",
  "n8n Workflows"
];

export const promptTools: PromptTool[] = [
  "ChatGPT",
  "Cursor",
  "Codex",
  "Claude",
  "Canva AI",
  "Midjourney",
  "DALL-E",
  "n8n"
];

export const difficulties: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced"
];
