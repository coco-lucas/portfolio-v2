# lucascoco.com

Personal portfolio — [lucascoco.com](https://lucascoco.com). Single-page, trilingual, animation-driven.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind v4 · shadcn/ui primitives · Motion (Framer Motion) for animation
- next-intl (en / pt / es, cookie-based) · next-themes (light/dark)
- Phosphor icons (UI) · devicon + @dev.icons/react (tech stack) · EB Garamond (display font)
- EmailJS (contact form) · Vercel Analytics + Google Analytics
- Bun (package manager / runner)

## Getting started

```bash
bun install
bun dev          # http://localhost:3000
bun run build
bun run start
bun run lint
```

`.env` (all public, client-side keys):

```
NEXT_PUBLIC_EMAILJS_CONTACT_EMAIL=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_ASSETS_URL=https://<cloudfront-domain>/
```

## Features

- **Intro sequence** — the name types itself center screen (EB Garamond + shimmer), then glides into the header via a shared-layout FLIP; the rest of the page mounts and staggers in only after it lands. Timeline knobs live in `lib/animations.ts`.
- **Projects rail** (`components/ui/focus-rail.tsx`) — horizontal 3D carousel: drag/swipe, arrow keys, trackpad, click-to-focus. Zoomable screenshot, translated title/description with show-more, tech badges, date + company row. Theme-aware.
- **Dock** — macOS-style magnification (pure CSS `:has()` siblings), anchor navigation with smooth scroll, language switcher, and a theme toggle that reveals the new theme through a growing GIF mask (View Transitions API).
- **i18n** — en/pt/es via next-intl, cookie-based (no URL prefix). All copy in `messages/*.json`.
- **SEO** — metadata factory (`lib/metadata.ts`), OG image, JSON-LD Person, sitemap, robots.
- **Reduced motion** respected via `MotionConfig`.

## Editing content

| What | Where |
|---|---|
| Copy / translations | `messages/en.json`, `pt.json`, `es.json` |
| Projects (title, dates, company, links, images) | `shared/mocks/projects.ts` |
| Tech stack icons | `shared/mocks/tech-stack.tsx` (rendered through `components/tech-icon.tsx`) |
| Education / certifications | `components/education/index.tsx` |
| Social links | `app/home.tsx` (`socialItems`) |
| Animation timing (stagger, intro, dock delay) | `lib/animations.ts` |
| Design tokens (radius, colors, serif headings) | `app/styles/globals.css` |

### Project screenshots

Hosted on S3 + CloudFront under a numbered convention:

```
projects/<slug>/1.png   # first screenshot (2.png, ... to add more)
```

Add the URL to the project's `images` array in `shared/mocks/projects.ts`.

### Tech icons

`<TechIcon name="..." />` resolves from the classic devicon font (`name="javascript-plain colored"`), from @dev.icons/react for icons devicon lacks (`name="claude-code"` — see the `DEV_ICONS` map in `components/tech-icon.tsx`), or renders a raw SVG via the `svg` prop.

## Boilerplate underneath

The repo started from a Next.js boilerplate that ships auth/data-fetching patterns (axios interceptors, TanStack Query, Zustand) that the portfolio doesn't use but keeps available — see [`CLAUDE.md`](./CLAUDE.md) for those conventions if you extend the site with API-backed features.
