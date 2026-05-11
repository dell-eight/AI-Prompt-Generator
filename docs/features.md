# Feature Overview

## Public Pages

- `/`: homepage with featured prompts and links to the library and generator.
- `/prompts`: searchable, filterable prompt library.
- `/prompts/[slug]`: prompt detail page with copy/save actions and related prompts.
- `/generator`: guided prompt generator form.

## Prompt Library

Users can search across prompt title, description, prompt text, tool, category,
and tags. Filters support category, tool, difficulty, and tag. Sort options are
featured, newest, oldest, and title.

The library stores search/filter state in the URL, so filtered views can be
refreshed or shared.

## Accounts

Users can register, log in, and log out with Supabase Auth. A trigger creates a
matching `public.users` profile row for new accounts.

## Saved Prompts

Logged-in users can save published prompts and view them at `/saved`. Saved
prompt reads and deletes are scoped to the logged-in user.

## Admin

Admin users can manage prompt content at `/dashboard/admin`. Admin access is
controlled by `public.users.role = 'admin'`, server page checks, API checks, and
Supabase RLS.

## Prompt Generator

The generator accepts structured inputs and sends them to a server-side API
route. The OpenAI key never reaches the browser. Logged-in generation results
are saved to `generated_prompts` when possible.

## Security and Stability

The MVP includes input validation, safe API errors, RLS policies, same-origin
mutation checks, basic generator rate limiting, and common security headers.

## Monetization Status

Payments, subscriptions, premium prompt gates, and pricing pages are not
implemented. See [monetization.md](monetization.md) for a future plan that keeps
the free product useful.
