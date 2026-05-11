# Local Setup

Use this guide to run PromptForge locally from a fresh checkout.

## Prerequisites

- Node.js compatible with Next.js 16
- Corepack enabled for pnpm
- Docker Desktop if you want to run local Supabase
- A Supabase project or local Supabase stack
- An OpenAI API key only if you want to test real prompt generation

## Install Dependencies

```bash
corepack enable
pnpm install
```

## Configure Environment

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

See [environment.md](environment.md) for what each value does.

## Start Supabase Locally

```bash
pnpm dlx supabase start
pnpm dlx supabase db reset
```

`db reset` applies all migrations and runs `supabase/seed.sql`.

## Run the App

```bash
pnpm dev
```

Open `http://localhost:3000`.

## First Checks

1. Visit `/` and confirm featured prompts render.
2. Visit `/prompts` and confirm filters and search render.
3. Visit `/api/prompts?limit=3` and confirm JSON returns.
4. Register a test account.
5. Save a prompt, then visit `/saved`.
6. Add `OPENAI_API_KEY` and test `/generator`.

## Admin Setup

New users are created with `role = 'user'`. Promote a trusted test account:

```sql
update public.users
set role = 'admin'
where email = 'you@example.com';
```

Then visit `/dashboard/admin`.
