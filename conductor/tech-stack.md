# Tech Stack - newApp

## Languages

- **JavaScript** — Node.js (CommonJS) on the server, ES modules + JSX on the client.

## Frontend (`client/`)

- **React 18** — UI library.
- **Vite 5** — dev server and build tool (`type: module`).
- **TailwindCSS 3** — utility-first styling (with `postcss` + `autoprefixer`).
- **react-icons** — icon set.
- **axios** — HTTP client for calling the backend API.

> Note: the repository README references "Next.js", but the actual frontend is
> React + Vite. This file reflects the real, in-code stack.

## Backend (`api/`)

- **Express 4** — web framework (`api/index.js`).
- **Node.js** — runtime.
- **axios** — fetches story data from the Hacker News API.
- **cors** — cross-origin middleware.
- **dotenv** — environment configuration (`PORT`, defaults to 3001).
- **nodemon** — dev auto-reload (`npm run dev`).

The backend exposes `/api/topstories`, `/api/beststories`, `/api/newstories`,
`/api/welcome`, and `/api/hey` (a plain-text greeting), then serves the built
client from `client/dist` for all other routes.

## Data Source

- **Hacker News Firebase API** (`https://hacker-news.firebaseio.com/v0/`) — the sole
  external data source. The backend acts as a stateless proxy/aggregator.

## Database

- **None.** The application is stateless; the Hacker News API is the only data store.

## Infrastructure

- **Render** — a single service runs the Express server, which serves both the API
  and the static client build (`npm run build` builds the client into `client/dist`).

## Testing

- **Backend**: Node's built-in test runner (`node:test`), zero extra dependencies.
  Test files live alongside source as `*.test.js` and run via `npm test`
  (`node --test "api/**/*.test.js"`).
- **Frontend**: no automated test harness yet (would require adding
  testing-library + jsdom); verified via lint, build, and manual checks.

## Key Scripts

- Root: `npm run dev` (nodemon), `npm start` (node), `npm test` (node:test), `npm run build` (installs deps + builds client).
- Client: `npm run dev` (vite), `npm run build`, `npm run lint`, `npm run preview`.
