# Monetization Plan

This is a future plan only. PromptForge does not currently include payments,
subscriptions, premium prompt gates, usage credits, or a pricing page.

## Recommendation

Keep the MVP useful and free while collecting real usage signals. Add
monetization only after the app shows which users and categories create repeat
value.

Recommended order:

1. Keep the public prompt library free.
2. Keep basic saved prompts free for logged-in users.
3. Keep a small amount of prompt generation free.
4. Later test premium prompt packs or higher generator limits.
5. Add subscription billing only after users repeatedly hit meaningful limits.

## Free vs Paid Tier

| Area | Free | Future Paid |
| --- | --- | --- |
| Prompt library | Browse, search, copy public prompts | Premium packs for deep business, coding, writing, or automation workflows |
| Prompt details | Full published prompt text | Advanced examples, variants, or expert notes |
| Saved prompts | Basic saved prompt collection | Folders, notes, private collections, export |
| Prompt generator | Limited personal use | Higher monthly generation limits, longer context, saved history tools |
| Admin tools | Site owner only | Not relevant to regular users |
| Teams | Not included | Shared workspace, shared prompt collections, team seats |

## What Should Stay Free

- Public prompt browsing
- Keyword search and filters
- Copying prompt text
- A useful amount of prompt generation
- Basic saved prompts
- Account creation

The free product should remain good enough for beginners to learn better
prompting without paying.

## Future Paid Options

### Premium Prompt Packs

Best first experiment because it is simpler than subscriptions.

Examples:

- Coding project prompt pack
- Debugging prompt pack
- Book writing prompt pack
- Business idea validation prompt pack
- n8n automation prompt pack

### Pro Generator

Offer higher limits or richer generation workflows later.

Possible paid features:

- More generations per month
- Longer input context
- Prompt variants
- Saved generation history tools
- Export generated prompts

### Pro Saved Collections

Possible paid features:

- Folders
- Notes
- Favorites
- Private custom prompt storage
- Export to Markdown/CSV

### Team Plan

Later only. Add when individual users ask to share prompt collections.

Possible team features:

- Shared workspace
- Team prompt library
- Role-based workspace permissions
- Central billing

## What Not To Monetize Yet

- Do not paywall the whole library.
- Do not remove copy functionality from free users.
- Do not add fake scarcity or dark patterns.
- Do not add a complex team plan before individual usage is proven.
- Do not implement billing before deployment, analytics, and support workflows
  are ready.

## Upgrade Flow Later

1. User hits a natural limit, such as monthly generation count.
2. UI explains what happened in plain language.
3. User sees what remains free.
4. User can compare paid options.
5. Checkout is handled by a trusted payment provider.
6. Server-side subscription status unlocks paid features.
7. User can manage or cancel billing from a billing portal.

## Payment Provider Recommendation

Use Stripe Billing when ready.

Why:

- Strong documentation
- Checkout and customer portal
- Subscription support
- Webhook support
- Good fit for Next.js server routes

Do not store raw card details in the app.

## Future Database Changes

Add these only when implementing paid features:

```sql
alter table public.users
add column subscription_tier text not null default 'free',
add column subscription_status text not null default 'none',
add column stripe_customer_id text unique,
add column stripe_subscription_id text unique;

create table public.usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  period_start timestamptz not null,
  period_end timestamptz not null,
  generation_count integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, period_start)
);

create table public.premium_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  entitlement_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, entitlement_key)
);
```

RLS must keep subscription and entitlement data scoped to the current user, with
admin/server-only writes for billing webhooks.

## Future API Changes

Add only when billing is approved:

- `POST /api/billing/checkout`: creates a Stripe Checkout session.
- `POST /api/billing/portal`: creates a Stripe customer portal session.
- `POST /api/billing/webhook`: receives Stripe webhooks and updates server-side
  subscription status.
- Generator route: checks subscription tier and usage limits before calling
  OpenAI.
- Premium prompt route behavior: checks server-side entitlement before returning
  premium-only prompt text.

## Future UI Changes

- Pricing page
- Upgrade prompt when limits are reached
- Account billing status section
- Billing portal button
- Premium labels on premium prompt packs
- Clear free-vs-paid comparison

Avoid showing upgrade prompts before a user receives value.

## Metrics To Track Before Charging

- Prompt copy clicks
- Prompt saves per user
- Generator submissions per user
- Repeat weekly usage
- Search terms with no results
- Most-used categories
- Users who return after saving prompts
- OpenAI generation cost per active user

## Later Implementation Prompt

Use this only after explicitly deciding to add billing:

```text
Implement paid subscriptions for PromptForge using Stripe Billing.

Rules:
- Do not expose Stripe secret keys to the browser.
- Read current auth, users table, generator API, saved prompts, and RLS.
- Add subscription fields and usage tracking with migrations.
- Add server-side entitlement checks before unlocking paid features.
- Add Stripe Checkout, customer portal, and webhook routes.
- Verify webhook signatures.
- Keep the free tier useful.
- Add tests or manual QA for free, paid, canceled, and webhook failure states.
```
