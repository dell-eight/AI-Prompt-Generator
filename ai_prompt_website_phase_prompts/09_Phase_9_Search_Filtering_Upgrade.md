# Phase 9 — Search and Filtering Upgrade

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

- Search and Filtering Agent
- Backend Development Agent
- Frontend Development Agent
- Testing and QA Agent

## Phase Goal

Improve search, filtering, sorting, URL query state, and search UX after core data is connected.

## Do NOT Do in This Phase

Do not add vector search or external search engines unless the basic search is already insufficient.

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
Act as the Search and Filtering Agent, Backend Development Agent, Frontend Development Agent, and Testing and QA Agent.

Your task is to implement Phase 9: Search and filtering upgrade.

Before editing:
1. Read current prompt API search behavior.
2. Read prompt library frontend page.
3. Read database indexes.
4. Do not replace working search with unnecessary complex tools.

Search improvements:
- Keyword search should work across title, description, prompt text, tool, category, and tags where practical.
- Filters should support category, tool, difficulty, and tags.
- Sort should support featured, newest, and title if practical.
- Search/filter state should be reflected in the URL query string if suitable.
- User should be able to clear filters.
- Empty state should suggest removing filters or trying another keyword.
- Loading and error states should be clear.

Backend:
- Improve query handling.
- Add or recommend useful indexes.
- Keep safe pagination limits.
- Return consistent response format.

Frontend:
- Improve search bar and filters.
- Keep mobile filter UX usable.
- Prevent confusing UI states.
- Avoid unnecessary API calls if simple debounce is practical.

QA:
Create test cases for:
- Search by title
- Search by tag
- Filter by category
- Filter by tool
- Filter by difficulty
- Combined filters
- Empty results
- Pagination/load more
- Mobile filter usage

Expected output after implementation:
1. Search improvements summary
2. Files created or changed
3. Index changes if any
4. Manual testing checklist
5. Known limitations
6. Recommended next phase

```
