# Phase 12 — Documentation

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

- Documentation Agent
- Project Manager Agent
- Deployment Agent

## Phase Goal

Create clear project documentation, setup guide, feature guide, admin guide, API notes, and troubleshooting docs.

## Do NOT Do in This Phase

Do not document features that do not exist.

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
Act as the Documentation Agent, Project Manager Agent, and Deployment Agent.

Your task is to implement Phase 12: Documentation.

Before editing:
1. Read the current project structure.
2. Read package scripts.
3. Read environment variable usage.
4. Read implemented routes and APIs.
5. Do not document features that do not exist.

Create or update documentation:
1. README.md
2. Local setup guide
3. Environment variables guide
4. Database migration/seed guide
5. Feature overview
6. API documentation
7. Admin guide
8. Prompt generator guide
9. Troubleshooting guide
10. Deployment preparation notes

README should include:
- Project summary
- Tech stack
- Features
- Folder structure
- Setup steps
- Environment variables
- Database setup
- Run commands
- Test/build commands
- Deployment notes

API docs should include:
- Endpoint
- Method
- Purpose
- Auth requirement
- Request body
- Response body
- Error cases

Troubleshooting should include:
- Database connection issues
- Missing environment variables
- Auth/session issues
- AI API key issues
- Migration issues
- Build errors

Expected output:
1. Documentation files created/updated
2. Summary of documentation coverage
3. Missing information if any
4. How a new developer can run the project
5. Recommended next phase

```
