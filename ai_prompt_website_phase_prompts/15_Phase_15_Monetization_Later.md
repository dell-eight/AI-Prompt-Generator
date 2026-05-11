# Phase 15 — Monetization Planning and Optional Implementation

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

- Monetization Agent
- Product Planning Agent
- Backend Development Agent
- Frontend Development Agent
- Security Review Agent

## Phase Goal

Plan monetization after MVP works; optionally prepare feature gates without adding payment unless explicitly requested.

## Do NOT Do in This Phase

Do not implement payments unless I explicitly approve. Do not reduce MVP free value too much.

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
Act as the Monetization Agent, Product Planning Agent, Backend Development Agent, Frontend Development Agent, and Security Review Agent.

Your task is Phase 15: Monetization planning and optional future implementation.

Important:
Do not implement real payments unless I explicitly ask you to.
For now, create the business and technical plan.

Monetization options to evaluate:
1. Free prompt library
2. Premium prompt packs
3. Monthly subscription
4. More AI prompt generations
5. Saved prompt collections
6. Business/coding/book writing premium templates
7. Team/workspace plan later

Create:
- Free tier
- Paid tier options
- What remains free
- What becomes premium
- Upgrade flow
- Database changes needed later
- API changes needed later
- UI changes needed later
- Payment provider recommendation
- Risks and anti-patterns

Rules:
- Do not make the free product useless.
- Do not add dark patterns.
- Do not add complex billing before the product has users.
- Keep pricing beginner-friendly.
- Mark everything as future unless I approve implementation.

If I ask to implement later:
- Read existing auth and user schema.
- Add subscription fields carefully.
- Use a trusted payment provider.
- Protect paid features server-side.
- Add tests.

Expected output:
1. Monetization recommendation
2. Free vs paid tier table
3. Future database changes
4. Future API changes
5. Future UI changes
6. Payment provider notes
7. What not to monetize yet
8. Implementation prompt for later only

```
