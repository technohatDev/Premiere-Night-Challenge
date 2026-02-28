# Premiere Night - Project Instructions

## Tech Stack

- React Native 0.83 + Expo SDK 55 (managed workflow)
- Expo Router v4 (file-based navigation)
- TypeScript (strict mode)
- NativeWind v4 (Tailwind CSS for React Native)
- Zustand (client state with AsyncStorage persist)
- TanStack Query v5 (server state, caching)
- TMDb API (movie data source)

## Commands

```bash
npm start              # Start Expo dev server
npm run lint           # ESLint with autofix
npm run lint:format    # Prettier format all files
npm run typecheck      # TypeScript check (no emit)
```

## Project Structure

```
app/                   # Expo Router screens (file-based routing)
  _layout.tsx          # Root layout (QueryClient, StatusBar)
  (tabs)/              # Tab navigation group
    index.tsx          # Spotlight (home) screen
    watchlist.tsx      # Watchlist screen
  movie/[id].tsx       # Movie detail (dynamic route)
src/
  api/                 # TMDb API client + types
  components/          # React Native components
    ui/                # Base UI components (LoadingSpinner, ErrorState, SafeAreaView)
  hooks/               # Custom hooks (useMovies, useDebounce, useWatchlist)
  store/               # Zustand stores
  constants/           # App constants (theme colors, TMDB config, env)
  utils/               # Utility functions (imageUrl, formatDate)
```

## Path Alias

`@/*` maps to `./src/*` — always use `@/` imports, never relative `../` paths.

## Code Standards

- ESLint 9 flat config with TypeScript strict rules
- Boolean variables must be prefixed: `is`, `has`, `can`, `should`, `are`, `does`
- Use `type` imports for type-only imports (`import type { X }`)
- No `console.log` — use `console.warn`, `console.error`, or `console.info`
- Prettier: tabs, 100 char width, no trailing commas, double quotes
- Husky pre-commit runs lint + typecheck

## Environment

Requires `EXPO_PUBLIC_TMDB_API_KEY` in `.env` file. Validated at startup via Zod.
