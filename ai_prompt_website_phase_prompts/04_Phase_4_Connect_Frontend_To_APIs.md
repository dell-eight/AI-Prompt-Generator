# Phase 4 — Connect Frontend to Prompt APIs

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

- Frontend Development Agent
- Search and Filtering Agent
- Backend Development Agent

## Phase Goal

Replace mock prompt browsing with real API data for prompt list, search, filters, and prompt detail pages.

## Do NOT Do in This Phase

Do not add auth, saved prompts, admin CRUD, or AI generation yet.

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
Act as the Frontend Development Agent, Search and Filtering Agent, and Backend Development Agent.

Your task is to implement Phase 4: Connect the frontend to the prompt library APIs.

Before editing:
1. Read the existing frontend pages and components.
2. Read the API route contracts from the current project.
3. Read mock data usage.
4. Do not delete useful mock data unless no longer needed.
5. Do not rewrite the whole UI.

Connect these pages to real API data:
1. Prompt Library page
2. Prompt Detail page
3. Homepage featured prompts if available

Prompt Library page should support:
- Search by keyword
- Filter by category
- Filter by tool
- Filter by difficulty
- Filter by tag if already practical
- Sort if available
- Loading state
- Empty state
- Error state
- Pagination or load more if API supports it

Prompt Detail page should:
- Load prompt by slug
- Show title, description, category, tool, difficulty, tags, and prompt text
- Include copy button
- Include save button placeholder if auth is not ready yet
- Show related prompts if the API supports it

Important:
- Keep UI responsive.
- Keep components reusable.
- Do not add authentication yet.
- Do not add admin dashboard functionality yet.
- Do not add real AI generation yet.

Expected output after implementation:
1. Summary of frontend/API connection
2. Files created or changed
3. Mock data removed or retained
4. How search/filtering works
5. Manual testing steps
6. Known limitations
7. Recommended next phase

```
