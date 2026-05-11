create index if not exists prompts_search_text_idx
on public.prompts
using gin (
  to_tsvector(
    'english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(prompt_text, '') || ' ' ||
    coalesce(tool, '')
  )
);

create index if not exists categories_search_text_idx
on public.categories
using gin (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(slug, ''))
);

create index if not exists tags_search_text_idx
on public.tags
using gin (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(slug, ''))
);

create index if not exists prompt_tags_tag_id_idx
on public.prompt_tags(tag_id);
