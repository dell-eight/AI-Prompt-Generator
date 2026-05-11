# Phase 2 — Database Schema and Seed Data

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

- Database Design Agent
- Prompt Library Content Agent
- Backend Development Agent

## Phase Goal

Create the real data foundation for prompts, users, categories, tags, saved prompts, and usage events.

## Do NOT Do in This Phase

Do not build full APIs, auth flows, admin dashboard, or real AI generation yet unless needed only for schema setup.

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
Act as the Database Design Agent, Prompt Library Content Agent, and Backend Development Agent.

Your task is to implement Phase 2: Database schema and seed data.

Before editing:
1. Read the existing project structure.
2. Identify the current framework and package manager.
3. Check whether an ORM already exists.
4. If Prisma or another ORM is not installed, recommend the simplest setup before implementing.

Database goal:
Create a clean MVP database structure for the AI Prompt Website.

Create or update schema for:
1. users
2. prompts
3. categories
4. tags
5. prompt_tags
6. saved_prompts
7. usage_events or prompt_copies
8. generated_prompts if useful for logged-in generation history

Each prompt should support:
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
- createdAt
- updatedAt

Seed data:
Create starter prompt content for these categories:
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

Create at least 3 useful prompts per category for MVP seed data.

Important:
- Use realistic, useful prompt examples.
- Do not create low-quality one-line prompts.
- Make prompt content beginner-friendly and copy-paste-ready.
- Add categories and tags through seed data.
- Use stable slugs.

Implementation requirements:
- Create migrations if using an ORM.
- Create seed script.
- Add clear setup commands.
- Do not break existing static UI.
- Keep mock data available only if backend data is not connected yet.

Expected output after implementation:
1. Database schema summary
2. Tables/models created
3. Relationships explained
4. Seed data summary
5. Files created or changed
6. Commands to run migration and seed
7. Manual verification steps
8. Recommended next phase

```
