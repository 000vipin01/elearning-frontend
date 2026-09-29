# E-Learning Management System — Frontend

React 19 + Vite 8 + Tailwind CSS v4 frontend with three distinct role-based shells.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |
| `npm test` | Run Vitest tests |
| `npm run test:watch` | Run Vitest in watch mode |

## Architecture

```
src/
├── app/              # Router setup
├── shells/           # Role-specific layouts
│   ├── student/      # "Learning Studio" — warm, editorial
│   ├── instructor/   # "Creator Workbench" — dense, tool-like
│   └── admin/        # "Control Room" — data-dense operations
├── features/         # Feature pages
│   ├── auth/         # Login, Signup
│   ├── student/      # Dashboard, Courses, Lessons, Quizzes, Cart
│   ├── instructor/   # Dashboard, Courses, Earnings
│   └── admin/        # Dashboard, Users, Payments
├── shared/           # Shared infrastructure
│   ├── api/          # API client with interceptors
│   ├── auth/         # Auth context, route guards
│   └── ui/           # UI components
└── styles/           # Design tokens
```

## Design Tokens

Each role has its own palette, typography, and spacing defined as CSS variables with Tailwind v4 `@theme`:

- **Student**: Warm oranges, editorial serif (Playfair Display), content-first
- **Instructor**: Cool blues, monospace accents (JetBrains Mono), dense tool-like
- **Admin**: Purple/cyan, geometric sans (Space Grotesk), data-dense

## API Client

The API client (`src/shared/api/client.js`) provides:
- Automatic `Authorization` header from localStorage
- Error normalization (consistent `ApiError` shape)
- 401 handling (auto-logout and redirect)

## Testing

```bash
# Unit tests
npm test

# E2E tests (requires backend running)
npx playwright test
```

## Environment Variables

See `.env.example` for the full list.

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api/v1` | Backend API URL (uses Vite proxy in dev) |
