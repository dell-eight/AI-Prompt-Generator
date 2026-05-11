# Environment Variables

PromptForge reads environment variables from `.env.local` during local
development and from your hosting provider in production.

## Required for App Shell

### `NEXT_PUBLIC_SITE_URL`

Base URL for local links and future deployment settings.

Example:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Required for Supabase Features

### `NEXT_PUBLIC_SUPABASE_URL`

Your Supabase project URL.

### `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The browser-safe Supabase publishable/anon key. This is intentionally public,
but RLS policies must protect private data.

Used by:

- Public prompt APIs
- Auth pages
- Saved prompts
- Admin checks
- Admin CRUD

## Required for Prompt Generation

### `OPENAI_API_KEY`

Server-only API key for `/api/generate-prompt`. Do not expose this as a
`NEXT_PUBLIC_` variable.

### `OPENAI_MODEL`

Optional model override. Defaults to `gpt-4o-mini`.

```bash
OPENAI_MODEL=gpt-4o-mini
```

## Do Not Add Unneeded Secrets

The current app does not need a Supabase service role key. Keep service-role
keys out of frontend code and ordinary runtime environments unless a future
server-only task truly requires one.
