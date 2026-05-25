# JavaScript / JSX Style Guide - newApp

This guide covers both the Express backend (`api/`) and the React client (`client/`).

## Linting

The client is linted with ESLint 8 (`client/.eslintrc.cjs`). Run `npm run lint`
inside `client/`. The configuration is the source of truth; key points:

- Extends `eslint:recommended`, `plugin:react/recommended`,
  `plugin:react/jsx-runtime`, and `plugin:react-hooks/recommended`.
- React version is pinned to `18.2`; the new JSX runtime is assumed (no need to
  `import React` for JSX).
- `react-refresh/only-export-components` is a **warning** (`allowConstantExport: true`).
- `react/jsx-no-target-blank` is **off**.
- `dist` and `.eslintrc.cjs` are ignored.
- Lint runs with `--max-warnings 0`, so warnings must be resolved before merge.

## Modules

- **Client** uses ES modules (`import`/`export`, `"type": "module"`).
- **Backend** uses CommonJS (`require`/`module.exports`).
- Do not mix the two within a workspace.

## Formatting

- 2-space indentation.
- Semicolons required.
- Prefer `const`; use `let` only when reassignment is needed; never `var`.
- Use template literals for string interpolation.
- Prefer `async`/`await` over raw promise chains (matches the existing API handlers).

## React Conventions

- Functional components with hooks only — no class components.
- Follow the rules of hooks (enforced by `react-hooks/recommended`).
- Components are PascalCase; files for components use `.jsx`.
- Keep components small and focused; extract reusable UI.

## Backend Conventions

- Group route handlers by resource; prefix all API routes with `/api/`.
- Wrap external calls (Hacker News API) in `try`/`catch` and return appropriate
  HTTP status codes on failure (see existing handlers returning `500`).
- Read configuration from environment via `dotenv`; never hardcode ports/secrets.

## Error Handling & Reliability

- Always handle failures from the Hacker News API gracefully — return a clear error
  response from the server and degrade the UI rather than crashing or blanking.
