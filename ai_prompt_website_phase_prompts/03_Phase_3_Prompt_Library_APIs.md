# Phase 3 — Prompt Library Backend APIs

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

- Backend Development Agent
- Database Design Agent
- Search and Filtering Agent

## Phase Goal

Create backend API endpoints for prompts, categories, tags, and prompt detail data.

## Do NOT Do in This Phase

Do not connect frontend yet except minimal testing if needed. Do not add auth/admin CRUD yet.

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
Act as the Backend Development Agent, Database Design Agent, and Search and Filtering Agent.

Your task is to implement Phase 3: Prompt Library Backend APIs.

Before editing:
1. Read existing backend/API route structure.
2. Read the database schema.
3. Read seed data structure.
4. Do not rewrite unrelated files.

Create API endpoints for public prompt library access:

Prompt endpoints:
- GET /api/prompts
- GET /api/prompts/[slug] or GET /api/prompts/:slug

Category and tag endpoints:
- GET /api/categories
- GET /api/tags

GET /api/prompts should support query parameters:
- q for keyword search
- category
- tool
- difficulty
- tag
- featured
- page
- limit
- sort

Search behavior:
- Search title, description, prompt text, tool, category, and tags where practical.
- Return only published prompts.
- Default sort should be useful for users, such as featured first or newest first.
- Include pagination if practical.

Response shape should include:
- prompt id
- title
- slug
- description
- category
- tool
- difficulty
- tags
- isFeatured
- createdAt

Prompt detail response should include:
- full promptText
- all metadata
- related prompts if simple to add
- no private/admin-only fields

Validation:
- Validate query params.
- Use safe defaults for page and limit.
- Do not allow huge limit values.
- Return clean error messages.

Expected output after implementation:
1. API endpoints created
2. Request/response examples
3. Files created or changed
4. How to test endpoints manually
5. Edge cases handled
6. Recommended next phase

```
