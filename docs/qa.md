# QA Stabilization Checklist

Use this checklist for release-candidate checks. It focuses on existing MVP
behavior, not new features.

## Automated Checks

Run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Manual Regression Checklist

1. Homepage renders featured prompts and current generator wording.
2. Prompt library loads with no query string.
3. Prompt library preserves `q`, `category`, `tool`, `difficulty`, `tag`, `sort`, and `page` in the URL.
4. Filter chips can be cleared individually.
5. Clear all resets search, filters, sort, and pagination.
6. Mobile filter toggle shows and hides filters.
7. Empty prompt results show a clear-filters action.
8. Prompt detail pages render prompt text, related prompts, copy, and save actions.
9. Copy buttons place prompt text on the clipboard.
10. Guest save redirects users toward login.
11. Login and register preserve the `next` redirect path.
12. Saved prompts require authentication.
13. Admin pages require an admin profile role.
14. Admin prompt create, edit, publish/unpublish, feature/unfeature, and delete work for admins.
15. Prompt generator validates required goal input.
16. Prompt generator uses `OPENAI_API_KEY` only on the server.
17. API routes return safe validation and unexpected-error messages.
18. Security headers are present on public pages.
19. Cross-origin mutation requests return `403`.

## Release Status

The app is ready for deployment preparation after automated checks pass and the
manual checklist is completed against a Supabase project with seed data.
