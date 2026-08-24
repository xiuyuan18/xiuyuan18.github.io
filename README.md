# Xiuyuan Yu — Academic Homepage

A statically exported academic website built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The production site is published at [xiuyuan18.github.io](https://xiuyuan18.github.io).

## Local development

Node.js 20.9 or newer is required.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in a browser.

## Editing content

Site content and section visibility are defined in `src/constants.ts`:

- Update profile details, news, publications, teaching, awards, and blog metadata in the `DATA` object.
- Put images, videos, and the CV in `public/assets/` and reference them with paths such as `/assets/cv.pdf`.
- Put Markdown or notebook-exported HTML posts in `public/assets/posts/`.
- A blog entry's slug, format, and body filename must match exactly.

Sections disabled with `DATA.config` are omitted from navigation and the sitemap, and their routes return a not-found response instead of publishing section content.

## Validation

```bash
npm run lint       # ESLint and Next.js rules
npm run typecheck  # TypeScript without emitting files
npm test           # Content IDs, assets, slugs, and blog bodies
npm run build      # Static production export to dist/
npm run check      # Run every check above
```

Pull requests and pushes to `main` run the same checks in GitHub Actions.

## Preview and deployment

```bash
npm run serve
npm run deploy
```

`npm run serve` previews `dist/`. `npm run deploy` rebuilds the site and publishes `dist/` to the `gh-pages` branch; run it only when ready to update the live website.

## Architecture

- `src/app/` contains App Router layouts, routes, metadata, robots, and sitemap generation.
- `src/views/` contains page-level presentation.
- `src/components/` contains shared and interactive UI.
- `src/constants.ts` is the content source of truth.
- `public/assets/` contains static media and blog bodies.

See `AGENTS.md` for detailed repository conventions and static-export constraints.
