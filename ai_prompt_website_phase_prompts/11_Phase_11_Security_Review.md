# Phase 11 — Security Review

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

- Security Review Agent
- Authentication and User Account Agent
- Backend Development Agent
- Deployment Agent

## Phase Goal

Review and harden auth, admin access, APIs, environment variables, input validation, and AI endpoint safety.

## Do NOT Do in This Phase

Do not add enterprise security complexity unless it solves a real risk in the MVP.

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
Act as the Security Review Agent, Authentication and User Account Agent, Backend Development Agent, and Deployment Agent.

Your task is to implement Phase 11: Security review and hardening.

Before editing:
1. Read auth implementation.
2. Read admin routes and APIs.
3. Read prompt generator API.
4. Read environment variable usage.
5. Read deployment configuration if available.
6. Do not expose secrets.

Review these areas:
1. Environment variables
2. AI API key handling
3. Database URL handling
4. Auth session security
5. Password handling if credentials auth is used
6. Admin route protection
7. Admin API authorization
8. Saved prompts authorization
9. Input validation
10. Error message safety
11. Prompt generator abuse risk
12. Basic rate limit recommendation
13. XSS prevention for prompt content
14. Production build settings

Security requirements:
- No API keys in frontend code.
- No secrets committed to repo.
- Admin APIs must require ADMIN role.
- User data must be scoped to the logged-in user.
- Inputs must be validated before database writes.
- Error messages must not leak internals.
- Prompt text rendering must avoid unsafe HTML behavior.

Make only practical MVP security fixes.

Expected output:
1. Security review summary
2. Critical findings
3. High priority findings
4. Medium/low findings
5. Fixes implemented
6. Files changed
7. Security test checklist
8. Remaining recommendations for later
9. Recommended next phase

```
