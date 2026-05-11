# Database Setup

Supabase SQL migrations define the database schema, public prompt-library data, authentication profile trigger, and row level security policies.

## Schema Summary

- `users`: public user profile rows linked to `auth.users`, with email, display name, and a simple `user` or `admin` role.
- `categories`: prompt library categories such as ChatGPT, Cursor/Codex, Claude, and n8n Workflows.
- `tags`: reusable prompt tags for search and filtering.
- `prompts`: published prompt templates with title, slug, description, prompt text, category, tool, difficulty, and featured status.
- `prompt_tags`: many-to-many join table between prompts and tags.
- `saved_prompts`: prompts saved by authenticated users, with a unique `(user_id, prompt_id)` pair to prevent duplicates.
- `usage_events`: analytics events for views, copies, saves, generations, and searches.
- `generated_prompts`: logged-in prompt generation history.

## Relationships

- A category has many prompts.
- A prompt has many tags through `prompt_tags`.
- A user can save many prompts through `saved_prompts`.
- A user can have many usage events and generated prompts.
- Usage events can optionally point to a prompt, which also supports search and generation events that may not belong to one prompt.

## Row Level Security

RLS is enabled on every public table.

- Anyone can read categories, tags, and published prompts.
- Users can read and update their own profile, but cannot promote themselves to admin.
- Users can read, create, and delete their own saved prompts.
- Users can create their own usage events and generated prompt records.
- Admin users can manage prompt-library tables and read analytics.
- New Supabase Auth signups automatically create a matching `public.users` profile row.

## Admin Users

Roles are intentionally simple. New accounts start with the `user` role.
Promote a trusted account manually from Supabase SQL:

```sql
update public.users
set role = 'admin'
where email = 'you@example.com';
```

## Seed Data

`supabase/seed.sql` creates:

- 11 MVP categories
- 23 reusable tags
- 33 published prompt templates, with 3 prompts per category
- Prompt-to-tag relationships

The seed is written with stable slugs and `on conflict` updates, so it is safe to re-run while content is still evolving. The Supabase CLI reads the seed path from `supabase/config.toml`.

## Local Commands

Install the Supabase CLI if you do not already have it:

```bash
pnpm dlx supabase --version
```

Start a local Supabase stack:

```bash
pnpm dlx supabase start
```

Reset the local database, apply migrations, and run the seed file:

```bash
pnpm dlx supabase db reset
```

Link to a hosted Supabase project when you are ready:

```bash
pnpm dlx supabase link --project-ref your-project-ref
pnpm dlx supabase db push
```

## Manual Verification

After `pnpm dlx supabase db reset`, open Supabase Studio and check:

1. `categories` has 11 rows.
2. `prompts` has 33 rows.
3. Every prompt has `is_published = true`.
4. `prompt_tags` contains relationships for every seeded prompt.
5. Registering a test account creates a matching `public.users` row.
6. Saving a prompt creates one `saved_prompts` row for that user.
7. Saving the same prompt again does not create a duplicate row.
8. The Next.js frontend still runs with `pnpm dev`.

## Migration Files

- `20260510180000_initial_schema.sql`: tables, enums, indexes, triggers, RLS,
  and policies.
- `20260511170000_auth_profiles.sql`: email column and automatic profile rows
  for Supabase Auth signups.
- `20260511190000_search_filter_indexes.sql`: text-search and tag lookup
  indexes for the prompt library.
