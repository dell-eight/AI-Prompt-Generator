# API Endpoints

The MVP includes public prompt-library API routes, authenticated saved-prompt
routes, admin-only prompt CRUD routes backed by Supabase, and a server-side
prompt generation endpoint.

Before testing, make sure `.env.local` has:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Then apply the Phase 2 schema and seed data:

```bash
pnpm dlx supabase start
pnpm dlx supabase db reset
```

## Endpoints

All mutation routes reject cross-origin browser requests when an `Origin` header
is present and does not match the app origin.

### `GET /api/prompts`

Returns published prompt cards with pagination.

Supported query parameters:

- `q`: searches title, description, prompt text, tool, category, and tags
- `category`: category name or slug, such as `business-ideas`
- `tool`: tool name, such as `chatgpt` or `dall-e`
- `difficulty`: `Beginner`, `Intermediate`, or `Advanced`
- `tag`: tag name or slug
- `featured`: `true` or `false`
- `page`: positive integer, defaults to `1`
- `limit`: positive integer, defaults to `12`, maximum `50`
- `sort`: `featured`, `newest`, `oldest`, or `title`

Example:

```bash
curl "http://localhost:3000/api/prompts?q=automation&tag=workflow&limit=6"
```

Response shape:

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "n8n Automation Planner",
      "slug": "n8n-automation-planner",
      "description": "Map a manual workflow into triggers, nodes, data fields, and error handling.",
      "category": {
        "name": "n8n Workflows",
        "slug": "n8n-workflows"
      },
      "tool": "n8n",
      "difficulty": "Intermediate",
      "tags": [
        {
          "name": "automation",
          "slug": "automation"
        }
      ],
      "isFeatured": true,
      "createdAt": "2026-05-11T00:00:00+00:00"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  },
  "filters": {
    "q": "automation",
    "category": null,
    "tool": null,
    "difficulty": null,
    "tag": "workflow",
    "featured": null,
    "sort": "featured"
  }
}
```

### `GET /api/prompts/[slug]`

Returns one published prompt with full `promptText`, public metadata, and up to three related prompts.

Example:

```bash
curl "http://localhost:3000/api/prompts/chatgpt-study-guide-builder"
```

### `GET /api/categories`

Returns public categories ordered by `sortOrder`.

Example:

```bash
curl "http://localhost:3000/api/categories"
```

### `GET /api/tags`

Returns public tags ordered by name.

Example:

```bash
curl "http://localhost:3000/api/tags"
```

### `GET /api/saved-prompts`

Requires a logged-in Supabase session. Returns the current user's saved prompts and their prompt card data.

Example:

```bash
curl "http://localhost:3000/api/saved-prompts"
```

### `POST /api/saved-prompts`

Requires a logged-in Supabase session. Saves a published prompt for the current user. Duplicate saves return the existing saved row instead of creating another one.

Example body:

```json
{
  "promptId": "prompt-uuid"
}
```

### `DELETE /api/saved-prompts/[id]`

Requires a logged-in Supabase session. Deletes the current user's saved prompt by either saved row id or prompt id.

### `GET /api/admin/prompts`

Requires an admin Supabase session. Returns every prompt, including drafts and
publishing metadata.

### `POST /api/admin/prompts`

Requires an admin Supabase session. Creates a prompt and syncs comma-separated
or array-based tags.

Example body:

```json
{
  "title": "Customer Interview Planner",
  "slug": "customer-interview-planner",
  "description": "Plan useful customer discovery interviews.",
  "promptText": "Act as a product researcher...",
  "categoryId": "category-uuid",
  "tool": "ChatGPT",
  "difficulty": "Beginner",
  "tags": ["research", "startup"],
  "isFeatured": false,
  "isPublished": true
}
```

### `PUT /api/admin/prompts/[id]`

Requires an admin Supabase session. Updates prompt content, taxonomy, status,
featured state, and tags.

### `DELETE /api/admin/prompts/[id]`

Requires an admin Supabase session. Deletes a prompt. Related prompt-tag and
saved-prompt rows are removed by database cascade constraints.

### `POST /api/generate-prompt`

Generates a structured, copy-paste-ready prompt. The OpenAI API key is read only
on the server. Logged-in generations are saved when the `generated_prompts`
insert succeeds.

Example body:

```json
{
  "promptType": "ChatGPT",
  "targetTool": "ChatGPT",
  "userGoal": "Write a launch email for a bookkeeping service",
  "context": "The service helps solo founders get clean monthly reports.",
  "audience": "Busy small business owners",
  "outputFormat": "Email draft plus subject lines",
  "tone": "Clear and practical",
  "constraints": "Keep it under 300 words.",
  "examples": ""
}
```

Response shape:

```json
{
  "data": {
    "generatedPrompt": "Role: ...",
    "generatedPromptId": "uuid-or-null"
  }
}
```

## Edge Cases

- Invalid `difficulty`, `featured`, `page`, `limit`, or `sort` values return `400`.
- `limit` is capped at `50`.
- Prompt detail returns `404` for missing or unpublished prompt slugs.
- Saved prompt routes return `401` for guests.
- Saved prompt creation validates UUID input, checks the prompt is published, and relies on the database uniqueness constraint to prevent duplicates.
- Saved prompt deletes are scoped to the current user.
- Admin prompt routes return `401` for guests and `403` for non-admin users.
- Admin prompt create/update validates required text fields, slug format,
  category UUID, difficulty, and tag limits.
- Generated prompt routes validate prompt type, target tool, required goal,
  input length limits, and basic rate limits.
- Mutating routes return `403` for disallowed cross-origin requests.
- API responses do not expose admin-only fields such as `created_by` or `is_published`.
- Unexpected server errors return safe generic API messages.
- If Supabase tables are missing, run the Phase 2 migration and seed commands before retesting.
