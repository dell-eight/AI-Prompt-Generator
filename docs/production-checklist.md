# Production Checklist

Use this checklist before the first public deployment.

## Repository Checks

```bash
pnpm install
pnpm predeploy
```

Expected result: typecheck, lint, and production build all pass.

## Environment Variables

Set these in the hosting provider:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Do not add `OPENAI_API_KEY` as a `NEXT_PUBLIC_` variable.

## Supabase

1. Create or select a hosted Supabase project.
2. Link local CLI to the project.
3. Push migrations.
4. Seed starter prompts only if desired, and only before public production data
   exists.
5. Configure Auth redirect URLs.
6. Create a trusted admin account.
7. Promote that account to `admin`.

## Auth URLs

For a production domain like `https://your-domain.example`, configure Supabase
Auth with:

- Site URL: `https://your-domain.example`
- Redirect URL: `https://your-domain.example/auth/callback`
- Local Redirect URL: `http://localhost:3000/auth/callback`

## Smoke Tests

1. `/` renders.
2. `/prompts` loads published prompts.
3. Search and filters update the URL.
4. `/prompts/[slug]` renders a prompt detail page.
5. Copy works in the browser.
6. Register and log in work.
7. `/saved` requires auth and shows saved prompts.
8. `/dashboard/admin` rejects non-admin users.
9. Admin create/edit/publish/delete works for an admin.
10. `/generator` returns a generated prompt.
11. Cross-origin mutation probes return `403`.
12. Security headers are present.

## Rollback Plan

1. Revert to the previous deployment in the hosting provider.
2. If a migration caused the issue, restore from a Supabase backup or apply a
   reviewed rollback migration.
3. Rotate any secret that may have been exposed.
4. Re-run the smoke tests after rollback.
