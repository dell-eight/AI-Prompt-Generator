# Phase 1 — Static MVP UI With Mock Data

# Project Context

I am building an AI Prompt Website.

The website helps users browse, search, copy, save, and generate high-quality AI prompts for:
- ChatGPT
- Cursor/Codex
- Claude
- Canva AI
- Image generators
- Book writing
- Business ideas
- Coding projects
- Debugging
- AI automation
- n8n workflows

Target users:
- Beginners using AI tools
- Developers
- Business owners
- Content creators
- Book writers
- Students
- Freelancers
- AI automation builders

Main problem:
Most people write weak prompts because they do not know how to provide context, goals, constraints, examples, and output formats.

Main solution:
The website helps users discover and generate strong, structured, copy-paste-ready prompts.


## Agents Used in This Phase

- Master Orchestrator Agent
- UI/UX Design Agent
- Frontend Development Agent

## Phase Goal

Build the first visible version of the website using mock data only.

## Do NOT Do in This Phase

Do not add backend, database, auth logic, payment logic, real AI API integration, or deployment yet.

## Universal Rules for Cursor/Codex

- Read the existing project structure before editing.
- Read relevant files before changing them.
- Do not rewrite the whole application.
- Make the smallest safe change needed for this phase.
- Do not implement future phases early.
- Do not break existing features.
- Keep the code beginner-friendly and maintainable.
- Use reusable components and clear file organization.
- Explain every file created or changed.
- Use environment variables for secrets.
- Never expose API keys or credentials.
- Include manual testing steps.
- Include any commands I need to run.
- If something is unclear but not blocking, make a reasonable assumption and continue.
- Ask only when truly blocked.


## Copy-Paste Prompt for Cursor/Codex

```text
Act as the Master Orchestrator Agent, UI/UX Design Agent, and Frontend Development Agent.

Your task is to implement Phase 1: Static MVP UI with mock data only.

Build a clean, modern, beginner-friendly SaaS-style interface for my AI Prompt Website.

Pages to create:
1. Homepage
2. Prompt Library page
3. Prompt Detail page
4. Prompt Generator page
5. Saved Prompts page
6. Login page
7. Register page
8. Basic Admin Dashboard placeholder

Required UI components:
- Navbar
- Footer
- PromptCard
- PromptGrid
- PromptSearchBar
- FilterSidebar
- CategoryBadge
- ToolBadge
- DifficultyBadge
- CopyButton
- SaveButton placeholder
- PromptGeneratorForm placeholder
- PromptOutputBox placeholder
- AuthForm
- AdminTable placeholder
- LoadingState
- EmptyState
- ErrorMessage

Use mock prompt data with these fields:
- id
- title
- slug
- description
- category
- tool
- difficulty
- tags
- promptText
- isFeatured

Prompt categories:
- ChatGPT
- Cursor/Codex
- Claude
- Canva AI
- Image Generation
- Book Writing
- Business Ideas
- Coding
- Debugging
- AI Automation
- n8n Workflows

Design requirements:
- Modern
- Clean
- Beginner-friendly
- Responsive
- Easy to read
- SaaS-style
- Useful even before backend exists

Implementation rules:
- Use mock data only.
- Do not connect to APIs yet.
- Do not add real authentication yet.
- Do not add real AI generation yet.
- Reuse components.
- Avoid duplicate card layouts.
- Keep folder structure clean.

Expected output after implementation:
1. Summary of what was built
2. Files created or changed
3. Explanation of each file
4. How to run the project
5. Manual testing steps
6. Recommended next phase

```
