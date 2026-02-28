# Premiere Night

A cross-platform mobile app for discovering and curating films for private screening events.

## Tech Stack

- React Native + Expo SDK 55
- Expo Router v4 (file-based navigation)
- TypeScript (strict mode)
- NativeWind v4 (Tailwind CSS)
- Zustand (state management with persist)
- TanStack Query v5 (data fetching & caching)
- TMDb API (movie data)

## Prerequisites

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- TMDb API key ([get one here](https://www.themoviedb.org/settings/api))
- iOS Simulator (macOS) or Android Emulator

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd premiere-night
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   # Add your TMDb API key to .env
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Run on platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR with Expo Go for physical device

## Deep Linking

Test deep linking to a specific movie:

```bash
npx uri-scheme open "premiere-night://movie/550" --ios
```

## Architecture Decisions

### Navigation

Expo Router v4 with file-based routing. Tab layout groups the two main screens (Spotlight & Watchlist), while the movie detail screen lives outside tabs as a stack screen.

### State Management

- **Server state**: TanStack Query handles all TMDb API data with automatic caching, background refetching, and stale-time configuration.
- **Client state**: Zustand manages the watchlist with `persist` middleware backed by AsyncStorage, ensuring the watchlist survives app restarts.

### Styling

NativeWind v4 provides Tailwind utility classes in React Native. Custom colors are extended in the Tailwind config for a cohesive cinematic design system.

### Error Handling

Global error handling via React Query's `QueryCache` and `MutationCache`. All API errors surface automatically as toast notifications without per-component error wiring. Component-level `ErrorState` with retry is used for critical screens.

### Environment Validation

Environment variables are validated at startup using Zod schemas (`src/constants/env.ts`). Missing or invalid values surface immediately rather than causing silent runtime failures.

### Performance

- `expo-image` for optimized image loading with caching and blurhash placeholders
- `React.memo` on list items to prevent unnecessary re-renders
- Debounced search input (300ms) to minimize API calls
- FlatList optimizations (`getItemLayout`, `maxToRenderPerBatch`, `windowSize`)
- React Query `gcTime` and `retry` configured via centralized constants

### Trade-offs & Assumptions

- Used TMDb's "Now Playing", "Popular", "Top Rated", and "Upcoming" endpoints for home screen variety
- Genre filtering is client-side (filters currently loaded movies rather than making new API calls per genre)
- Search uses TMDb's search endpoint with debouncing rather than client-side filtering
- Deep linking uses Expo Router's built-in scheme handling

## Code Quality

### ESLint

ESLint 9 with flat config format. Enforces TypeScript strict rules, boolean naming conventions, consistent type imports/exports, and no-console restrictions.

```bash
npm run lint          # lint and autofix
```

### Prettier

Prettier with import sorting (`@trivago/prettier-plugin-sort-imports`) and Tailwind class sorting (`prettier-plugin-tailwindcss`).

```bash
npm run lint:format        # format all files
npm run lint:format-check  # check formatting (CI)
```

### Husky

Git hooks via Husky:

- **pre-commit**: runs `npm run lint && npm run typecheck` before every commit
- **prepare-commit-msg**: auto-prepends branch ticket number to commit messages

### TypeScript

```bash
npm run typecheck     # type check without emitting
```

## Bonus Features

- Watchlist persisted across launches via AsyncStorage
- Deep linking to specific movies (`premiere-night://movie/{id}`)
- Press animations on movie cards via Reanimated
- Genre chip filtering
- Custom app icons for iOS and Android
- Haptic feedback on watchlist toggle (dev client builds)
- Custom dev logger with color-coded output (`src/utils/logger.ts`)
- Barrel exports (`index.ts`) across all `src/` subdirectories for clean imports

## AI Disclosure

AI tools (Claude) were used to assist with:

- Initial project scaffolding and folder structure planning
- Boilerplate code generation for API client and type definitions
- README wording and documentation structure

All code was reviewed, understood, and adapted to fit the project's specific needs.

## Known Limitations / Follow-up Items

- Pagination is not implemented for movie lists (only first page loaded)
- No offline support beyond cached queries and persisted watchlist
- Genre filtering is basic (single genre, client-side only)
- No unit or integration tests (would add with Jest + React Native Testing Library given more time)
- No gradient overlay on detail backdrop (would add expo-linear-gradient once peer dep conflict is resolved)
