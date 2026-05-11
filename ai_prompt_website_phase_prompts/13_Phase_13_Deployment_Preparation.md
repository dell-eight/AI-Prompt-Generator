# Phase 13 — Deployment Preparation

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

- Deployment Agent
- Security Review Agent
- Testing and QA Agent
- Documentation Agent

## Phase Goal

Prepare the app for deployment with build checks, environment variables, database migration steps, and production testing.

## Do NOT Do in This Phase

Do not deploy automatically unless I explicitly ask. Do not expose secrets.

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
Act as the Deployment Agent, Security Review Agent, Testing and QA Agent, and Documentation Agent.

Your task is to implement Phase 13: Deployment preparation.

Before editing:
1. Read package scripts.
2. Read environment variable usage.
3. Read database/ORM configuration.
4. Read auth configuration.
5. Read AI API configuration.
6. Do not deploy automatically.
7. Do not expose secrets.

Prepare deployment for a beginner-friendly platform such as:
- Vercel
- Render
- Railway
- Supabase/Neon database if PostgreSQL is used
- Other suitable platform based on the current stack

Create deployment checklist:
1. Required environment variables
2. Build command
3. Start command if needed
4. Migration command
5. Seed command if needed
6. Database setup
7. Auth callback URLs if needed
8. AI API key setup
9. Production domain notes
10. Post-deployment smoke tests
11. Rollback plan

Run or prepare:
- Lint if available
- Type check if available
- Build command
- Basic test command if available

Fix only deployment-blocking issues.

Expected output:
1. Deployment readiness summary
2. Files changed if any
3. Environment variables list without secret values
4. Commands to run
5. Platform-specific deployment steps
6. Production smoke test checklist
7. Known risks
8. Recommended next phase

```
