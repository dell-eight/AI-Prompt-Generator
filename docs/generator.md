# Prompt Generator Guide

The generator lives at `/generator` and posts to `/api/generate-prompt`.

## User Inputs

- Prompt type
- Target AI tool
- User goal
- Context/background
- Target audience
- Desired output format
- Tone/style
- Constraints
- Examples/references

Only `userGoal` is required, but better context produces better prompts.

## Server Behavior

The API route:

1. Rejects cross-origin mutation requests when an `Origin` header is present.
2. Applies a basic in-memory rate limit.
3. Validates prompt type, target tool, required goal, and text lengths.
4. Calls the OpenAI Responses API with `OPENAI_API_KEY`.
5. Returns only generated prompt text and an optional saved generation id.
6. Saves generated prompt history for logged-in users when Supabase is
   configured and the insert succeeds.

## Environment Variables

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

`OPENAI_API_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`.

## Error Cases

- Missing or invalid body: `400`
- Invalid prompt type or target tool: `400`
- Empty goal: `400`
- Too many requests: `429`
- Missing OpenAI key: `503`
- Provider failure: safe generic `500`

## Manual Test

1. Add `OPENAI_API_KEY` to `.env.local`.
2. Run `pnpm dev`.
3. Visit `/generator`.
4. Submit a realistic goal.
5. Copy the generated prompt.
6. Log in and submit again, then confirm `generated_prompts` receives a row.
