# Security Review Notes

These notes cover practical MVP security hardening for authentication, admin
access, APIs, secrets, and the prompt generator.

## Implemented Controls

- Supabase sessions are read server-side with cookie-based auth helpers.
- Admin pages and admin APIs require a signed-in profile with `role = 'admin'`.
- Saved prompt reads, writes, and deletes are scoped to the logged-in user.
- Supabase RLS is enabled on user, prompt, saved prompt, usage, and generated
  prompt tables.
- Public prompt APIs expose only published prompt fields.
- Admin prompt writes validate UUIDs, slug format, required text, difficulty,
  and tag limits.
- Generator requests validate prompt type, target tool, required goal, text
  length limits, and a basic per-IP rate limit.
- OpenAI API keys are used only by the server route and are not exposed to the
  browser.
- Unexpected API errors return generic messages.
- Auth callback redirects reject protocol-relative external URLs such as
  `//example.com`.
- Mutating API routes reject cross-origin browser requests when an `Origin`
  header is present.
- Response headers add `nosniff`, frame denial, strict referrer policy, and
  disabled camera/microphone/geolocation permissions.
- Prompt text is rendered as React text, not unsafe HTML.

## Security Test Checklist

1. Guest `/saved` request redirects to `/login?next=/saved`.
2. Guest `/dashboard/admin` request redirects to login.
3. Guest `/api/admin/prompts` returns `401`.
4. Non-admin `/api/admin/prompts` returns `403`.
5. Guest `/api/saved-prompts` returns `401`.
6. Saved prompt delete can remove only the current user's saved row.
7. Invalid admin prompt payload returns `400`.
8. Invalid generator payload returns `400`.
9. Missing `OPENAI_API_KEY` returns a safe `503` generator message.
10. `/auth/callback?next=//example.com` redirects to `/saved`.
11. Cross-origin `Origin` headers on mutation APIs return `403`.
12. Public pages include security headers.
13. Searching for HTML-like prompt content displays text rather than executing
    markup.

## Remaining Recommendations

- Use provider-level or durable rate limiting before public launch. The current
  in-memory limiter is suitable only for MVP/local deployment.
- Configure Supabase email settings, allowed redirect URLs, and password rules
  in the Supabase dashboard before production.
- Keep the Supabase service role key out of frontend and regular app runtime
  unless a future server-only admin task truly needs it.
- Add monitoring for repeated generator failures, admin mutations, and auth
  errors after deployment.
