# AI Prompt Website Agent Workflow Guide

## Recommended Workflow Order

| Order | Agent | Purpose |
|---:|---|---|
| 1 | Master Orchestrator Agent | Decide what to do next and prevent scope creep |
| 2 | Product Planning Agent | Define the product, target users, MVP, and roadmap |
| 3 | Feature Breakdown Agent | Convert the MVP into buildable features and tickets |
| 4 | Database Design Agent | Design the data model before building APIs |
| 5 | AI Prompt Generator Agent | Design the generator logic and prompt templates |
| 6 | Prompt Library Content Agent | Create the starter prompt library content |
| 7 | UI/UX Design Agent | Design pages, flows, components, and UX copy |
| 8 | Backend Development Agent | Plan/build APIs and business logic |
| 9 | Authentication and User Account Agent | Add login, user accounts, saved prompts, and admin roles |
| 10 | Search and Filtering Agent | Add prompt search, filters, sorting, and indexes |
| 11 | Frontend Development Agent | Build pages and connect to backend APIs |
| 12 | Admin Dashboard Agent | Build admin prompt management |
| 13 | Testing and QA Agent | Test the full MVP |
| 14 | Debugging Agent | Fix issues found during QA |
| 15 | Code Review Agent | Review implementation before launch |
| 16 | Security Review Agent | Check auth, admin, API, secrets, and deployment safety |
| 17 | Documentation Agent | Create README, setup guide, API docs, and user/admin docs |
| 18 | Deployment Agent | Deploy the working MVP |
| 19 | SEO and Marketing Agent | Prepare launch pages and organic traffic strategy |
| 20 | Monetization Agent | Add pricing and premium features after value is proven |

## Agent Collaboration Map

```text
Master Orchestrator
  ↓
Product Planning
  ↓
Feature Breakdown
  ↓
Database Design ───────→ Backend Development ───────→ Frontend Development
  ↓                         ↑        ↑                       ↑
Prompt Library Content       |        |                       |
  ↓                         |        |                       |
AI Prompt Generator ─────────┘        |                       |
  ↓                                  |                       |
Search and Filtering ────────────────┘                       |
  ↓                                                          |
Authentication/User Account ─────────→ Admin Dashboard ───────┘
  ↓                                                          ↓
Testing and QA ─────→ Debugging ─────→ Code Review ─────→ Security Review
  ↓                                                          ↓
Documentation ─────────────────────────────────────────→ Deployment
  ↓
SEO/Marketing
  ↓
Monetization
```

## MVP Agent Workflow

Use these agents for the first working version:

1. Master Orchestrator Agent
2. Product Planning Agent
3. Feature Breakdown Agent
4. Database Design Agent
5. AI Prompt Generator Agent
6. Prompt Library Content Agent
7. UI/UX Design Agent
8. Backend Development Agent
9. Frontend Development Agent
10. Authentication and User Account Agent
11. Search and Filtering Agent
12. Testing and QA Agent
13. Debugging Agent
14. Code Review Agent
15. Deployment Agent

### MVP Features to Build First

- Homepage
- Prompt library page
- Prompt detail page
- Search and filters
- Copy prompt button
- Basic prompt generator
- Login/register
- Saved prompts
- Basic admin prompt management
- Seed prompt content
- Basic deployment

## Advanced Version Agent Workflow

Use these later after MVP works:

1. Admin Dashboard Agent for richer admin tools
2. SEO and Marketing Agent for organic growth
3. Monetization Agent for paid plans or premium prompt packs
4. Security Review Agent for stronger hardening
5. Documentation Agent for public docs and handoff
6. Search and Filtering Agent for advanced search improvements
7. AI Prompt Generator Agent for better prompt scoring, guided flows, and templates

### Advanced Features Later

- Premium prompt packs
- Prompt collections
- User-created public prompts
- Prompt ratings
- Prompt comments
- Usage analytics
- AI prompt quality score
- Prompt version history
- Team/workspace accounts
- Payment integration
- SEO category landing pages
- Newsletter capture
- Admin analytics dashboard
- Advanced AI generation settings

## Cursor/Codex Implementation Workflow

Use this process when taking agent outputs into Cursor, Codex, Claude, or another coding AI:

### Step 1: Ask the Planning Agent
Use Product Planning, Feature Breakdown, UI/UX, Database, or Backend agents to create the plan.

### Step 2: Convert the Plan Into a Coding Prompt
Ask the relevant implementation agent to create a Cursor/Codex prompt.

### Step 3: Tell Cursor/Codex to Read Existing Files First
Always include:

```text
Before making changes, read the existing project structure and the relevant files. Do not rewrite the whole app. Make the smallest safe change.
```

### Step 4: Build One Feature at a Time
Example:

```text
Implement only the prompt library page in this step. Do not add authentication, admin dashboard, payments, or advanced AI generation yet.
```

### Step 5: Ask for Changed Files
Always ask Cursor/Codex:

```text
After implementing, list every changed file and explain why it changed.
```

### Step 6: Test
Ask Cursor/Codex:

```text
Provide manual testing steps and any automated test command I should run.
```

### Step 7: Review
Use:
- Testing and QA Agent
- Debugging Agent
- Code Review Agent
- Security Review Agent

## Safety Rules for All Agents

- Do not overcomplicate the project.
- Build MVP first.
- Make small changes.
- Read existing files before editing.
- Do not break existing features.
- Explain changed files.
- Include testing steps.
- Ask only when truly blocked.
- Prefer simple architecture.
- Do not expose secrets or API keys.
- Do not add payments before the core product works.
- Do not add advanced AI features before the basic generator works.
- Do not rewrite the whole app unless absolutely necessary.
- Always separate MVP features from later features.

## Final Recommended Agent Setup If You Do Not Want All 20 Immediately

Create these first:

| Priority | Agent | Why |
|---:|---|---|
| 1 | Master Orchestrator Agent | Tells you which agent to use next |
| 2 | Product Planning Agent | Makes the project clear |
| 3 | Feature Breakdown Agent | Turns the project into buildable tasks |
| 4 | UI/UX Design Agent | Designs the user experience |
| 5 | Database Design Agent | Prevents messy data structure |
| 6 | Backend Development Agent | Builds APIs and logic |
| 7 | Frontend Development Agent | Builds the visible website |
| 8 | AI Prompt Generator Agent | Powers the main AI feature |
| 9 | Testing and QA Agent | Checks if it works |
| 10 | Debugging Agent | Fixes problems safely |

After the MVP works, add:

- Authentication and User Account Agent
- Search and Filtering Agent
- Admin Dashboard Agent
- Security Review Agent
- Deployment Agent
- Documentation Agent
- SEO and Marketing Agent
- Monetization Agent
- Code Review Agent

## Beginner-Friendly Build Sequence

```text
1. Product plan
2. MVP feature list
3. Database schema
4. Prompt generator logic
5. Starter prompt content
6. UI wireframes
7. Backend APIs
8. Frontend pages
9. Search and filtering
10. Login and saved prompts
11. Admin dashboard
12. QA testing
13. Debugging
14. Code review
15. Security review
16. Documentation
17. Deployment
18. SEO
19. Monetization
```

## Best First Prompt to Use

```text
Act as the Master Orchestrator Agent for my AI Prompt Website.

I want to build the MVP first. Help me decide which agent to use next, what exact prompt to give that agent, what output I should expect, and what I should do after that.

My current stage is: I have the project idea but have not built the website yet.
```
