# Admin Guide

Admin features are available at `/dashboard/admin`.

## Become an Admin

New users are normal users by default. Promote only trusted accounts:

```sql
update public.users
set role = 'admin'
where email = 'you@example.com';
```

## Admin Pages

- `/dashboard/admin`: dashboard summary.
- `/dashboard/admin/prompts`: prompt inventory.
- `/dashboard/admin/prompts/new`: create prompt.
- `/dashboard/admin/prompts/[id]/edit`: edit prompt.

## Prompt Fields

- `title`: public prompt title.
- `slug`: public URL slug. Use lowercase letters, numbers, and hyphens.
- `description`: short card/detail summary.
- `promptText`: full copyable prompt.
- `category`: existing category from the database.
- `tool`: target tool such as ChatGPT, Claude, Cursor, Codex, Canva AI, DALL-E,
  Midjourney, or n8n.
- `difficulty`: Beginner, Intermediate, or Advanced.
- `tags`: comma-separated tags.
- `Published`: controls public visibility.
- `Featured`: boosts placement in featured-first sorting.

## Publishing Flow

1. Create a draft prompt with `Published` unchecked.
2. Review the prompt detail and tags.
3. Edit the prompt and check `Published`.
4. Confirm it appears in `/prompts`.
5. Optionally check `Featured`.

## Delete Behavior

Deleting a prompt removes related prompt-tag and saved-prompt rows through
database cascade constraints. Use delete only for test content or content you
really want to remove.

## Common Admin Errors

- `Authentication required.`: log in first.
- `Admin access required.`: your profile role is not `admin`.
- `A prompt with that slug already exists.`: choose a unique slug.
- `categoryId is invalid.`: ensure categories exist and the form loaded from a
  configured Supabase project.
