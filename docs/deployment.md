# Deployment Preparation

This project is prepared for deployment, but this guide does not deploy it
automatically.

## Recommended Host

Vercel is the simplest target for a Next.js App Router project.

Recommended production stack:

- Vercel for the Next.js app and API routes.
- Hosted Supabase for database, Auth, and RLS.
- OpenAI API key stored as a server-only environment variable.

Other hosts can work if they support Next.js App Router server routes and
environment variables.

## Build Settings

For Vercel:

- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: use the default Next.js output
- Node version: use the platform default supported by Next.js 16, or configure
  the latest active LTS version available on the platform

Local predeploy command:

```bash
pnpm predeploy
```

## Production Environment Variables

Set these in the hosting provider:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Do not expose `OPENAI_API_KEY` as a public variable.

Use `.env.production.example` as a safe checklist. It intentionally contains no
secret values.

## Supabase Production Setup

1. Create or choose a hosted Supabase project.
2. Link the local project:

```bash
pnpm dlx supabase link --project-ref your-project-ref
```

3. Push migrations:

```bash
pnpm dlx supabase db push
```

4. Apply seed data only if you want starter content in production. For a fresh
   hosted project, run `supabase/seed.sql` from the Supabase SQL editor or a
   reviewed one-time SQL job. Do not reset a production database after launch.
5. Configure Supabase Auth redirect URLs for your deployed domain.
6. Register a trusted account and promote it to admin.

## Auth Callback URLs

For production:

```text
https://your-domain.example/auth/callback
```

For local development:

```text
http://localhost:3000/auth/callback
```

Set the production site URL in Supabase Auth settings and keep the callback URL
in the allowed redirect URLs list.

## Predeploy Checks

```bash
pnpm predeploy
```

Manual checks:

1. Homepage renders.
2. Prompt library returns published prompts.
3. Login/register work.
4. Saved prompts persist.
5. Admin pages reject non-admin users.
6. Admin prompt CRUD works for admins.
7. Generator works with the production OpenAI key.
8. Security headers are present.

See [production-checklist.md](production-checklist.md) for the full launch
checklist and rollback plan.

## Rollback Notes

- Vercel can roll back to a previous deployment from the dashboard.
- Database changes need a reviewed rollback migration or Supabase backup
  restore. Avoid destructive production resets after launch.
- If a secret is accidentally exposed, rotate it immediately in the provider
  dashboard and redeploy.

## Known Production Follow-Ups

- Add durable rate limiting for `/api/generate-prompt`.
- Add monitoring/logging for API errors and admin mutations.
- Decide whether production should seed starter prompts automatically.
- Add a stricter Content Security Policy after finalizing analytics, images,
  and third-party scripts.
- Add billing only after validating repeat usage. See
  [monetization.md](monetization.md).
