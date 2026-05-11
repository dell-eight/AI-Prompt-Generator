insert into public.categories (name, slug, description, sort_order)
values
  ('ChatGPT', 'chatgpt', 'General-purpose prompts for planning, learning, analysis, and everyday work with ChatGPT.', 10),
  ('Cursor/Codex', 'cursor-codex', 'Repository-aware prompts for coding agents, implementation briefs, reviews, and refactors.', 20),
  ('Claude', 'claude', 'Long-context writing, research, critique, and reasoning prompts for Claude.', 30),
  ('Canva AI', 'canva-ai', 'Design briefs for Canva AI graphics, presentations, brand assets, and campaigns.', 40),
  ('Image Generation', 'image-generation', 'Detailed visual prompts for product shots, illustrations, scenes, and style exploration.', 50),
  ('Book Writing', 'book-writing', 'Prompts for outlining, drafting, revising, and editing fiction and nonfiction books.', 60),
  ('Business Ideas', 'business-ideas', 'Prompts for shaping offers, validating markets, planning launches, and prioritizing risks.', 70),
  ('Coding', 'coding', 'Prompts for software architecture, feature planning, tests, and code explanation.', 80),
  ('Debugging', 'debugging', 'Prompts that help diagnose errors, inspect logs, isolate causes, and prevent regressions.', 90),
  ('AI Automation', 'ai-automation', 'Prompts for discovering, designing, and evaluating AI-powered business automations.', 100),
  ('n8n Workflows', 'n8n-workflows', 'Prompts for mapping workflow triggers, nodes, data flow, and error handling in n8n.', 110)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.tags (name, slug)
values
  ('automation', 'automation'),
  ('book', 'book'),
  ('brand', 'brand'),
  ('business', 'business'),
  ('campaign', 'campaign'),
  ('coding', 'coding'),
  ('content', 'content'),
  ('debugging', 'debugging'),
  ('design', 'design'),
  ('editing', 'editing'),
  ('education', 'education'),
  ('implementation', 'implementation'),
  ('image', 'image'),
  ('learning', 'learning'),
  ('marketing', 'marketing'),
  ('n8n', 'n8n'),
  ('planning', 'planning'),
  ('productivity', 'productivity'),
  ('research', 'research'),
  ('strategy', 'strategy'),
  ('testing', 'testing'),
  ('workflow', 'workflow'),
  ('writing', 'writing')
on conflict (slug) do update
set name = excluded.name;

with seed_prompts (
  category_slug,
  title,
  slug,
  description,
  prompt_text,
  tool,
  difficulty,
  is_featured,
  tags
) as (
  values
    (
      'chatgpt',
      'ChatGPT Study Guide Builder',
      'chatgpt-study-guide-builder',
      'Turn messy notes into a structured study guide with practice questions and memory aids.',
      'Act as a patient study coach. Help me turn my notes into a clear study guide.

Subject: [subject]
Exam or goal: [exam or goal]
Current notes: [paste notes]
Weak areas: [topics that confuse me]
Time available: [study time]

Return:
1. A simple summary
2. Key concepts with plain-English explanations
3. Examples or analogies
4. A practice quiz with answers
5. A focused study plan for my available time',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      true,
      array['education', 'learning', 'productivity']
    ),
    (
      'chatgpt',
      'ChatGPT Decision Matrix Coach',
      'chatgpt-decision-matrix-coach',
      'Compare options with weighted criteria, tradeoffs, and a clear recommendation.',
      'Act as a decision coach. Help me compare these options without ignoring tradeoffs.

Decision: [what I need to decide]
Options: [list options]
Important criteria: [cost, speed, quality, risk, etc.]
Constraints: [budget, time, people, tools]
My current preference: [optional]

Return a weighted decision matrix, strongest argument for each option, risks, information still needed, and your recommendation.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['planning', 'strategy', 'productivity']
    ),
    (
      'chatgpt',
      'ChatGPT Email Rewrite Assistant',
      'chatgpt-email-rewrite-assistant',
      'Rewrite a rough email so it is clear, respectful, and action-oriented.',
      'Act as a professional writing assistant. Rewrite this email for clarity and tone.

Audience: [who will receive it]
Goal: [what I want them to do]
Tone: [friendly, direct, formal, calm]
Draft email: [paste draft]
Context they need: [context]

Return one polished version, one shorter version, and a brief note explaining what changed.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['writing', 'content', 'productivity']
    ),
    (
      'cursor-codex',
      'Cursor Feature Implementation Brief',
      'cursor-feature-implementation-brief',
      'Give Cursor or Codex a precise implementation brief with scope, files to inspect, and acceptance checks.',
      'You are a senior engineer working in this repository. Implement only the following feature.

Feature: [feature]
User goal: [goal]
In scope: [scope]
Out of scope: [limits]
Files to inspect first: [paths]
Acceptance criteria: [criteria]

Read the existing code before editing, follow local patterns, and summarize changed files plus tests run.',
      'Codex',
      'Intermediate'::public.prompt_difficulty,
      true,
      array['coding', 'implementation', 'testing']
    ),
    (
      'cursor-codex',
      'Repository Code Review Request',
      'repository-code-review-request',
      'Ask a coding agent to review a change for bugs, regressions, and missing tests.',
      'Act as a careful code reviewer for this repository.

Change to review: [branch, diff, or files]
User-facing behavior: [what should happen]
Risk areas: [auth, data, payments, performance, etc.]
Testing already done: [tests]

Find concrete issues first, with file and line references where possible. Focus on correctness, security, regressions, and missing tests. Keep style comments secondary.',
      'Codex',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['coding', 'debugging', 'testing']
    ),
    (
      'cursor-codex',
      'Safe Refactor Plan',
      'safe-refactor-plan',
      'Plan a contained refactor before making code changes in a live repository.',
      'Act as a senior engineer planning a low-risk refactor.

Goal: [what should improve]
Current pain: [duplication, confusing API, slow code, etc.]
Files or modules involved: [paths]
Behavior that must not change: [requirements]
Test coverage available: [tests]

Return a step-by-step refactor plan, risks, files likely to change, compatibility notes, and verification checks.',
      'Cursor',
      'Advanced'::public.prompt_difficulty,
      false,
      array['coding', 'planning', 'testing']
    ),
    (
      'claude',
      'Claude Long Document Summarizer',
      'claude-long-document-summarizer',
      'Extract the useful structure, decisions, and open questions from a long document.',
      'Act as a careful analyst. Summarize this long document for someone who needs to act on it.

Document: [paste document]
Audience: [who needs the summary]
Goal: [why they are reading]
Important sections: [optional]

Return an executive summary, key facts, decisions, unresolved questions, risks, and recommended next actions.',
      'Claude',
      'Beginner'::public.prompt_difficulty,
      true,
      array['research', 'content', 'planning']
    ),
    (
      'claude',
      'Claude Argument Strength Tester',
      'claude-argument-strength-tester',
      'Stress-test an argument for weak assumptions, missing evidence, and counterpoints.',
      'Act as a fair but skeptical reasoning partner.

Claim or argument: [paste argument]
Audience: [who must be convinced]
Evidence I have: [evidence]
Constraints: [word count, tone, format]

Return the strongest version of the argument, weak assumptions, likely objections, evidence gaps, and a revised version.',
      'Claude',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['research', 'writing', 'strategy']
    ),
    (
      'claude',
      'Claude Interview Transcript Organizer',
      'claude-interview-transcript-organizer',
      'Turn a raw interview transcript into themes, quotes, and product insights.',
      'Act as a product research analyst. Organize this interview transcript.

Research goal: [goal]
Participant type: [customer/user/persona]
Transcript: [paste transcript]
Questions I care about: [questions]

Return themes, supporting quotes, pain points, desired outcomes, feature ideas, and follow-up questions.',
      'Claude',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['research', 'business', 'planning']
    ),
    (
      'canva-ai',
      'Canva AI Campaign Asset Generator',
      'canva-ai-campaign-asset-generator',
      'Create a reusable brief for social graphics, ad variations, and launch visuals.',
      'Create a Canva AI design brief for a campaign.

Brand: [brand]
Audience: [audience]
Offer: [offer]
Visual style: [style]
Channels: [channels]

Return concepts for a hero graphic, social post, story, ad, and email header, including copy and design direction.',
      'Canva AI',
      'Beginner'::public.prompt_difficulty,
      true,
      array['design', 'marketing', 'campaign']
    ),
    (
      'canva-ai',
      'Canva Presentation Design Brief',
      'canva-presentation-design-brief',
      'Plan a clear, polished slide deck with structure, visuals, and speaker notes.',
      'Act as a presentation designer. Create a Canva-ready slide brief.

Topic: [topic]
Audience: [audience]
Goal: [inform, persuade, sell, teach]
Slide count: [number]
Brand style: [colors, fonts, mood]
Key points: [points]

Return a slide-by-slide outline with titles, visual direction, short copy, and speaker notes.',
      'Canva AI',
      'Beginner'::public.prompt_difficulty,
      false,
      array['design', 'content', 'brand']
    ),
    (
      'canva-ai',
      'Canva Brand Kit Starter',
      'canva-brand-kit-starter',
      'Generate starter brand directions for colors, typography, social templates, and tone.',
      'Act as a brand designer creating a practical starter brand kit.

Business or project: [name and description]
Audience: [audience]
Personality: [3-5 adjectives]
Competitors or references: [optional]
Where assets will be used: [website, social, pitch deck, etc.]

Return color palette ideas, typography direction, logo concept notes, image style, social template ideas, and brand voice guidance.',
      'Canva AI',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['brand', 'design', 'marketing']
    ),
    (
      'image-generation',
      'Image Generator Product Shot',
      'image-generator-product-shot',
      'Generate polished product imagery with precise lighting, composition, and background details.',
      'Create a high-quality product image prompt.

Product: [product]
Audience: [audience]
Use case: [website, ad, catalog, social]
Style: [minimal, premium, playful, technical]
Colors/materials: [details]

Return one detailed image prompt with composition, lighting, camera angle, background, texture, and negative constraints.',
      'DALL-E',
      'Intermediate'::public.prompt_difficulty,
      true,
      array['image', 'design', 'marketing']
    ),
    (
      'image-generation',
      'Character Concept Prompt',
      'character-concept-prompt',
      'Design a consistent character concept with pose, expression, clothing, and setting.',
      'Act as a visual concept artist. Build an image-generation prompt for a character.

Character role: [role]
Personality: [traits]
World or genre: [setting]
Visual references: [colors, era, materials]
Pose or emotion: [pose/emotion]

Return a detailed prompt covering anatomy, outfit, expression, lighting, camera, background, and style constraints.',
      'Midjourney',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['image', 'design', 'content']
    ),
    (
      'image-generation',
      'Editorial Illustration Prompt',
      'editorial-illustration-prompt',
      'Create a thoughtful illustration prompt for articles, newsletters, or social essays.',
      'Create an editorial illustration prompt for this idea.

Article topic: [topic]
Core emotion: [emotion]
Metaphor or symbol: [optional]
Audience: [audience]
Preferred style: [flat, painterly, 3D, collage, etc.]

Return three visual concepts and one final detailed image prompt with composition, palette, lighting, and negative constraints.',
      'DALL-E',
      'Beginner'::public.prompt_difficulty,
      false,
      array['image', 'content', 'design']
    ),
    (
      'book-writing',
      'Book Chapter Coach',
      'book-chapter-coach',
      'Shape a chapter idea with reader promise, outline, examples, and revision notes.',
      'Act as a patient book editor. Help me improve this chapter idea.

Book topic: [topic]
Chapter goal: [goal]
Reader level: [beginner/intermediate/expert]
Draft notes: [notes]

Return a chapter promise, structured outline, weak spots, examples to add, and a revision checklist.',
      'Claude',
      'Beginner'::public.prompt_difficulty,
      true,
      array['book', 'writing', 'editing']
    ),
    (
      'book-writing',
      'Nonfiction Book Outline Builder',
      'nonfiction-book-outline-builder',
      'Turn a nonfiction book concept into a practical table of contents and reader journey.',
      'Act as a nonfiction book architect.

Book idea: [idea]
Target reader: [reader]
Promise of the book: [promise]
My expertise or story: [background]
Competing books: [optional]

Return a positioning statement, table of contents, chapter summaries, reader transformation arc, and research needed.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['book', 'writing', 'planning']
    ),
    (
      'book-writing',
      'Fiction Scene Revision Partner',
      'fiction-scene-revision-partner',
      'Improve a fiction scene by clarifying conflict, character desire, pacing, and sensory detail.',
      'Act as a fiction editor. Help me revise this scene.

Genre: [genre]
Scene purpose: [what must change]
Point-of-view character: [character]
Current scene: [paste scene]
What feels wrong: [issue]

Return diagnosis, conflict improvements, line-level notes, sensory detail ideas, and a revised sample passage.',
      'Claude',
      'Advanced'::public.prompt_difficulty,
      false,
      array['book', 'writing', 'editing']
    ),
    (
      'business-ideas',
      'Business Plan Builder',
      'business-plan-builder',
      'Turn a rough business idea into a clear plan with audience, offer, positioning, risks, and next actions.',
      'Act as a startup strategist. Help me turn this business idea into a practical business plan.

Business idea: [describe idea]
Target customer: [who it serves]
Budget/time constraints: [constraints]
Current assets: [skills, audience, tools]

Return:
1. One-sentence positioning
2. Target customer profile
3. Core offer
4. Revenue model
5. Top 5 risks
6. First 7-day action plan',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      true,
      array['business', 'strategy', 'planning']
    ),
    (
      'business-ideas',
      'Offer Validation Interview Script',
      'offer-validation-interview-script',
      'Create customer discovery questions that test demand before building.',
      'Act as a customer discovery coach.

Idea or offer: [offer]
Target customer: [customer]
Problem I think they have: [problem]
What I need to learn: [assumptions]

Return an interview script, follow-up questions, red flags, evidence of strong demand, and a summary template.',
      'ChatGPT',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['business', 'research', 'strategy']
    ),
    (
      'business-ideas',
      'Lean Landing Page Copy',
      'lean-landing-page-copy',
      'Draft a simple landing page that explains the offer and invites early interest.',
      'Act as a conversion copywriter for an early-stage offer.

Product or service: [offer]
Audience: [audience]
Pain point: [pain]
Desired outcome: [outcome]
Proof or credibility: [proof]
Call to action: [CTA]

Return headline options, subheadline, benefits, objections, FAQ, and a short landing page draft.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['business', 'marketing', 'writing']
    ),
    (
      'coding',
      'Software Architecture Explainer',
      'software-architecture-explainer',
      'Explain a proposed feature architecture with data flow, tradeoffs, and testing impact.',
      'Act as a senior software architect. Help me design this feature.

Feature: [feature]
Existing stack: [stack]
Users and permissions: [users]
Data needed: [data]
Scale or performance concerns: [concerns]

Return a recommended architecture, data model, API boundaries, tradeoffs, risks, and tests to write.',
      'ChatGPT',
      'Intermediate'::public.prompt_difficulty,
      true,
      array['coding', 'planning', 'testing']
    ),
    (
      'coding',
      'Test Case Generator',
      'test-case-generator',
      'Generate practical unit, integration, and manual test cases for a feature.',
      'Act as a QA-minded engineer. Create a test plan for this feature.

Feature: [feature]
Expected behavior: [behavior]
Inputs and edge cases: [inputs]
User roles: [roles]
Tech stack: [stack]

Return unit tests, integration tests, manual QA steps, edge cases, and regression risks.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['coding', 'testing', 'debugging']
    ),
    (
      'coding',
      'API Contract Planner',
      'api-contract-planner',
      'Plan endpoint behavior, request and response shapes, errors, and authorization.',
      'Act as a backend engineer designing an API contract.

Feature: [feature]
Client needs: [client behavior]
Data model: [entities]
Auth rules: [roles and permissions]
Failure cases: [known risks]

Return endpoints, request bodies, response examples, status codes, validation rules, and tests.',
      'ChatGPT',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['coding', 'implementation', 'planning']
    ),
    (
      'debugging',
      'Debugging Root Cause Investigator',
      'debugging-root-cause-investigator',
      'Analyze an error report and produce a focused debugging plan before changing code.',
      'Act as a debugging partner. Diagnose this issue before proposing code changes.

Expected behavior: [expected]
Actual behavior: [actual]
Error/logs: [logs]
Recent changes: [changes]
Relevant files: [files]

Return likely causes ranked by probability, checks to run, minimal fix strategy, and regression tests.',
      'Cursor',
      'Advanced'::public.prompt_difficulty,
      true,
      array['debugging', 'coding', 'testing']
    ),
    (
      'debugging',
      'Frontend Bug Reproduction Guide',
      'frontend-bug-reproduction-guide',
      'Turn a vague UI issue into clear reproduction steps, hypotheses, and browser checks.',
      'Act as a frontend debugging assistant.

Bug summary: [summary]
Where it happens: [page/component]
Browsers or devices: [environment]
Steps tried: [steps]
Screenshots or logs: [details]

Return exact reproduction steps, likely causes, browser devtools checks, accessibility concerns, and a minimal fix plan.',
      'ChatGPT',
      'Beginner'::public.prompt_difficulty,
      false,
      array['debugging', 'testing', 'coding']
    ),
    (
      'debugging',
      'Production Incident Triage',
      'production-incident-triage',
      'Prioritize checks during a live issue with impact, rollback options, and communication notes.',
      'Act as an incident commander helping triage a production issue.

Impact: [users affected]
Symptoms: [symptoms]
Recent deploys or changes: [changes]
Logs and metrics: [data]
Systems involved: [systems]

Return severity, immediate checks, likely causes, rollback or mitigation options, customer communication notes, and follow-up actions.',
      'ChatGPT',
      'Advanced'::public.prompt_difficulty,
      false,
      array['debugging', 'strategy', 'planning']
    ),
    (
      'ai-automation',
      'AI Automation Opportunity Finder',
      'ai-automation-opportunity-finder',
      'Find repetitive tasks in a business and rank automation ideas by impact and effort.',
      'Act as an AI automation consultant. Identify automation opportunities in my workflow.

Business type: [business]
Current tasks: [tasks]
Tools used: [tools]
Team size: [team]
Constraints: [constraints]

Return top automation ideas, impact/effort score, required tools, risks, and first prototype plan.',
      'ChatGPT',
      'Intermediate'::public.prompt_difficulty,
      true,
      array['automation', 'business', 'strategy']
    ),
    (
      'ai-automation',
      'AI Agent Workflow Designer',
      'ai-agent-workflow-designer',
      'Design a human-in-the-loop AI workflow with inputs, checks, and failure handling.',
      'Act as an AI workflow designer.

Goal: [business goal]
Inputs: [documents, forms, emails, data]
Tools available: [tools]
Human approval points: [where humans must review]
Failure risks: [risks]

Return workflow steps, AI tasks, human checkpoints, data storage needs, error handling, and success metrics.',
      'ChatGPT',
      'Advanced'::public.prompt_difficulty,
      false,
      array['automation', 'workflow', 'planning']
    ),
    (
      'ai-automation',
      'SOP to Automation Converter',
      'sop-to-automation-converter',
      'Convert a manual standard operating procedure into automation candidates and requirements.',
      'Act as an operations automation analyst.

Manual SOP: [paste steps]
Apps involved: [apps]
Data created or changed: [data]
Approvals needed: [approvals]
Exceptions: [exceptions]

Return automatable steps, steps that should stay human, required integrations, risks, and a phased implementation plan.',
      'ChatGPT',
      'Intermediate'::public.prompt_difficulty,
      false,
      array['automation', 'workflow', 'business']
    ),
    (
      'n8n-workflows',
      'n8n Automation Planner',
      'n8n-automation-planner',
      'Map a manual workflow into triggers, nodes, data fields, and error handling.',
      'Act as an n8n workflow architect. Convert this manual process into an automation plan.

Manual process: [process]
Apps involved: [apps]
Trigger: [trigger]
Data needed: [data]
Failure risks: [risks]

Return nodes, data mapping, credentials needed, branching logic, error handling, and test cases.',
      'n8n',
      'Intermediate'::public.prompt_difficulty,
      true,
      array['n8n', 'automation', 'workflow']
    ),
    (
      'n8n-workflows',
      'n8n Error Handling Blueprint',
      'n8n-error-handling-blueprint',
      'Design retry, alerting, and fallback behavior for a workflow.',
      'Act as an n8n reliability designer.

Workflow goal: [goal]
Trigger and nodes: [current or planned nodes]
External APIs: [APIs]
What can fail: [failure modes]
Who should be notified: [people/channels]

Return error branches, retry rules, alert messages, logging fields, fallback steps, and test cases.',
      'n8n',
      'Advanced'::public.prompt_difficulty,
      false,
      array['n8n', 'debugging', 'workflow']
    ),
    (
      'n8n-workflows',
      'n8n Data Mapping Assistant',
      'n8n-data-mapping-assistant',
      'Plan field mapping between apps so workflow data stays consistent.',
      'Act as an n8n data mapping assistant.

Source app and sample data: [source]
Destination app and required fields: [destination]
Transformations needed: [formatting, cleanup, enrichment]
Edge cases: [missing values, duplicates, invalid data]

Return field mapping, transformation expressions, validation checks, and test records.',
      'n8n',
      'Beginner'::public.prompt_difficulty,
      false,
      array['n8n', 'automation', 'testing']
    )
)
insert into public.prompts (
  category_id,
  title,
  slug,
  description,
  prompt_text,
  tool,
  difficulty,
  is_featured,
  is_published
)
select
  categories.id,
  seed_prompts.title,
  seed_prompts.slug,
  seed_prompts.description,
  seed_prompts.prompt_text,
  seed_prompts.tool,
  seed_prompts.difficulty,
  seed_prompts.is_featured,
  true
from seed_prompts
join public.categories on categories.slug = seed_prompts.category_slug
on conflict (slug) do update
set
  category_id = excluded.category_id,
  title = excluded.title,
  description = excluded.description,
  prompt_text = excluded.prompt_text,
  tool = excluded.tool,
  difficulty = excluded.difficulty,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  updated_at = now();

with seed_prompt_tags (prompt_slug, tag_slugs) as (
  values
    ('chatgpt-study-guide-builder', array['education', 'learning', 'productivity']),
    ('chatgpt-decision-matrix-coach', array['planning', 'strategy', 'productivity']),
    ('chatgpt-email-rewrite-assistant', array['writing', 'content', 'productivity']),
    ('cursor-feature-implementation-brief', array['coding', 'implementation', 'testing']),
    ('repository-code-review-request', array['coding', 'debugging', 'testing']),
    ('safe-refactor-plan', array['coding', 'planning', 'testing']),
    ('claude-long-document-summarizer', array['research', 'content', 'planning']),
    ('claude-argument-strength-tester', array['research', 'writing', 'strategy']),
    ('claude-interview-transcript-organizer', array['research', 'business', 'planning']),
    ('canva-ai-campaign-asset-generator', array['design', 'marketing', 'campaign']),
    ('canva-presentation-design-brief', array['design', 'content', 'brand']),
    ('canva-brand-kit-starter', array['brand', 'design', 'marketing']),
    ('image-generator-product-shot', array['image', 'design', 'marketing']),
    ('character-concept-prompt', array['image', 'design', 'content']),
    ('editorial-illustration-prompt', array['image', 'content', 'design']),
    ('book-chapter-coach', array['book', 'writing', 'editing']),
    ('nonfiction-book-outline-builder', array['book', 'writing', 'planning']),
    ('fiction-scene-revision-partner', array['book', 'writing', 'editing']),
    ('business-plan-builder', array['business', 'strategy', 'planning']),
    ('offer-validation-interview-script', array['business', 'research', 'strategy']),
    ('lean-landing-page-copy', array['business', 'marketing', 'writing']),
    ('software-architecture-explainer', array['coding', 'planning', 'testing']),
    ('test-case-generator', array['coding', 'testing', 'debugging']),
    ('api-contract-planner', array['coding', 'implementation', 'planning']),
    ('debugging-root-cause-investigator', array['debugging', 'coding', 'testing']),
    ('frontend-bug-reproduction-guide', array['debugging', 'testing', 'coding']),
    ('production-incident-triage', array['debugging', 'strategy', 'planning']),
    ('ai-automation-opportunity-finder', array['automation', 'business', 'strategy']),
    ('ai-agent-workflow-designer', array['automation', 'workflow', 'planning']),
    ('sop-to-automation-converter', array['automation', 'workflow', 'business']),
    ('n8n-automation-planner', array['n8n', 'automation', 'workflow']),
    ('n8n-error-handling-blueprint', array['n8n', 'debugging', 'workflow']),
    ('n8n-data-mapping-assistant', array['n8n', 'automation', 'testing'])
)
insert into public.prompt_tags (prompt_id, tag_id)
select prompts.id, tags.id
from seed_prompt_tags
join public.prompts on prompts.slug = seed_prompt_tags.prompt_slug
join public.tags on tags.slug = any(seed_prompt_tags.tag_slugs)
on conflict (prompt_id, tag_id) do nothing;
