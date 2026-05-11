create extension if not exists pgcrypto with schema extensions;

do $$
begin
  create type public.prompt_difficulty as enum (
    'Beginner',
    'Intermediate',
    'Advanced'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.usage_event_type as enum (
    'view',
    'copy',
    'save',
    'generate',
    'search'
  );
exception
  when duplicate_object then null;
end $$;

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  created_by uuid references public.users(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  prompt_text text not null,
  tool text not null,
  difficulty public.prompt_difficulty not null default 'Beginner',
  is_featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prompt_tags (
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (prompt_id, tag_id)
);

create table public.saved_prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, prompt_id)
);

create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  prompt_id uuid references public.prompts(id) on delete set null,
  event_type public.usage_event_type not null,
  session_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.generated_prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  source_prompt_id uuid references public.prompts(id) on delete set null,
  tool text not null,
  goal text not null,
  input jsonb not null default '{}'::jsonb,
  generated_text text not null,
  created_at timestamptz not null default now()
);

create index prompts_category_id_idx on public.prompts(category_id);
create index prompts_published_featured_idx on public.prompts(is_published, is_featured);
create index prompts_tool_idx on public.prompts(tool);
create index prompts_difficulty_idx on public.prompts(difficulty);
create index tags_slug_idx on public.tags(slug);
create index saved_prompts_user_id_idx on public.saved_prompts(user_id);
create index usage_events_prompt_id_idx on public.usage_events(prompt_id);
create index usage_events_created_at_idx on public.usage_events(created_at desc);
create index generated_prompts_user_id_idx on public.generated_prompts(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger prompts_set_updated_at
before update on public.prompts
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.users
  where id = auth.uid();
$$;

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.prompts enable row level security;
alter table public.prompt_tags enable row level security;
alter table public.saved_prompts enable row level security;
alter table public.usage_events enable row level security;
alter table public.generated_prompts enable row level security;

create policy "Users can read their own profile"
on public.users for select
using (id = auth.uid() or public.is_admin());

create policy "Users can update their own profile"
on public.users for update
using (id = auth.uid())
with check (id = auth.uid() and role = public.current_user_role());

create policy "Anyone can read categories"
on public.categories for select
using (true);

create policy "Admins can manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read tags"
on public.tags for select
using (true);

create policy "Admins can manage tags"
on public.tags for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read published prompts"
on public.prompts for select
using (is_published = true or public.is_admin());

create policy "Admins can manage prompts"
on public.prompts for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read prompt tags for published prompts"
on public.prompt_tags for select
using (
  exists (
    select 1
    from public.prompts
    where prompts.id = prompt_tags.prompt_id
      and (prompts.is_published = true or public.is_admin())
  )
);

create policy "Admins can manage prompt tags"
on public.prompt_tags for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users can read their saved prompts"
on public.saved_prompts for select
using (user_id = auth.uid() or public.is_admin());

create policy "Users can save prompts"
on public.saved_prompts for insert
with check (user_id = auth.uid());

create policy "Users can delete their saved prompts"
on public.saved_prompts for delete
using (user_id = auth.uid());

create policy "Anyone can create usage events"
on public.usage_events for insert
with check (user_id = auth.uid() or user_id is null);

create policy "Admins can read usage events"
on public.usage_events for select
using (public.is_admin());

create policy "Users can read their generated prompts"
on public.generated_prompts for select
using (user_id = auth.uid() or public.is_admin());

create policy "Users can create generated prompts"
on public.generated_prompts for insert
with check (user_id = auth.uid());

create policy "Users can delete their generated prompts"
on public.generated_prompts for delete
using (user_id = auth.uid());
