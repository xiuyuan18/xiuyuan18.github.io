# AGENTS.md

Guidance for coding agents working in this repository. These instructions apply to the entire project.

## Project overview

This is Xiuyuan Yu's data-driven academic homepage. It uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The site is statically exported to `dist/` and published to the root GitHub Pages site at `https://xiuyuan18.github.io`.

There is no CMS, database, API, or server runtime. Preserve that static-site model unless the user explicitly asks to change it.

## Commands

```bash
npm ci          # Reproducible dependency install from package-lock.json
npm run dev     # Start Next.js development server with Turbopack
npm run lint    # Run ESLint and Next.js rules
npm run typecheck # Run TypeScript without emitting files
npm test        # Validate content IDs, assets, slugs, and blog bodies
npm run build   # Type-check and create the static export in dist/
npm run check   # Run lint, typecheck, tests, and the production build
npm run serve   # Preview the built dist/ directory
npm run deploy  # Build and publish dist/ to the gh-pages branch
```

- Use `npm run check` as the full validation for code, routing, configuration, or content changes.
- `npm run serve` invokes `npx serve@latest`, so it may need network access when `serve` is not already cached.
- Do not run `npm run deploy` unless the user explicitly asks to publish; it changes the remote `gh-pages` branch.
- Do not edit generated output in `dist/` or `.next/`.

## Repository map

- `src/app/layout.tsx` — root HTML/body layout, global CSS, and site metadata.
- `src/app/robots.ts` and `src/app/sitemap.ts` — generated crawler policy and sitemap.
- `src/app/(site)/layout.tsx` — shared navbar, centered main area, and footer. The `(site)` route group does not appear in URLs.
- `src/app/(site)/**/page.tsx` — App Router entry points. These are intentionally thin and render view components.
- `src/views/` — page-level UI for Home, Publications, Teaching, Blog, and BlogPost.
- `src/components/` — shared UI, navigation, icons, and lazy-loaded publication media.
- `src/constants.ts` — the single `DATA: SiteData` content/configuration object.
- `src/types.ts` — types for the data model.
- `src/lib/utils.ts` — publication-author and teaser-media helpers.
- `src/index.css` — Tailwind and KaTeX setup, focus/motion defaults, custom dark variant, and font declarations; imported through `src/app/global.css`.
- `tailwind.config.js` — fonts and the `academic` color palette.
- `public/assets/` — profile media, CV, publication media, and blog bodies.
- `next.config.js` — static export settings (`output: 'export'`, `distDir: 'dist'`, unoptimized images).

## Content workflow

Most content changes belong in `src/constants.ts`:

- `profile` controls identity, biography, contact details, education, social links, photo, and CV.
- `news`, `publications`, `teaching`, and `awards` drive their corresponding sections.
- `blog` contains post metadata; post bodies remain separate public assets.
- `config.showPublicationsPage`, `showTeachingPage`, and `showBlogPage` control navigation, sitemap inclusion, and whether the corresponding route is publicly generated.

Keep `src/constants.ts` consistent with `src/types.ts`. Use unique IDs for list entries and root-relative public asset paths such as `/assets/cv.pdf`.

### Blog posts

Each entry in `DATA.blog` needs a matching file in `public/assets/posts/`:

- Omit `format` (or use `format: 'md'`) for `<slug>.md`. Markdown supports math through `remark-math`, `rehype-katex`, and KaTeX.
- Use `format: 'html'` for `<slug>.html`. HTML posts are displayed in a same-origin iframe, primarily for notebook exports.
- Keep the metadata slug and filename identical, including case.

`src/app/(site)/blog/[slug]/page.tsx` enumerates every known blog slug with `generateStaticParams()` because static export rejects an empty parameter list. When Blog is disabled, those paths render not-found content. When enabled, the route validates the matching body asset and reads Markdown at build time. Markdown rendering stays server-side; only HTML iframe sizing belongs in a client component. Any new dynamic route must likewise be fully enumerable for static export.

## Implementation conventions

- TypeScript strict mode is enabled. Keep new code typed and avoid broad `any` casts.
- The `@/*` alias points at the repository root, so existing imports use forms such as `@/src/constants`.
- App Router modules are server components by default. Add `'use client'` only when a component needs state, effects, browser APIs, or client navigation hooks.
- Keep route `page.tsx` files small; reusable page logic belongs in `src/views/` and shared UI belongs in `src/components/`.
- Read site content from `DATA` rather than duplicating profile or publication information in components.
- Follow the existing responsive and dark-mode styling. Dark mode is toggled by adding `.dark` to the document root and is persisted in `localStorage`.
- Use the existing `academic` palette and font families before introducing new design tokens.
- Preserve accessible names, semantic elements, keyboard behavior, and external-link safety (`rel="noopener noreferrer"` when opening a new tab).
- Prefer Next.js `Link` for internal navigation. Existing public media uses native `img`, `video`, and `iframe` elements because the site is a static export and publication media may be video.

## Static-export constraints

- Do not introduce features that require a persistent Next.js server (API routes, server actions at runtime, request-dependent rendering, or unbounded dynamic routes) without confirming a deployment change with the user.
- Filesystem reads are allowed only during the build, as in the blog route.
- `next/image` would require static-export-compatible configuration; images are currently configured as unoptimized.
- The current deployment is a user/organization GitHub Pages root site. If moving it under a repository subpath, update `basePath`, asset URLs, and `NEXT_PUBLIC_BASE_PATH` handling together.
- Remote fonts are declared in CSS from `fonts.gstatic.com`; consider both online loading and fallback fonts when changing typography.

## Change checklist

1. Inspect the affected data type, route, view, and shared component before editing.
2. Keep changes focused; do not rewrite personal content or visual styling unless requested.
3. For content changes, verify every referenced file and URL and ensure blog slug/format pairs match their asset.
4. Run `npm run check` and address lint, TypeScript, content-test, and static-generation failures.
5. Summarize changed files and validation.
