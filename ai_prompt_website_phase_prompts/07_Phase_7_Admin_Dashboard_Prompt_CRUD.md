# Phase 7 — Admin Dashboard and Prompt CRUD

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

- Admin Dashboard Agent
- Authentication and User Account Agent
- Backend Development Agent
- Frontend Development Agent
- Security Review Agent

## Phase Goal

Allow admins to create, edit, delete, publish, and manage prompt library content.

## Do NOT Do in This Phase

Do not add complex CMS features, analytics dashboards, or user management yet.

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
Act as the Admin Dashboard Agent, Authentication and User Account Agent, Backend Development Agent, Frontend Development Agent, and Security Review Agent.

Your task is to implement Phase 7: Admin dashboard and prompt CRUD.

Before editing:
1. Read current auth and role implementation.
2. Read prompt database schema.
3. Read admin dashboard placeholder pages.
4. Read prompt API routes.
5. Do not expose admin actions to regular users.

Admin requirements:
- Only ADMIN users can access admin pages.
- Admins can view all prompts.
- Admins can create prompts.
- Admins can edit prompts.
- Admins can delete prompts.
- Admins can publish/unpublish prompts.
- Admins can assign category, tool, difficulty, and tags.

Admin pages:
- /dashboard/admin
- /dashboard/admin/prompts
- /dashboard/admin/prompts/new
- /dashboard/admin/prompts/[id]/edit
- /dashboard/admin/categories if simple enough

Admin API endpoints:
- GET /api/admin/prompts
- POST /api/admin/prompts
- PUT /api/admin/prompts/[id]
- DELETE /api/admin/prompts/[id]

Prompt form fields:
- title
- slug
- description
- promptText
- category
- tool
- difficulty
- tags
- isFeatured
- isPublished

Safety:
- Protect all admin routes.
- Protect all admin API endpoints.
- Validate all inputs.
- Confirm destructive delete actions.
- Avoid deleting categories/tags if prompts depend on them unless handled safely.

Expected output after implementation:
1. Admin features implemented
2. Protected routes/API summary
3. Files created or changed
4. How to test as admin
5. How to test as normal user
6. Security notes
7. Recommended next phase

```
