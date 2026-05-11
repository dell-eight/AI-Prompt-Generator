# Phase 10 — QA, Debugging, and Stabilization

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

- Testing and QA Agent
- Debugging Agent
- Code Review Agent
- Project Manager Agent

## Phase Goal

Test all MVP flows, find bugs, fix them safely, and prepare a stable release candidate.

## Do NOT Do in This Phase

Do not add new features unless required to fix broken MVP behavior.

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
Act as the Testing and QA Agent, Debugging Agent, Code Review Agent, and Project Manager Agent.

Your task is to run Phase 10: QA, debugging, and stabilization.

Before making changes:
1. Read the current project.
2. Identify implemented features.
3. Do not add new features.
4. Focus on fixing broken MVP behavior.

Create and execute a QA checklist for:
- Homepage
- Prompt library
- Search
- Filters
- Prompt detail page
- Copy prompt button
- Login
- Register
- Logout
- Saved prompts
- Admin access protection
- Admin prompt create
- Admin prompt edit
- Admin prompt delete
- Admin publish/unpublish
- Prompt generator
- Mobile responsiveness
- Error states
- Empty states
- Production build

For each issue found:
- Describe the bug
- State severity: critical, high, medium, low
- Identify likely root cause
- List files to inspect
- Make the smallest safe fix
- Retest the issue

Code review requirements:
- Check for duplicate code
- Check for confusing components
- Check API error handling
- Check auth checks
- Check admin protection
- Check environment variable usage
- Check obvious performance issues

Expected output:
1. QA results summary
2. Bugs found
3. Bugs fixed
4. Files changed
5. Remaining issues
6. Production readiness status
7. Manual regression checklist
8. Recommended next phase

```
