# Phase 8 — AI Prompt Generator

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

- AI Prompt Generator Agent
- Backend Development Agent
- Frontend Development Agent
- Security Review Agent

## Phase Goal

Build the AI prompt generator page and backend generation endpoint using structured templates and safe API handling.

## Do NOT Do in This Phase

Do not add complex prompt scoring, payments, public sharing, or advanced generation history unless simple and already supported.

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
Act as the AI Prompt Generator Agent, Backend Development Agent, Frontend Development Agent, and Security Review Agent.

Your task is to implement Phase 8: AI Prompt Generator.

Before editing:
1. Read the existing /generate page.
2. Read backend API structure.
3. Read auth implementation.
4. Read environment variable setup.
5. Do not expose AI API keys to the frontend.

Generator goal:
Users should enter a simple idea and receive a strong, structured, copy-paste-ready prompt.

Generator form fields:
- prompt type
- target AI tool
- user goal
- context/background
- target audience
- desired output format
- tone/style
- constraints
- examples/references if any

Supported prompt types:
- ChatGPT
- Cursor/Codex coding
- Claude
- Canva AI
- Image generation
- Book writing
- Business ideas
- Debugging
- AI automation
- n8n workflow

Backend endpoint:
- POST /api/generate-prompt

The backend should:
- Validate input
- Use server-side AI API key only
- Build a structured generation request
- Return generated prompt text
- Handle errors safely
- Optionally save generated prompt history for logged-in users if the schema already supports it

Generated prompt should usually include:
- Role
- Goal
- Context
- Task
- Constraints
- Output format
- Quality checklist
- Optional examples

Frontend should:
- Show a form
- Show loading state
- Show generated output
- Allow copy generated prompt
- Allow save generated prompt if logged in and supported
- Show safe error messages

Security/cost notes:
- Add basic input length limits.
- Add simple rate limit recommendation or implementation if practical.
- Do not reveal raw provider errors to users.
- Do not expose API keys.

Expected output after implementation:
1. Generator behavior summary
2. API endpoint created
3. Environment variables needed
4. Files created or changed
5. Manual testing steps
6. Cost/security notes
7. Recommended next phase

```
