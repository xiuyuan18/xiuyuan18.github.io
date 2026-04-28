# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build / Run / Deploy

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (Next.js with Turbopack)
npm run build            # Production build (static export to dist/)
npm run deploy           # Build + deploy to GitHub Pages (gh-pages branch)
```

## Architecture

This is a **statically-exported Next.js 16** academic personal homepage, deployed to `xiuyuan18.github.io` via `gh-pages`.

### Content is data-driven

All site content lives in **`src/constants.ts`** as a single `DATA: SiteData` object. To change profile info, publications, news, teaching, awards, or blog metadata, edit that file. There is no CMS or database.

Blog post *bodies* are separate files in `public/assets/posts/` — either `.md` (rendered via `react-markdown` + KaTeX) or `.html` (loaded in an iframe, used for Jupyter notebook exports).

### Routing and page composition

- **`src/app/layout.tsx`** — Root layout (minimal: just `<html>` + `<body>`)
- **`src/app/(site)/layout.tsx`** — Shared layout for most pages: sticky `Navbar` + centered `<main>` + `Footer`
- **`src/app/public/layout.tsx`** — Bare pass-through layout (no chrome)
- **`src/app/page.tsx`** — Home page, wraps `<Home />` in SiteLayout
- **`src/app/publications/page.tsx`** — Publications page
- **`src/app/teaching/page.tsx`** — Teaching page
- **`src/app/blog/page.tsx`** — Blog listing
- **`src/app/blog/[slug]/page.tsx`** — Individual blog post; reads `.md` from `public/assets/posts/` at build time via `generateStaticParams`

### Separation: pages vs. app routes

Page components live in `src/pages/` (Home, Blog, BlogPost, Publications, Teaching). App route files in `src/app/` are thin wrappers that import a page component and wrap it in `SiteLayout`. This keeps the page logic separate from Next.js routing boilerplate.

### Components

- **`Navbar`** — Sticky nav with links conditionally shown based on `DATA.config` (showPublicationsPage, showTeachingPage, showBlogPage)
- **`Footer`** — Simple footer with copyright year and "last updated" date
- **`MediaTeaser`** — Lazy-loaded teaser media (video with fallback to image) using IntersectionObserver

### Styling

Tailwind CSS v4 with a custom `academic` color palette defined in `tailwind.config.js` (gray-ish 50–900 scale + `accent` blue). Fonts: Inter (sans) and Playfair Display (serif).

### Key config

- `next.config.js`: `output: 'export'`, `distDir: 'dist'`, images unoptimized (required for static export)
- `tsconfig.json`: `strict: false`, `strictNullChecks: true`, path alias `@/*` maps to root

## Editing content

1. **Profile, publications, news, teaching, awards, blog metadata** — edit `src/constants.ts`
2. **Blog post content** — add/update `.md` or `.html` files in `public/assets/posts/`, matching the `slug` in the blog entry
3. **Images/videos/CV** — place in `public/assets/`
4. **Page visibility** — toggle `showPublicationsPage`, `showTeachingPage`, `showBlogPage` in `DATA.config`
