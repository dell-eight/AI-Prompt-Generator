import type { Prompt } from "@/lib/types";

export const mockPrompts: Prompt[] = [
  {
    id: "prompt-001",
    title: "ChatGPT Business Plan Builder",
    slug: "chatgpt-business-plan-builder",
    description:
      "Turn a rough business idea into a clear plan with audience, offer, positioning, risks, and next actions.",
    category: "Business Ideas",
    tool: "ChatGPT",
    difficulty: "Beginner",
    tags: ["business", "strategy", "planning"],
    isFeatured: true,
    promptText:
      "Act as a startup strategist. Help me turn this business idea into a practical business plan.\n\nBusiness idea: [describe idea]\nTarget customer: [who it serves]\nBudget/time constraints: [constraints]\n\nReturn:\n1. One-sentence positioning\n2. Target customer profile\n3. Core offer\n4. Revenue model\n5. Top 5 risks\n6. First 7-day action plan"
  },
  {
    id: "prompt-002",
    title: "Cursor Feature Implementation Brief",
    slug: "cursor-feature-implementation-brief",
    description:
      "Give Cursor or Codex a precise implementation brief with scope boundaries, files to inspect, and acceptance checks.",
    category: "Cursor/Codex",
    tool: "Codex",
    difficulty: "Intermediate",
    tags: ["coding", "implementation", "handoff"],
    isFeatured: true,
    promptText:
      "You are a senior engineer working in this repository. Implement only the following feature.\n\nFeature: [feature]\nUser goal: [goal]\nIn scope: [scope]\nOut of scope: [limits]\nFiles to inspect first: [paths]\nAcceptance criteria: [criteria]\n\nRead the existing code before editing, follow local patterns, and summarize changed files plus tests run."
  },
  {
    id: "prompt-003",
    title: "Claude Long-Form Chapter Coach",
    slug: "claude-long-form-chapter-coach",
    description:
      "Shape a book chapter with reader promise, outline, key scenes, and revision notes.",
    category: "Book Writing",
    tool: "Claude",
    difficulty: "Beginner",
    tags: ["book", "writing", "outline"],
    isFeatured: false,
    promptText:
      "Act as a patient book editor. Help me improve this chapter idea.\n\nBook topic: [topic]\nChapter goal: [goal]\nReader level: [beginner/intermediate/expert]\nDraft notes: [notes]\n\nReturn a chapter promise, structured outline, weak spots, examples to add, and a revision checklist."
  },
  {
    id: "prompt-004",
    title: "Debugging Root Cause Investigator",
    slug: "debugging-root-cause-investigator",
    description:
      "Analyze an error report and produce a focused debugging plan before changing code.",
    category: "Debugging",
    tool: "Cursor",
    difficulty: "Advanced",
    tags: ["debugging", "logs", "root cause"],
    isFeatured: true,
    promptText:
      "Act as a debugging partner. Diagnose this issue before proposing code changes.\n\nExpected behavior: [expected]\nActual behavior: [actual]\nError/logs: [logs]\nRecent changes: [changes]\nRelevant files: [files]\n\nReturn likely causes ranked by probability, checks to run, minimal fix strategy, and regression tests."
  },
  {
    id: "prompt-005",
    title: "Canva AI Campaign Asset Generator",
    slug: "canva-ai-campaign-asset-generator",
    description:
      "Create a reusable brief for social graphics, ad variations, and launch visuals.",
    category: "Canva AI",
    tool: "Canva AI",
    difficulty: "Beginner",
    tags: ["design", "marketing", "campaign"],
    isFeatured: false,
    promptText:
      "Create a Canva AI design brief for a campaign.\n\nBrand: [brand]\nAudience: [audience]\nOffer: [offer]\nVisual style: [style]\nChannels: [channels]\n\nReturn concepts for hero graphic, social post, story, ad, and email header, including copy and design direction."
  },
  {
    id: "prompt-006",
    title: "Image Generator Product Shot",
    slug: "image-generator-product-shot",
    description:
      "Generate polished product imagery with precise lighting, composition, and background details.",
    category: "Image Generation",
    tool: "DALL-E",
    difficulty: "Intermediate",
    tags: ["image", "product", "creative"],
    isFeatured: false,
    promptText:
      "Create a high-quality product image prompt.\n\nProduct: [product]\nAudience: [audience]\nUse case: [use case]\nStyle: [style]\nColors/materials: [details]\n\nReturn one detailed image prompt with composition, lighting, camera angle, background, and negative constraints."
  },
  {
    id: "prompt-007",
    title: "n8n Automation Planner",
    slug: "n8n-automation-planner",
    description:
      "Map a manual workflow into triggers, nodes, data fields, and error handling.",
    category: "n8n Workflows",
    tool: "n8n",
    difficulty: "Intermediate",
    tags: ["automation", "workflow", "operations"],
    isFeatured: true,
    promptText:
      "Act as an n8n workflow architect. Convert this manual process into an automation plan.\n\nManual process: [process]\nApps involved: [apps]\nTrigger: [trigger]\nData needed: [data]\nFailure risks: [risks]\n\nReturn nodes, data mapping, credentials needed, branching logic, error handling, and test cases."
  },
  {
    id: "prompt-008",
    title: "Student Study Guide Maker",
    slug: "student-study-guide-maker",
    description:
      "Turn messy notes into a study guide with examples, quizzes, and memory hooks.",
    category: "ChatGPT",
    tool: "ChatGPT",
    difficulty: "Beginner",
    tags: ["study", "learning", "notes"],
    isFeatured: false,
    promptText:
      "Act as a study coach. Turn my notes into a clear study guide.\n\nSubject: [subject]\nExam type: [exam]\nNotes: [paste notes]\nWeak areas: [weak areas]\n\nReturn summary, key concepts, examples, practice quiz, answer key, and memory tips."
  },
  {
    id: "prompt-009",
    title: "AI Automation Opportunity Finder",
    slug: "ai-automation-opportunity-finder",
    description:
      "Find repetitive tasks in a business and rank automation ideas by impact and effort.",
    category: "AI Automation",
    tool: "ChatGPT",
    difficulty: "Intermediate",
    tags: ["automation", "business", "prioritization"],
    isFeatured: false,
    promptText:
      "Act as an AI automation consultant. Identify automation opportunities in my workflow.\n\nBusiness type: [business]\nCurrent tasks: [tasks]\nTools used: [tools]\nTeam size: [team]\nConstraints: [constraints]\n\nReturn top automation ideas, impact/effort score, required tools, risks, and first prototype plan."
  }
];

export function getPromptBySlug(slug: string) {
  return mockPrompts.find((prompt) => prompt.slug === slug);
}

export const featuredPrompts = mockPrompts.filter((prompt) => prompt.isFeatured);
