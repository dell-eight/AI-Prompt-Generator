# Phase 5 — Authentication and User Accounts

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
- Security Review Agent

## Phase Goal

Add real registration/login/session handling and protect user/admin routes.

## Do NOT Do in This Phase

Do not add payments, advanced roles, or complex team accounts.

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
Act as the Authentication and User Account Agent, Backend Development Agent, Frontend Development Agent, and Security Review Agent.

Your task is to implement Phase 5: Authentication and user accounts.

Before editing:
1. Read existing frontend routes.
2. Read existing backend/API structure.
3. Read the database schema.
4. Check whether an auth library already exists.
5. Do not create unsafe custom authentication if a proven library is available.

Auth requirements:
- User registration
- User login
- User logout
- Session handling
- Current user access
- Protected saved prompts page
- Protected admin dashboard route
- Basic user roles: USER and ADMIN

Pages to connect:
- /login
- /register
- /saved
- /dashboard/admin

User model should support:
- id
- name if available
- email
- password hash only if using credentials auth
- role
- createdAt
- updatedAt

Security requirements:
- Never store plain-text passwords.
- Never expose password hashes to frontend.
- Use secure session handling.
- Protect admin routes by role.
- Show clear but safe error messages.
- Use environment variables for secrets.

Frontend requirements:
- Login form
- Register form
- Logout action
- Navbar should show different actions depending on login state.
- Protected pages should redirect or show a clear message.

Expected output after implementation:
1. Auth approach used
2. Files created or changed
3. Environment variables needed
4. Protected routes added
5. How to create an admin user
6. Manual testing steps
7. Security notes
8. Recommended next phase

```
