# AGENTS.md

## Project Overview

Frontend for an E-Learning Management System. Role-based app serving **students** (browse/enroll/watch lessons, track progress, take quizzes, manage profile), **instructors** (deliver content, manage their courses, set pricing), and **admins** (manage students, instructors, and the platform).

Backend will be **Spring Boot (Java)** — design API contracts with RESTful JSON endpoints in mind.

## Tech Stack

- **React 19** + **Vite 8** (JavaScript / JSX — NOT TypeScript)
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Oxlint** for linting (config in `.oxlintrc.json`)

## Required Workflow

Before writing any code, the user expects:

1. **Analyze** the existing project / requirements
2. **Propose** a clean frontend architecture
3. **Propose** the folder structure
4. **List** main pages and reusable components
5. **Explain** the routing structure
6. **Wait for approval** — do NOT implement without explicit sign-off

## Standard Commands (once scaffolded)

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # run Oxlint
```

## Architecture Conventions

- **Role-based routing**: use React Router with protected routes / layout routes per role (student, instructor, admin)
- **API layer**: centralize all backend calls in a dedicated `services/` or `api/` module — never call `fetch`/`axios` directly from components
- **State management**: use React Context for auth/session state; keep server state in components or a lightweight hook
- **Styling**: Tailwind utility classes only — no CSS modules or styled-components
- **Icons**: import from `lucide-react` (e.g. `import { BookOpen } from 'lucide-react'`)
- **Backend alignment**: API endpoints should mirror Spring Boot `@RestController` conventions (`/api/v1/...`, standard HTTP verbs, JSON bodies)

## Folder Structure (proposed)

```
src/
├── components/       # reusable UI components (Button, Card, Modal, etc.)
├── layouts/          # role-specific layouts (StudentLayout, InstructorLayout, AdminLayout)
├── pages/            # route-level page components
├── routes/           # React Router route definitions + guards
├── services/         # API call functions (Spring Boot endpoints)
├── context/          # React Context providers (AuthContext, etc.)
├── hooks/            # custom hooks
├── utils/            # helpers, formatters, constants
├── App.jsx           # root component + router setup
├── main.jsx          # entry point
└── index.css         # Tailwind directives + global styles
```

## Lint Rules (Oxlint)

- `react/rules-of-hooks`: error
- `react/only-export-components`: warn (allows constant exports)

## Gotchas

- **No TypeScript** — this is a JSX project; do not add `.tsx` files or TS config
- **No backend yet** — mock data or MSW (Mock Service Worker) for development until Spring Boot API is ready
- **Spring Boot CORS** — frontend dev server runs on Vite's default port (5173); ensure backend allows it or set up a Vite proxy in `vite.config.js`
