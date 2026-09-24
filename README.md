# Ahmed Belhassen — Portfolio

Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Fully static, no runtime
dependencies beyond Next.js itself.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typechecks, then prerenders every page
npm run lint
```

## Editing content

All copy lives in two files. Components never change for a content update.

| File | Contains |
| --- | --- |
| `src/content/profile.ts` | Name, links, headline, capabilities, experience, credentials |
| `src/content/projects.ts` | The five case studies, plus the shorter `alsoBuilt` list |

Search for `TODO` to find what still needs real information.

**Content rules.** Every claim must be true today. A number that can't be
sourced is a TODO, not a guess. Nothing proprietary: no code, no credentials,
no internal hostnames, no customer data in screenshots.

## Design system

Two themes from one set of role-named tokens (`bg`, `surface`, `fg`, `muted`,
`line`, `accent`) in `src/app/globals.css`. Dark is the default and the art
direction; `.light` on `<html>` flips it, set before first paint by the inline
script in `layout.tsx` so there's no flash.

The accent is the CV's navy, brightened until it reads on ink, so the printed
CV and the site stay one brand.

Type is one superfamily: DM Sans from body copy up to the largest headline,
DM Mono for labels, years and metrics. `.display` is the same sans set tight —
medium weight, negative tracking. Size does the work, not a second typeface.

Motion is CSS-only. `.reveal` elements start hidden and are released by an
IntersectionObserver in `src/components/Reveal.tsx`, one-way so nothing
re-animates on scroll-up. Page transitions use the native View Transitions API.
Everything is disabled under `prefers-reduced-motion`, and a `<noscript>` block
shows all content if scripts fail.

## Adding a project screenshot

Capture at 1440x900 (desktop) and 390x844 (phone), convert to WebP, and drop
them in `public/work/`. Then add `shots` to the project with the real pixel
dimensions — `next/image` needs them to reserve space and avoid layout shift.
A project without `shots` renders its architecture diagram instead, so it never
shows an empty frame.

## Before launch

- [x] CV at `public/Ahmed-Belhassen-CV.pdf`
- [x] AWS Academy badge, with its Credly link
- [x] Logos in `public/logos/`
- [ ] Set `siteUrl` in `profile.ts` to the real domain. Canonical URLs, the
      sitemap, robots.txt and the OG image all derive from it
- [ ] Converty screenshots for the two backend case studies
- [ ] Resolve the remaining `TODO`s, especially measurable outcomes

## Deploy

Push to GitHub, import on [Vercel](https://vercel.com/new), add the custom
domain in project settings.
