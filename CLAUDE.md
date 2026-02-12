# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Backmind landing page — a Next.js 15 single-page marketing site with a Supabase-backed waitlist signup form. Deploys to Vercel.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint via Next.js built-in linting

No test runner is configured.

## Architecture

**Next.js App Router** with TypeScript (strict mode). Single route at `/`.

- `app/layout.tsx` — Root layout, loads Inter font via `next/font/google`, sets metadata
- `app/page.tsx` — Home route, renders `LandingPage` component
- `app/landing-page.tsx` — Main landing page component (all page content)
- `app/globals.css` — All styles in one file (~32KB); vanilla CSS with custom properties, keyframe animations, responsive breakpoints at 768px, `prefers-reduced-motion` support
- `lib/supabase.ts` — Supabase client singleton using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Path alias:** `@/*` maps to the project root.

**Styling approach:** No Tailwind or CSS framework. All styles are in `globals.css` using CSS custom properties for theming. Satoshi font imported via Google Fonts in CSS (Inter loaded via Next.js font optimization in layout).

**Backend:** Supabase only. Waitlist table schema: `id` (uuid), `email` (text, unique), `created_at` (timestamptz). RLS enabled with anonymous insert/select policies.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<supabase_project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>
```

## Known Issue

`app/landing-page.tsx` contains a recursive self-import — it imports and renders itself, creating an infinite loop. This file needs the actual landing page JSX content rather than the self-referencing stub.
