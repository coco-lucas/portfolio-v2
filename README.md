# Next.js Boilerplate

Opinionated Next.js 16 + React 19 + Tailwind v4 + shadcn/ui starter. Clone, rename, swap the locale defaults, and ship.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind v4 · shadcn/ui (`radix-nova` style) · hugeicons
- TanStack Query (server state) · Zustand (client state) · axios (HTTP)
- next-intl (i18n) · next-themes (light/dark) · sonner (toasts)
- Bun (package manager / runner)

## Getting started

```bash
bun install
bun dev          # http://localhost:3000
bun run build
bun run start
bun run lint
```

Set `NEXT_PUBLIC_API_URL` in `.env` to point at your backend.

## Project structure

```
app/
  (public)/        # Unauthenticated pages
  (private)/       # Authenticated pages
  styles/          # globals.css (Tailwind tokens, CSS variables)
  layout.tsx       # Root layout — providers, fonts, metadata
components/
  ui/              # shadcn primitives
  table/           # Shared TanStack Table cells
hooks/
  use-mask.ts      # Generic UI hooks
  use-pagination.ts
  use-url-param.ts
  service/         # TanStack Query wrappers (one file per API domain)
i18n/              # next-intl locale + message loading
lib/
  metadata.ts      # createMetadata() factory + defaultMetadata
  query-client.ts  # Shared QueryClient
  utils.ts         # cn() class-merge helper
  fonts.ts         # Font variable wiring
service/
  api.ts           # Single axios instance + auth interceptors
  endpoints/       # API domains (auth.ts, ...)
store/             # Zustand stores (use-auth.ts)
types/             # All .d.ts type definitions
utils/             # Pure helpers (toast, formatters, on-error, ...)
proxy.ts           # Next 16 proxy (formerly middleware.ts)
```

## Patterns to follow

### 1. Data fetching: endpoint → hook → component

Every API call goes through three layers. Components never call axios directly.

**`types/posts.d.ts`** — entities and DTOs:

```ts
export interface Post { id: string; title: string; body: string; }
export interface CreatePostDTO { title: string; body: string; }
export interface ListPostsParams { page?: number; }
```

**`service/endpoints/posts.ts`** — paths and request functions, kept separate:

```ts
import { api } from "../api";
import type { Post, CreatePostDTO, ListPostsParams } from "@/types/post";

export const postsRoutes = {
  list: "/posts",
  byId: (id: string) => `/posts/${id}`,
} as const;

export const PostsApi = {
  list: (params: ListPostsParams) => api.get<Post[]>(postsRoutes.list, { params }),
  byId: (id: string) => api.get<Post>(postsRoutes.byId(id)),
  create: (data: CreatePostDTO) => api.post<Post>(postsRoutes.list, data),
};
```

**`hooks/service/use-posts.ts`** — TanStack Query wrapper:

```ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostsApi } from "@/service/endpoints/posts";

export const postsKeys = {
  all: ["posts"] as const,
  list: (params) => [...postsKeys.all, "list", params] as const,
};

export function usePosts(params) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => PostsApi.list(params).then((r) => r.data),
  });
}
```

**Component:** consumes the hook only.

```tsx
const { data: posts, isLoading } = usePosts({ page: 1 });
```

### 2. Types live in `types/`

Every interface, type, and DTO goes in `types/<domain>.d.ts` — never inline next to a hook, endpoint, or component, even if only one file uses it today.

### 3. Auth = axios interceptors + Zustand + cookie

`service/api.ts` attaches Bearer tokens, harvests refreshed tokens from responses, and retries 401/403 once via the refresh endpoint. `store/use-auth.ts` persists tokens in `localStorage` and mirrors `{ isAuthenticated, sessionExpiry }` into a non-HttpOnly `auth-session` cookie that the proxy can read.

Don't create new axios instances — extend the existing one. Don't read auth state directly from `localStorage`/cookies in components — go through `useAuthStore`.

### 4. Theming via CSS variables

`app/styles/globals.css` defines stable `--foreground-light` / `--foreground-dark` as the source of truth, and `--foreground` aliases one of them per theme. Use the stable handles for fixed-color surfaces (toast backgrounds, branded panels). Never duplicate raw `oklch(...)` values into new variables — alias them.

Semantic colors `--success`, `--destructive`, `--warning` are defined per-theme. Toasts and similar use them for backgrounds and the stable foregrounds for text.

### 5. URL-driven state

Anything that should survive refresh or be shareable (filters, page, sort) goes through `useUrlParam(key)` or `usePagination()` — both write back via `router.replace` without scroll.

## Conventions

- **File names**: kebab-case (`use-pagination.ts`, `format-currency.ts`).
- **Path alias**: `@/*` → repo root. Always import via `@/` — never `../../`.
- **Hooks**: prefix `use-`. Generic UI in `hooks/`, data fetching in `hooks/service/`.
- **className composition**: always use `cn()` from `@/lib/utils`.
- **Toasts**: use `toastSuccess` / `toastError` / `toastWarning` / `toastPromise` from `@/utils/toast`.
- **Metadata**: pages export `metadata` via `createMetadata({ title, description, path })` from `@/lib/metadata`.
- **Locale defaults**: ships with `pt-BR` (BRL currency, CPF/CNPJ masks). Swap formatters in `utils/formatters/` and masks in `hooks/use-mask.ts` together when forking.

## Adding a new API domain

1. `types/<domain>.d.ts` — entities + DTOs.
2. `service/endpoints/<domain>.ts` — `<domain>Routes` + `<Domain>Api`.
3. `hooks/service/use-<domain>.ts` — `<domain>Keys` + query/mutation hooks.
4. Component imports from step 3 only.

## Further reading

See [`CLAUDE.md`](./CLAUDE.md) for the full architectural guide (anti-patterns, utilities catalog, theming details).
