# Troubleshooting

## Supabase Is Not Configured

Symptom: pages or APIs show a Supabase configuration error.

Fix:

1. Check `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL`.
3. Set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Restart `pnpm dev`.

## Database Tables Are Missing

Symptom: prompt APIs fail or the library is empty unexpectedly.

Fix:

```bash
pnpm dlx supabase start
pnpm dlx supabase db reset
```

For hosted Supabase:

```bash
pnpm dlx supabase link --project-ref your-project-ref
pnpm dlx supabase db push
```

## No Seed Prompts Appear

Check that `supabase/seed.sql` ran. After reset, verify:

- `categories` has 11 rows.
- `prompts` has 33 rows.
- Seeded prompts have `is_published = true`.

## Login or Register Does Not Work

Check:

- Supabase URL/key are correct.
- Supabase Auth email settings allow your test flow.
- Browser cookies are enabled.
- The local app URL matches your Supabase redirect settings when using email
  confirmation.

## User Cannot Access Admin

New users are not admins. Promote a trusted account:

```sql
update public.users
set role = 'admin'
where email = 'you@example.com';
```

Then log out and log back in.

## Prompt Generator Says It Is Not Configured

Set:

```bash
OPENAI_API_KEY=
```

Restart the dev server after changing `.env.local`.

## Build Fails

Run checks individually:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Read the first error, fix that first, then rerun the command.

## Port 3000 Is Already In Use

Run on another port:

```bash
pnpm dev -- -p 3001
```

If another Next dev server is already running for the same app, stop that
process before starting a new one.
