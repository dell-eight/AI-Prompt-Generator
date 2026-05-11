# Phase 6 — Saved Prompts Feature

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

- Authentication and User Account Agent
- Backend Development Agent
- Frontend Development Agent
- Database Design Agent

## Phase Goal

Allow logged-in users to save and unsave prompts and view their saved prompt collection.

## Do NOT Do in This Phase

Do not add collections/folders, sharing, or paid saved prompt limits yet.

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
Act as the Authentication and User Account Agent, Backend Development Agent, Frontend Development Agent, and Database Design Agent.

Your task is to implement Phase 6: Saved Prompts.

Before editing:
1. Read existing auth implementation.
2. Read saved_prompts schema/model.
3. Read PromptCard, PromptDetail, and Saved Prompts page.
4. Do not change unrelated auth behavior.

Feature requirements:
- Logged-in users can save a prompt.
- Logged-in users can unsave a prompt.
- Logged-in users can view saved prompts on /saved.
- Guest users who click save should be guided to login/register.
- Prompt cards and prompt detail pages should show saved/unsaved state if user is logged in.

API endpoints:
- GET /api/saved-prompts
- POST /api/saved-prompts
- DELETE /api/saved-prompts/[id] or DELETE by promptId

Validation:
- User must be authenticated.
- User can only see their own saved prompts.
- Prevent duplicate saved prompts.
- Return safe error messages.

Frontend behavior:
- Save button loading state
- Save button success state
- Unsave action
- Empty saved prompts state
- Error state

Expected output after implementation:
1. Saved prompts behavior summary
2. API endpoints created/updated
3. Files created or changed
4. Database changes if any
5. Manual testing steps
6. Edge cases handled
7. Recommended next phase

```
